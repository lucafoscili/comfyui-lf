import base64
import cv2
import fnmatch
import folder_paths
import hashlib
import io
import json
import numpy as np
import os
import piexif
import re
import torch

from PIL import Image
from PIL.ExifTags import TAGS
from torchvision.transforms import InterpolationMode, functional

from datetime import datetime

from server import PromptServer

from ..utils.constants import BASE64_PNG_PREFIX

def base64_to_tensor(base64_str):
    """
    Convert a base64-encoded image string to a PyTorch tensor in [B, H, W, C] format.
    
    Args:
        base64_str (str): The base64 encoded image string.
    
    Returns:
        torch.Tensor: A PyTorch tensor with shape [B, H, W, C], where B is the batch size.
    """
    # Decode the base64 string back to binary image data
    image_data = base64.b64decode(base64_str)
    
    # Create a BytesIO buffer and load it as an image
    buffer = io.BytesIO(image_data)
    pil_img = Image.open(buffer)

    # Convert the PIL image to a numpy array (scale values between 0 and 1)
    img_array = np.asarray(pil_img) / 255.0

    # Convert the numpy array to a PyTorch tensor (H, W, C format)
    img_tensor = torch.from_numpy(img_array).float()

    # If the image is grayscale, expand it to 3 channels to match RGB format
    if img_tensor.ndim == 2:  # If the image has no color channels
        img_tensor = img_tensor.unsqueeze(-1).repeat(1, 1, 3)  # Add channel dimension and repeat to get 3 channels
    elif img_tensor.shape[-1] == 1:  # If it has a single color channel
        img_tensor = img_tensor.repeat(1, 1, 3)  # Repeat the channel dimension 3 times

    # Add batch dimension at the start: [B=1, H, W, C]
    img_tensor = img_tensor.unsqueeze(0)
    
    return img_tensor

def clarity_effect(image_tensor:torch.Tensor, clarity_strength:float, sharpen_amount:float, blur_kernel_size:int):
    """
    Processes a single image tensor by applying clarity and sharpen effects.

    Args:
        image_tensor (torch.Tensor): The input image tensor.
        clarity_strength (float): The clarity effect strength.
        sharpen_amount (float): The sharpening amount.
        blur_kernel_size (int): The kernel size for blurring.

    Returns:
        torch.Tensor: The processed image tensor.
    """
    def apply_clarity(image:torch.Tensor, clarity_strength:float):
        """
        Apply clarity enhancement to an image using the LAB color space.

        Args:
            image (numpy.ndarray): The input image in BGR format.
            clarity_strength (float): The strength of the clarity effect.

        Returns:
            numpy.ndarray: The image after applying the clarity effect.
        """
        lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        l_channel, a_channel, b_channel = cv2.split(lab_image)
        blurred_l_channel = cv2.GaussianBlur(l_channel, (blur_kernel_size, blur_kernel_size), 0)
        laplacian = cv2.Laplacian(blurred_l_channel, cv2.CV_64F)
        enhanced_l_channel = l_channel + clarity_strength * laplacian
        enhanced_l_channel = np.clip(enhanced_l_channel, 0, 255).astype(np.uint8)
        enhanced_lab_image = cv2.merge([enhanced_l_channel, a_channel, b_channel])
        final_image = cv2.cvtColor(enhanced_lab_image, cv2.COLOR_LAB2BGR)

        return final_image

    def apply_sharpen(image, sharpen_amount):
        """
        Apply sharpening to an image using a weighted sum.

        Args:
            image (numpy.ndarray): The input image in BGR format.
            sharpen_amount (float): The amount of sharpening to apply.

        Returns:
            numpy.ndarray: The image after applying the sharpening effect.
        """
        gaussian_blur = cv2.GaussianBlur(image, (9, 9), 10.0)
        sharpened_image = cv2.addWeighted(image, 1.0 + sharpen_amount, gaussian_blur, -sharpen_amount, 0)

        return sharpened_image
    
    image = tensor_to_numpy(image_tensor, True)
    clarity_image = apply_clarity(image, clarity_strength)
    final_image = apply_sharpen(clarity_image, sharpen_amount)

    return numpy_to_tensor(final_image)

def cleanse_lora_tag(lora_tag: str, separator: str):
    """
    Cleanse the lora tag by removing unnecessary parts and extracting keywords.

    Args:
        lora_tag (str): The input lora tag string.
        separator (str): The separator used in the file name.

    Returns:
        str: The cleaned-up string with extracted keywords.
    """
    # Remove the <lora: and last '>': part to get the safetensors file name and weight
    safetensors_info = lora_tag[len('<lora:'):][:-1]
    
    # Split the safetensors_info by ':' to separate the file name and weight (if any)
    file_name_with_weight = safetensors_info.split(':')
    
    # Handle cases with or without weight information
    file_name = file_name_with_weight[0]  # Always take the first part as the file name
    
    # Split the file name by '\\' to separate the file name and the folder containing it
    file_name_with_folder = file_name.split('\\')
    file_name = file_name_with_folder[-1]  # Always take the last part as the file name
    
    # Split the file name by '.safetensors' to separate the file name and the extension
    file_name_with_extension = file_name.split('.safetensors')
    file_name = file_name_with_extension[0]  # Take the part before '.safetensors'
    
    # Extract keywords from the file name
    if separator in file_name:
        keywords = ', '.join(file_name.split(separator))
    else:
        keywords = file_name
    
    # Join keywords into a string to replace the lora tag
    if isinstance(keywords, str):
        keyword_str = keywords
    elif isinstance(keywords, list):
        keyword_str = ', '.join(keywords[:-1]) + ', ' + keywords[-1]
    else:
        raise ValueError("keywords must be a string or a list of strings")
    
    return keyword_str

def clean_prompt(prompt: str):
    return re.sub(r'(embedding:)?(.*?)(\.pt|\.pth|\.sft|\.safetensors)?', r'\2', prompt).strip()

def count_words_in_comma_separated_string(input_string: str):
    """
    Count the number of words in a comma-separated string.

    Args:
        input_string (str): The input string containing comma-separated words.

    Returns:
        int: The total count of words in the input string.
    """    
    words_list = input_string.split(',')
    word_count = len(words_list)
    return word_count

def convert_to_boolean(text):
    text_lower = text.strip().lower()
    if text_lower in ['true', 'yes']:
        return True
    elif text_lower in ['false', 'no', '']:
        return False
    return None

def convert_to_float(text):
    try:
        return float(text)
    except ValueError:
        return None
    
def convert_to_int(text):
    try:
        return int(text)
    except ValueError:
        return None
    
def convert_to_json(text):
    try:
        return json.loads(text)
    except (json.JSONDecodeError, TypeError):
        return None

def create_dummy_image_tensor():
    """
    Creates a dummy image tensor, typically used when there are no real images to process.
    This function generates a small black image (1x1 pixels) and converts it to a PyTorch tensor.
    The resulting tensor can be used as a placeholder in scenarios where no actual image data is available.

    Returns:
        torch.Tensor: A single-element tensor representing a dummy image.
    """    
    # Create a small black image
    img = Image.new('RGB', (64, 64), color=(0, 0, 0))
    
    # Convert to tensor
    img_tensor = torch.from_numpy(np.array(img)).float() / 255.0
    
    return img_tensor.unsqueeze(0)

def extract_jpeg_metadata(pil_image, file_name):
    """
    Extract EXIF metadata from a JPEG image.
    """
    try:
        exif_bytes = pil_image.info.get('exif', None)
        if exif_bytes is None:
            return {"error": f"No EXIF metadata found in {file_name}"}

        exif_data = piexif.load(exif_bytes)
        
        if isinstance(exif_data, bytes):
            return {"format": "JPEG", "metadata": {}}
        
        if not exif_data:
            return {"error": f"Failed to load EXIF data from {file_name}"}

        exif_json = {}
        
        def safe_convert_value(v):
            if isinstance(v, bytes):
                return v.decode('utf-8', errors='ignore')
            elif isinstance(v, list):
                return [safe_convert_value(i) for i in v]
            else:
                return v
        
        for item in exif_data.values():
            if hasattr(item, 'items'):
                for tag, value in item.items():
                    tag_name = TAGS.get(tag, tag)
                    exif_json[tag_name] = safe_convert_value(value)
        
        try:
            json.dumps(exif_json)
        except TypeError as e:
            for k, v in list(exif_json.items()):
                try:
                    json.dumps({k: v})
                except TypeError:
                    del exif_json[k]
        
        return  exif_json
    
    except Exception as e:
        return {"error": f"An unexpected error occurred while extracting EXIF data from {file_name}: {str(e)}"}

def extract_png_metadata(pil_image):
    """
    Extract metadata from PNG text chunks.
    """
    png_info = pil_image.info
    metadata = {}
    
    for key, value in png_info.items():
        if isinstance(value, str):
            metadata[key] = value
    
    return metadata

def find_checkpoint_image(checkpoint_path):
    extensions = ["jpg", "jpeg", "JPEG", "png", "webp", "WEBP"]
    
    for ext in extensions:
        image_path = f"{os.path.splitext(checkpoint_path)[0]}.{ext}"
        if os.path.exists(image_path):
            return image_path
    return None

def filter_list(filter, list):
    normalized_filter = filter.replace('\\', '/')
    return [model for model in list if fnmatch.fnmatch(model.replace('\\', '/'), normalized_filter)]

def get_embedding_hashes(embeddings: str, analytics_dataset: dict):
    children = []
    emb_hashes = []
    emb_entries = [emb.strip() for emb in embeddings.split(',')]
    analytics_dataset["nodes"].append({ "children": children, "id": "embeddings"})

    for emb_entry in emb_entries:
        match = re.match(r'(?:embedding:)?(.*)', emb_entry)
        if match:
            emb_name = match.group(1).strip()
            if emb_name:
                if not emb_name.endswith('.pt') and not emb_name.endswith('.safetensors'):
                    emb_name_with_ext = f"{emb_name}.safetensors"
                else:
                    emb_name_with_ext = emb_name
                    emb_file_path = folder_paths.get_full_path("embeddings", emb_name_with_ext)
                try:
                    emb_hash = get_sha256(emb_file_path)
                    emb_hashes.append(f"{emb_name_with_ext}: {emb_hash}")
                    children.append({ "id": emb_name, "value": emb_name })
                except Exception as e:
                    emb_hashes.append(f"{emb_name}: Unknown")
    return emb_hashes

def get_lora_hashes(lora_tags: str, analytics_dataset: dict):
    children = []
    lora_hashes = []
    lora_tags = lora_tags.replace("><", ">,<")
    lora_entries = [tag.strip('<>').split(':') for tag in lora_tags.split(',')]
    analytics_dataset["nodes"].append({ "children": children, "id": "loras"})

    for lora_entry in lora_entries:
        if len(lora_entry) >= 2:
            lora_name = lora_entry[1].strip()
            if not lora_name.endswith('.pt') and not lora_name.endswith('.safetensors'):
                lora_name_with_ext = f"{lora_name}.safetensors"
            else:
                lora_name_with_ext = lora_name
            lora_file_path = folder_paths.get_full_path("loras", lora_name_with_ext)
            try:
                lora_hash = get_sha256(lora_file_path)
                lora_hashes.append(f"{lora_name_with_ext}: {lora_hash}")
                children.append({ "id": lora_name, "value": lora_name })
            except Exception:
                lora_hashes.append(f"{lora_name}: Unknown")
    return lora_hashes

def get_sha256(file_path: str):
    hash_file_path = f"{os.path.splitext(file_path)[0]}.sha256"
    
    if os.path.exists(hash_file_path):
        with open(hash_file_path, "r") as hash_file:
            return hash_file.read().strip()
    
    sha256_value = hashlib.sha256()

    with open(file_path, "rb") as file:
        for byte_block in iter(lambda: file.read(4096), b""):
            sha256_value.update(byte_block)

    with open(hash_file_path, "w") as hash_file:
        hash_file.write(sha256_value.hexdigest())

    return sha256_value.hexdigest()

def handle_response(response: dict, method: str = "GET"):
    """
    Handles the response from a Language Model (LLM) endpoint.

    Args:
    - response (dict): The response dictionary from the LLM endpoint.
    - method (str): The HTTP method used for the request. Defaults to "GET".

    Returns:
    - tuple: A tuple containing the status code, method, and the content of the response.
    """
    # Check for common error status codes
    if response.status_code == 400:
        return response.status_code, method, "Bad Request"
    elif response.status_code == 401:
        return response.status_code, method, "Unauthorized"
    elif response.status_code == 403:
        return response.status_code, method, "Forbidden"
    elif response.status_code == 404:
        return response.status_code, method, "Not Found"
    elif response.status_code == 500:
        return response.status_code, method, "Internal Server Error"
    else:
        # Process successful responses
        if response.status_code == 200:
            llm_result = response.json()
            if 'choices' in llm_result and len(llm_result['choices']) > 0:
                first_choice = llm_result['choices'][0]
                if 'message' in first_choice and 'content' in first_choice['message']:
                    answer = first_choice['message']['content']
                    return response.status_code, method, answer
                
        return response.status_code, method, "Whoops! Something went wrong."

def normalize_input_image(image: list[torch.Tensor] | torch.Tensor):
    """
    Converts an input tensor or list of image tensors into a standardized list of individual image tensors.
    
    This function ensures that:
    
    - A 4D tensor (batch of images) is converted into a list of tensors, each with shape [1, H, W, C].
    - A 3D tensor (single image) is converted into a list with one element, maintaining a batch dimension as [1, H, W, C].
    - A list with only one element is handled as a single batch or image, as applicable.
    - A list of images is returned as-is, with each element assumed to be an individual image tensor.
    
    Parameters:
    image (torch.Tensor or list): Input image(s) as a tensor (3D/4D) or a list.
    
    Returns:
    list: A list of individual image tensors, each with a batch dimension.
    
    Raises:
    ValueError: If the input tensor is neither 3D nor 4D.
    """
    if isinstance(image, torch.Tensor):
        if len(image.shape) == 4:
            return [img.unsqueeze(0) for img in image]
        elif len(image.shape) == 3:
            return [image.unsqueeze(0)]
        else:
            raise ValueError("Input tensor must be either 3D or 4D.")
    elif isinstance(image, list):
        if len(image) == 1 and isinstance(image[0], torch.Tensor):
            # Handle single element list as a single image or batch
            return normalize_input_image(image[0])
        return image  # Return the list as-is if it has multiple elements
    else:
        raise TypeError("Input must be a torch.Tensor or list.")
    
def normalize_json_input(input):
    """
    Normalize input JSON-like data into a standard Python object.
    
    This function processes inputs of various types to ensure that JSON data is
    returned in a standard format, such as a dictionary, list, or other valid JSON structure. 
    It handles the following input scenarios:
    
    - **Dictionary:** If the input is already a dictionary (parsed JSON object), it is returned as-is.
    - **String:** If the input is a JSON-formatted string, it is parsed into a JSON object (dict or list).
    - **Single-Item List:** If the input is a list with one item that is a JSON string, that item is parsed 
      into a JSON object and returned directly.
    - **List of JSON Strings:** If the input is a list of JSON-formatted strings, each string is parsed individually 
      into a JSON object, and the result is returned as a list of dictionaries.
    - **List of Dictionaries:** If the input is a list of dictionaries, it is returned as-is, assuming it is already 
      in a valid JSON format.
    
    Parameters:
    input (dict, str, or list): The JSON input to be normalized. It can be:
        - A pre-parsed JSON object (dict).
        - A JSON string.
        - A list of JSON strings or dictionaries.
    
    Returns:
    dict or list: A parsed JSON object (dictionary) or a list of parsed JSON objects.
    
    Raises:
    TypeError: If the input type is unsupported, meaning it is neither a dictionary, a string, nor a list.
    
    Examples:
    ---------
    >>> normalize_json_input('{"key": "value"}')
    {'key': 'value'}
    
    >>> normalize_json_input([ '{"key1": "value1"}', '{"key2": "value2"}' ])
    [{'key1': 'value1'}, {'key2': 'value2'}]
    
    >>> normalize_json_input([ {"key": "value"} ])
    [{'key': 'value'}]
    
    >>> normalize_json_input([{"key1": "value1"}, {"key2": "value2"}])
    [{'key1': 'value1'}, {'key2': 'value2'}]
    
    """
    def convert_python_to_json(input_str):
        """Convert single quotes in Python-style strings to JSON-compatible double quotes."""
        return re.sub(r"(?<!\")'([^']*)'(?!\")", r'"\1"', input_str)
    
    if isinstance(input, dict) or input is None:
        return input
    
    elif isinstance(input, str):
        try:
            return json.loads(input)
        except json.JSONDecodeError:
            return json.loads(convert_python_to_json(input))
    
    elif isinstance(input, list):
        if all(isinstance(i, dict) for i in input):
            return input
        elif len(input) == 1 and isinstance(input[0], str):
            try:
                return json.loads(input[0])
            except json.JSONDecodeError:
                return json.loads(convert_python_to_json(input[0]))
        else:
            # Process multi-item lists by converting each element if necessary
            return [
                json.loads(convert_python_to_json(s)) if isinstance(s, str) else s 
                for s in input
            ]
    
    else:
        raise TypeError(f"Unsupported input type: {type(input)}") 
    
def normalize_input_list(input):
    """
    Standardizes the input into a list format if not already a list, handling edge cases 
    where the input might be None or an invalid type. If the input is None, empty, or 
    equivalent to "None", it returns None. Otherwise, it wraps non-list inputs in a list.

    Parameters:
    input (any type): The input value to be normalized into a list.

    Returns:
    list or None: A list if the input is valid, or None if input is empty or invalid.
    """
    if not_none(input):
        if isinstance(input, list) and len(input) > 0:
            return input
        elif isinstance(input, (str, int, float, bool, dict)):
            return [input]
        
    return None


def normalize_list_to_value(input):
    """
    Returns the first element of a list if it contains valid, non-null data, or the input itself otherwise.
    
    This function checks whether the input is a list and has valid contents as defined by `not_none(input)`.
    If these conditions are met, the first element of the list is returned. If the input is not a list 
    or does not meet these validity criteria, the function returns the input as-is.

    Parameters:
    input (any): The input, expected to be a list or other value.

    Returns:
    any: The first element of the list if input is a valid list; otherwise, the input itself.
    """
    if isinstance(input, list) and not_none(input):
        return input[0]
    return input

def normalize_output_image(image_input):
    """
    Normalize the given image input into both batch and list formats.

    This function handles images of varying resolutions by grouping them into batches
    based on their [H, W] dimensions. It outputs:
    - A list of batch tensors with shape [B, H, W, C], one for each unique resolution.
    - A list of individual image tensors with shape [1, H, W, C].

    Parameters:
    image_input (torch.Tensor or list): The image input to be normalized. It can be:
        - A single tensor [1, H, W, C]
        - A batch tensor [B, H, W, C]
        - A list of individual tensors or batch tensors

    Returns:
    tuple: A tuple containing:
        - batch_list (list): A list of tensors, each with shape [B, H, W, C] for a unique resolution.
        - image_list (list): A list of tensors with shape [1, H, W, C], preserving the batch dimension.
    """
    if isinstance(image_input, list):
        image_list = []
        for img in image_input:
            if isinstance(img, torch.Tensor):
                if len(img.shape) == 4:  # Handle batch format [B, H, W, C]
                    image_list.extend([i.unsqueeze(0) if len(i.shape) == 3 else i for i in img])
                elif len(img.shape) == 3:  # Single image case, add batch dimension
                    image_list.append(img.unsqueeze(0))  # Convert to [1, H, W, C]
            else:
                raise TypeError("Unsupported image format in list.")
    elif isinstance(image_input, torch.Tensor):
        if len(image_input.shape) == 4:  # Input is already a batch [B, H, W, C]
            image_list = [img.unsqueeze(0) if len(img.shape) == 3 else img for img in image_input]
        elif len(image_input.shape) == 3:  # Single image [H, W, C], convert to [1, H, W, C]
            image_list = [image_input.unsqueeze(0)]
        else:
            raise ValueError("Unsupported tensor shape.")
    else:
        raise TypeError("Unsupported input type for image normalization.")

    # Group images by resolution
    resolution_groups = {}
    for img in image_list:
        h, w = img.shape[1:3]  # Extract height and width
        if (h, w) not in resolution_groups:
            resolution_groups[(h, w)] = []
        resolution_groups[(h, w)].append(img)

    # Create separate batch tensors for each unique resolution
    batch_list = []
    for _, imgs in resolution_groups.items():
        if len(imgs) > 1:
            batch_list.append(torch.cat(imgs, dim=0))  # Create batch [B, H, W, C]
        else:
            batch_list.append(imgs[0])  # Single image in this resolution, keep as is

    return batch_list, image_list

def not_none(input):
    """
    Check if the input is neither None nor a string representation of "None".

    This function evaluates the input to determine if it is a value that is neither None
    nor the string "None". It returns True for any other valid input.

    Parameters:
    input (any type): The input to be checked.

    Returns:
    bool: True if input is not None or "None"; otherwise, False.
    """
    return bool(input != None and str(input) != "None")

def numpy_to_tensor(numpy_array):
    """
    Convert a NumPy array to a PyTorch tensor.

    Args:
        numpy_array (numpy.ndarray): The input NumPy array representing the image.
            It should be a 2D array with shape [H, W, C] or a 3D array with shape [B, H, W, C].

    Returns:
        torch.Tensor: The converted PyTorch tensor.

    Notes:
        - The tensor values are automatically scaled from [0, 255] to [0, 1].
    """
    try:
        tensor = torch.from_numpy(numpy_array).float() / 255.0

        if tensor.dim() == 3:
            return tensor
        elif tensor.dim() == 4:
            return tensor
        else:
            raise ValueError(f"Unexpected input shape: {tensor.shape}")
    except Exception as e:
        print(f"Error converting NumPy array to tensor: {e}")
        raise

def pil_to_tensor(image):
    """
    Convert a PIL Image to a PyTorch tensor.

    Args:
        image (PIL.Image): The input PIL Image.

    Returns:
        torch.Tensor: The converted tensor representing the image.
            The tensor will have shape [1, C, H, W] where C is the number of channels.

    Notes:
        - The PIL Image is first converted to a NumPy array.
        - The array is then converted to a float32 tensor and normalized to [0, 1] range.
        - The tensor is reordered from [H, W, C] to [C, H, W] format.
        - An extra dimension is added at the beginning to represent the batch size (1).
    """
    # Convert the PIL image to a NumPy array
    np_image = np.array(image).astype("float32") / 255.0
    
    # Convert the NumPy array to a tensor and reorder to [C, H, W]
    tensor = torch.tensor(np_image).permute(0, 1, 2).unsqueeze(0)
    
    return tensor

def prepare_model_dataset (model_name, model_hash, model_base64, model_path):
    dataset = {
                "nodes": [
                    {
                        "cells": {
                            "text1": {
                                "value": model_name
                            },
                            "text2": {
                                "value": model_hash
                            },
                            "text3": {
                                "value": "Selected checkpoint cover, hash and name." +
                                         ("" if model_path 
                                             else "Note: to set the cover, create an image with the same name of the checkpoint in its folder.")
                            },
                            "kulCode": { 
                                'shape': 'code', 
                                'value': json.dumps({'hash': model_hash, 'path': model_path})
                            },
                            "kulImage": {
                                "kulStyle": "img {object-fit: cover;}",
                                "shape": "image",
                                "value": BASE64_PNG_PREFIX + model_base64 if model_base64 and model_path else "broken_image"
                            }
                        },
                        "id": model_name
                    }
                ]
            }
    
    return dataset

def process_model(model_type, model_name, folder):
    model_path = folder_paths.get_full_path(folder, model_name)
    model_info_path = os.path.splitext(model_path)[0] + ".info"

    saved_info = None
    if os.path.exists(model_info_path):
        try:
            with open(model_info_path, 'r') as f:
                file_content = f.read().strip()

                if not file_content:
                    os.remove(model_info_path)
                else:
                    try:
                        saved_info = json.loads(file_content)
                    except json.JSONDecodeError as e:
                        print(f"JSONDecodeError for {model_info_path}: {e}")
        except Exception as e:
            print(f"Error reading {model_info_path}: {e}")

    try:
        model_hash = get_sha256(model_path)
    except Exception as e:
        model_hash = "Unknown"
        print(f"Error calculating hash for {model_type}: {e}")

    model_base64 = None
    model_cover = None
    model_image_path = find_checkpoint_image(model_path)

    if saved_info:
        try:
            kul_image_value = saved_info['nodes'][0]['cells']['kulImage']['value']
            if kul_image_value.startswith(BASE64_PNG_PREFIX):
                try:
                    model_base64 = kul_image_value.replace(BASE64_PNG_PREFIX, "")
                    model_cover = base64_to_tensor(model_base64)
                except Exception as e:
                    model_cover = None
            else:
                model_cover = None
        except (KeyError, IndexError):
            print("kulImage not found in saved_info, using defaults.")

    if model_image_path and model_cover == None:
        pil_image = Image.open(model_image_path)
        model_cover = pil_to_tensor(pil_image)
        model_base64 = tensor_to_base64(model_cover)

    return {
        "model_path": model_path,
        "model_name": model_name,
        "model_hash": model_hash,
        "model_cover": model_cover,
        "model_base64": model_base64,
        "saved_info": saved_info
    }

def resize_and_crop_image(image_tensor: torch.Tensor, resize_method: str, target_height: int, target_width: int, resize_mode: str, pad_color: tuple):
    """
    Resize an image tensor to the target dimensions, with optional cropping or padding.

    Args:
        image_tensor (torch.Tensor): The input tensor containing the image data.
        resize_method (str): The method to use for resizing (e.g., bicubic, bilinear).
        target_height (int): The target height for the output image.
        target_width (int): The target width for the output image.
        resize_mode (str): Whether to crop or pad the image ("crop" or "pad").
        pad_color (string): The color to use for padding if padding is selected (hexadecimal).

    Returns:
        torch.Tensor: The resized image tensor.
    """
    interpolation_mode = getattr(InterpolationMode, resize_method.upper().replace(" ", "_"))

    _, h, w, _ = image_tensor.shape

    aspect_ratio = w / h
    target_aspect_ratio = target_width / target_height

    if resize_mode == "crop":
        if target_aspect_ratio > aspect_ratio:
            new_w = target_width
            new_h = round(new_w / aspect_ratio)
        else:
            new_h = target_height
            new_w = round(new_h * aspect_ratio)
    else:
        if aspect_ratio > target_aspect_ratio:
            new_w = target_width
            new_h = round(new_w / aspect_ratio)
        else:
            new_h = target_height
            new_w = round(new_h * aspect_ratio)

    image_tensor = image_tensor.permute(0, 3, 1, 2)
    resized_image = functional.resize(image_tensor, (new_h, new_w), interpolation=interpolation_mode)

    if resize_mode == "crop":
        output_image = functional.center_crop(resized_image, (target_height, target_width))
    else:
        pad_color = tuple(int(pad_color.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
        channels = [functional.pad(resized_image[:, i, :, :], (
            (target_width - new_w) // 2,  # Left padding
            (target_height - new_h) // 2,  # Top padding
            (target_width - new_w + 1) // 2,  # Right padding
            (target_height - new_h + 1) // 2   # Bottom padding
        ), fill=pad_color[i]) for i in range(3)]
        output_image = torch.stack(channels, dim=1)

    return output_image.permute(0, 2, 3, 1)

def resize_image(image_tensor: torch.Tensor, resize_method: str, longest_side: bool, size: int):
    """
    Resize an image tensor using PyTorch's interpolation methods.

    Args:
        image_tensor (torch.Tensor): The input tensor containing the image data.
        resize_method (str): The method to use for resizing (e.g., bicubic, bilinear).
        longest_side (bool): Whether to resize based on the longest side of the image.
        size (int): The desired size for the resized image.

    Returns:
        torch.Tensor: The resized image tensor.
    """
    interpolation_mode = resize_method.upper().replace(" ", "_")
    interpolation_mode = getattr(InterpolationMode, interpolation_mode.upper())

    _, h, w, _ = image_tensor.shape

    if longest_side:
        if h >= w:
            new_h = size
            new_w = round(w * new_h / h)
        else:  # h < w
            new_w = size
            new_h = round(h * new_w / w)
    else:
        if h <= w:
            new_h = size
            new_w = round(w * new_h / h)
        else:  # h > w
            new_w = size
            new_h = round(h * new_w / w)

    # Permute tensor dimensions from (batch, height, width, channels) to (batch, channels, height, width)
    image_tensor = image_tensor.permute(0, 3, 1, 2)
    
    # Resize the image using the calculated dimensions
    resized_image = functional.resize(image_tensor, (new_h, new_w), interpolation=interpolation_mode, antialias=True)
    
    # Permute back to (batch, height, width, channels)
    resized_image = resized_image.permute(0, 2, 3, 1)

    return resized_image

def resize_to_square(image_tensor: torch.Tensor, square_size: int, resample_method: str, crop_position: str):
    """
    Resize an image tensor to a square and apply cropping based on the crop position.

    Args:
        image_tensor (torch.Tensor): The input tensor containing the image data.
        square_size (int): The size of the square's edge.
        resample_method (str): The method to use for resizing (e.g., bicubic, bilinear).
        crop_position (str): Where to crop the image from ("top", "bottom", "left", "right", "center").

    Returns:
        torch.Tensor: The resized and cropped image tensor.
    """
    resized_img = resize_image(image_tensor, resample_method, False, square_size)

    _, h, w, _ = resized_img.shape

    if h != w:
        if crop_position == "top":
            cropped_img = resized_img[:, :square_size, :, :]
        elif crop_position == "bottom":
            cropped_img = resized_img[:, -square_size:, :, :]
        elif crop_position == "left":
            cropped_img = resized_img[:, :, :square_size, :]
        elif crop_position == "right":
            cropped_img = resized_img[:, :, -square_size:, :]
        elif crop_position == "center":
            center_h = (h - square_size) // 2
            center_w = (w - square_size) // 2
            cropped_img = resized_img[:, center_h:center_h + square_size, center_w:center_w + square_size, :]
    else:
        cropped_img = resized_img

    return cropped_img

def resolve_filepath(filepath:str , base_output_path:str , count:bool = 0, add_timestamp:bool = False, default_filename:str = "output", extension:str = "json"):
    """
    Resolves and constructs a full file path, handling cases where the provided filepath may be a list or a single string, 
    and optionally appends a timestamp to the filename. Ensures the specified directory structure exists before returning 
    the path.

    Parameters:
        filepath (str or list): The file path as a string or list of paths. If provided as a list and the count exceeds 
                                its length, the first item is used as a fallback.
        base_output_path (str): The base directory path to be prepended if the directory is not specified in the filepath.
        count (int): The index in filepath (if it's a list) for the current path. Defaults to 0.
        add_timestamp (bool): If True, appends the current timestamp to the filename as a suffix. Defaults to False.
        default_filename (str): The default filename to use if the filepath does not contain a valid filename. Defaults to "output".

    Returns:
        str: The fully resolved file path, including the directory structure and filename, with timestamp if specified.

    Behavior:
        - If `filepath` is a list, the function attempts to use `filepath[count]`. If `count` exceeds the list length 
          or the item is None, it falls back to `filepath[0]`.
        - Splits `filepath` into directory and filename components. If directory is not specified, `base_output_path` 
          is used as the root directory.
        - Ensures the specified directory exists, creating it if necessary.
        - If `add_timestamp` is True, appends a timestamp in the format "YYYYMMDD-HHMMSS" to the filename.
        - Returns the final file path, ensuring it ends with `.json` if no extension is specified.
    """
    path_base = filepath[count] if isinstance(filepath, list) and count < len(filepath) and filepath[count] else filepath[0] if isinstance(filepath, list) else filepath 
    directory, filename = os.path.split(path_base)

    if not directory or directory == "/":
        directory = base_output_path
    else:
        directory = os.path.join(base_output_path, directory)

    if not filename:
        filename = default_filename

    if add_timestamp:
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"{filename}_{timestamp}"

    if not filename.endswith(f".{extension}"):
        filename = f"{filename}.{extension}"

    output_file = os.path.join(directory, filename)

    if not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)

    return output_file

def send_single_selector_message(node_id, dataset, model_hash, get_civitai_info, model_path, event_name):

    PromptServer.instance.send_sync(event_name, {
        "node": node_id, 
        "dataset": dataset,
        "hash": model_hash,
        "apiFlag": get_civitai_info,
        "path": model_path
    })

    return

def send_multi_selector_message(node_id, datasets, model_hashes, get_civitai_info, model_paths, event_name, chip_dataset=None):

    PromptServer.instance.send_sync(event_name, {
        "node": node_id, 
        "datasets": datasets,
        "hashes": model_hashes,
        "apiFlags": get_civitai_info,
        "paths": model_paths,
        "chipDataset": chip_dataset
    })

    return

def tensor_to_base64(tensors: list[torch.Tensor] | torch.Tensor):
    """
    Convert PyTorch tensor(s) to base64 encoding.
    
    Args:
        tensors (torch.Tensor or List[torch.Tensor]): Image tensor(s).
    Returns:
        str or List[str]: Base64 encoded string(s) of tensor images.
    """
    def convert_single_tensor(tensor: torch.Tensor):
        if len(tensor.shape) == 4:
            tensor = tensor[0]  # Take the first image in the batch
        if tensor.shape[-1] != 3:
            tensor = tensor[:, :, :3]  # Limit to 3 channels if necessary
        
        # Use tensor_to_numpy to get the numpy array, then convert to PIL
        numpy_image = tensor_to_numpy(tensor, threeD=True)
        pil_img = Image.fromarray(numpy_image)
        
        buffer = io.BytesIO()
        pil_img.save(buffer, format="png", quality=60)
        return base64.b64encode(buffer.getvalue()).decode('utf-8')

    if isinstance(tensors, list):
        return [convert_single_tensor(tensor) for tensor in tensors]
    return convert_single_tensor(tensors)

def tensor_to_bytes(tensor: torch.Tensor, format: str):
    """
    Convert a tensor to image bytes (JPEG or PNG).
    
    Args:
        tensor (torch.Tensor): Image tensor, 4D [B, H, W, C] or 3D [H, W, C].
        format (str): Desired image format (e.g., "JPEG", "PNG").
    """
    numpy_image = tensor_to_numpy(tensor, threeD=True)
    img = Image.fromarray(numpy_image)
    
    buffer = io.BytesIO()
    img.save(buffer, format)
    return buffer.getvalue()

def tensor_to_numpy(image: torch.Tensor, threeD: bool = False):
    """
    Convert a tensor to a NumPy array for OpenCV processing.
    
    Args:
        image (torch.Tensor): 4D (1, H, W, C) or 3D (H, W, C) tensor.
        threeD (bool): If True, returns a 3D array (H, W, C).
    Returns:
        np.ndarray: Converted NumPy array in uint8 format.
    """
    if image.dim() == 4:
        if image.shape[0] != 1:
            raise ValueError(f"Expected batch size of 1, but got shape {image.shape}")
        image = image.squeeze(0) if not threeD else image[0]
    elif image.dim() != 3:
        raise ValueError(f"Unexpected tensor shape for conversion: {image.shape}")

    try:
        numpy_array = (image.cpu().numpy() * 255).astype(np.uint8)
        return numpy_array
    except Exception as e:
        print(f"Error converting tensor to NumPy array: {e}")
        raise

def tensor_to_pil(tensor: torch.Tensor):
    """
    Convert a tensor to a PIL Image.
    
    Args:
        tensor (torch.Tensor): Image tensor, 4D [B, H, W, C] or 3D [H, W, C].
    Returns:
        PIL.Image: Converted PIL image.
    """
    try:
        numpy_image = tensor_to_numpy(tensor, threeD=True)
        return Image.fromarray(numpy_image)
    except Exception as e:
        print(f"Error converting tensor to PIL image: {e}")
        raise
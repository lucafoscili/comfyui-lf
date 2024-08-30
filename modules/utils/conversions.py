import base64
import io
import numpy as np
import torch

from PIL import Image
from torchvision.transforms import InterpolationMode, functional

def cleanse_lora_tag(lora_tag: str, separator: str):
    """
    Cleanse the lora tag by removing unnecessary parts and extracting keywords.

    Args:
        lora_tag (str): The input lora tag string.
        separator (str): The separator used in the file name.

    Returns:
        str: The cleaned up string with extracted keywords.
    """
    # Remove the <lora: and last '>': part to get the safetensors file name and weight
    safetensors_info = lora_tag[len('<lora:'):][:-1]
    
    # Split the safetensors_info by ':' to separate the file name and weight
    file_name_with_weight = safetensors_info.split(':')
    if len(file_name_with_weight) > 1:
        file_name, _ = file_name_with_weight
    else:
        file_name = file_name_with_weight[0]
    
    # Split the file name by '\\' to separate the file name and the folder containing it
    file_name_with_folder = file_name.split('\\')
    if len(file_name_with_folder) > 1:
        _, file_name = file_name_with_folder
    else:
        file_name = file_name_with_folder[0]
    
    # Split the file name by '.safetensors' to separate the file name and the extension
    file_name_with_extension = file_name.split('.safetensors')
    if len(file_name_with_extension) > 1:
        file_name, _ = file_name_with_extension
    else:
        file_name = file_name_with_extension[0]
    # Extract keywords from the file name
    if str(file_name).find(separator) > 1:
        keywords = ', '.join(file_name.split(separator))
    else: 
        keywords = file_name
    # Join keywords into a string to replace the lora tag
    # Assuming keywords can be a single string or a list of strings
    if isinstance(keywords, str):
    # If keywords is a single string, keep it as is
        keyword_str = keywords
    elif isinstance(keywords, list):
        keyword_str = ''.join(keywords[:-1]) + ', ' + keywords[-1]
    else:
        raise ValueError("keywords must be a string or a list of strings")
    
    return keyword_str

def count_words_in_comma_separated_string(input_string):
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

def tensor_to_base64(tensors):
    """
    Convert PyTorch tensor(s) to base64 encoding.
    
    Args:
        tensors (torch.Tensor or List[torch.Tensor]): Input tensor(s) containing image data.
    
    Returns:
        str or List[str]: Base64 encoded string representation(s) of the tensor image(s).
    """
    def convert_single_tensor(tensor):
        if len(tensor.shape) == 4 and tensor.shape[-1] != 3:
            tensor = tensor[:, :, :3]
        
        # Handle both 3D and 4D tensors
        if tensor.dim() == 4:
            # For 4D tensors, take the first image in the batch
            tensor = tensor[0]
        
        # Convert tensor to PIL Image
        pil_img = Image.fromarray(np.uint8(tensor.cpu().numpy() * 255))
        
        # Save the image to a BytesIO buffer
        buffered = io.BytesIO()
        pil_img.save(buffered, format="webp", quality=60)
        
        # Encode the buffer contents to base64 and decode it back to a string
        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return img_base64

    if isinstance(tensors, list):
        return [convert_single_tensor(tensor) for tensor in tensors]
    else:
        return convert_single_tensor(tensors)

def tensor_to_pil(tensor):
    """
    Convert a PyTorch tensor to a PIL Image.

    Args:
        tensor (torch.Tensor): The input tensor representing the image.
            It should be a 4D tensor with shape [B, H, W, C] or a 3D tensor with shape [H, W, C].

    Returns:
        PIL.Image: The converted PIL Image.

    Raises:
        Exception: If there's an error during the conversion process.

    Notes:
        - If the input tensor is 4D, it will use the first image in the batch.
        - The tensor is converted to a NumPy array and then to a PIL Image.
        - The image values are scaled from [0, 1] to [0, 255] and converted to uint8.
    """
    try:
        # Ensure that the tensor is 4D [B, H, W, C]
        if tensor.dim() == 4:
            tensor = tensor[0]  # Use the first image in the batch

        # Convert the tensor from [H, W, C] format
        image = tensor.cpu().numpy()  # Convert to a NumPy array
        image = (image * 255).astype("uint8")  # Convert to uint8

        return Image.fromarray(image)
    except Exception as e:
        print(f"Error converting tensor to PIL image: {e}")
        raise
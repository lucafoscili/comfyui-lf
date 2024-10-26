import folder_paths
import hashlib
import json
import os
import re
import torch

from datetime import datetime

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
    if isinstance(input, dict) or input is None:
        return input
    
    elif isinstance(input, str):
        return json.loads(input)
    
    elif isinstance(input, list):
        if all(isinstance(i, dict) for i in input):
            # List of dictionaries, return as-is
            return input
        elif len(input) == 1 and isinstance(input[0], str):
            # Single-item list containing a JSON string, parse the only item
            return json.loads(input[0])
        else:
            # Multi-item list of JSON strings, parse each item individually
            return [json.loads(s) if isinstance(s, str) else s for s in input]
    
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

def resolve_filepath(filepath: str, base_output_path: str, count: int = 0, add_timestamp: bool = False, default_filename: str = "output"):
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
    
    if not directory:
        directory = base_output_path
    elif directory == "/":
        directory = base_output_path
    else:
        directory = os.path.join(base_output_path, directory)

    if not filename:
        filename = default_filename

    if add_timestamp:
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"{filename}_{timestamp}"

    output_file = os.path.join(directory, f"{filename}.json" if not filename.endswith(".json") else filename)
    
    if not os.path.exists(directory):
        os.makedirs(directory, exist_ok=True)
    
    return output_file
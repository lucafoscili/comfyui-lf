import json
import torch

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
    
def normalize_input_json(input):
    """
    Normalize input JSON-like data into a standard Python object.
    
    This function processes inputs of various types to ensure that the JSON data is
    returned as a dictionary, list, or other valid JSON object. It handles:
    
    - A pre-parsed JSON object, which is returned as is.
    - A string containing JSON data, which is parsed using json.loads.
    - A list of JSON strings, which are individually parsed.
    
    Parameters:
    input (json, str, or list): The JSON input to be normalized. It can be:
        - A pre-parsed JSON object.
        - A JSON string.
        - A list of JSON strings.
    
    Returns:
    dict or list: A parsed JSON object or a list of parsed JSON objects.
    
    Raises:
    TypeError: If the input type is unsupported.
    """
    if isinstance(input, dict) or input is None:
        return input
    
    elif isinstance(input, str):
        return json.loads(input)
    
    elif isinstance(input, list):
        if len(input) > 1:
            return [json.loads(s) for s in input]
        else:
            return json.loads(input[0])
    
    else:
        raise TypeError(f"Unsupported input type: {type(input)}")
    
def normalize_input_list(input):
    """
    Ensures that the input is either None or a properly formatted list.
    
    This function standardizes the input into a list if it's not already one, while 
    handling edge cases where the input may be None or a string representing None. If the input 
    is empty or set to "None", it returns None. Otherwise, it wraps non-list inputs in a list.

    Parameters:
    input (any type): The input value to be normalized into a list.

    Returns:
    list or None: A list if the input is valid, or None if input is empty or invalid.
    """
    if not_none(input) and len(input) > 0:
        if not isinstance(input, list):
            input = [input]
    else:
        input = None
    return input

def normalize_list_to_value(input):
    """
    Extracts the first element from a list, if it is a valid list.
    
    This function checks if the input is a list and returns the first element. If the input is 
    not a list or is considered invalid (empty or representing "None"), it returns None.

    Parameters:
    input (any type): The input list from which to retrieve the first element.

    Returns:
    any type or None: The first element of the list if input is a valid list, otherwise None.
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
    return bool(input and str(input) != "None")
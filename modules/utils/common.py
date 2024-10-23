import torch

def normalize_input_image(image):
    """
    Converts a tensor or list of images into a standard list of individual image tensors.
    
    This function ensures the input, whether it's a single image tensor or a batch of images, 
    is normalized into a list format where each element represents an individual image. It handles:
    
    - A 4D tensor (batch of images) by returning a list of tensors, each with the shape [H, W, C].
    - A 3D tensor (single image) by converting it into a list with one element, ensuring the batch dimension [1, H, W, C].
    - A list of images remains unchanged.

    Parameters:
    image (torch.Tensor or list): The input image(s), either as a tensor (3D/4D) or a list.

    Returns:
    list: A list of individual image tensors.
    """
    if isinstance(image, torch.Tensor):
        if len(image.shape) == 4:  # Batch of images [B, H, W, C]
            return [img for img in image]
        elif len(image.shape) == 3:  # Single image [H, W, C]
            return [image.unsqueeze(0)]
    elif isinstance(image, list):
        return image
    else:
        # Handle edge case, return the input as a list with batch dimension if it's a tensor
        return [image.unsqueeze(0)] if isinstance(image, torch.Tensor) else [image]

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
    if input and (input != (str(input) == "None")) and len(input) > 0:
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
    if input and (input != (str(input) == "None")) and isinstance(input, list):
        return input[0]
    else:
        return None

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
    for resolution, imgs in resolution_groups.items():
        if len(imgs) > 1:
            batch_list.append(torch.cat(imgs, dim=0))  # Create batch [B, H, W, C]
        else:
            batch_list.append(imgs[0])  # Single image in this resolution, keep as is

    return batch_list, image_list
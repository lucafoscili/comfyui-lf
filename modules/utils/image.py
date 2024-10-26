import base64
import cv2
import io
import numpy as np
import torch

from PIL import Image
from torchvision.transforms import InterpolationMode, functional

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

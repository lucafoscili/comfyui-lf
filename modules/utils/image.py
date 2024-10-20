import base64
import cv2
import io
import numpy as np
import torch

from PIL import Image
from torchvision.transforms import InterpolationMode, functional

def clarity_effect(image_tensor, clarity_strength, sharpen_amount, blur_kernel_size):
    """
    Apply a clarity effect followed by sharpening on a given image tensor.

    Args:
        image_tensor (torch.Tensor): The input image tensor.
        clarity_strength (float): The strength of the clarity effect.
        sharpen_amount (float): The amount of sharpening to apply.
        blur_kernel_size (int): The size of the kernel to use for blurring.

    Returns:
        torch.Tensor: The resulting image tensor after applying the effects.
    """
    def apply_clarity(image, clarity_strength):
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

    image = tensor_to_numpy(image_tensor)
    clarity_image = apply_clarity(image, clarity_strength)
    final_image = apply_sharpen(clarity_image, sharpen_amount)
    final_tensor_image = numpy_to_tensor(final_image)

    return final_tensor_image


def numpy_to_tensor(numpy_array):
    """
    Convert a NumPy array to a PyTorch tensor.

    Args:
        numpy_array (numpy.ndarray): The input NumPy array representing the image.
            It should be a 2D array with shape [H, W, C] or a 3D array with shape [B, H, W, C].

    Returns:
        torch.Tensor: The converted PyTorch tensor.

    Raises:
        Exception: If there's an error during the conversion process.

    Notes:
        - If the input numpy_array is 3D, it will assume it's a batch of images.
        - The tensor values are automatically scaled from [0, 255] to [0, 1].
    """
    try:
        tensor = torch.from_numpy(numpy_array)

        if tensor.dim() == 3:
            tensor = tensor.unsqueeze(0)

        tensor = tensor.float() / 255.0

        return tensor
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

def tensor_to_bytes(tensor, format):
    """
    Convert the tensor to image bytes (JPEG or PNG).

    Args:
        tensor (torch.Tensor): The input tensor representing the image.
            It should be a 4D tensor with shape [B, H, W, C] or a 3D tensor with shape [H, W, C].
        format (string): The format of the image.
    """
    if isinstance(tensor, torch.Tensor):
        tensor = tensor.detach().cpu().numpy()
    
    if len(tensor.shape) == 4 and tensor.shape[0] == 1:
        tensor = tensor.squeeze(0)
    
    tensor = np.clip(tensor * 255, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(tensor)
    image_bytes = io.BytesIO()
    img.save(image_bytes, format)
    return image_bytes.getvalue()

def tensor_to_numpy(tensor):
    """
    Convert a PyTorch tensor to a NumPy array.

    Args:
        tensor (torch.Tensor): The input tensor representing the image.
            It should be a 4D tensor with shape [B, H, W, C] or a 3D tensor with shape [H, W, C].

    Returns:
        numpy.ndarray: The converted NumPy array.

    Raises:
        Exception: If there's an error during the conversion process.

    Notes:
        - If the input tensor is 4D, it will use the first image in the batch.
        - The tensor values are scaled from [0, 1] to [0, 255] and converted to uint8.
    """
    try:
        # Ensure that the tensor is 4D [B, H, W, C]
        if tensor.dim() == 4:
            tensor = tensor[0]  # Use the first image in the batch

        # Convert the tensor from [H, W, C] format
        numpy_array = tensor.cpu().numpy()  # Convert to a NumPy array
        numpy_array = (numpy_array * 255).astype("uint8")  # Convert to uint8

        return numpy_array
    except Exception as e:
        print(f"Error converting tensor to NumPy array: {e}")
        raise
    
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
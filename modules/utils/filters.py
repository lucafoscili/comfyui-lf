import cv2
import numpy as np
import torch

from PIL import Image, ImageFilter

from ..utils.helpers import hex_to_tuple, numpy_to_tensor, pil_to_tensor, tensor_to_numpy, tensor_to_pil

# region clarity_effect
def clarity_effect(image_tensor:torch.Tensor, clarity_strength:float, sharpen_amount:float, blur_kernel_size:int) -> torch.Tensor:
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
# endregion
# region desaturate_effect
def desaturate_effect(image: torch.Tensor, level: float) -> torch.Tensor:
    """
    Applies a desaturation effect to the input image tensor.
    Args:
        image (torch.Tensor): Input image tensor with shape (B, H, W, C).
        level (float): Desaturation level from 0.0 (no effect) to 1.0 (full grayscale).
    Returns:
        torch.Tensor: Processed image tensor with shape (B, H, W, C).
    """
    if image.ndim != 4 or image.shape[-1] != 3:
        raise ValueError("Input image must have shape (B, H, W, 3).")

    r, g, b = image[..., 0], image[..., 1], image[..., 2]

    gray_image = 0.299 * r + 0.587 * g + 0.114 * b

    gray_image_expanded = torch.stack([gray_image, gray_image, gray_image], dim=-1)

    desaturated_image = (1 - level) * image + level * gray_image_expanded

    return desaturated_image
# endregion
# region vignette_effect
def vignette_effect(
    image_tensor: torch.Tensor,
    intensity: float,
    radius: float,
    shape: str,
    color: str = '000000'
) -> torch.Tensor:
    """
    Apply a vignette effect to an image tensor with a specified color.

    Args:
        image_tensor (torch.Tensor): Input image tensor.
        intensity (float): Intensity of the vignette effect (0 to 1).
        radius (float): Size of the vignette effect (0 to 1). Lower values create a smaller vignette.
        shape (str): Shape of the vignette, either 'elliptical' or 'circular'.
        color (str): Color of the vignette effect (hex).

    Returns:
        torch.Tensor: Image tensor with the vignette effect applied.
    """
    pil_image = tensor_to_pil(image_tensor).convert('RGB')
    width, height = pil_image.size

    if not (0 < radius <= 1):
        raise ValueError("Radius must be between 0 and 1.")
    if not (0 <= intensity <= 1):
        raise ValueError("Intensity must be between 0 and 1.")
    if shape not in ['elliptical', 'circular']:
        raise ValueError("Shape must be 'elliptical' or 'circular'.")

    color = hex_to_tuple(color)
    x = np.linspace(-1, 1, width)
    y = np.linspace(-1, 1, height)
    xv, yv = np.meshgrid(x, y)

    if shape == "elliptical":
        distance = np.sqrt(xv**2 + yv**2)
    else:
        aspect_ratio = width / height
        xv_adjusted = xv * aspect_ratio
        distance = np.sqrt(xv_adjusted**2 + yv**2)

    distance = distance / distance.max()

    vignette_intensity = np.clip(
        255 * ((distance - radius) / (1 - radius)),
        0, 255
    ).astype(np.uint8)

    vignette_mask = Image.fromarray(vignette_intensity, mode='L')

    blur_radius = int(min(width, height) * (1 - radius) / 4)
    if blur_radius > 0:
        vignette_mask = vignette_mask.filter(ImageFilter.GaussianBlur(radius=blur_radius))

    overlay = Image.new('RGB', (width, height), color)

    output_image = Image.composite(overlay, pil_image, vignette_mask)

    output_image = Image.blend(pil_image, output_image, intensity)

    return pil_to_tensor(output_image)
# endregion
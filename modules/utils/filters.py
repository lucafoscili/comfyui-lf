import cv2
import numpy as np
import torch

from PIL import Image, ImageFilter
from scipy.interpolate import CubicSpline

from ..utils.helpers import hex_to_tuple, numpy_to_tensor, pil_to_tensor, tensor_to_numpy, tensor_to_pil

# region brightness_effect
def brightness_effect(image: torch.Tensor, brightness_strength: float, gamma: float, midpoint: float, localized_brightness: bool) -> torch.Tensor:
    """
    Adjusts the brightness of the input image tensor with gamma correction and optional localized enhancement.

    Args:
        image (torch.Tensor): Input image tensor with shape (1, H, W, C).
        brightness_strength (float): Brightness adjustment factor (-1 to 1).
        gamma (float): Gamma correction factor.
        midpoint (float): Tonal midpoint for brightness scaling.
        localized_brightness (bool): Whether to enhance brightness locally in darker regions.

    Returns:
        torch.Tensor: Adjusted image tensor with shape (1, H, W, C).
    """
    validate_image(image, expected_shape=(3,))

    image_np = tensor_to_numpy(image, True) / 255.0

    adjusted_image = midpoint + (image_np - midpoint) + brightness_strength

    adjusted_image = np.power(adjusted_image, gamma)

    if localized_brightness:
        gray = cv2.cvtColor((image_np * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY)
        darkness_map = 1 - (gray / 255.0)
        adjusted_image += darkness_map[:, :, np.newaxis] * 0.1
        adjusted_image = np.clip(adjusted_image, 0, 1)

    adjusted_image = np.clip(adjusted_image, 0, 1)

    final_tensor = torch.tensor(adjusted_image, dtype=image.dtype, device=image.device)

    return final_tensor
# endregion
# region clarity_effect
def clarity_effect(image: torch.Tensor, clarity_strength: float, sharpen_amount: float, blur_kernel_size: int) -> torch.Tensor:
    """
    Processes a single image tensor by applying clarity and sharpen effects.

    Args:
        image (torch.Tensor): The input image tensor.
        clarity_strength (float): The clarity effect strength.
        sharpen_amount (float): The sharpening amount.
        blur_kernel_size (int): The kernel size for blurring.

    Returns:
        torch.Tensor: The processed image tensor.
    """
    validate_image(image, expected_shape=(3,))

    image_np = tensor_to_numpy(image, True)

    l_channel, a_channel, b_channel = split_channels(image_np, color_space="LAB")

    blurred_l_channel = apply_gaussian_blur(l_channel, blur_kernel_size, sigma=0)
    laplacian = cv2.Laplacian(blurred_l_channel, cv2.CV_64F)
    enhanced_l_channel = np.clip(l_channel + clarity_strength * laplacian, 0, 255).astype(np.uint8)

    final_image = merge_channels((enhanced_l_channel, a_channel, b_channel), color_space="LAB")

    gaussian_blur = apply_gaussian_blur(final_image, kernel_size=9, sigma=10.0)
    final_image = cv2.addWeighted(final_image, 1.0 + sharpen_amount, gaussian_blur, -sharpen_amount, 0)

    return numpy_to_tensor(final_image)

# endregion
# region contrast_effect
def contrast_effect(image: torch.Tensor, contrast_strength: float, midpoint: float, localized_contrast: bool) -> torch.Tensor:
    """
    Adjusts the contrast of the input image tensor.

    Args:
        image (torch.Tensor): Input image tensor with shape (1, H, W, C).
        contrast_strength (float): Contrast adjustment factor (-1 to 1).
        midpoint (float): Tonal midpoint for contrast scaling.
        localized_contrast (bool): Whether to enhance contrast locally around edges.

    Returns:
        torch.Tensor: Contrast-adjusted image tensor with shape (1, H, W, C).
    """
    validate_image(image, expected_shape=(3,))

    image_np = tensor_to_numpy(image, True) / 255.0

    scale_factor = 1 + contrast_strength
    adjusted_image = midpoint + scale_factor * (image_np - midpoint)

    adjusted_image = np.clip(adjusted_image, 0, 1)

    if localized_contrast:
        gray = cv2.cvtColor((image_np * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY)
        edges = detect_edges(gray, method='sobel')

        edges_3ch = np.repeat(edges[:, :, np.newaxis], 3, axis=2) / 255.0
        edge_contrast_factor = abs(contrast_strength) * 0.1

        adjusted_image += edges_3ch * edge_contrast_factor
        adjusted_image = np.clip(adjusted_image, 0, 1)

    final_tensor = torch.tensor(adjusted_image, dtype=image.dtype, device=image.device)
    return final_tensor
# endregion
# region desaturate_effect
def desaturate_effect(image: torch.Tensor, global_level: float, channel_levels: list[float]) -> torch.Tensor:
    """
    Applies partial desaturation per channel to the input image tensor.

    Args:
        image (torch.Tensor): Input image tensor with shape (B, H, W, C).
        global_level (float): Global desaturation level (0.0 to 1.0).
        channel_levels (list[float]): List of desaturation levels for [R, G, B].

    Returns:
        torch.Tensor: Partially desaturated image tensor.
    """
    validate_image(image, expected_shape=(3,))

    r, g, b = image[..., 0], image[..., 1], image[..., 2]
    gray_image = 0.299 * r + 0.587 * g + 0.114 * b

    desaturated_r = (1 - (global_level * channel_levels[0])) * r + (global_level * channel_levels[0]) * gray_image
    desaturated_g = (1 - (global_level * channel_levels[1])) * g + (global_level * channel_levels[1]) * gray_image
    desaturated_b = (1 - (global_level * channel_levels[2])) * b + (global_level * channel_levels[2]) * gray_image

    return torch.stack([desaturated_r, desaturated_g, desaturated_b], dim=-1)
# endregion
# region line_effect
def line_effect(
    image: torch.Tensor,
    points: list[tuple],
    size: int,
    color: str,
    opacity: float,
    smooth: bool
) -> torch.Tensor:
    validate_image(image, expected_shape=(3,))

    device = image.device
    _, height, width, channels = image.shape

    # Convert color to RGB tensor
    rgb = torch.tensor([c / 255.0 for c in hex_to_tuple(color)], dtype=torch.float32, device=device)
    rgb = rgb.view(1, 1, channels)

    # Prepare alpha mask
    alpha_mask = torch.zeros((height, width), dtype=torch.float32, device=device)

    # Convert normalized points to pixel coordinates
    pixel_points = [(int(x * width), int(y * height)) for x, y in points]
    print("Pixel Points:", pixel_points)

    # Ensure valid brush size
    if size <= 0:
        raise ValueError("Brush size must be greater than 0.")
    radius_squared = (size / 2) ** 2

    # Draw either a straight line or a smooth curve
    if smooth:
        pixel_points = interpolate_curve(pixel_points)
    for x, y in pixel_points:
        x = max(0, min(int(x), width - 1))
        y = max(0, min(int(y), height - 1))

        # Distance calculation
        y_grid, x_grid = torch.meshgrid(
            torch.arange(height, dtype=torch.float32, device=device),
            torch.arange(width, dtype=torch.float32, device=device),
            indexing='ij'
        )
        dist_squared = (x_grid - x) ** 2 + (y_grid - y) ** 2
        print(f"Point ({x}, {y}), Dist Squared Min: {dist_squared.min().item()}, Max: {dist_squared.max().item()}")

        # Stroke mask
        stroke_mask = (dist_squared <= radius_squared).float() * opacity
        print(f"Stroke Mask Sum for Point ({x}, {y}):", stroke_mask.sum().item())
        alpha_mask = torch.clamp(alpha_mask + stroke_mask, max=1.0)

    # Debug alpha mask
    print("Alpha Mask Sum:", alpha_mask.sum().item())
    if alpha_mask.sum().item() == 0:
        raise ValueError("Alpha mask is empty!")

    # Blend the line/curve with the image
    blended_image = blend_with_alpha(image.squeeze(0), rgb, alpha_mask)
    print("Blended Image Min/Max:", blended_image.min().item(), blended_image.max().item())

    return blended_image.unsqueeze(0)
# endregion
# region gaussian_blur_effect
def gaussian_blur_effect(image: torch.Tensor, blur_kernel_size: int, blur_sigma: float) -> torch.Tensor:
    """
    Applies Gaussian Blur to an image tensor.

    Args:
        image (torch.Tensor): The input image tensor.
        blur_kernel_size (int): Kernel size for the Gaussian blur (must be odd).
        blur_sigma (float): Standard deviation of the Gaussian kernel.

    Returns:
        torch.Tensor: The blurred image tensor.
    """
    validate_image(image, expected_shape=(3,))

    image_np = tensor_to_numpy(image, True)

    blurred_image = apply_gaussian_blur(image_np, kernel_size=blur_kernel_size, sigma=blur_sigma)

    return numpy_to_tensor(blurred_image)
# endregion
# region vignette_effect
def vignette_effect(image: torch.Tensor, intensity: float, radius: float, shape: str, color: str = '000000') -> torch.Tensor:
    """
    Apply a vignette effect to an image tensor with a specified color.

    Args:
        image (torch.Tensor): Input image tensor.
        intensity (float): Intensity of the vignette effect (0 to 1).
        radius (float): Size of the vignette effect (0 to 1). Lower values create a smaller vignette.
        shape (str): Shape of the vignette, either 'elliptical' or 'circular'.
        color (str): Color of the vignette effect (hex).

    Returns:
        torch.Tensor: Image tensor with the vignette effect applied.
    """
    pil_image = tensor_to_pil(image).convert('RGB')
    width, height = pil_image.size

    color = hex_to_tuple(color)
    x = np.linspace(-1, 1, width)
    y = np.linspace(-1, 1, height)
    xv, yv = np.meshgrid(x, y)

    distance = np.sqrt(xv**2 + yv**2) if shape == "circular" else np.sqrt((xv * (width / height))**2 + yv**2)
    distance = distance / distance.max()

    vignette_intensity = np.clip(255 * ((distance - radius) / (1 - radius)), 0, 255).astype(np.uint8)
    vignette_mask = Image.fromarray(vignette_intensity, mode='L')

    vignette_mask = vignette_mask.filter(ImageFilter.GaussianBlur(radius=int(min(width, height) * (1 - radius) / 4)))

    overlay = Image.new('RGB', (width, height), color)
    output_image = Image.composite(overlay, pil_image, vignette_mask)
    output_image = Image.blend(pil_image, output_image, intensity)

    return pil_to_tensor(output_image)
# endregion

# region helpers
def apply_gaussian_blur(image: np.ndarray, kernel_size: int, sigma: float) -> np.ndarray:
    """
    Apply Gaussian blur to an image.

    Args:
        image (np.ndarray): Input image.
        kernel_size (int): Size of the kernel.
        sigma (float): Standard deviation of the Gaussian kernel.

    Returns:
        np.ndarray: Blurred image.
    """
    return cv2.GaussianBlur(image, (kernel_size, kernel_size), sigma)

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

def blend_with_alpha(image, rgb, alpha_mask):
    """
    Blend an RGB color with an image using an alpha mask.

    Args:
        image (torch.Tensor): The base image tensor.
        rgb (torch.Tensor): Tensor containing the RGB color to blend.
        alpha_mask (torch.Tensor): The alpha mask indicating blending proportions.

    Returns:
        torch.Tensor: The resulting blended image tensor.
    """
    blended_image = image * (1 - alpha_mask.unsqueeze(-1)) + rgb * alpha_mask.unsqueeze(-1)
    return blended_image

def detect_edges(image: np.ndarray, method: str = 'sobel', normalize: bool = True) -> np.ndarray:
    """
    Detect edges in an image using the specified method.

    Args:
        image (np.ndarray): Grayscale input image.
        method (str): Edge detection method ('sobel' or 'laplacian').
        normalize (bool): Whether to normalize the edge map to [0, 1].

    Returns:
        np.ndarray: Edge map of the input image.
    """
    if method == 'sobel':
        sobel_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)
        sobel_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=3)
        edges = np.sqrt(sobel_x**2 + sobel_y**2)
    elif method == 'laplacian':
        edges = cv2.Laplacian(image, cv2.CV_64F)
    else:
        raise ValueError(f"Unsupported edge detection method: {method}")
    
    if normalize:
        edges = edges / edges.max() if edges.max() != 0 else edges
    
    return edges

def draw_smooth_curve(alpha_mask, points, size, opacity, num_samples=200):
    """
    Draws a smooth curve through the given points on the alpha mask.

    Args:
        alpha_mask (torch.Tensor): Alpha mask to draw on.
        points (list[tuple]): List of (x, y) control points for the curve.
        size (int): Brush diameter in pixels.
        opacity (float): Opacity of the curve.
        num_samples (int): Number of points to sample along the curve.

    Returns:
        torch.Tensor: Updated alpha mask.
    """
    import numpy as np
    from scipy.interpolate import CubicSpline

    points = np.array(points)
    t = np.linspace(0, 1, len(points))
    spline_x = CubicSpline(t, points[:, 0])
    spline_y = CubicSpline(t, points[:, 1])

    t_new = np.linspace(0, 1, num_samples)
    curve_x = spline_x(t_new)
    curve_y = spline_y(t_new)

    for i in range(len(curve_x) - 1):
        x1, y1 = int(curve_x[i]), int(curve_y[i])
        x2, y2 = int(curve_x[i + 1]), int(curve_y[i + 1])
        alpha_mask = draw_straight_line(alpha_mask, x1, y1, x2, y2, size, opacity)

    return alpha_mask

def draw_straight_line(alpha_mask, x1, y1, x2, y2, size, opacity):
    """
    Draws a straight line between two points (x1, y1) and (x2, y2) on the alpha mask.

    Args:
        alpha_mask (torch.Tensor): Alpha mask to draw on.
        x1, y1, x2, y2 (int): Coordinates of the two points.
        size (int): Brush diameter in pixels.
        opacity (float): Opacity of the line.

    Returns:
        torch.Tensor: Updated alpha mask.
    """
    steps = max(abs(x2 - x1), abs(y2 - y1))
    xs = torch.linspace(x1, x2, steps, device=alpha_mask.device)
    ys = torch.linspace(y1, y2, steps, device=alpha_mask.device)

    for x, y in zip(xs, ys):
        x, y = int(x), int(y)
        y_grid, x_grid = torch.meshgrid(
            torch.arange(alpha_mask.shape[0], device=alpha_mask.device),
            torch.arange(alpha_mask.shape[1], device=alpha_mask.device),
            indexing='ij'
        )
        dist_squared = (x_grid - x) ** 2 + (y_grid - y) ** 2
        stroke_mask = (dist_squared <= (size / 2) ** 2).float() * opacity
        alpha_mask = torch.clamp(alpha_mask + stroke_mask, max=1.0)

    return alpha_mask

def interpolate_curve(points, num_samples=100):
    """
    Interpolates a smooth curve through given points using Catmull-Rom splines.
    Args:
        points (list[tuple]): List of (x, y) points.
        num_samples (int): Number of samples for the interpolated curve.
    Returns:
        list[tuple]: Interpolated points.
    """
    points = np.array(points)
    t = np.linspace(0, 1, len(points))

    spline_x = CubicSpline(t, points[:, 0], bc_type='clamped')
    spline_y = CubicSpline(t, points[:, 1], bc_type='clamped')

    distances = np.sqrt(np.sum(np.diff(points, axis=0) ** 2, axis=1))
    total_length = np.sum(distances)
    num_samples = max(num_samples, int(total_length * 200))

    t_new = np.linspace(0, 1, num_samples)
    return list(zip(spline_x(t_new), spline_y(t_new)))

def merge_channels(channels: tuple, color_space: str = 'RGB') -> np.ndarray:
    """
    Merge individual channels into an image.

    Args:
        channels (tuple): Individual image channels.
        color_space (str): The target color space ('RGB' or 'LAB').

    Returns:
        np.ndarray: Merged image.
    """
    if color_space == 'RGB':
        return cv2.merge(channels)
    elif color_space == 'LAB':
        merged_lab = cv2.merge(channels)
        return cv2.cvtColor(merged_lab, cv2.COLOR_LAB2BGR)
    else:
        raise ValueError(f"Unsupported color space: {color_space}")
    
def split_channels(image: np.ndarray, color_space: str = 'RGB') -> tuple:
    """
    Split image into individual channels.

    Args:
        image (np.ndarray): Input image.
        color_space (str): The color space of the input image ('RGB' or 'LAB').

    Returns:
        tuple: Splitted channels (e.g., R, G, B or L, A, B).
    """
    if color_space == 'RGB':
        return cv2.split(image)
    elif color_space == 'LAB':
        lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        return cv2.split(lab_image)
    else:
        raise ValueError(f"Unsupported color space: {color_space}")

def validate_image(image: torch.Tensor, expected_shape: tuple = (3,)) -> None:
    """
    Validate that the image tensor has the expected shape and dimensions.

    Args:
        image (torch.Tensor): Input image tensor.
        expected_shape (tuple): Expected shape of the image channels (e.g., 3 for RGB).

    Raises:
        ValueError: If the image doesn't match the expected dimensions.
    """
    if image.shape[0] != 1 or image.ndim != 4 or image.shape[-1] != expected_shape[0]:
        raise ValueError(f"Expected image shape (1, H, W, {expected_shape[0]}), got {image.shape}")
# endregion
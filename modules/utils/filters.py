import cv2
import numpy as np
import torch

from PIL import Image, ImageFilter
from scipy.interpolate import CubicSpline

from ..utils.helpers import hex_to_tuple, numpy_to_tensor, pil_to_tensor, tensor_to_numpy, tensor_to_pil

# region blend_effect
def blend_effect(image: torch.Tensor, overlay_image: torch.Tensor, alpha_mask: float) -> torch.Tensor:
    """
    Apply alpha blending between a base image and an overlay one.

    Args:
        image (torch.Tensor): Base image tensor. Shape: [1, H, W, C].
        overlay_image (torch.Tensor): Overlay image tensor to blend. Shape: [1, H, W, C].
        alpha_mask (float): Opacity for blending (0.0 to 1.0).

    Returns:
        torch.Tensor: Blended image tensor.
    """
    if image.shape != overlay_image.shape:
        _, base_h, base_w, _ = image.shape

        overlay_image: torch.Tensor = torch.nn.functional.interpolate(
            overlay_image.permute(0, 3, 1, 2),
            size=(base_h, base_w),
            mode='bilinear',
            align_corners=False
        ).permute(0, 2, 3, 1)

    alpha_tensor: torch.Tensor = torch.full_like(image[..., 0], alpha_mask).unsqueeze(-1)

    return blend_overlay(image, overlay_image, alpha_tensor)
# endregion

# region brightness_effect
def brightness_effect(image: torch.Tensor, brightness_strength: float, gamma: float, midpoint: float, localized_brightness: bool) -> torch.Tensor:
    """
    Adjusts the brightness of the input image tensor with gamma correction and optional localized enhancement.

    Args:
        image (torch.Tensor): Input image tensor with shape [1, H, W, C].
        brightness_strength (float): Brightness adjustment factor (-1 to 1).
        gamma (float): Gamma correction factor.
        midpoint (float): Tonal midpoint for brightness scaling.
        localized_brightness (bool): Whether to enhance brightness locally in darker regions.

    Returns:
        torch.Tensor: Adjusted image tensor with shape [1, H, W, C].
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
        image (torch.Tensor): Input image tensor with shape [1, H, W, C].
        contrast_strength (float): Contrast adjustment factor (-1 to 1).
        midpoint (float): Tonal midpoint for contrast scaling.
        localized_contrast (bool): Whether to enhance contrast locally around edges.

    Returns:
        torch.Tensor: Contrast-adjusted image tensor with shape [1, H, W, C].
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

# region film_grain_effect
def film_grain_effect(image: torch.Tensor, intensity: float = 0.5, size: float = 1.0, tint: str = "FFFFFF", soft_blend = False) -> torch.Tensor:
    """
    Adds a refined film grain effect to the given image with tint and soft blend options.

    Args:
        image: The input image. [1, H, W, C]
        intensity: A float between 0 and 1 controlling the grain's opacity.
        size: A float controlling the granularity of the grain (higher = coarser).
        tint: Hexadecimal color (default is FFFFFF for no tint).
        soft_blend: If True, uses a soft blending mode for the grain.

    Returns:
        The image with film grain applied. [1, H, W, C]
    """
def film_grain_effect(image: torch.Tensor, intensity: float = 0.5, size: float = 1.0, tint: str = "FFFFFF", soft_blend = False) -> torch.Tensor:
    """
    Adds a refined film grain effect to the given image with tint and soft blend options.

    Args:
        image: The input image. [1, H, W, C]
        intensity: A float between 0 and 1 controlling the grain's opacity.
        size: A float controlling the granularity of the grain (higher = coarser).
        tint: Hexadecimal color (default is FFFFFF for no tint).
        soft_blend: If True, uses a soft blending mode for the grain.

    Returns:
        The image with film grain applied. [1, H, W, C]
    """
    validate_image(image, expected_shape=(3,))

    np_image = tensor_to_numpy(image)
    height, width, channels = np_image.shape

    grain_height = max(1, int(height / size))
    grain_width = max(1, int(width / size))
    noise = np.random.normal(0, 1, (grain_height, grain_width, 1))

    noise = cv2.resize(noise, (width, height), interpolation=cv2.INTER_LINEAR)
    noise = np.expand_dims(noise, axis=-1)
    noise = np.repeat(noise, channels, axis=-1)

    noise = (noise - np.mean(noise)) / (np.std(noise) + 1e-8)
    noise = noise * 255 * intensity

    tint = tint.lstrip("#").upper()
    if tint != "FFFFFF":
        tuple_tint = hex_to_tuple(tint)
        tint_array = np.array(tuple_tint).reshape(1, 1, 3)
        noise = noise * 0.5 + tint_array * 0.5

    if soft_blend:
        grainy_image = 1 - (1 - np_image / 255) * (1 - noise / 255)
        grainy_image = grainy_image * 255
    else:
        grainy_image = np_image + noise

    grainy_image = np.clip(grainy_image, 0, 255)

    return numpy_to_tensor(grainy_image.astype(np.uint8))
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

# region line_effect
def line_effect(
    image: torch.Tensor,
    points: list[tuple],
    size: int,
    color: str,
    opacity: float,
    smooth: bool
) -> torch.Tensor:
    """
    Draws a straight line or smooth curve on an image tensor.

    Args:
        image (torch.Tensor): Input image tensor of shape [1, H, W, C], values in [0, 1].
        points (list[tuple]): List of normalized (x, y) points.
        size (int): Diameter of the line in pixels.
        color (str): Hex color of the line.
        opacity (float): Opacity of the line (0.0 to 1.0).
        smooth (bool): Whether to draw a smooth curve.

    Returns:
        torch.Tensor: Image tensor with the applied line/curve.
    """
    validate_image(image, expected_shape=(3,))

    device = image.device
    _, height, width, channels = image.shape

    rgb = torch.tensor([c / 255.0 for c in hex_to_tuple(color)], dtype=torch.float32, device=device)
    rgb = rgb.view(1, 1, channels)

    alpha_mask = torch.zeros((height, width), dtype=torch.float32, device=device)

    if smooth:
        if len(points) < 3:
            raise ValueError("Smooth curve requires at least 3 points.")
        start_point = points[0]
        end_point = points[-1]
        middle_index = len(points) // 2
        middle_point = points[middle_index]

        control_points = [start_point, middle_point, end_point]
    else:
        if len(points) < 2:
            raise ValueError("Straight line requires at least 2 points.")
        control_points = [points[0], points[-1]]

    pixel_points = [(int(x * width), int(y * height)) for x, y in control_points]

    if smooth:
        alpha_mask = draw_smooth_curve(alpha_mask, pixel_points, size, opacity)
    else:
        x1, y1 = pixel_points[0]
        x2, y2 = pixel_points[1]
        alpha_mask = draw_straight_line(alpha_mask, x1, y1, x2, y2, size, opacity)

    if alpha_mask.sum().item() == 0:
        raise ValueError("Alpha mask is empty!")

    blended_image = blend_with_alpha(image.squeeze(0), rgb, alpha_mask)
    return blended_image.unsqueeze(0)
# endregion

# region sepia_effect
def sepia_effect(image: torch.Tensor, intensity = 1.0):
    """
    Applies a sepia tone filter to the given image.

    Args:
        image: The input image. [1, H, W, C]
        intensity: A float between 0 and 1 for sepia intensity.

    Returns:
        The sepia-toned image. [1, H, W, C]
    """
    validate_image(image, expected_shape=(3,))

    np_image = tensor_to_numpy(image)

    sepia_filter = np.array([
        [0.393 + 0.607 * (1 - intensity), 0.769 - 0.769 * (1 - intensity), 0.189 - 0.189 * (1 - intensity)],
        [0.349 - 0.349 * (1 - intensity), 0.686 + 0.314 * (1 - intensity), 0.168 - 0.168 * (1 - intensity)],
        [0.272 - 0.272 * (1 - intensity), 0.534 - 0.534 * (1 - intensity), 0.131 + 0.869 * (1 - intensity)],
    ])

    sepia_image = np_image @ sepia_filter.T
    sepia_image = np.clip(sepia_image, 0, 255)

    return numpy_to_tensor(sepia_image.astype(np.uint8))
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

def blend_overlay(image: torch.Tensor, overlay: torch.Tensor, alpha_mask: torch.Tensor) -> torch.Tensor:
    """
    Blend an overlay image with a base image using an alpha mask.

    Args:
        image (torch.Tensor): The base image tensor. Shape: [1, H, W, 3].
        overlay (torch.Tensor): The overlay image tensor. Shape: [1, H, W, 3] or [1, H, W, 4].
        alpha_mask (torch.Tensor): The alpha mask tensor. Shape: [1, H, W, 1].

    Returns:
        torch.Tensor: The resulting blended image tensor. Shape: [1, H, W, 3].
    """
    if overlay.shape[-1] > image.shape[-1]:
        overlay_alpha = overlay[..., 3:4]
        overlay = overlay[..., :3]

        alpha_mask = alpha_mask * overlay_alpha

    elif overlay.shape[-1] < image.shape[-1]:
        raise ValueError(f"Overlay image has fewer channels ({overlay.shape[-1]}) than base image ({image.shape[-1]}).")

    if alpha_mask.dim() == 4 and alpha_mask.shape[-1] == 1:
        adjusted_alpha = alpha_mask
    elif alpha_mask.dim() == 3 and alpha_mask.shape[-1] == 1:
        adjusted_alpha = alpha_mask.unsqueeze(-1)
    elif alpha_mask.dim() == 3 and alpha_mask.shape[-1] != 1:
        raise ValueError(f"Alpha mask has unexpected shape: {alpha_mask.shape}")
    else:
        raise ValueError(f"Unsupported alpha_mask dimensions: {alpha_mask.dim()}")

    blended_image = image * (1 - adjusted_alpha) + overlay * adjusted_alpha
    return blended_image

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
    points = np.array(points)

    t = np.linspace(0, 1, len(points))
    spline_x = CubicSpline(t, points[:, 0], bc_type='clamped')
    spline_y = CubicSpline(t, points[:, 1], bc_type='clamped')

    distances = np.sqrt(np.sum(np.diff(points, axis=0) ** 2, axis=1))
    total_length = np.sum(distances)
    num_samples = max(num_samples, int(total_length * 50))

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
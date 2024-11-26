import os
import json
import os
import torch

from aiohttp import web
from PIL import Image

from server import PromptServer

from ..utils.constants import API_ROUTE_PREFIX
from ..utils.filters import brightness_effect, clarity_effect, contrast_effect, desaturate_effect, gaussian_blur_effect, line_effect, vignette_effect
from ..utils.helpers import convert_to_boolean, convert_to_float, convert_to_int, create_masonry_node, get_comfy_dir, get_resource_url, pil_to_tensor, resolve_filepath, resolve_url, tensor_to_pil

# region get-image
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/get-image")
async def get_images_in_directory(request):
    try:
        r: dict = await request.post()
        
        directory: str = r.get("directory")

        if (directory):
            images_dir = os.path.join(get_comfy_dir("input"), directory)
        else:
            images_dir = get_comfy_dir("input")
        if not os.path.exists(images_dir):
            return web.Response(status=404, text="Directory not found.")

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        for index, filename in enumerate(os.listdir(images_dir)):
            file_path = os.path.join(images_dir, filename)
            if os.path.isfile(file_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                url = get_resource_url(directory, filename, "input")
                nodes.append(create_masonry_node(filename, url, index))

        return web.json_response({
            "status": "success",
            "data": dataset
        }, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion
# region process-image
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/process-image")
async def process_image(request):
    try:
        r: dict = await request.post()

        api_url: str = r.get("url")
        filter_type: str = r.get("type")
        settings: dict = json.loads(r.get("settings"))

        filename, file_type, subfolder = resolve_url(api_url)

        if not filename or not file_type:
            return web.Response(status=400, text="Missing required URL parameters.")

        images_dir = os.path.join(get_comfy_dir(file_type), subfolder or "", filename)

        if not os.path.exists(images_dir):
            return web.Response(status=404, text="Image not found.")
        
        img_tensor = load_image_tensor(images_dir)

        if filter_type == "brightness":
            processed_tensor = apply_brightness_effect(img_tensor, settings)
        elif filter_type == "clarity":
            processed_tensor = apply_clarity_effect(img_tensor, settings)
        elif filter_type == "contrast":
            processed_tensor = apply_contrast_effect(img_tensor, settings)
        elif filter_type == "desaturate":
            processed_tensor = apply_desaturate_effect(img_tensor, settings)
        elif filter_type == "gaussian_blur":
            processed_tensor = apply_gaussian_blur_effect(img_tensor, settings)
        elif filter_type == "line":
            processed_tensor = apply_line_effect(img_tensor, settings)
        elif filter_type == "vignette":
            processed_tensor = apply_vignette_effect(img_tensor, settings)
        else:
            return web.Response(status=400, text=f"Unsupported filter type: {filter_type}")

        pil_image = tensor_to_pil(processed_tensor)
        output_file, subfolder, filename = resolve_filepath(filename_prefix=filter_type, image=img_tensor)
        pil_image.save(output_file, format="PNG")

        return web.json_response({
            "status": "success",
            "data": get_resource_url(subfolder, filename, "temp")
        }, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion

# region helpers
def apply_brightness_effect(img_tensor: torch.Tensor, settings: dict):
    brightness_strength = convert_to_float(settings.get("brightness_strength", 0))
    gamma = convert_to_float(settings.get("gamma", 0))
    midpoint = convert_to_float(settings.get("midpoint", 0))
    localized_brightness = convert_to_boolean(settings.get("localized_brightness", False))

    return brightness_effect(img_tensor, brightness_strength, gamma, midpoint, localized_brightness)


def apply_clarity_effect(img_tensor: torch.Tensor, settings: dict):
    clarity_strength = convert_to_float(settings.get("clarity_strength", 0))
    sharpen_amount = convert_to_float(settings.get("sharpen_amount", 0))
    blur_kernel_size = convert_to_int(settings.get("blur_kernel_size", 1))

    return clarity_effect(img_tensor, clarity_strength, sharpen_amount, blur_kernel_size)

def apply_contrast_effect(img_tensor: torch.Tensor, settings: dict):
    contrast_strength = convert_to_float(settings.get("contrast_strength", 0))
    midpoint = convert_to_float(settings.get("midpoint", 0))
    localized_contrast = convert_to_boolean(settings.get("localized_contrast", False))

    return contrast_effect(img_tensor, contrast_strength, midpoint, localized_contrast)

def apply_desaturate_effect(img_tensor: torch.Tensor, settings: dict):
    desaturation_strength = convert_to_float(settings.get("desaturation_strength", 0))
    r = convert_to_float(settings.get("r_channel", 1))
    g = convert_to_float(settings.get("g_channel", 1))
    b = convert_to_float(settings.get("b_channel", 1))

    return desaturate_effect(img_tensor, desaturation_strength, [r, g, b])

def apply_gaussian_blur_effect(img_tensor: torch.Tensor, settings: dict):
    blur_sigma = convert_to_float(settings.get("blur_sigma", 0))
    blur_kernel_size = convert_to_int(settings.get("blur_kernel_size", 1))

    return gaussian_blur_effect(img_tensor, blur_kernel_size, blur_sigma)

def apply_line_effect(img_tensor: torch.Tensor, settings: dict):
    points: list = settings.get("points", [])
    points: list[tuple] = [(point["x"], point["y"]) for point in points]
    
    size = convert_to_int(settings.get("size", 0))
    color: str = settings.get("color", "FF0000")
    opacity = convert_to_float(settings.get("opacity", 1))
    smooth = convert_to_boolean(settings.get("smoooth", False))

    return line_effect(img_tensor, points, size, color, opacity, smooth)

def apply_vignette_effect(img_tensor: torch.Tensor, settings: dict):
    intensity = convert_to_float(settings.get("intensity", 0))
    radius = convert_to_float(settings.get("radius", 0))
    shape: str = settings.get("shape", "elliptical")
    color: str = settings.get("color", "000000")

    return vignette_effect(img_tensor, intensity, radius, shape, color)  

def load_image_tensor(image_path: str) -> torch.Tensor:
    try:
        pil_image = Image.open(image_path).convert("RGB")
    except Exception as e:
        raise ValueError(f"Error opening image: {e}")

    img_tensor = pil_to_tensor(pil_image)

    return img_tensor
# endregion
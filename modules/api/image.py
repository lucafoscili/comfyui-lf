import os
import json
import os
import torch

from aiohttp import web
from PIL import Image

from server import PromptServer

from ..utils.constants import API_ROUTE_PREFIX
from ..utils.helpers import clarity_effect, create_masonry_node, get_comfy_dir, get_resource_url, pil_to_tensor, resolve_filepath, resolve_url, tensor_to_pil

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
async def get_images_in_directory(request):
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

        if filter_type == "clarity":
            processed_tensor = apply_clarity_effect(img_tensor, settings)
      # elif filter_type == "vignette":
      #      processed_tensor = apply_vignette_effect(img_tensor, settings)
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

def apply_clarity_effect(img_tensor: torch.Tensor, settings: dict):
    clarity_strength = float(settings.get("clarity_strength", 0.5))
    sharpen_amount = float(settings.get("sharpen_amount", 1.0))
    blur_kernel_size = int(settings.get("blur_kernel_size", 7))

    processed_tensor = clarity_effect(img_tensor, clarity_strength, sharpen_amount, blur_kernel_size)
    return processed_tensor

def load_image_tensor(image_path: str) -> torch.Tensor:
    try:
        pil_image = Image.open(image_path).convert("RGB")
    except Exception as e:
        raise ValueError(f"Error opening image: {e}")

    img_tensor = pil_to_tensor(pil_image)

    return img_tensor
# endregion
import os

from aiohttp import web

from server import PromptServer

from ..utils.constants import API_ROUTE_PREFIX
from ..utils.helpers import create_masonry_node, get_comfy_dir, get_resource_url

@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/get-image")
async def get_images_in_directory(request):
    try:
        r = await request.post()
        
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

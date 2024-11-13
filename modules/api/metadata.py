import base64
import json
import os
import requests

from aiohttp import web
from folder_paths import get_full_path

from ..utils.constants import API_ROUTE_PREFIX, BASE64_PNG_PREFIX
from ..utils.helpers import get_comfy_list

from server import PromptServer

# region clear-metadata
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/clear-metadata")
async def clear_model_info(_):
    try:
        directories = [
            ("checkpoints", get_comfy_list("checkpoints")),
            ("embeddings", get_comfy_list("embeddings")),
            ("loras", get_comfy_list("loras"))
        ]
        
        deleted_files: list = []
        
        for folder_name, directory in directories:
            for model_file in directory:
                model_full_path = get_full_path(folder_name, model_file)
                
                if model_full_path is None:
                    continue
                
                file_no_ext = os.path.splitext(model_full_path)[0]
                info_file_path = file_no_ext + ".info"
                
                if os.path.exists(info_file_path):
                    try:
                        os.remove(info_file_path)
                        deleted_files.append(info_file_path)
                    except Exception as e:
                        return web.Response(status=500, text=f"Failed to delete {info_file_path}: {str(e)}")

        return web.json_response({
            "status": "success", 
            "message": f"Deleted {len(deleted_files)} .info files.",
            "deleted_files": deleted_files
        }, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion
# region save-metadata
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/save-metadata")
async def save_model_info(request):
    try:
        r: dict = await request.post()
        
        metadata = r.get("metadata")
        model_path = r.get("model_path")
        forced_save = r.get("forced_save")

        if not model_path or not metadata:
            return web.Response(status=400, text="Missing 'model_path' or 'metadata'.")

        metadata_json = json.loads(metadata)
        image_url = metadata_json.get("nodes", [])[0].get("cells", {}).get("kulImage", {}).get("value")

        file_no_ext = os.path.splitext(model_path)[0]
        info_file_path = file_no_ext + ".info"

        if os.path.exists(info_file_path):
            if bool(forced_save):
                os.remove(info_file_path)
            else:
                return web.json_response({"status": "warning", "message": f"Metadata already saved at {info_file_path}."}, status=200)

        if image_url:
            try:
                image_data = requests.get(image_url).content
                image_base64 =  base64.b64encode(image_data).decode('utf-8')
                metadata_json["nodes"][0]["cells"]["kulImage"]["value"] = f"{BASE64_PNG_PREFIX}{image_base64}"
            except Exception as e:
                return web.Response(status=500, text=f"Error fetching image: {str(e)}")

        with open(info_file_path, "w") as info_file:
            json.dump(metadata_json, info_file, indent=4)

        return web.json_response({"status": "success", "message": f"Metadata saved at {info_file_path}."}, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion
# region update-metadata-cover
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/update-metadata-cover")
async def update_metadata_cover(request):
    try:
        r: dict = await request.post()
        
        model_path = r.get("model_path")
        base64_image = r.get("base64_image")
        
        if not model_path or not base64_image:
            return web.Response(status=400, text="Missing 'model_path' or 'base64_image'.")

        file_no_ext = os.path.splitext(model_path)[0]
        info_file_path = file_no_ext + ".info"

        if not os.path.exists(info_file_path):
            return web.Response(status=404, text="Metadata file not found.")

        with open(info_file_path, "r") as info_file:
            metadata_json = json.load(info_file)
        
        if "nodes" not in metadata_json or not metadata_json["nodes"]:
            metadata_json["nodes"] = [{}]
        
        if "cells" not in metadata_json["nodes"][0]:
            metadata_json["nodes"][0]["cells"] = {}
        
        kul_image_cell = metadata_json["nodes"][0]["cells"].get("kulImage", {})
        kul_image_cell["value"] = f"data:image/png;base64,{base64_image}"
        metadata_json["nodes"][0]["cells"]["kulImage"] = kul_image_cell

        with open(info_file_path, "w") as info_file:
            json.dump(metadata_json, info_file, indent=4)

        return web.json_response({"status": "success", "message": f"Cover updated in {info_file_path}."}, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion
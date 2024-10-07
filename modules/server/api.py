import base64
import json
import os
import requests

from aiohttp import web
from folder_paths import get_filename_list, get_full_path, input_directory

from server import PromptServer

@PromptServer.instance.routes.post("/comfyui-lf/save-model-info")
async def save_model_info(request):
    try:
        r = await request.post()
        
        metadata = r.get("metadata")
        model_path = r.get("model_path")

        if not model_path or not metadata:
            return web.Response(status=400, text="Missing 'model_path' or 'metadata'.")

        metadata_json = json.loads(metadata)
        image_url = metadata_json.get("nodes", [])[0].get("cells", {}).get("kulImage", {}).get("value")

        file_no_ext = os.path.splitext(model_path)[0]
        info_file_path = file_no_ext + ".info"

        if os.path.exists(info_file_path):
            return web.json_response({"status": "exists", "message": f"Metadata already saved at {info_file_path}."}, status=200)

        if image_url:
            try:
                image_data = requests.get(image_url).content
                image_base64 =  base64.b64encode(image_data).decode('utf-8')
                metadata_json["nodes"][0]["cells"]["kulImage"]["value"] = f"data:image/png;charset=utf-8;base64,{image_base64}"
            except Exception as e:
                return web.Response(status=500, text=f"Error fetching image: {str(e)}")

        with open(info_file_path, "w") as info_file:
            json.dump(metadata_json, info_file, indent=4)

        return web.json_response({"status": "success", "message": f"Metadata saved at {info_file_path}."}, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")

@PromptServer.instance.routes.post("/comfyui-lf/clear-model-info")
async def clear_model_info(request):
    try:
        directories = [
            ("checkpoints", get_filename_list("checkpoints")),
            ("embeddings", get_filename_list("embeddings")),
            ("loras", get_filename_list("loras"))
        ]
        
        deleted_files = []
        
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

@PromptServer.instance.routes.get("/comfyui-lf/get-usage-analytics")
async def get_usage_analytics(response):
    try:
        analytics_dir = os.path.join(input_directory, "LF_Nodes")
        
        if not os.path.exists(analytics_dir):
            return web.Response(status=404, text="Directory not found.")

        analytics_data = {}

        for filename in os.listdir(analytics_dir):
            if filename.endswith(".json"):
                file_path = os.path.join(analytics_dir, filename)
                try:
                    with open(file_path, 'r') as file:
                        data = json.load(file)
                        analytics_data[filename] = data
                except Exception as e:
                    return web.Response(status=500, text=f"Failed to read {filename}: {str(e)}")

        return web.json_response({
            "status": "success",
            "data": analytics_data
        }, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")

@PromptServer.instance.routes.post("/comfyui-lf/clear-usage-analytics")
async def clear_usage_analytics(request):
    try:
        analytics_dir = os.path.join(input_directory, "LF_Nodes")
        
        deleted_files = []
        
        for file_name in os.listdir(analytics_dir):
            if "usage.json" in file_name:
                full_path = os.path.join(analytics_dir, file_name)
                
                if os.path.exists(full_path):
                    try:
                        os.remove(full_path)
                        deleted_files.append(full_path)
                    except Exception as e:
                        print(f"Failed to delete {full_path}: {str(e)}")
        
        return web.json_response({
            "status": "success",
            "message": f"Deleted {len(deleted_files)} usage.json files.",
            "deleted_files": deleted_files
        }, status=200)
    
    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")

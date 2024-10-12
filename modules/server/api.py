import base64
import json
import os
import requests
import shutil

from aiohttp import web
from datetime import datetime
from folder_paths import get_filename_list, get_full_path, user_directory

from server import PromptServer

backup_folder_name = "Backups"
base_path = os.path.join(user_directory, "LF_Nodes")

@PromptServer.instance.routes.post("/comfyui-lf/clear-analytics")
async def clear_usage_analytics(request):
    try:
        r = await request.post()
        
        analytics_type = r.get("type")

        if not analytics_type:
            return web.Response(status=404, text=f"Missing type (received {analytics_type}).")
        
        deleted_files = []
        
        for root, _, files in os.walk(base_path):
            if backup_folder_name in root:
                continue
            
            for file_name in files:
                if f"{analytics_type}.json" in file_name:
                    full_path = os.path.join(root, file_name)
                    
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

@PromptServer.instance.routes.post("/comfyui-lf/clear-metadata")
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

@PromptServer.instance.routes.post("/comfyui-lf/get-analytics")
async def get_usage_analytics(request):
    try:
        r = await request.post()
        
        directory = r.get("directory")
        analytics_type = r.get("type")

        if not directory or not analytics_type:
            return web.Response(status=500, text=f"Missing directory (received {directory}) or type (received {analytics_type}).")

        analytics_dir = os.path.join(base_path, directory)
        
        if not os.path.exists(analytics_dir):
            return web.Response(status=404, text="Directory not found.")

        analytics_data = {}

        for filename in os.listdir(analytics_dir):
            if filename.endswith(f"{analytics_type}.json"):
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

@PromptServer.instance.routes.post("/comfyui-lf/new-backup")
async def backup_usage_analytics(request):
    try:
        backups_path = os.path.join(base_path, backup_folder_name)
        os.makedirs(backups_path, exist_ok=True)
        
        r = await request.post()
        backup_type = r.get('backup_type', 'automatic')
        
        if backup_type == 'automatic':
            for folder_name in os.listdir(backups_path):
                if folder_name.startswith('automatic_'):
                    folder_date_str = folder_name.split('_')[1]
                    folder_date = datetime.strptime(folder_date_str, '%Y%m%d')
                    
                    if folder_date.date() == datetime.now().date():
                        return web.json_response({
                            "status": "success",
                            "message": "Automatic backup already created today."
                        }, status=200)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_folder = os.path.join(backups_path, f"{backup_type}_{timestamp}")
        os.makedirs(backup_folder, exist_ok=True)
        
        models_backup_folder = os.path.join(backup_folder, "models")
        analytics_backup_folder = os.path.join(backup_folder, "analytics")
        os.makedirs(models_backup_folder, exist_ok=True)
        os.makedirs(analytics_backup_folder, exist_ok=True)
        
        backed_up_files = []

        directories = [
            ("checkpoints", get_filename_list("checkpoints")),
            ("embeddings", get_filename_list("embeddings")),
            ("loras", get_filename_list("loras"))
        ]
        
        for folder_name, directory in directories:
            model_subfolder = os.path.join(models_backup_folder, folder_name)
            os.makedirs(model_subfolder, exist_ok=True)

            for model_file in directory:
                model_full_path = get_full_path(folder_name, model_file)
                
                if model_full_path is None:
                    continue
                
                file_no_ext = os.path.splitext(model_full_path)[0]
                info_file_path = file_no_ext + ".info"
                
                if os.path.exists(info_file_path):
                    backup_path = os.path.join(model_subfolder, os.path.basename(info_file_path))
                    
                    shutil.copy2(info_file_path, backup_path)
                    backed_up_files.append(backup_path)

        for root, _, files in os.walk(base_path):
            if backup_folder_name in root:
                continue
            
            for file_name in files:
                full_path = os.path.join(root, file_name)
                
                if os.path.exists(full_path) and file_name.endswith(".json"):
                    relative_path = os.path.relpath(full_path, base_path)
                    backup_path = os.path.join(analytics_backup_folder, relative_path)
                    backup_dir = os.path.dirname(backup_path)
                    
                    os.makedirs(backup_dir, exist_ok=True)
                    
                    shutil.copy2(full_path, backup_path)
                    backed_up_files.append(backup_path)
        
        return web.json_response({
            "status": "success",
            "message": f"{backup_type.capitalize()} backup created with {len(backed_up_files)} files.",
            "backup_folder": backup_folder,
            "backed_up_files": backed_up_files
        }, status=200)
    
    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")

@PromptServer.instance.routes.post("/comfyui-lf/save-metadata")
async def save_model_info(request):
    try:
        r = await request.post()
        
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
                metadata_json["nodes"][0]["cells"]["kulImage"]["value"] = f"data:image/png;charset=utf-8;base64,{image_base64}"
            except Exception as e:
                return web.Response(status=500, text=f"Error fetching image: {str(e)}")

        with open(info_file_path, "w") as info_file:
            json.dump(metadata_json, info_file, indent=4)

        return web.json_response({"status": "success", "message": f"Metadata saved at {info_file_path}."}, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
import os
import shutil

from aiohttp import web
from datetime import datetime
from folder_paths import get_full_path

from server import PromptServer

from ..utils.constants import API_ROUTE_PREFIX, BACKUP_FOLDER
from ..utils.helpers import get_comfy_dir, get_comfy_list

@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/new-backup")
async def backup_usage_analytics(request):
    try:
        os.makedirs(get_comfy_dir("backup"), exist_ok=True)
        
        r = await request.post()
        backup_type = r.get('backup_type', 'automatic')
        
        if backup_type == 'automatic':
            for folder_name in os.listdir(get_comfy_dir("backup")):
                if folder_name.startswith('automatic_'):
                    folder_date_str = folder_name.split('_')[1]
                    folder_date = datetime.strptime(folder_date_str, '%Y%m%d')
                    
                    if folder_date.date() == datetime.now().date():
                        return web.json_response({
                            "status": "success",
                            "message": "Automatic backup already created today."
                        }, status=200)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_folder = os.path.join(get_comfy_dir("backup"), f"{backup_type}_{timestamp}")
        os.makedirs(backup_folder, exist_ok=True)
        
        models_backup_folder = os.path.join(backup_folder, "models")
        analytics_backup_folder = os.path.join(backup_folder, "analytics")
        workflows_backup_folder = os.path.join(backup_folder, "workflows")
        os.makedirs(models_backup_folder, exist_ok=True)
        os.makedirs(analytics_backup_folder, exist_ok=True)
        os.makedirs(workflows_backup_folder, exist_ok=True)
        
        backed_up_files = []

        directories = [
            ("checkpoints", get_comfy_list("checkpoints")),
            ("embeddings", get_comfy_list("embeddings")),
            ("loras", get_comfy_list("loras"))
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

        for root, _, files in os.walk(get_comfy_dir("base")):
            if BACKUP_FOLDER in root:
                continue
            
            for file_name in files:
                full_path = os.path.join(root, file_name)
                
                if os.path.exists(full_path) and file_name.endswith(".json"):
                    relative_path = os.path.relpath(full_path, get_comfy_dir("base"))
                    backup_path = os.path.join(analytics_backup_folder, relative_path)
                    backup_dir = os.path.dirname(backup_path)
                    
                    os.makedirs(backup_dir, exist_ok=True)
                    
                    shutil.copy2(full_path, backup_path)
                    backed_up_files.append(backup_path)

        workflows_dir = os.path.join(get_comfy_dir("user"), "default", "workflows")
        if os.path.exists(workflows_dir):
            for root, _, files in os.walk(workflows_dir):
                for file_name in files:
                    workflow_path = os.path.join(root, file_name)
                    if os.path.isfile(workflow_path):
                        relative_path = os.path.relpath(workflow_path, workflows_dir)
                        backup_path = os.path.join(workflows_backup_folder, relative_path)
                        backup_dir = os.path.dirname(backup_path)
                        os.makedirs(backup_dir, exist_ok=True)
                        
                        shutil.copy2(workflow_path, backup_path)
                        backed_up_files.append(backup_path)

        return web.json_response({
            "status": "success",
            "message": f"{backup_type.capitalize()} backup created with {len(backed_up_files)} files.",
            "backup_folder": backup_folder,
            "backed_up_files": backed_up_files
        }, status=200)
    
    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")

import json
import os

from aiohttp import web

from server import PromptServer

from ..constants.common import *

@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/clear-analytics")
async def clear_usage_analytics(request):
    try:
        r = await request.post()
        
        analytics_type = r.get("type")

        if not analytics_type:
            return web.Response(status=404, text=f"Missing type (received {analytics_type}).")
        
        deleted_files = []
        
        for root, _, files in os.walk(BASE_PATH):
            if BACKUP_FOLDER in root:
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

@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/get-analytics")
async def get_usage_analytics(request):
    try:
        r = await request.post()
        
        directory = r.get("directory")
        analytics_type = r.get("type")

        if not directory or not analytics_type:
            return web.Response(status=500, text=f"Missing directory (received {directory}) or type (received {analytics_type}).")

        analytics_dir = os.path.join(BASE_PATH, directory)
        
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
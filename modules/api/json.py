import os
import json
from aiohttp import web

from server import PromptServer
from ..utils.constants import API_ROUTE_PREFIX

# region get-json
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/get-json")
async def get_json_data(request):
    try:
        r: dict = await request.post()
        
        file_path: str = r.get("file_path")

        if not file_path or not os.path.exists(file_path):
            return web.Response(status=404, text="JSON file not found.")
        
        with open(file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)

        return web.json_response({
            "status": "success",
            "data": data
        }, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion
# region update-json
@PromptServer.instance.routes.post(f"{API_ROUTE_PREFIX}/update-json")
async def update_json_data(request):
    try:
        r: dict = await request.post()
        
        file_path: str = r.get("file_path")
        new_data: dict = json.loads(r.get("dataset"))

        if not file_path or not os.path.exists(file_path):
            return web.Response(status=404, text="JSON file not found.")
        
        with open(file_path, 'w', encoding='utf-8') as json_file:
            json.dump(new_data, json_file, ensure_ascii=False, indent=4)
        
        return web.json_response({
            "status": "success",
            "message": "JSON data updated successfully."
        }, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")
# endregion
import json
import os
from aiohttp import web
from server import PromptServer

@PromptServer.instance.routes.post("/comfyui-lf/save-model-info")
async def save_model_info(request):
    try:
        r = await request.post()
        
        metadata = r.get("metadata")
        model_path = r.get("model_path")

        if not model_path or not metadata:
            return web.Response(status=400, text="Missing 'model_path' or 'metadata'.")

        # Generate .info file path (remove extension and add `.info`)
        file_no_ext = os.path.splitext(model_path)[0]
        info_file_path = file_no_ext + ".info"

        # Check if .info file already exists
        if os.path.exists(info_file_path):
            return web.json_response({"status": "exists", "message": f"Metadata already saved at {info_file_path}."}, status=200)

        # Save the incoming metadata to the .info file
        with open(info_file_path, "w") as info_file:
            info_file.write(metadata)

        return web.json_response({"status": "saved", "message": f"Metadata saved at {info_file_path}."}, status=200)

    except Exception as e:
        return web.Response(status=500, text=f"Error: {str(e)}")

import json
import random
import requests

import folder_paths
import comfy.utils

category = "LF Nodes/JSON"

class LoadLocalJSON:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"default": ""}),
            },
        }

    RETURN_TYPES = ("JSON")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "load_json"

    def load_json(self, url: str):
        if url.startswith("file://"):
            file_path = requests.utils.unquote(url[7:])
            with open(file_path, 'r') as file:
                data = json.load(file)

        return (data)

class GetRandomKeyFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "json": ("JSON",),
            }
        }

    RETURN_TYPES = ("STRING",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_random_key_from_json"
    OUTPUT_NODE = True

    def get_random_key_from_json(self, json: dict, seed: int):
        random.seed(seed)
        keys = list(json.keys())
        selected_key = random.choice(keys)
        print("Selected Key:", selected_key)  # Debugging line to confirm the selected key
        return (selected_key,)

NODE_CLASS_MAPPINGS = {
    "LoadLocalJSON": LoadLocalJSON,
    "GetRandomKeyFromJSON": GetRandomKeyFromJSON,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LoadLocalJSON": "Load local JSON",
    "GetRandomKeyFromJSON": "Get Random Key From JSON",
}

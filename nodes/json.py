import json
import random
import requests
from server import PromptServer

category = "LF Nodes/JSON"

class LF_DisplayJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("JSON",),
            },
            "hidden": { "node_id": "UNIQUE_ID" } 
        }        

    CATEGORY = "LF Nodes/JSON"
    FUNCTION = "display_json"
    RETURN_TYPES = ()
    OUTPUT_NODE = True

    def display_json(self, json:dict, node_id):
        PromptServer.instance.send_sync("lf-displayjson", {
            "node": node_id, 
            "json": json
        })
        return {}

class LF_GetRandomKeyFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
                "json": ("JSON",),
            }
        }

    RETURN_TYPES = ("STRING",)
    CATEGORY = category
    FUNCTION = "get_random_key_from_json"

    def get_random_key_from_json(self, json: dict, seed: int):
        random.seed(seed)
        keys = list(json.keys())
        selected_key = random.choice(keys)
        print("Selected Key:", selected_key)  # Debugging line to confirm the selected key
        return (selected_key,)
    
class LF_GetValueFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("JSON", {"label": "JSON Object"}),
                "key": ("STRING", {"label": "Key to select"})
            }
        }

    RETURN_TYPES = ("JSON", "STRING", "NUMBER", "INT", "FLOAT", "BOOLEAN")
    RETURN_NAMES = ("json_output", "string_output", "number_output", "int_output", "float_output", "boolean_output")
    CATEGORY = category
    FUNCTION = "get_value_from_json"

    def get_value_from_json(self, json: dict, key: str):
        # Extract the value associated with the specified key
        value = json.get(key, None)

        # Initialize outputs with coherent values based on the type of 'value'
        json_output = None
        string_output = None
        number_output = None
        int_output = None
        float_output = None
        boolean_output = None

        if value is not None:
            # If the value is a dictionary, pass it as-is for JSON output
            if isinstance(value, dict):
                json_output = value
            else:
                # For non-dictionary types, create a new JSON object with "value" as key and the actual value as value
                json_output = {"value": value}
            
            # Convert the value to a string
            string_output = str(value)
            
            # Attempt to convert string representations of numbers to actual numbers
            if isinstance(value, str):
                try:
                    # Try to convert the string to a float first
                    numeric_value = float(value)
                    number_output = numeric_value
                    float_output = numeric_value
                    int_output = round(numeric_value) if numeric_value.is_integer() else None
                    boolean_output = numeric_value > 0
                except ValueError:
                    # If it's not a number, leave number_output, int_output, and float_output as None
                    pass
            elif isinstance(value, (int, float)):
                number_output = value
                float_output = float(value)
                int_output = round(value) if isinstance(value, float) else value
                boolean_output = value > 0  # True if positive, False if zero or negative
            elif isinstance(value, bool):
                boolean_output = value
            # For non-numeric types, ensure numeric outputs are set to None
            else:
                number_output = None
                int_output = None
                float_output = None

        return (json_output, string_output, number_output, int_output, float_output, boolean_output)

class LF_LoadLocalJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "url": ("STRING", {"default": ""}),
            },
        }

    RETURN_TYPES = ("JSON",)
    CATEGORY =  category
    FUNCTION = "load_json"

    def load_json(self, url: str):
        if url.startswith("file://"):
            file_path = requests.utils.unquote(url[7:])
            with open(file_path, 'r') as file:
                data = json.load(file)

        return (data,)

NODE_CLASS_MAPPINGS = {
    "LF_DisplayJSON": LF_DisplayJSON,
    "LF_GetRandomKeyFromJSON": LF_GetRandomKeyFromJSON,
    "LF_GetValueFromJSON": LF_GetValueFromJSON,
    "LF_LoadLocalJSON": LF_LoadLocalJSON,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_DisplayJSON": "Display JSON",
    "LF_GetRandomKeyFromJSON": "Get Random Key From JSON",
    "LF_GetValueFromJSON": "Get Value from JSON",
    "LF_LoadLocalJSON": "Load local JSON",
}

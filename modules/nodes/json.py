import json
import random

from ..utils.io import image_to_base64
from ..utils.json import *

from server import PromptServer

category = "✨ LF Nodes/JSON"

class LF_DisplayJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("JSON", { "tooltip": "JSON object to display."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" } 
        }        

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, json:dict, node_id):

        PromptServer.instance.send_sync("lf-displayjson", {
            "node": node_id, 
            "json": json
        })
        
        return (json, )

class LF_GetRandomKeyFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "The seed for the random pick."}),
                "json": ("JSON", { "tooltip": "JSON object from which a random key will be picked."},),
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("STRING",)

    def on_exec(self, json: dict, seed: int):
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
                "json": ("JSON", {"tooltip": "JSON Object."}),
                "key": ("STRING", {"tooltip": "Key to select."})
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("json_output", "string_output", "number_output", "int_output", "float_output", "boolean_output")
    RETURN_TYPES = ("JSON", "STRING", "NUMBER", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, json: dict, key: str):
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
    
class LF_ImageListFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "Input JSON containing keys to determine batch size."}),
                "add_noise": ("BOOLEAN", {"default": True, "tooltip": "Add noise to the images."}),
                "width": ("INT", {"default": 1024, "min": 1, "max": 4096, "tooltip": "Width of the images."}),
                "height": ("INT", {"default": 1024, "min": 1, "max": 4096, "tooltip": "Height of the images."}),
                "seed": ("INT", {"default": 42, "tooltip": "Seed for generating random noise."}),
                "previews": ("KUL_IMAGE_PREVIEW_B64", {}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_IS_LIST = (True, True, False, False, False)
    RETURN_NAMES = ("images", "keys", "nr", "width", "height")
    RETURN_TYPES = ("IMAGE", "STRING", "INT", "INT", "INT")

    def on_exec(self, **kwargs):
        node_id = kwargs["node_id"]
        json_input = kwargs["json_input"]
        add_noise = kwargs["add_noise"]
        width = kwargs["width"]
        height = kwargs["height"]
        seed = kwargs["seed"]

        keys = list(json_input.keys())
        num_images = len(keys)
        image_batch = []

        np.random.seed(seed)

        image_batch = []
        for _ in range(num_images):
            if add_noise:
                image = create_noisy_image(width, height)
            else:
                image = create_blank_image(width, height)
            image_batch.append(image)

        PromptServer.instance.send_sync("lf-imagelistfromjson", {
            "node": node_id,
            "fileNames": keys,
            "images": image_to_base64(image_batch)
        })

        images = pil_batch_to_tensor_bhwc(image_batch)

        return (images, keys, num_images, width, height)
    
class LF_KeywordToggleFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "Ketchup Lite compatible JSON dataset."}),
                "separator": ("STRING", {"default": ", ", "tooltip": "Separator for keywords in the output prompt."}),
                "chip": ("KUL_CHIP", {"tooltip": "Your custom chip widget."})
            }
        }
    
    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("json_output", "keywords_output")
    RETURN_TYPES = ("JSON", "STRING")

    def on_exec(self, json_input, separator: str, chip:str):
        selected_keywords = chip.split(", ")

        filtered_json = {
            "nodes": [
                node for node in json_input["nodes"]
                if node["id"] in selected_keywords
            ]
        }

        keyword_values = [node["value"] for node in filtered_json["nodes"]]
        keywords_output = separator.join(keyword_values)

        return (filtered_json, keywords_output)

class LF_SetValueInJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("JSON", {"tooltip": "JSON Object."}),
                "key": ("STRING", {"tooltip": "Key to update or insert."}),
                "value": ("STRING", {"tooltip": "Value to set."}),
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("json_output",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, json: dict, key: str, value: str):
        if isinstance(json, dict):
            json[key] = value
        elif isinstance(json, list):
            for json_obj in json:
                if isinstance(json_obj, dict):
                    json_obj[key] = value
                else:
                    raise TypeError(f"Expected a dictionary inside the list, but got {type(json_obj)}")
        else:
            raise TypeError(f"Unsupported input type for 'json': {type(json)}")

        return (json,)

class LF_StringToJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "{}", "multiline": True, "tooltip": "Stringified JSON"}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = True
    OUTPUT_NODE = True
    RETURN_TYPES = ("JSON",)

    def on_exec(self, string: str, node_id: str):
        try:
            if isinstance(string, str):
                json_data = json.loads(string)
            elif isinstance(string, list):
                json_data = [json.loads(s) for s in string]
            else:
                raise TypeError(f"Unsupported input type: {type(string)}")

            return (json_data,)

        except json.JSONDecodeError as e:
            error_message = f"Invalid JSON: {str(e)}"
            PromptServer.instance.send_sync("lf-stringtojson-error", {
                "node": node_id,
                "error": error_message
            })
            return None

        except Exception as e:
            error_message = f"Unexpected error: {str(e)}"
            PromptServer.instance.send_sync("lf-stringtojson-error", {
                "node": node_id,
                "error": error_message
            })
            return None

class LF_WriteJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "KUL_JSON_INPUT": ("KUL_JSON_INPUT", {"default": "{}", "multiline": True, "tooltip": "Write your JSON content here."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_TYPES = ("JSON",)

    def on_exec(self, KUL_JSON_INPUT: str, node_id: str):
        try:
            json_data = json.loads(KUL_JSON_INPUT)
            PromptServer.instance.send_sync("lf-writejson", {
                "node": node_id,
                "json": json_data
            })
            return (json_data,)
        
        except json.JSONDecodeError as e:
            error_message = f"Invalid JSON: {str(e)}"
            PromptServer.instance.send_sync("lf-writejson-error", {
                "node": node_id,
                "error": error_message
            })
            return None
        
        except Exception as e:
            error_message = f"Unexpected error: {str(e)}"
            PromptServer.instance.send_sync("lf-writejson-error", {
                "node": node_id,
                "error": error_message
            })
            return None

NODE_CLASS_MAPPINGS = {
    "LF_DisplayJSON": LF_DisplayJSON,
    "LF_GetRandomKeyFromJSON": LF_GetRandomKeyFromJSON,
    "LF_GetValueFromJSON": LF_GetValueFromJSON,
    "LF_ImageListFromJSON": LF_ImageListFromJSON,
    "LF_KeywordToggleFromJSON": LF_KeywordToggleFromJSON,
    "LF_SetValueInJSON": LF_SetValueInJSON,
    "LF_StringToJSON": LF_StringToJSON,
    "LF_WriteJSON": LF_WriteJSON
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_DisplayJSON": "Display JSON",
    "LF_GetRandomKeyFromJSON": "Get Random Key From JSON",
    "LF_GetValueFromJSON": "Get Value from JSON",
    "LF_ImageListFromJSON": "Image list from JSON",
    "LF_KeywordToggleFromJSON": "Keyword toggle from JSON",
    "LF_SetValueInJSON" : "Set/Create a Value in a JSON Object",
    "LF_StringToJSON": "Convert string to JSON",
    "LF_WriteJSON": "Write JSON"
}

import ast
import json
import random

from ..utils.io import image_to_base64
from ..utils.json import *
from ..utils.primitives import convert_to_json

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
                "key": ("STRING", {"default": "", "tooltip": "Key to select."}),
                "index": ("INT", {"default": 0, "tooltip": "When the input is a list of JSON objects, it sets the index of the occurrence from which the value is extracted."})
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("json_output", "string_output", "number_output", "int_output", "float_output", "boolean_output")
    RETURN_TYPES = ("JSON", "STRING", "NUMBER", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, json: dict, key: str, index: int):
        if isinstance(json, list):
            length = len(json)
            json = json[index] if index < length else json[length - 1]

        value = json.get(key, None)

        json_output = None
        string_output = None
        number_output = None
        int_output = None
        float_output = None
        boolean_output = None

        if value is not None:
            if isinstance(value, dict):
                json_output = value
            else:
                json_output = {"value": value}
            
            string_output = str(value)
            
            if isinstance(value, str):
                try:
                    numeric_value = float(value)
                    number_output = numeric_value
                    float_output = numeric_value
                    int_output = round(numeric_value) if numeric_value.is_integer() else None
                    boolean_output = numeric_value > 0
                except ValueError:
                    pass
            elif isinstance(value, (int, float)):
                number_output = value
                float_output = float(value)
                int_output = round(value) if isinstance(value, float) else value
                boolean_output = value > 0
            elif isinstance(value, bool):
                boolean_output = value
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
                "value": ("STRING", {"tooltip": "Value to set. Can be a list in string form."}),
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, False, True)
    RETURN_NAMES = ("json_output",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, json: dict, key: str, value: str):
        key = key[0] if isinstance(key, list) else key
        json = json[0] if isinstance(json, list) and len(json) == 1 else json
        value = value[0] if isinstance(value, list) and len(value) == 1 else value
        try:
            parsed_value = ast.literal_eval(value)
            if not isinstance(parsed_value, (list, dict)):
                parsed_value = value
        except (ValueError, SyntaxError):
            parsed_value = value

        if isinstance(json, dict):
            json[key] = parsed_value

        elif isinstance(json, list):
            for json_obj in json:
                if isinstance(json_obj, dict):
                    json_obj[key] = parsed_value
                else:
                    raise TypeError(f"Expected a dictionary inside the list, but got {type(json_obj)}")

        else:
            raise TypeError(f"Unsupported input type for 'json': {type(json)}")

        return (json,)

class LF_ShuffleJSONKeys:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("JSON", {"tooltip": "Input JSON object."}),
                "mutate_source": ("BOOLEAN", {"default": False, "tooltip": "Shuffles the input JSON in place without creating a new dictionary as a copy."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed for the random shuffle."})
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("shuffled_json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id, json: dict, mutate_source: bool, seed: int):
        if isinstance(json, str):
            json = convert_to_json(json)
        random.seed(seed)

        if mutate_source:
            items = {key: json[key] for key in json}
            json.clear()
            keys = list(items.keys())
            random.shuffle(keys)
            for key in keys:
                json[key] = items[key]
            shuffled_json = json
        else:
            keys = list(json.keys())
            random.shuffle(keys)
            shuffled_json = {key: json[key] for key in keys}

        PromptServer.instance.send_sync("lf-shufflejsonkeys", {
            "node": node_id,
            "json": shuffled_json
        })

        return (shuffled_json,)

class LF_SortJSONKeys:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("JSON", {"tooltip": "Input JSON object."}),
                "ascending": ("BOOLEAN", {"default": True, "tooltip": "Sort ascending (True) or descending (False)."}),
                "mutate_source": ("BOOLEAN", {"default": False, "tooltip": "Sorts the input JSON in place without creating a new dictionary as a copy."})
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("sorted_json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id, json: dict, ascending: bool, mutate_source: bool):
        if isinstance(json, str):
            json = convert_to_json(json)
            
        if mutate_source:
            items = {key: json[key] for key in json}
            json.clear()
            for key in sorted(items.keys(), reverse=not ascending):
                json[key] = items[key]
            sorted_json = json
        else:
            sorted_json = {k: json[k] for k in sorted(json.keys(), reverse=not ascending)}

        PromptServer.instance.send_sync("lf-sortjsonkeys", {
            "node": node_id,
            "json": sorted_json
        })

        return (sorted_json,)
    
class LF_StringToJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "{}", "multiline": True, "tooltip": "Stringified JSON"}),
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, )
    OUTPUT_NODE = True
    RETURN_TYPES = ("JSON",)

    def on_exec(self, string: str):
        if isinstance(string, str):
            json_data = json.loads(string)
        elif isinstance(string, list):
            if len(string) > 1:
                json_data = [json.loads(s) for s in string]
            else:
                json_data = json.loads(string[0])
        else:
            raise TypeError(f"Unsupported input type: {type(string)}")
        
        return (json_data,)

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

    def on_exec(self, KUL_JSON_INPUT: str | dict, node_id: str):
        if isinstance(KUL_JSON_INPUT, str):
            json_data = json.loads(KUL_JSON_INPUT)
        else:
            json_data = KUL_JSON_INPUT

        PromptServer.instance.send_sync("lf-writejson", {
            "node": node_id,
            "json": json_data
        })

        return (json_data,)

NODE_CLASS_MAPPINGS = {
    "LF_DisplayJSON": LF_DisplayJSON,
    "LF_GetRandomKeyFromJSON": LF_GetRandomKeyFromJSON,
    "LF_GetValueFromJSON": LF_GetValueFromJSON,
    "LF_ImageListFromJSON": LF_ImageListFromJSON,
    "LF_KeywordToggleFromJSON": LF_KeywordToggleFromJSON,
    "LF_SetValueInJSON": LF_SetValueInJSON,
    "LF_ShuffleJSONKeys": LF_ShuffleJSONKeys,
    "LF_SortJSONKeys": LF_SortJSONKeys,
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
    "LF_ShuffleJSONKeys": "Shuffle JSON keys",
    "LF_SortJSONKeys": "Sort JSON keys",
    "LF_StringToJSON": "Convert string to JSON",
    "LF_WriteJSON": "Write JSON"
}

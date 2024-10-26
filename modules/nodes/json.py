import ast
import random

from ..utils.constants import *
from ..utils.helpers import *
from ..utils.image import pil_to_tensor
from ..utils.io import image_to_base64
from ..utils.json import *

from server import PromptServer

CATEGORY = f"{CATEGORY_PREFIX}/JSON"

# region LF_DisplayJSON
class LF_DisplayJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", { "tooltip": "JSON object to display."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            } 
        }        

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id:str, json_input:dict):

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayjson", {
            "node": node_id, 
            "json": json_input
        })
        
        return (json_input,)
# endregion
# region LF_GetRandomKeyFromJSON
class LF_GetRandomKeyFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": INT_MAX, "tooltip": "The seed for the random pick."}),
                "json_input": ("JSON", { "tooltip": "JSON object from which a random key will be picked."},),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id:str, json_input:dict, seed:int):
        json_input = normalize_json_input(json_input)

        random.seed(seed)
        keys = list(json_input.keys())
        selected_key = random.choice(keys)
        return (selected_key,)
# endregion
# region LF_GetValueFromJSON
class LF_GetValueFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "JSON Object."}),
                "key": ("STRING", {"default": "", "tooltip": "Key to select."}),
                "index": ("INT", {"default": 0, "tooltip": "When the input is a list of JSON objects, it sets the index of the occurrence from which the value is extracted."})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("json", "string", "number", "int", "float", "boolean")
    RETURN_TYPES = ("JSON", "STRING", "NUMBER", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, node_id:str, json_input:dict, key:str, index:int):
        json_input = normalize_json_input(json_input)

        value = json_input.get(key, None)

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
# endregion
# region LF_ImageListFromJSON
class LF_ImageListFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "Input JSON containing keys to determine batch size."}),
                "add_noise": ("BOOLEAN", {"default": True, "tooltip": "Add noise to the images."}),
                "width": ("INT", {"default": 1024, "tooltip": "Width of the images."}),
                "height": ("INT", {"default": 1024, "tooltip": "Height of the images."}),
                "seed": ("INT", {"default": 42, "tooltip": "Seed for generating random noise."}),
                "previews": ("KUL_IMAGE_PREVIEW_B64", {}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True, True, False, False, False)
    RETURN_NAMES = ("image", "image_list", "keys", "nr", "width", "height")
    RETURN_TYPES = ("IMAGE", "IMAGE", "STRING", "INT", "INT", "INT")

    def on_exec(self, **kwargs:dict):
        node_id:str = kwargs.get("node_id")
        json_input:dict = normalize_json_input(kwargs.get("json_input"))
        add_noise:bool = normalize_list_to_value(kwargs.get("add_noise"))
        width:int = normalize_list_to_value(kwargs.get("width"))
        height:int = normalize_list_to_value(kwargs.get("height"))
        seed:int = normalize_list_to_value(kwargs.get("seed"))

        keys = list(json_input.keys())
        num_images = len(keys)

        np.random.seed(seed)

        pil_batch = []
        for _ in range(num_images):
            if add_noise:
                image = Image.fromarray(np.random.randint(0, 256, (height, width, 3), dtype=np.uint8))
            else:
                image = Image.new('RGB', (width, height), color='white')
        pil_batch.append(image)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}imagelistfromjson", {
            "node": node_id,
            "fileNames": keys,
            "images": image_to_base64(pil_batch)
        })

        tensor_list = []
        for img in pil_batch:
            tensor_list.append(pil_to_tensor(img))

        image_batch, image_list = normalize_output_image(tensor_list)

        return (image_batch[0], image_list, keys, num_images, width, height)
# endregion
# region LF_KeywordToggleFromJSON
class LF_KeywordToggleFromJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "Ketchup Lite compatible JSON dataset."}),
                "separator": ("STRING", {"default": ", ", "tooltip": "Separator for keywords in the output prompt."}),
                "chip": ("KUL_CHIP", {"tooltip": "Your custom chip widget."})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, False, True)
    RETURN_NAMES = ("json", "keywords", "keywords_list")
    RETURN_TYPES = ("JSON", "STRING", "STRING")

    def on_exec(self, json_input:dict, separator: str, chip:str):
        selected_keywords = chip.split(", ")

        filtered_json = {
            "nodes": [
                node for node in json_input["nodes"]
                if node["id"] in selected_keywords
            ]
        }

        keyword_values = [node["value"] for node in filtered_json["nodes"]]
        keywords_output = separator.join(keyword_values)

        return (filtered_json, keywords_output, keyword_values)
# endregion
# region LF_SetValueInJSON
class LF_SetValueInJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "JSON Object."}),
                "key": ("STRING", {"tooltip": "Key to update or insert."}),
                "value": ("STRING", {"tooltip": "Value to set. Can be a list in string form."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, False, True)
    RETURN_NAMES = ("json_output",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id:str, json_input:dict, key:str, value:str):
        json_input = normalize_json_input(json_input)
        key = normalize_list_to_value(key)
        value = normalize_input_list(value)

        try:
            parsed_value = ast.literal_eval(value)
            if not isinstance(parsed_value, (list, dict)):
                parsed_value = value
        except (ValueError, SyntaxError):
            parsed_value = value

        if isinstance(json_input, dict):
            json_input[key] = parsed_value

        elif isinstance(json_input, list):
            for json_obj in json_input:
                if isinstance(json_obj, dict):
                    json_obj[key] = parsed_value
                else:
                    raise TypeError(f"Expected a dictionary inside the list, but got {type(json_obj)}")
        else:
            raise TypeError(f"Unsupported input type for 'json': {type(json_input)}")

        return (json_input,)
# endregion
# region LF_ShuffleJSONKeys
class LF_ShuffleJSONKeys:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "Input JSON object."}),
                "mutate_source": ("BOOLEAN", {"default": False, "tooltip": "Shuffles the input JSON in place without creating a new dictionary as a copy."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": INT_MAX, "tooltip": "Seed for the random shuffle."})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id:str, json_input:dict, mutate_source:bool, seed:int):
        json_input = normalize_json_input(json_input)

        random.seed(seed)

        if mutate_source:
            items = {key: json_input[key] for key in json_input}
            json_input.clear()
            keys = list(items.keys())
            random.shuffle(keys)
            for key in keys:
                json_input[key] = items[key]
            shuffled_json = json_input
        else:
            keys = list(json_input.keys())
            random.shuffle(keys)
            shuffled_json = {key: json_input[key] for key in keys}

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}shufflejsonkeys", {
            "node": node_id,
            "json": shuffled_json
        })

        return (shuffled_json,)
# endregion
# region LF_SortJSONKeys
class LF_SortJSONKeys:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("JSON", {"tooltip": "Input JSON object."}),
                "ascending": ("BOOLEAN", {"default": True, "tooltip": "Sort ascending (True) or descending (False)."}),
                "mutate_source": ("BOOLEAN", {"default": False, "tooltip": "Sorts the input JSON in place without creating a new dictionary as a copy."})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id:str, json_input:dict, ascending:bool, mutate_source:bool):
        json_input = normalize_json_input(json_input)
            
        if mutate_source:
            items = {key: json_input[key] for key in json_input}
            json_input.clear()
            for key in sorted(items.keys(), reverse=not ascending):
                json_input[key] = items[key]
            sorted_json = json_input
        else:
            sorted_json = {k: json_input[k] for k in sorted(json_input.keys(), reverse=not ascending)}

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}sortjsonkeys", {
            "node": node_id,
            "json": sorted_json
        })

        return (sorted_json,)
# endregion
# region LF_StringToJSON
class LF_StringToJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "{}", "multiline": True, "tooltip": "Stringified JSON"}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id:str, string:str):
        return (normalize_json_input(string),)
# endregion
# region LF_WriteJSON
class LF_WriteJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_input": ("KUL_JSON_INPUT", {"default": "{}", "multiline": True, "tooltip": "Write your JSON content here."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id: str, json_input:dict):
        json_input = normalize_json_input(json_input)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}writejson", {
            "node": node_id,
            "json": json_input
        })

        return (json_input,)
# endregion
# region Mappings
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
# endregion
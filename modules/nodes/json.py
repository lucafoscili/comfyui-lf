import numpy as np
import random

from ..utils.constants import ANY, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, Input, INT_MAX
from ..utils.helpers import create_masonry_node, get_resource_url, normalize_input_list, normalize_list_item, normalize_output_image, numpy_to_tensor, normalize_list_to_value, normalize_json_input, resolve_filepath, tensor_to_pil

from server import PromptServer

CATEGORY = f"{CATEGORY_PREFIX}/JSON"

# region LF_DisplayJSON
class LF_DisplayJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, { 
                    "tooltip": "JSON object to display."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
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

    def on_exec(self, **kwargs: dict):
        json_input: dict = normalize_json_input(kwargs.get("json_input"))

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayjson", {
            "node": kwargs.get("node_id"),
            "value": json_input,
        })
        
        return (json_input,)
# endregion
# region LF_GetRandomKeyFromJSON
class LF_GetRandomKeyFromJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "seed": (Input.INTEGER, {
                    "default": 0, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "The seed for the random pick."
                }),
                "json_input": (Input.JSON, { 
                    "tooltip": "JSON object from which a random key will be picked."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, **kwargs: dict):
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        json_input: dict = normalize_json_input(kwargs.get("json_input"))

        random.seed(seed)
        keys = list(json_input.keys())
        selected_key = random.choice(keys)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}getrandomkeyfromjson", {
            "node": kwargs.get("node_id"),
            "value": f"## Selected key\n{selected_key}\n\n## Content:\n{json_input.get(selected_key)}",
        })

        return (selected_key,)
# endregion
# region LF_GetValueFromJSON
class LF_GetValueFromJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, {
                    "tooltip": "JSON Object."
                }),
                "key": (Input.STRING, {
                    "default": "", 
                    "tooltip": "Key to select."
                }),
                "index": (Input.INTEGER, {
                    "default": 0, 
                    "tooltip": "When the input is a list of JSON objects, it sets the index of the occurrence from which the value is extracted."
                })
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("json", "string", "number", "int", "float", "boolean")
    RETURN_TYPES = ("JSON", "STRING", "NUMBER", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, **kwargs: dict):
        key: str = normalize_list_to_value(kwargs.get("key"))
        index: int = normalize_list_to_value(kwargs.get("index"))
        json_input: dict = normalize_json_input(kwargs.get("json_input", {}))

        if isinstance(json_input, list):
            length = len(json_input)
            json_input = json_input[index] if index < length else json_input[length - 1]

        value = json_input.get(key, None)

        json_output = None
        string_output = None
        number_output = None
        int_output = None
        float_output = None
        boolean_output = None

        if value is not None:
            if isinstance(value, dict) or isinstance(value, list):
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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}getvaluefromjson", {
            "node": kwargs.get("node_id"),
            "value": f"## Selected key\n{key}\n\n## Content:\n{string_output}",
        })

        return (json_output, string_output, number_output, int_output, float_output, boolean_output)
# endregion
# region LF_ImageListFromJSON
class LF_ImageListFromJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, {
                    "tooltip": "Input JSON containing keys to determine batch size."
                }),
                "add_noise": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Add noise to the images."
                }),
                "width": (Input.INTEGER, {
                    "default": 1024, 
                    "tooltip": "Width of the images."
                }),
                "height": (Input.INTEGER, {
                    "default": 1024, 
                    "tooltip": "Height of the images."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "tooltip": "Seed for generating random noise."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_MASONRY, { 
                    "default": {} 
                }),
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

    def on_exec(self, **kwargs: dict):
        json_input: dict = normalize_json_input(kwargs.get("json_input"))
        add_noise: bool = normalize_list_to_value(kwargs.get("add_noise"))
        width: int = normalize_list_to_value(kwargs.get("width"))
        height: int = normalize_list_to_value(kwargs.get("height"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))

        nodes = []
        dataset = { "nodes": nodes }

        keys = list(json_input.keys())
        num_images = len(keys)

        np.random.seed(seed)

        image = []
        for index in range(num_images):

            if add_noise:
                img = numpy_to_tensor(np.random.randint(0, 256, (height, width, 3), dtype=np.uint8))
            else:
                img = numpy_to_tensor(np.full((height, width, 3), 255, dtype=np.uint8))

            pil_img = tensor_to_pil(img)

            output_file, subfolder, filename = resolve_filepath(
                filename_prefix="jsonimage_",
                image=img
            )
            url = get_resource_url(subfolder, filename, "temp")
            pil_img.save(output_file, format="PNG")
            
            image.append(img)
            nodes.append(create_masonry_node(filename, url, index))


        PromptServer.instance.send_sync(f"{EVENT_PREFIX}imagelistfromjson", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        image_batch, image_list = normalize_output_image(image)

        return (image_batch[0], image_list, keys, num_images, width, height)

# endregion
# region LF_KeywordToggleFromJSON
class LF_KeywordToggleFromJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, {
                    "tooltip": "Ketchup Lite compatible JSON dataset."
                }),
                "separator": (Input.STRING, {
                    "default": ", ", "tooltip": "Separator for keywords in the output prompt."
                }),
                "ui_widget": ("KUL_CHIP", {
                    "default": ""
                })
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

    def on_exec(self, **kwargs: dict):
        json_input: dict = normalize_json_input(kwargs.get("json_input"))
        separator: str = normalize_list_to_value(kwargs.get("separator"))
        ui_widget: str = normalize_list_to_value(kwargs.get("ui_widget", ""))

        selected_keywords = ui_widget.split(", ")

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
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, {
                    "tooltip": "JSON Object."
                }),
                "key": (Input.STRING, {
                    "tooltip": "Key to update or insert."
                }),
                "value": (ANY, {
                    "tooltip": "Value to set."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (False, False, True)
    RETURN_NAMES = ("json", "json_list")
    RETURN_TYPES = ("JSON", "JSON")

    def on_exec(self, **kwargs: dict):
        json_input: dict = normalize_json_input(kwargs.get("json_input"))
        key: str = normalize_list_to_value(kwargs.get("key"))
        value = normalize_input_list(kwargs.get("value"))
    
        log = f"## Updated key\n{key}\n\n## Content:\n"
    
        if isinstance(json_input, list):
            for index, item in enumerate(json_input):
                v = normalize_list_item(value, index)
                if isinstance(item, dict):
                    item[key] = v
                    log += f"\n[{index}]: {v}"
                elif isinstance(item, list):
                    for sub_index, sub_item in enumerate(item):
                        if isinstance(sub_item, dict):
                            sub_item[key] = v
                            log += f"\n[{index}][{sub_index}]: {v}"
                else:
                    log += f"\n[{index}]: Could not update non-dict item."
    
            PromptServer.instance.send_sync(f"{EVENT_PREFIX}setvalueinjson", {
                "node": kwargs.get("node_id"),
                "value": log
            })
        else:
            json_input[key] = value
            log += f"\n{value}"
    
            PromptServer.instance.send_sync(f"{EVENT_PREFIX}setvalueinjson", {
                "node": kwargs.get("node_id"),
                "value": log
            })
    
        s = json_input[0] if isinstance(json_input, list) and len(json_input) == 1 else json_input
    
        return (s, json_input)
# endregion
# region LF_ShuffleJSONKeys
class LF_ShuffleJSONKeys:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, {
                    "tooltip": "Input JSON object."
                }),
                "mutate_source": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Shuffles the input JSON in place without creating a new dictionary as a copy."
                }),
                "seed": (Input.INTEGER, {
                    "default": 0, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed for the random shuffle."
                })
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
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

    def on_exec(self, **kwargs: dict):
        json_input: dict = normalize_json_input(kwargs.get("json_input"))
        mutate_source: bool = normalize_list_to_value(kwargs.get("mutate_source"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))

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
            "node": kwargs.get("node_id"),
            "value": shuffled_json,
        })

        return (shuffled_json,)
# endregion
# region LF_SortJSONKeys
class LF_SortJSONKeys:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "json_input": (Input.JSON, {
                    "tooltip": "Input JSON object."
                }),
                "ascending": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Sort ascending (True) or descending (False)."
                }),
                "mutate_source": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Sorts the input JSON in place without creating a new dictionary as a copy."
                })
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
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

    def on_exec(self, **kwargs: dict):
        json_input: dict = normalize_json_input(kwargs.get("json_input"))
        mutate_source: bool = normalize_list_to_value(kwargs.get("mutate_source"))
        ascending: bool = normalize_list_to_value(kwargs.get("ascending"))
            
        if mutate_source:
            items = {key: json_input[key] for key in json_input}
            json_input.clear()
            for key in sorted(items.keys(), reverse=not ascending):
                json_input[key] = items[key]
            sorted_json = json_input
        else:
            sorted_json = {k: json_input[k] for k in sorted(json_input.keys(), reverse=not ascending)}

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}sortjsonkeys", {
            "node": kwargs.get("node_id"),
            "value": sorted_json,
        })

        return (sorted_json,)
# endregion
# region LF_StringToJSON
class LF_StringToJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "string": (Input.STRING, {
                    "default": "{}", 
                    "multiline": True, 
                    "tooltip": "Stringified JSON"
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, { 
                    "default": "" 
                }),
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

    def on_exec(self, **kwargs: dict):
        json_data: dict = normalize_json_input(kwargs.get("string"))

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}stringtojson", {
            "node": kwargs.get("node_id"),
            "value": kwargs.get("string"),
        })

        return (json_data,)
# endregion
# region LF_WriteJSON
class LF_WriteJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "ui_widget": ("KUL_TEXTAREA", {
                    "default": "{}", 
                    "tooltip": "Write your JSON content here."
                }),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_TYPES = ("JSON",)

    def on_exec(self, **kwargs: dict):
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}writejson", {
            "node": kwargs.get("node_id"),
            "value": ui_widget,
        })

        return (ui_widget,)
# endregion
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
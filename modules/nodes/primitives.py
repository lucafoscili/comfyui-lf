import random

from itertools import combinations

from server import PromptServer

from ..utils.constants import *
from ..utils.helpers import *
from ..utils.primitives import *

CATEGORY = f"{CATEGORY_PREFIX}/Primitives"
    
# region LF_Boolean
class LF_Boolean:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id:str, boolean:bool, enable_history:bool):
        boolean = normalize_list_to_value(boolean)
        enable_history = normalize_list_to_value(enable_history)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}boolean", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": boolean,
        })

        return (boolean,)
# endregion
# region LF_DisplayBoolean
class LF_DisplayBoolean:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False, "forceInput": True, "tooltip": "Boolean value."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id:str, boolean:bool):
        display_boolean = normalize_input_list(boolean)

        if len(display_boolean) > 1:
            markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_boolean))
        else:
            markdown_value = str(display_boolean[0]) 
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayboolean", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (boolean,)
# endregion
# region LF_DisplayFloat
class LF_DisplayFloat:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": ("FLOAT", {"default": 0, "forceInput": True, "tooltip": "Float value."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def on_exec(self, node_id:str, float:float):
        display_float = normalize_input_list(float)

        if len(display_float) > 1:
            markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_float))
        else:
            markdown_value = str(display_float[0]) 
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayfloat", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (float,)
# endregion
# region LF_DisplayInteger
class LF_DisplayInteger:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "integer": ("INT", {"default": 0, "forceInput": True, "tooltip": "Integer value."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("integer",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, node_id:str, integer:int):
        display_integer = normalize_input_list(integer)

        if len(display_integer) > 1:
            markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_integer))
        else:
            markdown_value = str(display_integer[0]) 
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayinteger", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (integer,)
# endregion
# region LF_DisplayPrimitiveAsJSON
class LF_DisplayPrimitiveAsJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("KUL_CODE", {}),
            },
            "optional": {
                "integer": ("INT", {"default": 0, "forceInput": True, "max": INT_MAX, "tooltip": "Integer value."}),
                "float": ("FLOAT", {"default": 0.0, "forceInput": True, "step": 0.1, "tooltip": "Float value."}),
                "string": ("STRING", {"default": "", "forceInput": True, "multiline": True, "tooltip": "String value."}),
                "boolean": ("BOOLEAN", {"default": False, "forceInput": True, "tooltip": "Boolean value."}),
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

    def on_exec(self, **kwargs):
        integer_list = normalize_input_list(kwargs.get("integer"))
        float_list = normalize_input_list(kwargs.get("float"))
        string_list = normalize_input_list(kwargs.get("string"))
        boolean_list = normalize_input_list(kwargs.get("boolean"))

        nodes = []
        dataset = {"nodes": nodes}

        if boolean_list:
            for idx, value in enumerate(boolean_list):
                nodes.append({
                    "children": [{"id": f"boolean_{idx}", "value": str(value)}],
                    "description": str(value), "id": f"boolean_{idx}", "value": "boolean"
                })
        
        if float_list:
            for idx, value in enumerate(float_list):
                nodes.append({
                    "children": [{"id": f"float_{idx}", "value": str(value)}],
                    "description": str(value), "id": f"float_{idx}", "value": "float"
                })
        
        if integer_list:
            for idx, value in enumerate(integer_list):
                nodes.append({
                    "children": [{"id": f"integer_{idx}", "value": str(value)}],
                    "description": str(value), "id": f"integer_{idx}", "value": "integer"
                })
        
        if string_list:
            for idx, value in enumerate(string_list):
                nodes.append({
                    "children": [{"id": f"string_{idx}", "value": value}],
                    "description": value, "id": f"string_{idx}", "value": "string"
                })

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayprimitiveasjson", {
            "node": kwargs.get("node_id"),
            "dataset": dataset
        })

        return (dataset,)
# endregion
# region LF_DisplayString
class LF_DisplayString:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "", "forceInput": True, "tooltip": "String value."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id:str, string:str):
        display_string = normalize_input_list(string)

        if len(display_string) > 1:
            markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_string))
        else:
            markdown_value = display_string[0]
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displaystring", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (string,)
# endregion
# region LF_Extractor
class LF_Extractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": "", "multiline": True, "tooltip": "The string from which the output will be extracted."}),
                "starting_delimiter": ("STRING", {"default": "{", "tooltip": "The delimiter where extraction starts."}),
                "ending_delimiter": ("STRING", {"default": "}", "tooltip": "The delimiter where extraction ends."}),
                "result": ("KUL_CODE", {"tooltip": "Extracted string."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("result_as_json", "extracted_text", "result_as_int", "result_as_float", "result_as_boolean")
    RETURN_TYPES = ("JSON", "STRING", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, **kwargs):
        text = normalize_list_to_value(kwargs.get("text"))
        starting_delimiter = normalize_list_to_value(kwargs.get("starting_delimiter"))
        ending_delimiter = normalize_list_to_value(kwargs.get("ending_delimiter"))

        extracted_text = extract_nested(text, starting_delimiter, ending_delimiter)
        
        result_as_json = convert_to_json(extracted_text)
        result_as_int = convert_to_int(extracted_text)
        result_as_float = convert_to_float(extracted_text)
        result_as_boolean = convert_to_boolean(extracted_text)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}extractor", {
            "node": kwargs.get("node_id"),
            "result": extracted_text,
        })
        
        return (result_as_json, extracted_text, result_as_int, result_as_float, result_as_boolean)
# endregion
# region LF_Float
class LF_Float:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": ("FLOAT", {"default": 0, "step": 0.1, "tooltip": "Float value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def on_exec(self, node_id:str, float:float, enable_history:bool):
        float = normalize_list_to_value(float)
        enable_history = normalize_list_to_value(enable_history)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}float", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": float,
        })

        return (float,)
# endregion
# region LF_Integer
class LF_Integer:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "integer": ("INT", {"default": 0, "max": INT_MAX, "tooltip": "Integer value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("int",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, node_id:str, integer:int, enable_history:bool):
        integer = normalize_list_to_value(integer)
        enable_history = normalize_list_to_value(enable_history)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}integer", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": integer,
        })

        return (integer,)
# endregion
# region LF_RandomBoolean
class LF_RandomBoolean:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "chance_true": ("FLOAT", {"default": 50.0, "step": 1, "min": 0, "max": 100, "tooltip": "Percentage chance for True output, 0-100."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id:str, chance_true:float):
        chance_true = max(0, min(100, chance_true))
        random_value = random.uniform(0, 100)

        result = random_value <= chance_true

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}randomboolean", {
            "node": node_id, 
            "bool": result,
            "chanceTrue": chance_true,
            "roll": random_value,
        })

        return (result,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")
# endregion
# region LF_Something2Number
class LF_Something2Number:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "JSON": ("JSON", {"tooltip": "JSON value to convert to numbers."}),
                "boolean": ("BOOLEAN", {"tooltip": "Boolean value to convert to numbers."}),
                "string": ("STRING", {"tooltip": "String value to convert to numbers."}),
                "integer": ("INT", {"tooltip": "Integer value to convert to numbers."}),
                "float": ("FLOAT", {"tooltip": "Float value to convert to numbers."})
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, False, True, True)
    RETURN_NAMES = ("float_sum", "integer_sum", "float_list", "integer_list")
    RETURN_TYPES = ("FLOAT", "INT", "FLOAT", "INT")

    def on_exec(self, **kwargs):
        float_values = []
        integer_values = []

        def extract_numbers(data):
            if isinstance(data, (int, float)):
                float_values.append(float(data))
                integer_values.append(int(data))
            elif isinstance(data, bool):
                float_values.append(1.0 if data else 0.0)
                integer_values.append(1 if data else 0)
            elif isinstance(data, str):
                try:
                    # Attempt to parse as number directly
                    num = float(data.strip())
                    float_values.append(num)
                    integer_values.append(int(num))
                except ValueError:
                    # Attempt to parse as JSON if not directly a number
                    try:
                        parsed_json = json.loads(data)
                        extract_numbers(parsed_json)
                    except json.JSONDecodeError:
                        pass  # Ignore non-numeric, non-JSON strings
            elif isinstance(data, dict):
                for value in data.values():
                    extract_numbers(value)
            elif isinstance(data, (list, tuple, set)):
                for item in data:
                    extract_numbers(item)

        # Process each input in kwargs
        for value in kwargs.values():
            extract_numbers(value)

        float_sum = sum(float_values)
        integer_sum = sum(integer_values)

        return (float_sum, integer_sum, float_values, integer_values)
# endregion
# region LF_Something2String
class LF_Something2String:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "json": ("JSON", {"tooltip": "JSON value to convert to string."}),
                "boolean": ("BOOLEAN", {"tooltip": "Boolean value to convert to string."}),
                "float": ("FLOAT", {"tooltip": "Float value to convert to string."}),
                "integer": ("INT", {"tooltip": "Integer value to convert to string."})
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION

    input_keys = ["JSON", "boolean", "float", "integer"]
    combinations_list = []

    for r in range(1, len(input_keys) + 1):
        for combo in combinations(input_keys, r):
            combo_name = "_".join(combo)
            combinations_list.append(combo_name)

    OUTPUT_IS_LIST = tuple([False] * len(combinations_list))
    RETURN_TYPES = tuple(["STRING"] * len(combinations_list))
    RETURN_NAMES = tuple(combinations_list)

    def on_exec(self, **kwargs):
        """
        Converts multiple inputs to strings and generates specific combinations.
        """
        def flatten_input(input_item):
            if isinstance(input_item, list):
                return [str(sub_item) for item in input_item for sub_item in flatten_input(item)]
            elif isinstance(input_item, str):
                return [input_item]
            else:
                return [str(input_item)]
        
        results = []

        for combo_name in self.RETURN_NAMES:
            items = combo_name.split("_")
            flattened_combo = []
            for item in items:
                if item in kwargs:
                    flattened_combo.extend(flatten_input(kwargs[item]))
            results.append("".join(flattened_combo))

        return tuple(results)
# endregion
# region LF_String
class LF_String:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "", "multiline": True, "tooltip": "String value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id:str, string:str, enable_history:bool):
        string = normalize_list_to_value(string)
        enable_history = normalize_list_to_value(enable_history)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}string", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": string,
        })

        return (string,)
# endregion
# region LF_WallOfText
class LF_WallOfText:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "separator": ("STRING", {"default": ", ", "tooltip": "Character(s) separating each string apart."}),
                "text_1": ("STRING", {"default": "", "multiline": True, "tooltip": "The first required string."}),
                "text_2": ("STRING", {"default": "", "multiline": True, "tooltip": "The second required string."}),
            },
            "optional": {
                "text_3": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The third optional string."}),
                "text_4": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The fourth optional string."}),
                "text_5": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The fifth optional string."}),
                "text_6": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The sixth optional string."}),
                "text_7": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The seventh optional string."}),
                "text_8": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The eighth optional string."}),
                "text_9": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The ninth optional string."}),
                "text_10": ("STRING", {"default": "", "defaultInput": True, "multiline": True, "tooltip": "The tenth optional string."}),
                "shuffle_inputs": ("BOOLEAN", {"default": False, "tooltip": "Toggle shuffling of input strings."}),
                "seed": ("INT", {"default": 42, "max": INT_MAX, "tooltip": "Seed to control the randomness of the shuffling."}),
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("string", "string_list")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs):
        texts = [normalize_list_to_value(kwargs.get(f"text_{i}", "")) for i in range(1, 11)]

        if len(texts) > 1:
            separator = kwargs.get("separator", "")
            shuffle_inputs = kwargs.get("shuffle_inputs", False)
            if shuffle_inputs:
                seed = kwargs.get("seed", 42)
                random.seed(seed)
                random.shuffle(texts)
            wall_of_text = separator.join([text for text in texts if text])
        else:
            wall_of_text = texts[0]

        return (wall_of_text, wall_of_text)
# endregion
# region Mappings
NODE_CLASS_MAPPINGS = {
    "LF_Boolean": LF_Boolean,
    "LF_DisplayBoolean": LF_DisplayBoolean,
    "LF_DisplayFloat": LF_DisplayFloat,
    "LF_DisplayInteger": LF_DisplayInteger,
    "LF_DisplayPrimitiveAsJSON": LF_DisplayPrimitiveAsJSON,
    "LF_DisplayString": LF_DisplayString,
    "LF_Extractor": LF_Extractor,
    "LF_Float": LF_Float,
    "LF_Integer": LF_Integer,
    "LF_RandomBoolean": LF_RandomBoolean,
    "LF_Something2Number": LF_Something2Number,
    "LF_Something2String": LF_Something2String,
    "LF_String": LF_String,
    "LF_WallOfText": LF_WallOfText
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Boolean": "Boolean",
    "LF_DisplayBoolean": "Display boolean",
    "LF_DisplayFloat": "Display float",
    "LF_DisplayInteger": "Display integer",
    "LF_DisplayPrimitiveAsJSON": "Display primitive as JSON",
    "LF_DisplayString": "Display string",
    "LF_Extractor": "Extract from text",
    "LF_Float": "Float",
    "LF_Integer": "Integer",
    "LF_RandomBoolean": "Random boolean",
    "LF_Something2Number": "Convert to number",
    "LF_Something2String": "Convert to string",
    "LF_String": "String",
    "LF_WallOfText": "Wall of text"
}             
# endregion
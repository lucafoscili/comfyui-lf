import random

from itertools import combinations
from server import PromptServer

from ..utils.primitives import *

category = "✨ LF Nodes/Primitives"
    
class LF_Boolean:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id, boolean, enable_history):

        PromptServer.instance.send_sync("lf-boolean", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": boolean,
        })

        return (boolean,)
    
class LF_DisplayBoolean:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False, "forceInput": True, "tooltip": "Boolean value."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id, boolean):
        if isinstance(boolean, list) and len(boolean) > 1:
            markdown_value = "\n".join(f"{i+1}. {item}" for i, item in enumerate(boolean))
        else:
            markdown_value = str(boolean[0]) if isinstance(boolean, list) else str(boolean)
            boolean = markdown_value

        PromptServer.instance.send_sync("lf-displayboolean", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (boolean,)
    
class LF_DisplayFloat:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": ("FLOAT", {"default": 0, "forceInput": True, "tooltip": "Float value."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def on_exec(self, node_id, float):
        if isinstance(float, list) and len(float) > 1:
            markdown_value = "\n".join(f"{i+1}. {item}" for i, item in enumerate(float))
        else:
            markdown_value = str(float[0]) if isinstance(float, list) else str(float)
            float = markdown_value

        PromptServer.instance.send_sync("lf-displayfloat", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (float,)
    
class LF_DisplayInteger:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "integer": ("INT", {"default": 0, "forceInput": True, "tooltip": "Integer value."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("integer",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, node_id, integer):
        if isinstance(integer, list) and len(integer) > 1:
            markdown_value = "\n".join(f"{i+1}. {item}" for i, item in enumerate(integer))
        else:
            markdown_value = str(integer[0]) if isinstance(integer, list) else str(integer)
            integer = markdown_value

        PromptServer.instance.send_sync("lf-displayinteger", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (integer,)
    
class LF_DisplayString:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "", "forceInput": True, "tooltip": "String value."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id, string):
        if isinstance(string, list) and len(string) > 1:
            markdown_value = "\n".join(f"{i+1}. {item}" for i, item in enumerate(string))
        else:
            markdown_value = "".join(string)
            string = markdown_value

        PromptServer.instance.send_sync("lf-displaystring", {
            "node": node_id, 
            "value": markdown_value,
        })

        return (string,)
    
class LF_DisplayPrimitiveAsJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json": ("KUL_CODE", {}),
            },
            "optional": {
                "integer": ("INT", {"default": 0, "forceInput": True, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Integer value."}),
                "float": ("FLOAT", {"default": 0.0, "forceInput": True, "step": 0.1, "tooltip": "Float value."}),
                "string": ("STRING", {"default": "", "forceInput": True, "multiline": True, "tooltip": "String value."}),
                "boolean": ("BOOLEAN", {"default": False, "forceInput": True, "tooltip": "Boolean value."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, **kwargs):
        dataset = {"nodes": []}
        
        node_id = kwargs.get("node_id")
        integer = kwargs.get("integer")
        float_val = kwargs.get("float")
        string = kwargs.get("string")
        boolean = kwargs.get("boolean")

        if boolean is not None:
            dataset["nodes"].append({"children": [{"id": "boolean", "value": str(boolean)}],
                                      "description": str(boolean), "id": "boolean", "value": "boolean"})
        if float_val is not None:
            dataset["nodes"].append({"children":[{"id": "float", "value":  str(float_val)}],
                                      "description": str(float_val), "id": "float", "value": "float"})
        if integer is not None:
            dataset["nodes"].append({"children":[{"id": "integer", "value": str(integer)}],
                                      "description": str(integer), "id": "integer", "value": "integer"})
        if string is not None:
            dataset["nodes"].append({"children":[{"id": "string", "value": string}],
                                      "description": string, "id": "string", "value": "string"})

        PromptServer.instance.send_sync("lf-displayprimitiveasjson", {
            "node": node_id,
            "dataset": dataset
        })

        return (dataset,)

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
            "hidden": { "node_id": "UNIQUE_ID" },
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("result_as_json", "extracted_text", "result_as_int", "result_as_float", "result_as_boolean")
    RETURN_TYPES = ("JSON", "STRING", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, **kwargs):
        node_id = kwargs["node_id"]
        text = kwargs["text"]
        starting_delimiter = kwargs["starting_delimiter"]
        ending_delimiter = kwargs["ending_delimiter"]

        extracted_text = extract_nested(text, starting_delimiter, ending_delimiter)
        
        result_as_json = convert_to_json(extracted_text)
        result_as_int = convert_to_int(extracted_text)
        result_as_float = convert_to_float(extracted_text)
        result_as_boolean = convert_to_boolean(extracted_text)

        PromptServer.instance.send_sync("lf-extractor", {
            "node": node_id, 
            "result": extracted_text,
        })
        
        return (result_as_json, extracted_text, result_as_int, result_as_float, result_as_boolean)
    
class LF_Float:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "float": ("FLOAT", {"default": 0, "max": 0xFFFFFFFFFFFFFFFF, "step": 0.1, "tooltip": "Float value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def on_exec(self, node_id, float, enable_history):

        PromptServer.instance.send_sync("lf-float", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": float,
        })

        return (float,)
    
class LF_Integer:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "integer": ("INT", {"default": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Integer value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("int",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, node_id, integer, enable_history):

        PromptServer.instance.send_sync("lf-integer", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": integer,
        })

        return (integer,)
    

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

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_IS_LIST = (False, False, True, True,)
    RETURN_NAMES = ("float_sum", "integer_sum", "float_list", "integer_list",)
    RETURN_TYPES = ("FLOAT", "INT", "FLOAT", "INT",)

    def on_exec(self, **kwargs):
        """
        Converts various inputs to floats and integers, handles nested structures,
        and computes their sums.

        Returns:
            tuple:
                - float_sum (float): Sum of all values converted to floats.
                - integer_sum (int): Sum of all values converted to integers.
                - float_list (list): List of all values converted to floats.
                - integer_list (list): List of all values converted to integers.
        """
        float_values = []
        integer_values = []

        def extract_numbers(data):
            """
            Recursively extract numbers from various data types.
            """
            if isinstance(data, (int, float)):
                float_values.append(float(data))
                integer_values.append(int(data))
            elif isinstance(data, bool):
                float_values.append(1.0 if data else 0.0)
                integer_values.append(1 if data else 0)
            elif isinstance(data, str):
                data = data.strip()
                try:
                    num = float(data)
                    float_values.append(num)
                    integer_values.append(int(num))
                except ValueError:
                    try:
                        parsed_json = json.loads(data)
                        extract_numbers(parsed_json)
                    except json.JSONDecodeError:
                        pass  # Ignore strings that are neither numbers nor valid JSON
            elif isinstance(data, dict):
                for value in data.values():
                    extract_numbers(value)
            elif isinstance(data, (list, tuple, set)):
                for item in data:
                    extract_numbers(item)

        for _, value in kwargs.items():
            extract_numbers(value)

        float_sum = sum(float_values)
        integer_sum = sum(integer_values)

        return (float_sum, integer_sum, float_values, integer_values,)
    
class LF_Something2String:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "JSON": ("JSON", {"tooltip": "JSON value to convert to string."}),
                "boolean": ("BOOLEAN", {"tooltip": "Boolean value to convert to string."}),
                "float": ("FLOAT", {"tooltip": "Float value to convert to string."}),
                "integer": ("INT", {"tooltip": "Integer value to convert to string."})
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"

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
    
class LF_String:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "", "multiline": True, "tooltip": "String value."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id, string, enable_history):

        PromptServer.instance.send_sync("lf-string", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": string,
        })

        return (string,)

class LF_RandomBoolean:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "chance_true": ("FLOAT", {"default": 50.0, "step": 1, "min": 0, "max": 100, "tooltip": "Percentage chance for True output, 0-100."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id, chance_true: float):
        chance_true = max(0, min(100, chance_true))
        random_value = random.uniform(0, 100)

        result = random_value <= chance_true

        PromptServer.instance.send_sync("lf-randomboolean", {
            "node": node_id, 
            "bool": result,
            "chanceTrue": chance_true,
            "roll": random_value,
        })

        return (result,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")
    
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
                "text_3": ("STRING", {"default": "", "multiline": True, "tooltip": "The third optional string."}),
                "text_4": ("STRING", {"default": "", "multiline": True, "tooltip": "The fourth optional string."}),
                "text_5": ("STRING", {"default": "", "multiline": True, "tooltip": "The fifth optional string."}),
                "text_6": ("STRING", {"default": "", "multiline": True, "tooltip": "The sixth optional string."}),
                "text_7": ("STRING", {"default": "", "multiline": True, "tooltip": "The seventh optional string."}),
                "text_8": ("STRING", {"default": "", "multiline": True, "tooltip": "The eighth optional string."}),
                "text_9": ("STRING", {"default": "", "multiline": True, "tooltip": "The ninth optional string."}),
                "text_10": ("STRING", {"default": "", "multiline": True, "tooltip": "The tenth optional string."}),
                "shuffle_inputs": ("BOOLEAN", {"default": False, "tooltip": "Toggle shuffling of input strings."}),
                "seed": ("INT", {"default": 0, "tooltip": "Seed to control the randomness of the shuffling."}),
            } 
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("wall_of_text",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, **kwargs):
        texts = [kwargs.get(f"text_{i}", "") for i in range(1, 11)]
        wall_of_text = ""
        if len(texts) > 1:
            separator = kwargs.get("separator", "")
            shuffle_inputs = kwargs.get("shuffle_inputs", False)
            if shuffle_inputs:
                seed = kwargs.get("seed", 0)
                random.seed(seed)
                random.shuffle(texts)
            wall_of_text = separator.join([text for text in texts if text])
        else:
            wall_of_text = texts[0]

        return (wall_of_text,)

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
import json
import random

from itertools import combinations

from server import PromptServer

from ..utils.constants import CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, Input, INT_MAX
from ..utils.helpers import create_history_node, normalize_input_list, normalize_json_input, normalize_list_to_value, randomize_from_history

CATEGORY = f"{CATEGORY_PREFIX}/Primitives"
    
# region LF_Boolean
class LF_Boolean:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Boolean value."
                }),
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Randomly selects a previously used value (must be present in the history list)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "max": INT_MAX, 
                    "tooltip": "Seed to control the randomness when 'randomize' is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("boolean", "boolean_list")
    RETURN_TYPES = ("BOOLEAN", "BOOLEAN")

    def on_exec(self, **kwargs: dict):
        boolean: bool = normalize_list_to_value(kwargs.get("boolean"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        nodes: list[dict] = ui_widget.get("nodes", [])
        dataset: dict = {
            "nodes": nodes
        }

        if enable_history:
            create_history_node(str(boolean), nodes)

        if randomize:
            boolean = bool(randomize_from_history(nodes, seed))
            
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}boolean", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (boolean, [boolean])
# endregion

# region LF_DisplayBoolean
class LF_DisplayBoolean:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "forceInput": True, 
                    "tooltip": "Boolean value."
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
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, **kwargs: dict):
        display_boolean: bool = normalize_input_list(kwargs.get("boolean"))

        if isinstance(display_boolean, list):
            if len(display_boolean) > 1:
                markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_boolean))
            else:
                markdown_value = str(display_boolean[0])
        else:
            markdown_value = ""
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayboolean", {
            "node": kwargs.get("node_id"),
            "value": markdown_value,
        })

        return (kwargs.get("boolean"),)
# endregion

# region LF_DisplayFloat
class LF_DisplayFloat:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "float": (Input.FLOAT, {
                    "default": 0, 
                    "forceInput": True, 
                    "tooltip": "Float value."
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
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def on_exec(self, **kwargs: dict):
        display_float: float = normalize_input_list(kwargs.get("float"))

        if isinstance(display_float, list):
            if len(display_float) > 1:
                markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_float))
            else:
                markdown_value = str(display_float[0])
        else:
            markdown_value = ""
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayfloat", {
            "node": kwargs.get("node_id"),
            "value": markdown_value,
        })

        return (kwargs.get("float"),)
# endregion

# region LF_DisplayInteger
class LF_DisplayInteger:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "integer": (Input.INTEGER, {
                    "default": 0, 
                    "forceInput": True, 
                    "tooltip": "Integer value."
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
    RETURN_NAMES = ("integer",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, **kwargs: dict):
        display_integer: int = normalize_input_list(kwargs.get("integer"))

        if isinstance(display_integer, list):
            if len(display_integer) > 1:
                markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_integer))
            else:
                markdown_value = str(display_integer[0])
        else:
            markdown_value = ""
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displayinteger", {
            "node": kwargs.get("node_id"),
            "value": markdown_value,
        })

        return (kwargs.get("integer"),)
# endregion

# region LF_DisplayPrimitiveAsJSON
class LF_DisplayPrimitiveAsJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {},
            "optional": {
                "integer": (Input.INTEGER, {
                    "default": 0, 
                    "forceInput": True, 
                    "max": INT_MAX, 
                    "tooltip": "Integer value."
                }),
                "float": (Input.FLOAT, {
                    "default": 0.0, 
                    "forceInput": True, 
                    "step": 0.1, 
                    "tooltip": "Float value."
                }),
                "string": (Input.STRING, {
                    "default": "", 
                    "forceInput": True, 
                    "multiline": True, 
                    "tooltip": "String value."
                }),
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "forceInput": True, 
                    "tooltip": "Boolean value."
                }),
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
        integer_list: int = normalize_input_list(kwargs.get("integer"))
        float_list: float = normalize_input_list(kwargs.get("float"))
        string_list: str = normalize_input_list(kwargs.get("string"))
        boolean_list: bool = normalize_input_list(kwargs.get("boolean"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

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
            "value": dataset,
        })

        return (dataset,)
# endregion

# region LF_DisplayString
class LF_DisplayString:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "string": (Input.STRING, {
                    "default": "", 
                    "forceInput": True, 
                    "tooltip": "String value."
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
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, **kwargs: dict):
        display_string:str = normalize_input_list(kwargs.get("string"))

        if isinstance(display_string, list):
            if len(display_string) > 1:
                markdown_value = "\n\n".join(f"{i+1}. {item}" for i, item in enumerate(display_string))
            else:
                markdown_value = display_string[0]
        else:
            markdown_value = ""
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}displaystring", {
            "node": kwargs.get("node_id"),
            "value": markdown_value,
        })

        return (kwargs.get("string"),)
# endregion

# region LF_Float
class LF_Float:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "float": (Input.FLOAT, {
                    "default": 0, 
                    "step": 0.1, 
                    "tooltip": "Float value."
                }),
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Randomly selects a previously used value (must be present in the history list)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "max": INT_MAX, 
                    "tooltip": "Seed to control the randomness when 'randomize' is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("float", "float_list")
    RETURN_TYPES = ("FLOAT", "FLOAT")

    def on_exec(self, **kwargs: dict):
        float_input: float = normalize_list_to_value(kwargs.get("float"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        nodes = ui_widget.get("nodes", [])
        dataset = {
            "nodes": nodes
        }

        if enable_history:
            create_history_node(str(float_input), nodes)

        if randomize:
            float_input = float(randomize_from_history(nodes, seed))
                
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}float", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (float_input, [float_input])
# endregion

# region LF_Integer
class LF_Integer:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "integer": (Input.INTEGER, {
                    "default": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Integer value."
                }),
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Randomly selects a previously used value (must be present in the history list)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "max": INT_MAX, 
                    "tooltip": "Seed to control the randomness when 'randomize' is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("int", "int_list")
    RETURN_TYPES = ("INT", "INT")

    def on_exec(self, **kwargs: dict):
        integer_input: int = normalize_list_to_value(kwargs.get("integer"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        nodes = ui_widget.get("nodes", [])
        dataset = {
            "nodes": nodes
        }

        if enable_history:
            create_history_node(str(integer_input), nodes)

        if randomize:
            integer_input = int(randomize_from_history(nodes, seed))

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}integer", {
            "node": kwargs.get("node_id"),
            "dataset": dataset
        })

        return (integer_input, [integer_input])
# endregion

# region LF_RandomBoolean
class LF_RandomBoolean:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "chance_true": (Input.FLOAT, {
                    "default": 50.0, 
                    "step": 1, 
                    "min": 0, 
                    "max": 100, 
                    "tooltip": "Percentage chance for True output, 0-100."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("boolean", "boolean_list")
    RETURN_TYPES = ("BOOLEAN", "BOOLEAN")

    def on_exec(self, **kwargs: dict):
        chance_true: str = normalize_list_to_value(kwargs.get("chance_true"))
        
        percentage = max(0, min(100, chance_true))
        random_value = random.uniform(0, 100)

        result = random_value <= percentage

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}randomboolean", {
            "node": kwargs.get("node_id"),
            "bool": result,
            "roll": random_value,
        })

        return (result, [result])

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")
# endregion

# region LF_Something2Number
class LF_Something2Number:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {},
            "optional": {
                "JSON": (Input.JSON, {
                    "tooltip": "JSON value to convert to numbers."
                }),
                "boolean": (Input.BOOLEAN, {
                    "tooltip": "Boolean value to convert to numbers."
                }),
                "string": (Input.STRING, {
                    "tooltip": "String value to convert to numbers."
                }),
                "integer": (Input.INTEGER, {
                    "tooltip": "Integer value to convert to numbers."
                }),
                "float": (Input.FLOAT, {
                    "tooltip": "Float value to convert to numbers."
                }),
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
    OUTPUT_IS_LIST = (False, False, False, False, True, True)
    RETURN_NAMES = ("float", "int", "float_sum", "int_sum", "float_list", "int_list")
    RETURN_TYPES = ("FLOAT", "INT", "FLOAT", "INT", "FLOAT", "INT")

    def on_exec(self, **kwargs: dict):
        def extract_numbers(data):
            if isinstance(data, bool):
                i_val = 1 if data else 0
                f_val = 1.0 if data else 0.0
                float_values.append(f_val)
                integer_values.append(i_val)
                breakdown.append(f"**boolean** detected => {f_val} (float) {i_val} (int)")
            elif isinstance(data, (int, float)):
                i_val = int(data)
                f_val = float(data)
                float_values.append(f_val)
                integer_values.append(i_val)
                breakdown.append(f"**number** detected => {f_val} (float) {i_val} (int)")
            elif isinstance(data, str):
                try:
                    f_val = float(data.strip())
                    i_val = int(f_val)
                    float_values.append(f_val)
                    integer_values.append(i_val)
                    breakdown.append(f"**string** detected => {f_val} (float) {i_val} (int)")
                except ValueError:
                    try:
                        parsed_json = json.loads(data)
                        extract_numbers(parsed_json)
                    except json.JSONDecodeError:
                        pass
            elif isinstance(data, dict):
                for value in data.values():
                    extract_numbers(value)
            elif isinstance(data, (list, tuple, set)):
                for item in data:
                    extract_numbers(item)

        empty = "*Empty*"
        float_values = []
        integer_values = []
        breakdown = []

        for value in kwargs.values():
            extract_numbers(value)

        float_sum = sum(float_values)
        integer_sum = sum(integer_values)
        
        float_log = "\n".join([str(val) for val in float_values]) if float_values else empty
        int_log = "\n".join([str(val) for val in integer_values]) if integer_values else empty
        breakdown_log = "\n".join([f"{i+1}. {val}" for i, val in enumerate(breakdown)]) if breakdown else empty

        log = f"""## Result:
  **Float sum: {str(float_sum)}**
  **Integer sum: {str(integer_sum)}**

## List of floats:
  {float_log}

## List of integers:
  {int_log}

## Breakdown:

  {breakdown_log}
    """
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}something2number", {
            "node": kwargs.get("node_id"), 
            "value": log,
        })

        return (float_values, integer_values, float_sum, integer_sum, float_values, integer_values)
# endregion

# region LF_Something2String
class LF_Something2String:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "separator": (Input.STRING, {
                    "default": ", ", 
                    "tooltip": "Character(s) separating each string apart."
                }),
            },
            "optional": {
                "json": (Input.JSON, {
                    "tooltip": "JSON value to convert to string."
                }),
                "boolean": (Input.BOOLEAN, {
                    "tooltip": "Boolean value to convert to string."
                }),
                "float": (Input.FLOAT, {
                    "tooltip": "Float value to convert to string."
                }),
                "integer": (Input.INTEGER, {
                    "tooltip": "Integer value to convert to string."
                }),
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

    input_keys = ["json", "boolean", "float", "integer"]
    combinations_list = []

    for r in range(1, len(input_keys) + 1):
        for combo in combinations(input_keys, r):
            combo_name = "_".join(combo)
            combinations_list.append(combo_name)

    OUTPUT_IS_LIST = tuple([False] * len(combinations_list))
    RETURN_TYPES = tuple(["STRING"] * len(combinations_list))
    RETURN_NAMES = tuple(combinations_list)

    def on_exec(self, **kwargs: dict):
        def flatten_input(input_item):
            if isinstance(input_item, list):
                return [str(sub_item) for item in input_item for sub_item in flatten_input(item)]
            elif isinstance(input_item, (dict, bool, float, int)):
                flattened_value = str(input_item)
                breakdown.append(f"**{type(input_item).__name__}** detected => {flattened_value}")
                return [flattened_value]
            elif input_item is not None:
                flattened_value = str(input_item)
                breakdown.append(f"**string** detected => {flattened_value}")
                return [flattened_value]
            return []

        separator = kwargs.get("separator", ", ")
        breakdown = []

        results = []
        combination_logs = []

        for combo_name in self.RETURN_NAMES:
            items = combo_name.split("_")
            flattened_combo = []

            for item in items:
                if item in kwargs:
                    flattened_combo.extend(flatten_input(kwargs[item]))

            combined_string = separator.join(flattened_combo)
            results.append(combined_string)
            combination_logs.append(f"**{combo_name}** => {combined_string}")

        flattened_log = "\n".join([f"{i+1}. {val}" for i, val in enumerate(breakdown)]) if breakdown else "*Empty*"
        combinations_log = "\n".join([f"{i+1}. {val}" for i, val in enumerate(combination_logs)]) if combination_logs else "*Empty*"

        log = f"""## Breakdown

{flattened_log}

## Combination Results:
{combinations_log}
        """
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}something2string", {
            "node": kwargs.get("node_id"), 
            "value": log,
        })

        return tuple(results)
# endregion

# region LF_String
class LF_String:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "string": (Input.STRING, {
                    "default": "", 
                    "multiline": True, 
                    "tooltip": "String value."
                }),
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Randomly selects a previously used value (must be present in the history list)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "max": INT_MAX, 
                    "tooltip": "Seed to control the randomness when 'randomize' is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("string", "string_list")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        string_input: str = normalize_list_to_value(kwargs.get("string"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        nodes = ui_widget.get("nodes", [])
        dataset = {
            "nodes": nodes
        }

        if enable_history:
            create_history_node(string_input, nodes)

        if randomize:
            string_input = randomize_from_history(nodes, seed)        

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}string", {
            "node": kwargs.get("node_id"), 
            "dataset": dataset,
        })

        return (string_input, [string_input])
# endregion

# region LF_WallOfText
class LF_WallOfText:
    @classmethod 
    def INPUT_TYPES(self):
        return {
            "required": {
                "separator": (Input.STRING, {
                    "default": ", ", 
                    "tooltip": "Character(s) separating each string apart."}),
                "text_1": (Input.STRING, {
                    "default": "", 
                    "multiline": True, 
                    "tooltip": "The first required string."}),
                "text_2": (Input.STRING, {
                    "default": "", 
                    "multiline": True, 
                    "tooltip": "The second required string."}),
            },
            "optional": {
                "text_3": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The third optional string."
                }),
                "text_4": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The fourth optional string."
                }),
                "text_5": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The fifth optional string."
                }),
                "text_6": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The sixth optional string."
                }),
                "text_7": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The seventh optional string."
                }),
                "text_8": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The eighth optional string."
                }),
                "text_9": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The ninth optional string."
                }),
                "text_10": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "The tenth optional string."
                }),
                "shuffle_inputs": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Toggle shuffling of input strings."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "max": INT_MAX, 
                    "tooltip": "Seed to control the randomness of the shuffling."
                }),
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
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("string", "string_list")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        texts: list[str] = [normalize_list_to_value(kwargs.get(f"text_{i}", "")) for i in range(1, 11)]

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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}walloftext", {
            "node": kwargs.get("node_id"), 
            "value": wall_of_text,
        })

        return (wall_of_text, wall_of_text)
# endregion

NODE_CLASS_MAPPINGS = {
    "LF_Boolean": LF_Boolean,
    "LF_DisplayBoolean": LF_DisplayBoolean,
    "LF_DisplayFloat": LF_DisplayFloat,
    "LF_DisplayInteger": LF_DisplayInteger,
    "LF_DisplayPrimitiveAsJSON": LF_DisplayPrimitiveAsJSON,
    "LF_DisplayString": LF_DisplayString,
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
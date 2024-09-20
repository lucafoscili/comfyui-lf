import json

from server import PromptServer

category = "✨ LF Nodes/Logic"

class LF_Extractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": "", "multiline": True, "tooltip": "The string from which the output will be extracted."}),
                "starting_delimiter": ("STRING", {"default": "{", "tooltip": "The delimiter where extraction starts."}),
                "ending_delimiter": ("STRING", {"default": "}", "tooltip": "The delimiter where extraction ends."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" },
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("as_json", "as_text", "as_int", "as_float", "as_boolean")
    RETURN_TYPES = ("JSON", "STRING", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, node_id, text: str, starting_delimiter: str, ending_delimiter: str):
        try:
            start_idx = text.index(starting_delimiter)
            end_idx = text.index(ending_delimiter, start_idx) + len(ending_delimiter)
            extracted_text = text[start_idx:end_idx].strip()
        except ValueError:
            extracted_text = ""

        result_as_text = extracted_text
        result_as_json = None
        result_as_int = None
        result_as_float = None
        result_as_boolean = None

        try:
            result_as_json = json.loads(result_as_text)
        except (ValueError, json.JSONDecodeError):
            pass

        try:
            result_as_int = int(result_as_text)
        except ValueError:
            pass

        try:
            result_as_float = float(result_as_text)
        except ValueError:
            pass

        result_as_boolean = result_as_text.lower() in ("true", "yes", "1")

        PromptServer.instance.send_sync("lf-extractor", {
            "node": node_id, 
            "result": result_as_text,
        })

        return (result_as_json, result_as_text, result_as_int, result_as_float, result_as_boolean)


class LF_SwitchFloat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "on_true": ("FLOAT", {"lazy": True, "default": 0, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("FLOAT", {"lazy": True, "default": 0, "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("FLOAT",)

    def check_lazy_status(self, **kwargs):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id, on_true: int, on_false: int, boolean: bool):
        
        PromptServer.instance.send_sync("lf-switchfloat", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)

class LF_SwitchImage:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("IMAGE", {"lazy": True, "tooltip": "Value to return if the boolean condition is true."}),
                "on_false": ("IMAGE", {"lazy": True, "tooltip": "Value to return if the boolean condition is false."}),
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("IMAGE",)

    def check_lazy_status(self, **kwargs):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id, on_true, on_false, boolean: bool):
        PromptServer.instance.send_sync("lf-switchimage", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)

    
class LF_SwitchInteger:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "on_true": ("INT", {"lazy": True, "default": 0, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("INT", {"lazy": True, "default": 0, "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("INT",)

    def check_lazy_status(self, **kwargs):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id, on_true: int, on_false: int, boolean: bool):
        
        PromptServer.instance.send_sync("lf-switchinteger", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)

class LF_SwitchJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "on_true": ("JSON", {"lazy": True, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("JSON", {"lazy": True, "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("JSON",)

    def check_lazy_status(self, **kwargs):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id, on_true:dict, on_false:dict, boolean: bool):
        
        PromptServer.instance.send_sync("lf-switchimage", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)

class LF_SwitchString:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "on_true": ("STRING", {"lazy": True, "multiline": True, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("STRING", {"lazy": True, "multiline": True, "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("STRING",)

    def check_lazy_status(self, **kwargs):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id, on_true: str, on_false: str, boolean: bool):
        
        PromptServer.instance.send_sync("lf-switchstring", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
    
NODE_CLASS_MAPPINGS = {
    "LF_Extractor": LF_Extractor,
    "LF_SwitchFloat": LF_SwitchFloat,
    "LF_SwitchImage": LF_SwitchImage,
    "LF_SwitchInteger": LF_SwitchInteger,
    "LF_SwitchJSON": LF_SwitchJSON,
    "LF_SwitchString": LF_SwitchString,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Extractor": "Extracts something from text",
    "LF_SwitchFloat": "Switch Float",
    "LF_SwitchImage": "Switch Image",
    "LF_SwitchInteger": "Switch Integer",
    "LF_SwitchJSON": "Switch JSON",
    "LF_SwitchString": "Switch String",
} 
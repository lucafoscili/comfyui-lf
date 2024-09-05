import random

from server import PromptServer

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
            "boolean": result,
            "chanceTrue": chance_true,
        })

        return (result,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

NODE_CLASS_MAPPINGS = {
    "LF_Boolean": LF_Boolean,
    "LF_Float": LF_Float,
    "LF_Integer": LF_Integer,
    "LF_RandomBoolean": LF_RandomBoolean,
    "LF_String": LF_String
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Boolean": "Boolean",
    "LF_Float": "Float",
    "LF_Integer": "Integer",
    "LF_RandomBoolean": "Random boolean",
    "LF_String": "String"
}
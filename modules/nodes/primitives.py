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
    OUTPUT_NODE = True
    RETURN_NAMES = ("boolean",)
    RETURN_TYPES = ("BOOLEAN",)

    def on_exec(self, node_id, boolean):

        PromptServer.instance.send_sync("lf-displayboolean", {
            "node": node_id, 
            "value": str(boolean),
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
    OUTPUT_NODE = True
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def on_exec(self, node_id, float):

        PromptServer.instance.send_sync("lf-displayfloat", {
            "node": node_id, 
            "value": str(float),
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
    OUTPUT_NODE = True
    RETURN_NAMES = ("integer",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, node_id, integer):

        PromptServer.instance.send_sync("lf-displayinteger", {
            "node": node_id, 
            "value": str(integer),
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
    OUTPUT_NODE = True
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id, string):

        PromptServer.instance.send_sync("lf-displaystring", {
            "node": node_id, 
            "value": string,
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
            "bool": result,
            "chanceTrue": chance_true,
            "roll": random_value,
        })

        return (result,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

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
    "LF_String": LF_String
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Boolean": "Boolean",
    "LF_DisplayBoolean": "Display boolean",
    "LF_DisplayFloat": "Display float",
    "LF_DisplayInteger": "Display integer",
    "LF_DisplayPrimitiveAsJSON": "Display primitive as JSON",
    "LF_DisplayString": "Display string",
    "LF_Float": "Float",
    "LF_Integer": "Integer",
    "LF_RandomBoolean": "Random boolean",
    "LF_String": "String"
}             
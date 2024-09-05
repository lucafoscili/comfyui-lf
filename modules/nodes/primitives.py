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
    
NODE_CLASS_MAPPINGS = {
    "LF_Boolean": LF_Boolean,
    "LF_Float": LF_Float,
    "LF_Integer": LF_Integer,
    "LF_String": LF_String
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Boolean": "Boolean",
    "LF_Float": "Float",
    "LF_Integer": "Integer",
    "LF_String": "String"
}
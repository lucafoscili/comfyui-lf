from server import PromptServer

category = "LF Nodes/Logic"

class LF_SwitchImage:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            "on_true": ("IMAGE", { "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("IMAGE", { "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = category
    FUNCTION = "on_exec"

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
            "on_true": ("INT", {"default": 0, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("INT", {"default": 0, "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = category
    FUNCTION = "on_exec"

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
            "on_true": ("JSON", { "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("JSON", { "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    RETURN_TYPES = ("JSON",)
    CATEGORY = category
    FUNCTION = "on_exec"

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
            "on_true": ("STRING", { "multiline": True, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("STRING", { "multiline": True, "tooltip": "Value to return if the boolean condition is false."}),
            "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
        },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    RETURN_TYPES = ("STRING",)
    CATEGORY = category
    FUNCTION = "switch_string"

    def on_exec(self, node_id, on_true: str, on_false: str, boolean: bool):
        
        PromptServer.instance.send_sync("lf-switchstring", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
    
NODE_CLASS_MAPPINGS = {
    "LF_SwitchImage": LF_SwitchImage,
    "LF_SwitchInteger": LF_SwitchInteger,
    "LF_SwitchJSON": LF_SwitchJSON,
    "LF_SwitchString": LF_SwitchString,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_SwitchImage": "Switch Image",
    "LF_SwitchInteger": "Switch Integer",
    "LF_SwitchJSON": "Switch JSON",
    "LF_SwitchString": "Switch String",
} 
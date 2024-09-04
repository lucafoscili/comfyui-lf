from server import PromptServer

category = "LF Nodes/Primitives"
    
class LF_Integer:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "integer": ("INT", {"default": 0, "tooltip": "Integer value."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("int",)
    RETURN_TYPES = ("INT",)

    def on_exec(self, node_id, integer):

        PromptServer.instance.send_sync("lf-integer", {
            "node": node_id, 
            "value": integer,
        })

        return (integer,)
    
class LF_String:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "", "multiline": True, "tooltip": "String value."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, node_id, string):

        PromptServer.instance.send_sync("lf-string", {
            "node": node_id, 
            "value": string,
        })

        return (string,)
    
NODE_CLASS_MAPPINGS = {
    "LF_Integer": LF_Integer,
    "LF_String": LF_String
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Integer": "Integer",
    "LF_String": "String"
}
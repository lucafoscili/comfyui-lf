from server import PromptServer

category = "LF Nodes/Logic"

class LF_SwitchInteger:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("INT", {"default": 0}),
                "on_false": ("INT", {"default": 0}),
                "boolean": ("BOOLEAN", {"default": False}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = category
    FUNCTION = "integer_switch"

    def integer_switch(self, node_id, on_true: int, on_false: int, boolean: bool):
        
        PromptServer.instance.send_sync("lf-switchinteger", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)

NODE_CLASS_MAPPINGS = {
    "LF_SwitchInteger": LF_SwitchInteger,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_SwitchInteger": "Switch Integer",
}
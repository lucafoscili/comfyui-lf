import math
import random

from server import PromptServer

class AnyType(str):
    def __ne__(self, __value: object) -> bool:
        return False

any = AnyType("*")

category = "✨ LF Nodes/Logic"

class LF_MathOperation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "operation": ("STRING", {"default": "a * b / c + d", "tooltip": "Math operation to execute. Use variables like 'a', 'b', 'c', 'd'."}),
            },
            "optional": {
                "a": (any, {"tooltip": "Value for 'a'."}),
                "b": (any, {"tooltip": "Value for 'b'."}),
                "c": (any, {"tooltip": "Value for 'c'."}),
                "d": (any, {"tooltip": "Value for 'd'."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("int_result", "float_result")
    RETURN_TYPES = ("INT", "FLOAT")

    def on_exec(self, node_id, operation: str, a, b, c, d):
        def normalize_input(variable):
            variable = variable[0] if isinstance(variable, list) else variable

            if isinstance(variable, str):
                return float(variable)
            if isinstance(variable, bool):
                return 1 if variable else 0
            
            return variable
        
        na_placeholder = "N/A"
        str_operation = operation

        if a:
            str_a = type(a)
            a = normalize_input(a)
            str_operation = str_operation.replace("a", str(a))
            str_a = f"**{str(a)}** {str_a}"
        if b:
            str_b = type(b)
            b = normalize_input(b)
            str_operation = str_operation.replace("b", str(b))
            str_b = f"**{str(b)}** {str_b}"
        if c:
            str_c = type(c)
            c = normalize_input(c)
            str_operation = str_operation.replace("c", str(c))
            str_c = f"**{str(c)}** {str_c}"
        if d:
            str_d = type(d)
            d = normalize_input(d)
            str_operation = str_operation.replace("d", str(d))
            str_d = f"**{str(d)}** {str_d}"

        try:
            result = eval(operation, {"a": a, "b": b, "c": c, "d": d, "math": math})
        except Exception:
            result = float("NaN")

        log = f"""
## Result:
  **{str(result)}**

## Variables:
  a: {str_a if a else na_placeholder}
  b: {str_b if b else na_placeholder}
  c: {str_c if c else na_placeholder}
  d: {str_d if d else na_placeholder}

## Full operation:
  {str_operation}
    """    

        PromptServer.instance.send_sync("lf-mathoperation", {
            "node": node_id, 
            "log": log
        })
        
        return (int(result), result)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True

class LF_ResolutionSwitcher:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "chance_landscape": ("FLOAT", {"default": 20.0, "step": 1, "min": 0, "max": 100, "tooltip": "Percentage chance for landscape output, 0-100."}),
                "portrait_width": ("INT", {"default": 832, "min": 1, "step": 1}),
                "portrait_height": ("INT", {"default": 1216, "min": 1, "step": 1}),
                "landscape_width": ("INT", {"default": 1216, "min": 1, "step": 1}),
                "landscape_height": ("INT", {"default": 832, "min": 1, "step": 1}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("width", "height", "is_landscape")
    RETURN_TYPES = ("INT", "INT", "BOOLEAN")

    def on_exec(self, node_id, chance_landscape: float, portrait_width: int, portrait_height: int, landscape_width: int, landscape_height: int):
        chance_landscape = max(0, min(100, chance_landscape))
        random_value = random.uniform(0, 100)

        is_landscape = random_value <= chance_landscape

        width = landscape_width if is_landscape else portrait_width
        height = landscape_height if is_landscape else portrait_height

        PromptServer.instance.send_sync("lf-resolutionswitcher", {
            "node": node_id, 
            "bool": is_landscape,
            "chanceTrue": chance_landscape,
            "roll": random_value,
        })

        return (width, height, is_landscape)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True

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
            "on_true": ("INT", {"lazy": True, "default": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Value to return if the boolean condition is true."}),
            "on_false": ("INT", {"lazy": True, "default": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Value to return if the boolean condition is false."}),
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
    "LF_MathOperation": LF_MathOperation,
    "LF_ResolutionSwitcher": LF_ResolutionSwitcher,
    "LF_SwitchFloat": LF_SwitchFloat,
    "LF_SwitchImage": LF_SwitchImage,
    "LF_SwitchInteger": LF_SwitchInteger,
    "LF_SwitchJSON": LF_SwitchJSON,
    "LF_SwitchString": LF_SwitchString,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_MathOperation": "Math operation",
    "LF_ResolutionSwitcher": "Resolution switcher",
    "LF_SwitchFloat": "Switch Float",
    "LF_SwitchImage": "Switch Image",
    "LF_SwitchInteger": "Switch Integer",
    "LF_SwitchJSON": "Switch JSON",
    "LF_SwitchString": "Switch String",
} 
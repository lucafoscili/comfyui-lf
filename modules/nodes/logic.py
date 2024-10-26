import math
import random
import torch

from server import PromptServer

from ..utils.constants import ANY, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, INT_MAX
from ..utils.helpers import normalize_input_image, normalize_list_to_value

CATEGORY = f"{CATEGORY_PREFIX}/Logic"

# region LF_IsLandscape
class LF_IsLandscape:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image/images."})
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True,)
    OUTPUT_IS_LIST = (False, False, False, True, True, True)
    RETURN_NAMES = ("is_landscape", "height", "width", 
                    "is_landscape_list", "heights_list", "widths_list")
    RETURN_TYPES = ("BOOLEAN", "INT", "INT", "BOOLEAN", "INT", "INT")

    def on_exec(self, node_id: str, image: torch.Tensor):
        image = normalize_input_image(image)

        nodes = []
        dataset = {"nodes": nodes}

        heights_list = []
        widths_list = []
        is_landscape_list = []

        counter = 0

        for img in image:
            counter += 1
            _, height, width, _ = img.shape
            heights_list.append(height)
            widths_list.append(width)
            is_landscape_list.append(width >= height)
            nodes.append({"icon": "check" if width >= height else "clear",
                          "id": counter, 
                          "value": f"Image {counter}: {str(width >= height)}"})

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}islandscape", {
            "node": node_id, 
            "dataset": dataset,
        })

        return (is_landscape_list[0], heights_list[0], widths_list[0], 
                is_landscape_list, heights_list, widths_list)
# endregion
# region LF_MathOperation
class LF_MathOperation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "operation": ("STRING", {"default": "a * b / c + d", "tooltip": "Math operation to execute. Use variables like 'a', 'b', 'c', 'd'."}),
            },
            "optional": {
                "a": (ANY, {"tooltip": "Value for 'a'."}),
                "b": (ANY, {"tooltip": "Value for 'b'."}),
                "c": (ANY, {"tooltip": "Value for 'c'."}),
                "d": (ANY, {"tooltip": "Value for 'd'."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("int_result", "float_result")
    RETURN_TYPES = ("INT", "FLOAT")

    def on_exec(self, node_id: str, operation: str, a=None, b=None, c=None, d=None):
        def normalize_input(variable):

            variable = normalize_list_to_value(variable)

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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}mathoperation", {
            "node": node_id, 
            "log": log
        })
        
        return (int(result), result)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True
# endregion
# region LF_ResolutionSwitcher
class LF_ResolutionSwitcher:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "chance_landscape": ("FLOAT", {"default": 20.0, "step": 5, "min": 0, "max": 100, "tooltip": "Percentage chance for landscape output, 0-100."}),
                "portrait_width": ("INT", {"default": 832, "min": 1, "step": 1}),
                "portrait_height": ("INT", {"default": 1216, "min": 1, "step": 1}),
                "landscape_width": ("INT", {"default": 1216, "min": 1, "step": 1}),
                "landscape_height": ("INT", {"default": 832, "min": 1, "step": 1}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("width", "height", "is_landscape")
    RETURN_TYPES = ("INT", "INT", "BOOLEAN")

    def on_exec(self, node_id: str, chance_landscape: float, portrait_width: int, portrait_height :int, landscape_width: int, landscape_height: int):
        chance_landscape = normalize_list_to_value(chance_landscape)
        portrait_width = normalize_list_to_value(portrait_width)
        portrait_height = normalize_list_to_value(portrait_height)
        landscape_width = normalize_list_to_value(landscape_width)
        landscape_height = normalize_list_to_value(landscape_height)
        
        chance_landscape = max(0, min(100, chance_landscape))
        random_value = random.uniform(0, 100)

        is_landscape = random_value <= chance_landscape

        width = landscape_width if is_landscape else portrait_width
        height = landscape_height if is_landscape else portrait_height

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}resolutionswitcher", {
            "node": node_id, 
            "bool": is_landscape,
            "chanceTrue": chance_landscape,
            "roll": random_value,
        })

        return (width, height, is_landscape)
# endregion
# region LF_SwitchFloat
class LF_SwitchFloat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("FLOAT", {"lazy": True, "default": 0, "tooltip": "Value to return if the boolean condition is true."}),
                "on_false": ("FLOAT", {"lazy": True, "default": 0, "tooltip": "Value to return if the boolean condition is false."}),
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("float",)
    RETURN_TYPES = ("FLOAT",)

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id: str, on_true: int, on_false: int, boolean: bool):
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchfloat", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
# endregion
# region LF_SwitchImage
class LF_SwitchImage:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("IMAGE", {"lazy": True, "tooltip": "Value to return if the boolean condition is true."}),
                "on_false": ("IMAGE", {"lazy": True, "tooltip": "Value to return if the boolean condition is false."}),
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("image",)
    RETURN_TYPES = ("IMAGE",)

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id: str, on_true: torch.Tensor, on_false: torch.Tensor, boolean: bool):

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchimage", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
# endregion
# region LF_SwitchInteger    
class LF_SwitchInteger:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("INT", {"lazy": True, "default": 0, "max": INT_MAX, "tooltip": "Value to return if the boolean condition is true."}),
                "on_false": ("INT", {"lazy": True, "default": 0, "max": INT_MAX, "tooltip": "Value to return if the boolean condition is false."}),
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        } 

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("int",)
    RETURN_TYPES = ("INT",)

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id: str, on_true: int, on_false: int, boolean: bool):
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchinteger", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
# endregion
# region LF_SwitchJSON
class LF_SwitchJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("JSON", {"lazy": True, "tooltip": "Value to return if the boolean condition is true."}),
                "on_false": ("JSON", {"lazy": True, "tooltip": "Value to return if the boolean condition is false."}),
                "boolean": ("BOOLEAN", {"default": False, "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id: str, on_true: dict, on_false: dict, boolean: bool):
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchimage", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
# endregion
# region LF_SwitchString
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

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, node_id: str, on_true: str, on_false: str, boolean: bool):
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchstring", {
            "node": node_id, 
            "bool": boolean, 
        })

        return (on_true if boolean else on_false,)
# endregion
# region Mappings
NODE_CLASS_MAPPINGS = {
    "LF_IsLandscape": LF_IsLandscape,
    "LF_MathOperation": LF_MathOperation,
    "LF_ResolutionSwitcher": LF_ResolutionSwitcher,
    "LF_SwitchFloat": LF_SwitchFloat,
    "LF_SwitchImage": LF_SwitchImage,
    "LF_SwitchInteger": LF_SwitchInteger,
    "LF_SwitchJSON": LF_SwitchJSON,
    "LF_SwitchString": LF_SwitchString,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_IsLandscape": "Is image in landscape res.?",
    "LF_MathOperation": "Math operation",
    "LF_ResolutionSwitcher": "Resolution switcher",
    "LF_SwitchFloat": "Switch Float",
    "LF_SwitchImage": "Switch Image",
    "LF_SwitchInteger": "Switch Integer",
    "LF_SwitchJSON": "Switch JSON",
    "LF_SwitchString": "Switch String",
} 
# endregion
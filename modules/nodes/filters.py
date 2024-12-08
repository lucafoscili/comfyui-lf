import torch

from server import PromptServer

from ..utils.constants import CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, Input
from ..utils.filters import blend_effect, brightness_effect, clarity_effect, contrast_effect, desaturate_effect, gaussian_blur_effect, line_effect, sepia_effect, vignette_effect
from ..utils.helpers import normalize_input_image, normalize_list_to_value, normalize_output_image, process_and_save_image

CATEGORY = f"{CATEGORY_PREFIX}/Filters"

# region LF_Blend
class LF_Blend:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "The base image to blend with."
                }),
                "overlay_image": (Input.IMAGE, {
                    "tooltip": "The overlay image to blend onto the base image."
                }),
                "opacity": (Input.FLOAT, {
                    "default": 0.5, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.01, 
                    "tooltip": "Opacity of the overlay. 0 means invisible, 1 means fully opaque."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        overlay_image: list[torch.Tensor] = normalize_input_image(kwargs.get("overlay_image"))
        opacity: float = normalize_list_to_value(kwargs.get("opacity"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=blend_effect,
            filter_args={
                'overlay_image': overlay_image[0],
                'alpha_mask': opacity,
            },
            filename_prefix="blend",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}blend", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Brightness
class LF_Brightness:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "brightness_strength": (Input.FLOAT, {
                    "default": 0.0, 
                    "min": -1.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Adjust the brightness of the image. Negative values darken, positive values brighten."
                }),
                "gamma": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": 0.1, 
                    "max": 3.0, 
                    "step": 0.1, 
                    "tooltip": "Adjust the gamma correction. Values < 1 brighten shadows, > 1 darken highlights."
                }),
            },
            "optional": {
                "midpoint": (Input.FLOAT, {
                    "default": 0.5, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Defines the tonal midpoint for brightness scaling."
                }),
                "localized_brightness": (Input.BOOLEAN, {
                    "default": False,
                    "tooltip": "Enhance brightness locally in darker regions."
                }),
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        brightness_strength: float = normalize_list_to_value(kwargs.get("brightness_strength"))
        gamma: float = normalize_list_to_value(kwargs.get("gamma"))
        midpoint: float = normalize_list_to_value(kwargs.get("midpoint", 0.5))
        localized_brightness: bool = kwargs.get("localized_brightness", False)

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=brightness_effect,
            filter_args={
                'brightness_strength': brightness_strength,
                'gamma': gamma,
                'midpoint': midpoint,
                'localized_brightness': localized_brightness,
            },
            filename_prefix="brightness",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}brightness", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Clarity
class LF_Clarity:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "clarity_strength": (Input.FLOAT, {
                    "default": 0.5, 
                    "min": 0.0, 
                    "max": 5.0, 
                    "step": 0.1, 
                    "tooltip": "Controls the amount of contrast enhancement in midtones."
                }),
                "sharpen_amount": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": 0.0, 
                    "max": 5.0, 
                    "step": 0.1, 
                    "tooltip": "Controls how much sharpening is applied to the image."
                }),
                "blur_kernel_size": (Input.INTEGER, {
                    "default": 7, 
                    "min": 1, 
                    "max": 15, 
                    "step": 2, 
                    "tooltip": "Controls the size of the Gaussian blur kernel. Higher values mean more smoothing."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        clarity_strength: float = normalize_list_to_value(kwargs.get("clarity_strength"))
        sharpen_amount: float = normalize_list_to_value(kwargs.get("sharpen_amount"))
        blur_kernel_size: int = normalize_list_to_value(kwargs.get("blur_kernel_size"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=clarity_effect,
            filter_args={
                'clarity_strength': clarity_strength,
                'sharpen_amount': sharpen_amount,
                'blur_kernel_size': blur_kernel_size,
            },
            filename_prefix="clarity",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}clarity", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Contrast
class LF_Contrast:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "contrast_strength": (Input.FLOAT, {
                    "default": 0.25, 
                    "min": -1.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Controls the intensity of the contrast adjustment. 1.0 is no change, below 1 reduces contrast, above 1 increases contrast."
                }),
                "midpoint": (Input.FLOAT, {
                    "default": 0.5, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Defines the tonal midpoint for contrast scaling."
                }),
            },
            "optional": {
                "localized_contrast": (Input.BOOLEAN, {
                    "default": False,
                    "tooltip": "Apply contrast enhancement locally to edges and textures."
                }),
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict) -> None:
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        contrast_strength: float = normalize_list_to_value(kwargs.get("contrast_strength"))
        midpoint: float = normalize_list_to_value(kwargs.get("midpoint"))
        localized_contrast: bool = kwargs.get("localized_contrast", False)

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=contrast_effect,
            filter_args={
                'contrast_strength': contrast_strength,
                'midpoint': midpoint,
                'localized_contrast': localized_contrast,
            },
            filename_prefix="contrast",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}contrast", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Desaturation
class LF_Desaturation:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "global_level": (Input.FLOAT, {
                    "default": 0.5, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Controls the total intensity of the desaturation. 0 is no effect, 1 is fully desaturated."
                }),
                "r_channel": (Input.FLOAT, {
                    "default": 1, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Controls the intensity of the red channel desaturation relative to the total strength of the filter."
                }),
                "g_channel": (Input.FLOAT, {
                    "default": 1, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Controls the intensity of the green channel desaturation relative to the total strength of the filter."
                }),
                "b_channel": (Input.FLOAT, {
                    "default": 1, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.05, 
                    "tooltip": "Controls the intensity of the blue channel desaturation relative to the total strength of the filter."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        global_level: float = normalize_list_to_value(kwargs.get("global_level"))
        r: float = normalize_list_to_value(kwargs.get("r_channel", 1))
        g: float = normalize_list_to_value(kwargs.get("g_channel", 1))
        b: float = normalize_list_to_value(kwargs.get("b_channel", 1))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=desaturate_effect,
            filter_args={
                'global_level': global_level,
                'channel_levels': [r, g, b],
            },
            filename_prefix="desaturation",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}desaturation", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_GaussianBlur
class LF_GaussianBlur:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "blur_kernel_size": (Input.INTEGER, {
                    "default": 7, 
                    "min": 1, 
                    "max": 51, 
                    "step": 2, 
                    "tooltip": "Controls the size of the Gaussian blur kernel. Higher values mean more smoothing."
                }),
                "blur_sigma": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": 0.0, 
                    "max": 10.0, 
                    "step": 0.1, 
                    "tooltip": "Standard deviation for the Gaussian kernel. Controls blur intensity."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        blur_kernel_size: int = normalize_list_to_value(kwargs.get("blur_kernel_size"))
        blur_sigma: float = normalize_list_to_value(kwargs.get("blur_sigma"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=gaussian_blur_effect,
            filter_args={
                'blur_kernel_size': blur_kernel_size,
                'blur_sigma': blur_sigma,
            },
            filename_prefix="gaussianblur",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}gaussianblur", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Line
class LF_Line:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor to draw a line upon."
                }),
                "start_x": (Input.FLOAT, {
                    "default": 0.5,
                    "min": 0,
                    "max": 1,
                    "tooltip": "Horizontal position to begin the line drawing, expressed as a value between 0 and 1."
                }),
                "start_y": (Input.FLOAT, {
                    "default": 0,
                    "min": 0,
                    "max": 1,
                    "tooltip": "Vertical position to begin the line drawing, expressed as a value between 0 and 1."
                }),
                "end_x": (Input.FLOAT, {
                    "default": 0.5,
                    "min": 0,
                    "max": 1,
                    "tooltip": "Horizontal position to end the line drawing, expressed as a value between 0 and 1."
                }),
                "end_y": (Input.FLOAT, {
                    "default": 1,
                    "min": 0,
                    "max": 1,
                    "tooltip": "Vertical position to end the line drawing, expressed as a value between 0 and 1."
                }),
                "size": (Input.INTEGER, {
                    "default": 10, 
                    "min": 1, 
                    "max": 500, 
                    "step": 1, 
                    "tooltip": "Diameter of the line in pixels."
                }),
                "color": (Input.STRING, {
                    "default": "FF0000", 
                    "tooltip": "Hex color of the line."
                }),
                "opacity": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": 0.0, 
                    "max": 1.0, 
                    "step": 0.01, 
                    "tooltip": "Opacity of the line."
                }),
                "smooth": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Draws a smooth line."
                }),
            },
            "optional": {
                "mid_x": (Input.FLOAT, {
                    "default": 0.25,
                    "min": 0,
                    "max": 1,
                    "tooltip": "Horizontal midpoint of the line, expressed as a value between 0 and 1."
                }),
                "mid_y": (Input.FLOAT, {
                    "default": 0.25,
                    "min": 0,
                    "max": 1,
                    "tooltip": "Vertical midpoint of the line, expressed as a value between 0 and 1."
                }),
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        start_x: float = normalize_list_to_value(kwargs.get("start_x", 0))
        start_y: float = normalize_list_to_value(kwargs.get("start_y", 0))
        end_x: float = normalize_list_to_value(kwargs.get("end_x", 1))
        end_y: float = normalize_list_to_value(kwargs.get("end_y", 1))
        mid_x: float = normalize_list_to_value(kwargs.get("mid_x", (start_x + end_x) / 2))
        mid_y: float = normalize_list_to_value(kwargs.get("mid_y", (start_y + end_y) / 2))
        size: int = normalize_list_to_value(kwargs.get("size"))
        color: str = normalize_list_to_value(kwargs.get("color"))
        smooth: bool = normalize_list_to_value(kwargs.get("smooth"))
        opacity: float = normalize_list_to_value(kwargs.get("opacity"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        points: list[tuple] = [(start_x, start_y)]
        if smooth:
            points.append((mid_x, mid_y))
        points.append((end_x, end_y))

        processed_images = process_and_save_image(
            images=image,
            filter_function=line_effect,
            filter_args={
                'points': points,
                'size': size,
                'color': color,
                'opacity': opacity,
                "smooth": smooth
            },
            filename_prefix="line",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}line", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Sepia
class LF_Sepia:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "intensity": (Input.FLOAT, {
                    "default": 0.5,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.05,
                    "tooltip": "Controls the strength of the sepia effect."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        intensity: float = normalize_list_to_value(kwargs.get("intensity"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=sepia_effect,
            filter_args={
                'intensity': intensity,
            },
            filename_prefix="sepia",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}sepia", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

# region LF_Vignette
class LF_Vignette:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image tensor or a list of image tensors."
                }),
                "intensity": (Input.FLOAT, {
                    "default": 0.5,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.05,
                    "tooltip": "Controls the darkness of the vignette effect. Higher values mean darker edges."
                }),
                "radius": (Input.FLOAT, {
                    "default": 0.75,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.05,
                    "tooltip": "Controls the size of the vignette effect. Lower values mean a smaller vignette."
                }),
                "shape": (["elliptical", "circular"], {
                    "default": "elliptical",
                    "tooltip": "Selects the shape of the vignette effect."
                }),
                "color": (Input.STRING, {
                    "default": "000000", 
                    "tooltip": "Color to use for padding if 'pad' mode is selected (hexadecimal)."
                })
            },
            "optional": {
                "ui_widget": (Input.KUL_COMPARE, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        intensity: float = normalize_list_to_value(kwargs.get("intensity"))
        radius: float = normalize_list_to_value(kwargs.get("radius"))
        shape: str = normalize_list_to_value(kwargs.get("shape", "elliptical"))
        color: str = normalize_list_to_value(kwargs.get("color", "000000"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images = process_and_save_image(
            images=image,
            filter_function=vignette_effect,
            filter_args={
                'intensity': intensity,
                'radius': radius,
                'shape': shape,
                'color': color,
            },
            filename_prefix="vignette",
            nodes=nodes,
        )

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}vignette", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (batch_list[0], image_list)
# endregion

NODE_CLASS_MAPPINGS = {
    "LF_Blend": LF_Blend,
    "LF_Brightness": LF_Brightness,
    "LF_Clarity": LF_Clarity,
    "LF_Contrast": LF_Contrast,
    "LF_Desaturation": LF_Desaturation,
    "LF_GaussianBlur": LF_GaussianBlur,
    "LF_Line": LF_Line,
    "LF_Sepia": LF_Sepia,
    "LF_Vignette": LF_Vignette
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Blend": "Blend",
    "LF_Brightness": "Brightness",
    "LF_Clarity": "Clarity",
    "LF_Contrast": "Contrast",
    "LF_Desaturation": "Desaturation",
    "LF_GaussianBlur": "Gaussian Blur",
    "LF_Line": "Line",
    "LF_Sepia": "Sepia",
    "LF_Vignette": "Vignette"
}
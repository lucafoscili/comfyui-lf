import torch

from server import PromptServer

from ..utils.constants import CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, Input
from ..utils.filters import brightness_effect, clarity_effect, contrast_effect, desaturate_effect, vignette_effect
from ..utils.helpers import create_compare_node, get_resource_url, normalize_input_image, normalize_list_to_value, normalize_output_image, resolve_filepath, tensor_to_pil

CATEGORY = f"{CATEGORY_PREFIX}/Filters"

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

        processed_images: list[torch.Tensor] = []

        for _, img in enumerate(image):
            processed = brightness_effect(img, brightness_strength, gamma, midpoint, localized_brightness)
            processed_images.append(processed)

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
        dataset: dict = { "nodes": nodes }
        
        processed_images: list[torch.Tensor] = []

        for index, img in enumerate(image):
            pil_image = tensor_to_pil(img)

            output_file_s, subfolder_s, filename_s = resolve_filepath(
                    filename_prefix="clarity_s",
                    image=img,
            )
            pil_image.save(output_file_s, format="PNG")
            filename_s = get_resource_url(subfolder_s, filename_s, "temp")

            processed = clarity_effect(img, clarity_strength, sharpen_amount, blur_kernel_size)
            pil_image = tensor_to_pil(processed)

            output_file_t, subfolder_t, filename_t = resolve_filepath(
                    filename_prefix="clarity_t",
                    image=processed,
            )
            pil_image.save(output_file_t, format="PNG")
            filename_t = get_resource_url(subfolder_t, filename_t, "temp")

            nodes.append(create_compare_node(filename_s, filename_t, index))
            processed_images.append(processed)
        
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

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        contrast_strength: float = normalize_list_to_value(kwargs.get("contrast_strength"))
        midpoint: float = normalize_list_to_value(kwargs.get("midpoint"))
        localized_contrast: bool = kwargs.get("localized_contrast", False)

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        processed_images: list[torch.Tensor] = []

        for _, img in enumerate(image):
            processed = contrast_effect(img, contrast_strength, midpoint, localized_contrast)
            processed_images.append(processed)

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
                "desaturation_strength": (Input.FLOAT, {
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
        desaturation_strength: float = normalize_list_to_value(kwargs.get("desaturation_strength"))
        r: float = normalize_list_to_value(kwargs.get("r_channel", 0))
        g: float = normalize_list_to_value(kwargs.get("g_channel", 0))
        b: float = normalize_list_to_value(kwargs.get("b_channel", 0))

        nodes: list[dict] = []
        dataset: dict = { "nodes": nodes }
        
        processed_images: list[torch.Tensor] = []

        for index, img in enumerate(image):
            pil_image = tensor_to_pil(img)

            output_file_s, subfolder_s, filename_s = resolve_filepath(
                filename_prefix="desaturation_s",
                image=img,
            )
            pil_image.save(output_file_s, format="PNG")
            filename_s = get_resource_url(subfolder_s, filename_s, "temp")

            processed = desaturate_effect(img, desaturation_strength, [r, g, b])
            pil_image = tensor_to_pil(processed)

            output_file_t, subfolder_t, filename_t = resolve_filepath(
                filename_prefix="desaturation_t",
                image=processed,
            )
            pil_image.save(output_file_t, format="PNG")
            filename_t = get_resource_url(subfolder_t, filename_t, "temp")

            nodes.append(create_compare_node(filename_s, filename_t, index))
            processed_images.append(processed)

        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}desaturation", {
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
        dataset: dict = { "nodes": nodes }

        processed_images: list[torch.Tensor] = []

        for index, img in enumerate(image):
            pil_image = tensor_to_pil(img)

            output_file_s, subfolder_s, filename_s = resolve_filepath(
                filename_prefix="vignette_s",
                image=img,
            )
            pil_image.save(output_file_s, format="PNG")
            filename_s = get_resource_url(subfolder_s, filename_s, "temp")

            processed = vignette_effect(img, intensity, radius, shape, color)
            pil_image = tensor_to_pil(processed)

            output_file_t, subfolder_t, filename_t = resolve_filepath(
                filename_prefix="vignette_t",
                image=processed,
            )
            pil_image.save(output_file_t, format="PNG")
            filename_t = get_resource_url(subfolder_t, filename_t, "temp")

            nodes.append(create_compare_node(filename_s, filename_t, index))
            processed_images.append(processed)
        
        batch_list, image_list = normalize_output_image(processed_images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}vignette", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })
        
        return (batch_list[0], image_list)
# endregion
NODE_CLASS_MAPPINGS = {
    "LF_Brightness": LF_Brightness,
    "LF_Clarity": LF_Clarity,
    "LF_Contrast": LF_Contrast,
    "LF_Desaturation": LF_Desaturation,
    "LF_Vignette": LF_Vignette
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Brightness": "Brightness",
    "LF_Clarity": "Clarity",
    "LF_Contrast": "Contrast",
    "LF_Desaturation": "Desaturation",
    "LF_Vignette": "Vignette"
}
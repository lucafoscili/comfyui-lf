import io

from PIL import Image, ImageFilter
from server import PromptServer

from ..utils.constants import *
from ..utils.helpers import *
from ..utils.image import *

CATEGORY = f"{CATEGORY_PREFIX}/Image"

# region LF_BlurImages
class LF_BlurImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "List of images to blur."}),
                "blur_percentage": ("FLOAT", {"default": 0.25, "min": 0.05, "max": 1.0, "step": 0.05, "tooltip": "0% Blur: No blur applied, the image remains as-is. 100% Blur: Maximum blur applied based on the image's dimensions, which would result in a highly blurred (almost unrecognizable) image."})
            },
            "optional": {
                "file_name": ("STRING", {"forceInput": True, "tooltip": "Corresponding list of file names for the images."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, False, True, False)
    OUTPUT_IS_LIST = (False, True, True, False)
    RETURN_NAMES = ("image", "image_list", "file_name", "count")
    RETURN_TYPES = ("IMAGE", "IMAGE", "STRING", "INT")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], file_name:list[str], blur_percentage:float):
        blur_percentage = normalize_list_to_value(blur_percentage)
        file_name = normalize_input_list(file_name)
        image = normalize_input_image(image)

        blurred_images = []
        blurred_file_names = []
        b64_images = []

        for index, img in enumerate(image):
            f_name = file_name[index]
            split_name = f_name.rsplit('.', 1)
            if len(split_name) == 2:
                base_name, original_extension = split_name
            else:
                base_name = split_name[0]
                original_extension = ""

            pil_image = tensor_to_pil(img)
            
            width, height = pil_image.size
            min_dimension = min(width, height)
            adjusted_blur_radius:float = blur_percentage * (min_dimension / 10)
            
            blurred_image = pil_image.filter(ImageFilter.GaussianBlur(adjusted_blur_radius))
            
            blurred_tensor = pil_to_tensor(blurred_image)
            blurred_images.append(blurred_tensor)

            b64_image = tensor_to_base64(blurred_tensor)
            b64_images.append(b64_image)
            
            new_file_name = f"{base_name}_Blur{'.' + original_extension if original_extension else ''}"
            blurred_file_names.append(new_file_name)

        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}blurimages", {
            "node": node_id,
            "fileNames": blurred_file_names,
            "images": b64_images,
        })

        image_batch, image_list = normalize_output_image(blurred_images)

        return (image_batch[0], image_list, blurred_file_names, index)
# endregion
# region LF_ClarityEffect
class LF_ClarityEffect:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "clarity_strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 5.0, "step": 0.1, "tooltip": "Controls the amount of contrast enhancement in midtones."}),
                "sharpen_amount": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 5.0, "step": 0.1, "tooltip": "Controls how much sharpening is applied to the image."}),
                "blur_kernel_size": ("INT", {"default": 7, "min": 1, "max": 15, "step": 2, "tooltip": "Controls the size of the Gaussian blur kernel. Higher values mean more smoothing."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, False, False, False, False)
    OUTPUT_IS_LIST = (False, True)
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], clarity_strength:float, sharpen_amount:float, blur_kernel_size:int):
        image = normalize_input_image(image)
        clarity_strength = normalize_list_to_value(clarity_strength)
        sharpen_amount = normalize_list_to_value(sharpen_amount)
        blur_kernel_size = normalize_list_to_value(blur_kernel_size)

        nodes = []
        dataset = { "nodes": nodes }
        
        processed_images = [clarity_effect(img, clarity_strength, sharpen_amount, blur_kernel_size) for img in image]

        for i, img in enumerate(image):
            b64_source = tensor_to_base64(img)
            b64_target = tensor_to_base64(processed_images[i])

            nodes.append({
                "cells": {
                    "kulImage": {"shape": "image", "kulValue": f"{BASE64_PNG_PREFIX}{b64_source}", "value": ''},
                    "kulImage_after": {"shape": "image", "kulValue": f"{BASE64_PNG_PREFIX}{b64_target}", "value": ''}
                },
                "id": f"image_{i+1}",
                "value": f"Comparison {i+1}"
            })

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}clarityeffect", {
            "node": node_id,
            "dataset": dataset,
        })
        
        batch_list, list = normalize_output_image(processed_images)
        
        return (batch_list[0], list)
# endregion
# region LF_CompareImages
class LF_CompareImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "First input image tensor or a list of image tensors."}),
            },
            "optional": {
                "image_opt": ("IMAGE", {"tooltip": "Second input image tensor or a list of image tensors (optional)."})
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, True, False)
    OUTPUT_IS_LIST = (False, True, True, False)
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "image_list", "all_images", "dataset")
    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "JSON")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], image_opt:torch.Tensor|list[torch.Tensor] = None):
        image_list_1 = normalize_input_image(image)
        image_list_2 = normalize_input_image(image_opt) if image_opt is not None else image_list_1
        
        nodes = []
        dataset = { "nodes": nodes }

        if len(image_list_1) != len(image_list_2):
            raise ValueError("Image lists must have the same length if both inputs are provided.")
        
        for i, img1 in enumerate(image_list_1):
            b64_img1 = tensor_to_base64(img1)
            dataset_entry = {
                "cells": {
                    "kulImage_1": {"shape": "image", "kulValue": f"{BASE64_PNG_PREFIX}{b64_img1}", "value": ''}
                },
                "id": f"comparison_{i+1}",
                "value": f"Comparison {i+1}"
            }

            if image_opt is not None:
                b64_img2 = tensor_to_base64(image_list_2[i])
                dataset_entry["cells"]["kulImage_2"] = {"shape": "image", "kulValue": f"{BASE64_PNG_PREFIX}{b64_img2}", "value": ''}

            nodes.append(dataset_entry)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}compareimages", {
            "node": node_id,
            "dataset": dataset,
        })

        image_batch, image_list = normalize_output_image(image)

        combined_images = image_list_1 + (image_list_2 if image_opt is not None else [])
        _, all_images_list = normalize_output_image(combined_images)

        return (image_batch[0], image_list, all_images_list, dataset)
# endregion
# region LF_MultipleImageResizeForWeb
class LF_MultipleImageResizeForWeb:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"type": "IMAGE", "tooltip": "List of images to process."}),
                "file_name": ("STRING", {"forceInput": True, "tooltip": "Corresponding list of file names for the images."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, True, False)
    OUTPUT_IS_LIST = (False, True, False, True, True, False)
    RETURN_NAMES = ("image", "image_list", "name", "name_list", "names_with_dir", "dataset")
    RETURN_TYPES = ("IMAGE", "IMAGE", "STRING", "STRING", "STRING", "JSON")

    def on_exec(self, node_id:str, image:list[torch.Tensor], file_name:list[str]):
        image = normalize_input_image(image)
        file_name = normalize_input_list(file_name)

        nodes = []
        dataset = { "nodes": nodes }

        output_file_names = []
        output_file_names_with_dir = []
        output_images = []
        resolutions = [256, 320, 512, 640, 1024, 1280, 2048, 2560]

        for index, img in enumerate(image):
            f_name = file_name[index]
            split_name = f_name.rsplit('.', 1)
            if len(split_name) == 2:
                base_name, original_extension = split_name
                original_extension.lower()
            else:
                base_name = split_name[0]
                original_extension = ""

            img = tensor_to_pil(img)

            img_byte_arr = io.BytesIO()

            try:
                image_format = 'PNG' if original_extension not in ['jpeg', 'jpg', 'png', 'webp'] else original_extension.upper()
                img.save(img_byte_arr, format=image_format)
            except KeyError:
                print(f"Unknown format '{original_extension}', falling back to PNG.")
                img.save(img_byte_arr, format='PNG')

            img_byte_arr = img_byte_arr.getvalue()

            output_images.append(pil_to_tensor(img)) 
            output_file_names.append(f"{base_name}.{image_format}")
            output_file_names_with_dir.append(f"HD/{base_name}.{image_format}")

            children:list[dict] = []
            rootNode = {
                "children": children,
                "id": base_name,
                "value": base_name
            }

            for r in resolutions:
                if img.width > img.height:
                    new_width = r
                    new_height = int(img.height * r / img.width)
                else:
                    new_height = r
                    new_width = int(img.width * r / img.height)

                resized_image = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

                img_byte_arr = io.BytesIO()
                resized_image.save(img_byte_arr, format='WEBP', quality=60)
                img_byte_arr = img_byte_arr.getvalue()

                output_images.append(pil_to_tensor(resized_image))
                output_file_names.append(f"{r}w_{base_name}.webp")
                output_file_names_with_dir.append(f"{r}w/{r}w_{base_name}.webp")

                childNode = {
                    "id": f"{r}w_{base_name}",
                    "value": f"{r}w_{base_name}"
                }
                children.append(childNode)

            nodes.append(rootNode)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}multipleimageresizeforweb", {
            "node": node_id,
            "dataset": dataset,
        })

        image_batch, image_list = normalize_output_image(output_images)

        return (image_batch[0], image_list, output_file_names, output_file_names, output_file_names_with_dir, dataset)
# endregion
# region LF_ResizeImageByEdge
class LF_ResizeImageByEdge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "longest_edge": ("BOOLEAN", {"default": False, "tooltip": "Resizes the image by the longest side if set to True. Otherwise, resizes by the shortest side."}),
                "new_size": ("INT", {"default": 1024, "tooltip": "The size of the longest edge of the output image."}),
                "resize_method": (RESAMPLERS, {"default": "bicubic", "tooltip": "Method to resize the image."})
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, False, False, False, False)
    OUTPUT_IS_LIST = (False, True, False)
    RETURN_NAMES = ("image", "image_list", "count")
    RETURN_TYPES = ("IMAGE", "IMAGE", "INT")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], longest_edge: bool, new_size: int, resize_method: str):
        image = normalize_input_image(image)
        longest_edge = normalize_list_to_value(longest_edge)
        new_size = normalize_list_to_value(new_size)
        resize_method = normalize_list_to_value(resize_method)

        nodes = []
        root = { "children": nodes, "icon":"help", "id": "", "value": "" }
        dataset = { "nodes": [root] }

        original_heights = []
        original_widths = []
        heights = []
        widths = []

        resized_images = []

        for idx, img in enumerate(image):
            original_height, original_width = img.shape[1], img.shape[2]
            original_heights.append(original_height)
            original_widths.append(original_width)

            resized_img = resize_image(img, resize_method, longest_edge, new_size)
            resized_images.append(resized_img)

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights.append(new_height)
            widths.append(new_width)

            log_str = f"[{idx}] From {original_height}x{original_width} to {new_height}x{new_width}"
            nodes.append({ "id": log_str, "value": log_str })
            
        num_resized = len(resized_images)
        summary_message = f"Resized {num_resized} {'image' if num_resized == 1 else 'images'}"
        root["id"] = summary_message
        root["value"] = summary_message

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}resizeimagebyedge", {
            "node": node_id,
            "dataset": dataset,
        })

        image_batch, image_list = normalize_output_image(resized_images)

        return (image_batch[0], image_list, num_resized)
# endregion
# region LF_ResizeImageToDimension
class LF_ResizeImageToDimension:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "height": ("INT", {"default": 1216, "tooltip": "The target height for the output image."}),
                "width": ("INT", {"default": 832, "tooltip": "The target width for the output image."}),
                "resize_method": (RESAMPLERS, {"default": "bicubic", "tooltip": "Method to resize the image."}),
                "resize_mode": (["crop", "pad"], {"default": "crop", "tooltip": "Choose whether to crop or pad when resizing."}),
                "pad_color": ("STRING", {"default": "000000", "tooltip": "Color to use for padding if 'pad' mode is selected (hexadecimal)."})
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, False, False, False, False, False, False)
    OUTPUT_IS_LIST = (False, True, False)
    RETURN_NAMES = ("image", "image_list", "count")
    RETURN_TYPES = ("IMAGE", "IMAGE", "INT")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], height: int, width: int, resize_method: str, resize_mode:str, pad_color:str):
        image = normalize_input_image(image)
        height = normalize_list_to_value(height)
        width = normalize_list_to_value(width)
        resize_method = normalize_list_to_value(resize_method)
        resize_mode = normalize_list_to_value(resize_mode)
        pad_color = normalize_list_to_value(pad_color)

        nodes = []
        root = { "children": nodes, "icon":"help", "id": "", "value": "" }
        dataset = { "nodes": [root] }

        original_heights = []
        original_widths = []
        heights = []
        widths = []

        resized_images = []

        for idx, img in enumerate(image):
            original_height, original_width = img.shape[1], img.shape[2]
            original_heights.append(original_height)
            original_widths.append(original_width)

            resized_img = resize_and_crop_image(img, resize_method, height, width, resize_mode, pad_color)
            resized_images.append(resized_img)

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights.append(new_height)
            widths.append(new_width)

            log_str = f"[{idx}] From {original_height}x{original_width} to {new_height}x{new_width}"
            nodes.append({ "id": log_str, "value": log_str })
        
        num_resized = len(resized_images)
        summary_message = f"Resized {num_resized} {'image' if num_resized == 1 else 'images'}"
        root["id"] = summary_message
        root["value"] = summary_message

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}resizeimagetodimension", {
            "node": node_id,
            "dataset": dataset,
        })

        image_batch, image_list = normalize_output_image(resized_images)

        return (image_batch[0], image_list, num_resized)
# endregion
# region LF_ResizeImageToSquare
class LF_ResizeImageToSquare:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "square_size": ("INT", {"default": 1024, "tooltip": "The length of the square's edge."}),
                "resize_method": (RESAMPLERS, {"default": "bicubic", "tooltip": "Resampling method for resizing."}),
                "crop_position": (["top", "bottom", "left", "right", "center"], {"default": "center", "tooltip": "Where to crop the image."})
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, False, False, False, False)
    OUTPUT_IS_LIST = (False, True, False)
    RETURN_NAMES = ("image", "image_list", "count")
    RETURN_TYPES = ("IMAGE", "IMAGE", "INT")

    def on_exec(self, node_id:str, image, square_size: int, resize_method: str, crop_position: str):
        image = normalize_input_image(image)
        square_size = normalize_list_to_value(square_size)
        resize_method = normalize_list_to_value(resize_method)
        crop_position = normalize_list_to_value(crop_position)

        nodes = []
        root = { "children": nodes, "icon":"help", "id": "", "value": "" }
        dataset = { "nodes": [root] }

        original_heights = []
        original_widths = []
        heights = []
        widths = []

        resized_images = []

        for idx, img in enumerate(image):
            original_height, original_width = img.shape[1], img.shape[2]
            original_heights.append(original_height)
            original_widths.append(original_width)

            resized_img = resize_to_square(img, square_size, resize_method, crop_position)
            resized_images.append(resized_img)

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights.append(new_height)
            widths.append(new_width)

            log_str = f"[{idx}] From {original_height}x{original_width} to {new_height}x{new_width}"
            nodes.append({ "id": log_str, "value": log_str })

        num_resized = len(resized_images)
        summary_message = f"Resized {num_resized} {'image' if num_resized == 1 else 'images'}"
        root["id"] = summary_message
        root["value"] = summary_message

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}resizeimagetosquare", {
            "node": node_id,
            "dataset": dataset,
        })

        image_batch, image_list = normalize_output_image(resized_images)

        return (image_batch[0], image_list, num_resized)
# endregion
# region Mappings
NODE_CLASS_MAPPINGS = {
    "LF_BlurImages": LF_BlurImages,
    "LF_ClarityEffect": LF_ClarityEffect,
    "LF_CompareImages": LF_CompareImages,
    "LF_MultipleImageResizeForWeb": LF_MultipleImageResizeForWeb,
    "LF_ResizeImageToDimension": LF_ResizeImageToDimension,
    "LF_ResizeImageToSquare": LF_ResizeImageToSquare,
    "LF_ResizeImageByEdge": LF_ResizeImageByEdge,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_BlurImages": "Blur images",
    "LF_ClarityEffect": "Clarity effect (filter)",
    "LF_CompareImages": "Compare images",
    "LF_MultipleImageResizeForWeb": "Multiple image resize for Web",
    "LF_ResizeImageToDimension": "Resize image to dimension",
    "LF_ResizeImageToSquare": "Resize image to square",
    "LF_ResizeImageByEdge": "Resize image by edge",
}
# endregion
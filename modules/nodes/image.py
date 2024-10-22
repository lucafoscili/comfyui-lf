import io

from PIL import Image, ImageFilter
from server import PromptServer

from ..utils.common import normalize_input_image, normalize_list_to_value, normalize_output_image
from ..utils.image import *

category = "✨ LF Nodes/Conversion"

b64_prefix = "data:image/png;charset=utf-8;base64,"

class LF_BlurImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {"tooltip": "List of images to blur."}),
                "file_names": ("STRING", {"forceInput": True, "tooltip": "Corresponding list of file names for the images."}),
                "blur_percentage": ("FLOAT", {"default": 0.25, "min": 0.05, "max": 1.0, "step": 0.05, "tooltip": "0% Blur: No blur applied, the image remains as-is. 100% Blur: Maximum blur applied based on the image's dimensions, which would result in a highly blurred (almost unrecognizable) image."})
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, True, False, False)
    OUTPUT_IS_LIST = (True, True)
    RETURN_NAMES = ("images", "file_names")
    RETURN_TYPES = ("IMAGE", "STRING")

    def on_exec(self, node_id, images, file_names, blur_percentage):
        blurred_images = []
        blurred_file_names = []

        if isinstance(blur_percentage, (list, tuple)):
            blur_percentage = blur_percentage[0]  # Take the first value if it's a list or tuple

        for index, image_data in enumerate(images):
            
            file_name = file_names[index]
            base_name, original_extension = file_name.rsplit('.', 1)  # Split base name and extension
            
            # Convert the tensor to a PIL Image
            image = tensor_to_pil(image_data)
            
            # Scale the blur radius based on image size
            width, height = image.size
            min_dimension = min(width, height)
            adjusted_blur_radius = blur_percentage * (min_dimension / 10)
            
            # Apply Gaussian blur with the adjusted blur radius
            blurred_image = image.filter(ImageFilter.GaussianBlur(adjusted_blur_radius))
            
            # Convert the blurred image back to a tensor
            blurred_tensor = pil_to_tensor(blurred_image)
            blurred_images.append(blurred_tensor)
            
            # Construct the new file name with '_Blur' suffix
            new_file_name = f"{base_name}_Blur.{original_extension}"
            blurred_file_names.append(new_file_name)

        b64_images = tensor_to_base64(blurred_images)
        
        PromptServer.instance.send_sync("lf-blurimages", {
            "node": node_id,
            "fileNames": blurred_file_names,
            "images": b64_images,
        })

        return (blurred_images, blurred_file_names,)

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
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, False, False, False)
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image","image")
    RETURN_TYPES = ("IMAGE","IMAGE")

    def on_exec(self, node_id, image, clarity_strength: float, sharpen_amount: float, blur_kernel_size: int):
        image_list = normalize_input_image(image)
        clarity_strength = normalize_list_to_value(clarity_strength)
        sharpen_amount = normalize_list_to_value(sharpen_amount)
        blur_kernel_size = normalize_list_to_value(blur_kernel_size)
        
        processed_images = [clarity_effect(img, clarity_strength, sharpen_amount, blur_kernel_size) for img in image_list]

        dataset = {"nodes": []}
        for i, img in enumerate(image_list):
            b64_source = tensor_to_base64(img)
            b64_target = tensor_to_base64(processed_images[i])

            dataset["nodes"].append({
                "cells": {
                    "kulImage": {"shape": "image", "kulValue": f"{b64_prefix}{b64_source}", "value": ''},
                    "kulImage_after": {"shape": "image", "kulValue": f"{b64_prefix}{b64_target}", "value": ''}
                },
                "id": f"image_{i+1}",
                "value": f"Comparison {i+1}"
            })

        PromptServer.instance.send_sync("lf-clarityeffect", {
            "node": node_id,
            "dataset": dataset,
        })
        
        batch, list = normalize_output_image(processed_images)
        
        return (batch, list)
    
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

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, True)
    OUTPUT_IS_LIST = (False, True, False)
    RETURN_NAMES = ("image", "all_images", "dataset")
    RETURN_TYPES = ("IMAGE", "IMAGE", "JSON")

    def on_exec(self, node_id, image, image_opt=None):
        image_list_1 = normalize_input_image(image)
        image_list_2 = normalize_input_image(image_opt) if image_opt is not None else image_list_1

        if len(image_list_1) != len(image_list_2):
            raise ValueError("Image lists must have the same length if both inputs are provided.")
        
        dataset = {"nodes": []}
        for i, img1 in enumerate(image_list_1):
            b64_img1 = tensor_to_base64(img1)
            dataset_entry = {
                "cells": {
                    "kulImage_1": {"shape": "image", "kulValue": f"{b64_prefix}{b64_img1}", "value": ''}
                },
                "id": f"comparison_{i+1}",
                "value": f"Comparison {i+1}"
            }

            if image_opt is not None:
                b64_img2 = tensor_to_base64(image_list_2[i])
                dataset_entry["cells"]["kulImage_2"] = {"shape": "image", "kulValue": f"{b64_prefix}{b64_img2}", "value": ''}

            dataset["nodes"].append(dataset_entry)

        PromptServer.instance.send_sync("lf-compareimages", {
            "node": node_id,
            "dataset": dataset,
        })

        image_batch = torch.cat(image_list_1, dim=0) if len(image_list_1) > 1 else image_list_1[0]

        all_images_list = image_list_1 + (image_list_2 if image_opt is not None else [])

        return (image_batch, all_images_list, dataset)

class LF_MultipleImageResizeForWeb:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {"type": "IMAGE", "tooltip": "List of images to process."}),
                "file_names": ("STRING", {"forceInput": True, "type": "STRING", "tooltip": "Corresponding list of file names for the images."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, True,)
    OUTPUT_IS_LIST = (True, True, True, False,)
    RETURN_NAMES = ("images", "names", "names_with_dir", "json_data",)
    RETURN_TYPES = ("IMAGE", "STRING", "STRING", "JSON",)

    def on_exec(self, node_id, images, file_names):
        dataset = { "nodes": [], }
        output_file_names = []
        output_file_names_with_dir = []
        output_images = []
        resolutions = [256, 320, 512, 640, 1024, 1280, 2048, 2560]

        for index, image_data in enumerate(images):
            file_name = file_names[index]
            base_name = file_name.split('.')[0]
            original_extension = file_name.split('.')[-1].lower()

            image = tensor_to_pil(image_data)

            img_byte_arr = io.BytesIO()

            try:
                image_format = 'PNG' if original_extension not in ['jpeg', 'jpg', 'png', 'webp'] else original_extension.upper()
                image.save(img_byte_arr, format=image_format)
            except KeyError as e:
                print(f"Unknown format '{original_extension}', falling back to PNG.")
                image.save(img_byte_arr, format='PNG')

            img_byte_arr = img_byte_arr.getvalue()

            output_images.append(pil_to_tensor(image)) 
            output_file_names.append(f"{base_name}.{image_format}")
            output_file_names_with_dir.append(f"HD/{base_name}.{image_format}")

            rootNode = {
                "children": [],
                "id": base_name,
                "value": base_name
            }

            for resolution in resolutions:
                if image.width > image.height:
                    new_width = resolution
                    new_height = int(image.height * resolution / image.width)
                else:
                    new_height = resolution
                    new_width = int(image.width * resolution / image.height)

                resized_image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)

                img_byte_arr = io.BytesIO()
                resized_image.save(img_byte_arr, format='WEBP', quality=60)
                img_byte_arr = img_byte_arr.getvalue()

                output_images.append(pil_to_tensor(resized_image))
                output_file_names.append(f"{resolution}w_{base_name}.webp")
                output_file_names_with_dir.append(f"{resolution}w/{resolution}w_{base_name}.webp")

                childNode = {
                    "id": f"{resolution}w_{base_name}",
                    "value": f"{resolution}w_{base_name}"
                }
                rootNode["children"].append(childNode)

            dataset["nodes"].append(rootNode)

        PromptServer.instance.send_sync("lf-multipleimageresizeforweb", {
            "node": node_id,
            "dataset": dataset,
        })

        return (output_images, output_file_names, output_file_names_with_dir, dataset)

class LF_ResizeImageByEdge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "longest_edge": ("BOOLEAN", {"default": False, "tooltip": "Resizes the image by the longest side if set to True. Otherwise, resizes by the shortest side."}),
                "new_size": ("INT", {"default": 1024, "tooltip": "The size of the longest edge of the output image."}),
                "resize_method": (["bicubic", "bilinear", "linear", "nearest", "nearest exact"], {"default": "bicubic", "tooltip": "Method to resize the image."})
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("resized_image",)
    RETURN_TYPES = ("IMAGE",)

    def on_exec(self, node_id, image, longest_edge: bool, new_size: int, resize_method: str):
        dataset = { "nodes": [{ "children": [], "icon":"help", "id": "", "value": "" }] }
        resized_image = []
        
        original_heights = []
        original_widths = []
        heights = []
        widths = []

        if isinstance(image, list):
            for idx, img in enumerate(image):
                original_height, original_width = img.shape[1], img.shape[2]
                original_heights.append(original_height)
                original_widths.append(original_width)

            resized_images = [resize_image(tensor, resize_method, longest_edge, new_size) for tensor in image]
            
            for img in resized_images:
                height, width = img.shape[1], img.shape[2]
                heights.append(height)
                widths.append(width)

            log_str = f"[{idx}] From {original_height}x{original_width} to {height}x{width}"
            node = {
                "id": log_str,
                "value": log_str
            }
            dataset["nodes"][0]["children"].append(node)

            resized_image = resized_images
        else:
            original_height, original_width = image.shape[1], image.shape[2]
            original_heights = [original_height]
            original_widths = [original_width]

            resized_image = resize_image(image, resize_method, longest_edge, new_size)
            height, width = resized_image.shape[1], resized_image.shape[2] 
            heights = [height]
            widths = [width]

            log_str = f"From {original_height}x{original_width} to {height}x{width}."
            node = {
                "id": log_str,
                "value": log_str
            }
            dataset["nodes"][0]["children"].append(node)

        num_resized = len(image)
        summary_message = f"Resized {num_resized} {'image' if num_resized == 1 else 'images'}"   
        dataset["nodes"][0]["id"] = summary_message
        dataset["nodes"][0]["value"] = summary_message

        PromptServer.instance.send_sync("lf-resizeimagebyedge", {
            "node": node_id,
            "dataset": dataset,
            "original_heights": original_heights,
            "original_widths": original_widths,
            "heights": heights,
            "widths": widths
        })

        return (resized_image,)
    
class LF_ResizeImageToDimension:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "height": ("INT", {"default": 1216, "tooltip": "The target height for the output image."}),
                "width": ("INT", {"default": 832, "tooltip": "The target width for the output image."}),
                "resize_method": (["bicubic", "bilinear", "nearest", "nearest exact"], {"default": "bicubic", "tooltip": "Method to resize the image."}),
                "resize_mode": (["crop", "pad"], {"default": "crop", "tooltip": "Choose whether to crop or pad when resizing."}),
                "pad_color": ("STRING", {"default": "000000", "tooltip": "Color to use for padding if 'pad' mode is selected (hexadecimal)."})
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("resized_image",)
    RETURN_TYPES = ("IMAGE",)

    def on_exec(self, node_id, image, height: int, width: int, resize_method: str, resize_mode:str, pad_color:str):
        dataset = { "nodes": [{ "children": [], "icon":"help", "id": "", "value": "" }] }
        original_heights = []
        original_widths = []
        heights = []
        widths = []

        if isinstance(image, list):
            for idx, img in enumerate(image):
                original_height, original_width = img.shape[1], img.shape[2]
                original_heights.append(original_height)
                original_widths.append(original_width)

            resized_images = [resize_and_crop_image(img, resize_method, height, width, resize_mode, pad_color) for img in image]
            
            for idx, img in enumerate(resized_images):
                height, width = img.shape[1], img.shape[2]
                heights.append(height)
                widths.append(width)
                log_str = f"[{idx}] From {original_height}x{original_width} to {height}x{width}"
                node = {
                    "id": log_str,
                    "value": log_str
                }
                dataset["nodes"][0]["children"].append(node)
        else:
            original_height, original_width = image.shape[1], image.shape[2]

            resized_images = resize_and_crop_image(image, resize_method, height, width, resize_mode, pad_color)

            log_str = f"From {original_height}x{original_width} to {height}x{width}"
            node = {
                "id": log_str,
                "value": log_str
            }
            dataset["nodes"][0]["children"].append(node)

        num_resized = len(resized_images)
        summary_message = f"Resized {num_resized} {'image' if num_resized == 1 else 'images'}"
        dataset["nodes"][0]["id"] = summary_message
        dataset["nodes"][0]["value"] = summary_message

        PromptServer.instance.send_sync("lf-resizeimagetodimension", {
            "node": node_id,
            "dataset": dataset,
        })

        return (resized_images,)

class LF_ResizeImageToSquare:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {"tooltip": "Input image tensors in [B, H, W, C] format."}),
                "square_size": ("INT", {"default": 1024, "tooltip": "The length of the square's edge."}),
                "resample_method": (["bicubic", "bilinear", "linear", "nearest", "nearest exact"], {"default": "bicubic", "tooltip": "Resampling method for resizing."}),
                "crop_position": (["top", "bottom", "left", "right", "center"], {"default": "center", "tooltip": "Where to crop the image."})
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("resized_images",)
    RETURN_TYPES = ("IMAGE",)

    def on_exec(self, node_id, images, square_size: int, resample_method: str, crop_position: str):
        dataset = { "nodes": [{ "children": [], "icon":"help", "id": "", "value": "" }] }
        resized_images = []
        original_heights = []
        original_widths = []
        heights = []
        widths = []

        if isinstance(images, list):
            for idx, img in enumerate(images):
                original_height, original_width = img.shape[1], img.shape[2]
                original_heights.append(original_height)
                original_widths.append(original_width)

                resized_img = resize_to_square(img, square_size, resample_method, crop_position)
                resized_images.append(resized_img)

                new_height, new_width = resized_img.shape[1], resized_img.shape[2]
                heights.append(new_height)
                widths.append(new_width)

                log_str = f"[{idx}] From {original_height}x{original_width} to {new_height}x{new_width}"
                node = {"id": log_str, "value": log_str}
                dataset["nodes"][0]["children"].append(node)

        else:
            original_height, original_width = images.shape[1], images.shape[2]
            original_heights = [original_height]
            original_widths = [original_width]

            resized_img = resize_to_square(images, square_size, resample_method, crop_position)
            resized_images = [resized_img]

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights = [new_height]
            widths = [new_width]

            log_str = f"From {original_height}x{original_width} to {new_height}x{new_width}."
            node = {"id": log_str, "value": log_str}
            dataset["nodes"][0]["children"].append(node)

        num_resized = len(resized_images)
        summary_message = f"Resized {num_resized} {'image' if num_resized == 1 else 'images'}"
        dataset["nodes"][0]["id"] = summary_message
        dataset["nodes"][0]["value"] = summary_message

        PromptServer.instance.send_sync("lf-resizeimagetosquare", {
            "node": node_id,
            "dataset": dataset,
        })

        return resized_images

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

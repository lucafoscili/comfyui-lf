import io
import torch

from PIL import Image, ImageFilter
from server import PromptServer

from ..utils.constants import CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, RESAMPLERS
from ..utils.helpers import clarity_effect, create_compare_node, create_masonry_node, create_resize_node, get_resource_url, normalize_input_image, normalize_input_list, normalize_list_item, normalize_list_to_value, normalize_output_image, pil_to_tensor, resize_and_crop_image, resize_image, resize_to_square, resolve_filepath, tensor_to_pil

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

    def on_exec(self, node_id: str, image: torch.Tensor|list[torch.Tensor], blur_percentage: float, file_name: list[str] = None):
        blur_percentage = normalize_list_to_value(blur_percentage)
        file_name = normalize_input_list(file_name)
        image = normalize_input_image(image)

        blurred_images = []
        blurred_file_names = []

        nodes = []
        dataset = { "nodes": nodes }

        for index, img in enumerate(image):
            if file_name:
                split_name = file_name[index].rsplit('.', 1)
                if len(split_name) == 2:
                    base_name, _ = split_name
                else:
                    base_name = split_name[0]
            else:
                base_name = ""
                
            output_file, subfolder, filename = resolve_filepath(
                    index=index,
                    default_filename=f"{base_name}_Blur",
                    add_counter=False
            )
            
            pil_image = tensor_to_pil(img)
            
            width, height = pil_image.size
            min_dimension = min(width, height)
            adjusted_blur_radius: float = blur_percentage * (min_dimension / 10)
            
            blurred_image = pil_image.filter(ImageFilter.GaussianBlur(adjusted_blur_radius))
            blurred_image.save(output_file, format="PNG")
            url = get_resource_url(subfolder, filename, "temp")
            
            blurred_tensor = pil_to_tensor(blurred_image)
            blurred_images.append(blurred_tensor)

            blurred_file_names.append(filename)

            nodes.append(create_masonry_node(filename, url, index))
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}blurimages", {
            "node": node_id,
            "dataset": dataset
        })

        image_batch, image_list = normalize_output_image(blurred_images)

        return (image_batch[0], image_list, blurred_file_names, len(image_list))
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
    OUTPUT_IS_LIST = (False, True)
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def on_exec(self, node_id: str, image: torch.Tensor|list[torch.Tensor], clarity_strength: float, sharpen_amount: float, blur_kernel_size: int):
        image = normalize_input_image(image)
        clarity_strength = normalize_list_to_value(clarity_strength)
        sharpen_amount = normalize_list_to_value(sharpen_amount)
        blur_kernel_size = normalize_list_to_value(blur_kernel_size)

        nodes = []
        dataset = { "nodes": nodes }
        
        processed_images = []

        for index, img in enumerate(image):
            output_file_s, subfolder_s, filename_s = resolve_filepath(
                    index=index,
                    default_filename="clarity_s",
            )
            output_file_t, subfolder_t, filename_t = resolve_filepath(
                    index=index,
                    default_filename="clarity_t",
            )
            
            pil_image = tensor_to_pil(img)
            pil_image.save(output_file_s, format="PNG")
            filename_s = get_resource_url(subfolder_s, filename_s, "temp")

            processed = clarity_effect(img, clarity_strength, sharpen_amount, blur_kernel_size)

            pil_image = tensor_to_pil(processed)
            pil_image.save(output_file_t, format="PNG")
            filename_t = get_resource_url(subfolder_t, filename_t, "temp")

            nodes.append(create_compare_node(filename_s, filename_t, index))
            processed_images.append(processed)

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

    def on_exec(self, node_id: str, image: torch.Tensor|list[torch.Tensor], image_opt: torch.Tensor|list[torch.Tensor] = None):
        image_list_1 = normalize_input_image(image)
        image_list_2 = normalize_input_image(image_opt) if image_opt is not None else image_list_1
        
        nodes = []
        dataset = { "nodes": nodes }

        if len(image_list_1) != len(image_list_2):
            raise ValueError("Image lists must have the same length if both inputs are provided.")
        
        for index, img in enumerate(image_list_1):
            output_file_s, subfolder_s, filename_s = resolve_filepath(
                    index=index,
                    default_filename="compare_s",
            )
            
            pil_image = tensor_to_pil(img)
            pil_image.save(output_file_s, format="PNG")
            filename_s = get_resource_url(subfolder_s, filename_s, "temp")

            if image_opt is not None:
                output_file_t, subfolder_t, filename_t = resolve_filepath(
                    index=index,
                    default_filename="compare_t",
                )
                pil_image = tensor_to_pil(image_list_2[index])
                pil_image.save(output_file_t, format="PNG")
                filename_t = get_resource_url(subfolder_t, filename_t, "temp")
            else:
                filename_t = get_resource_url(subfolder_s, filename_s, "temp")

            nodes.append(create_compare_node(filename_s, filename_t, index))

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
    INPUT_IS_LIST = (True, True)
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
    INPUT_IS_LIST = (True, False, True, False, False)
    OUTPUT_IS_LIST = (False, True, False)
    RETURN_NAMES = ("image", "image_list", "count")
    RETURN_TYPES = ("IMAGE", "IMAGE", "INT")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], longest_edge: bool, new_size: int, resize_method: str):
        image = normalize_input_image(image)
        longest_edge = normalize_list_to_value(longest_edge)
        new_size = normalize_input_list(new_size)
        resize_method = normalize_list_to_value(resize_method)

        nodes = []
        root = { "children": nodes, "icon":"help", "id": "", "value": "" }
        dataset = { "nodes": [root] }

        original_heights = []
        original_widths = []
        heights = []
        widths = []

        resized_images = []

        for index, img in enumerate(image):
            n_size = normalize_list_item(new_size, index)

            original_height, original_width = img.shape[1], img.shape[2]
            original_heights.append(original_height)
            original_widths.append(original_width)

            resized_img = resize_image(img, resize_method, longest_edge, n_size)
            resized_images.append(resized_img)

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights.append(new_height)
            widths.append(new_width)

            nodes.append(create_resize_node(original_height, original_width, new_height, new_width, index))
            
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
    INPUT_IS_LIST = (True, True, True, False, False, False, False)
    OUTPUT_IS_LIST = (False, True, False)
    RETURN_NAMES = ("image", "image_list", "count")
    RETURN_TYPES = ("IMAGE", "IMAGE", "INT")

    def on_exec(self, node_id:str, image:torch.Tensor|list[torch.Tensor], height: int, width: int, resize_method: str, resize_mode:str, pad_color:str):
        image = normalize_input_image(image)
        height = normalize_input_list(height)
        width = normalize_input_list(width)
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

        for index, img in enumerate(image):
            h = normalize_list_item(height, index)
            w = normalize_list_item(width, index)

            original_height, original_width = img.shape[1], img.shape[2]
            original_heights.append(original_height)
            original_widths.append(original_width)

            resized_img = resize_and_crop_image(img, resize_method, h, w, resize_mode, pad_color)
            resized_images.append(resized_img)

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights.append(new_height)
            widths.append(new_width)

            nodes.append(create_resize_node(original_height, original_width, new_height, new_width, index))
        
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

        for index, img in enumerate(image):
            original_height, original_width = img.shape[1], img.shape[2]
            original_heights.append(original_height)
            original_widths.append(original_width)

            resized_img = resize_to_square(img, square_size, resize_method, crop_position)
            resized_images.append(resized_img)

            new_height, new_width = resized_img.shape[1], resized_img.shape[2]
            heights.append(new_height)
            widths.append(new_width)

            nodes.append(create_resize_node(original_height, original_width, new_height, new_width, index))

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
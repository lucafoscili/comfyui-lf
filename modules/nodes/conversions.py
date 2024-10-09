import io
import json
import random
import re

from itertools import combinations
from PIL import Image, ImageFilter
from server import PromptServer

from ..utils.conversions import *

category = "✨ LF Nodes/Conversions"

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

class LF_Extractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": "", "multiline": True, "tooltip": "The string from which the output will be extracted."}),
                "starting_delimiter": ("STRING", {"default": "{", "tooltip": "The delimiter where extraction starts."}),
                "ending_delimiter": ("STRING", {"default": "}", "tooltip": "The delimiter where extraction ends."}),
                "result": ("KUL_CODE", {"tooltip": "Extracted string."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" },
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("result_as_json", "extracted_text", "result_as_int", "result_as_float", "result_as_boolean")
    RETURN_TYPES = ("JSON", "STRING", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, **kwargs):
        node_id = kwargs["node_id"]
        text = kwargs["text"]
        starting_delimiter = kwargs["starting_delimiter"]
        ending_delimiter = kwargs["ending_delimiter"]

        extracted_text = extract_nested(text, starting_delimiter, ending_delimiter)
        
        result_as_json = convert_to_json(extracted_text)
        result_as_int = convert_to_int(extracted_text)
        result_as_float = convert_to_float(extracted_text)
        result_as_boolean = convert_to_boolean(extracted_text)

        PromptServer.instance.send_sync("lf-extractor", {
            "node": node_id, 
            "result": extracted_text,
        })
        
        return (result_as_json, extracted_text, result_as_int, result_as_float, result_as_boolean)
        
class LF_Lora2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "tooltip": "The input text containing LoRa tags. These tags will be processed and replaced with extracted keywords."}),
                "separator": ("STRING", { "default": "SEP", "tooltip": "Character(s) used to separate keywords within the name of a single LoRa file. Helps in extracting individual keywords."}),
                "weight": ("FLOAT", { "default": 0.5, "tooltip": "A weight value associated with LoRa tags, which may influence processing or output significance."}),
                "weight_placeholder": ("STRING", { "default": "wwWEIGHTww", "tooltip": "A placeholder within LoRa tags that gets replaced with the actual weight value during processing."}),
            }
        } 

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("prompt", "loras",)
    RETURN_TYPES = ("STRING", "STRING",)

    def on_exec(self, text: str, separator:str, weight:float, weight_placeholder:str):
        # Regular expression to match loras in <lora:...> format
        lora_pattern = r'<lora:[^<>]+>'
        
        # Find all matches of loras in the input text
        loras = re.findall(lora_pattern, text)
        
        # Extract keywords from each lora and prepare them for replacement
        lora_keyword_map = {}
        for lora in loras:
            # Map the original lora tag to its keywords
            lora_keyword_map[lora] = cleanse_lora_tag(lora, separator)
        
        # Replace each lora tag in the text with its corresponding keywords
        for lora_tag, keywords in lora_keyword_map.items():
            text = text.replace(lora_tag, keywords)
        
        # Replace the weight_placeholder with the actual weight
        loras = [lora.replace(weight_placeholder, str(weight)) for lora in loras]
        loras_string = "".join(loras)
        
        return (text, loras_string,)
    
class LF_LoraTag2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "tag": ("STRING", {"multiline": True, "tooltip": "The LoRA tag to be converted."}),
                "separator": ("STRING", { "default": "SEP", "tooltip": "String separating each keyword in a LoRA filename."}),
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("keywords", "nr_keywords",)
    RETURN_TYPES = ("STRING", "INT",)

    def on_exec(self, tag: str, separator: str):
        clean_lora = cleanse_lora_tag(tag, separator)   
        keywords_count = count_words_in_comma_separated_string(clean_lora) 
        return (clean_lora, keywords_count,)
    
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

        PromptServer.instance.send_sync("lf-resizeimagebydimension", {
            "node": node_id,
            "dataset": dataset,
        })

        return (resized_images,)

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

class LF_Something2Number:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "JSON": ("JSON", {"tooltip": "JSON value to convert to numbers."}),
                "boolean": ("BOOLEAN", {"tooltip": "Boolean value to convert to numbers."}),
                "string": ("STRING", {"tooltip": "String value to convert to numbers."}),
                "integer": ("INT", {"tooltip": "Integer value to convert to numbers."}),
                "float": ("FLOAT", {"tooltip": "Float value to convert to numbers."})
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_IS_LIST = (False, False, True, True,)
    RETURN_NAMES = ("float_sum", "integer_sum", "float_list", "integer_list",)
    RETURN_TYPES = ("FLOAT", "INT", "FLOAT", "INT",)

    def on_exec(self, **kwargs):
        """
        Converts various inputs to floats and integers, handles nested structures,
        and computes their sums.

        Returns:
            tuple:
                - float_sum (float): Sum of all values converted to floats.
                - integer_sum (int): Sum of all values converted to integers.
                - float_list (list): List of all values converted to floats.
                - integer_list (list): List of all values converted to integers.
        """
        float_values = []
        integer_values = []

        def extract_numbers(data):
            """
            Recursively extract numbers from various data types.
            """
            if isinstance(data, (int, float)):
                float_values.append(float(data))
                integer_values.append(int(data))
            elif isinstance(data, bool):
                float_values.append(1.0 if data else 0.0)
                integer_values.append(1 if data else 0)
            elif isinstance(data, str):
                data = data.strip()
                # Try direct conversion
                try:
                    num = float(data)
                    float_values.append(num)
                    integer_values.append(int(num))
                except ValueError:
                    # Try parsing as JSON
                    try:
                        parsed_json = json.loads(data)
                        extract_numbers(parsed_json)
                    except json.JSONDecodeError:
                        pass  # Ignore strings that are neither numbers nor valid JSON
            elif isinstance(data, dict):
                for value in data.values():
                    extract_numbers(value)
            elif isinstance(data, (list, tuple, set)):
                for item in data:
                    extract_numbers(item)
            # Ignore other data types (e.g., None, complex, etc.)

        for _, value in kwargs.items():
            extract_numbers(value)

        float_sum = sum(float_values)
        integer_sum = sum(integer_values)

        return (float_sum, integer_sum, float_values, integer_values,)
    
class LF_Something2String:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "JSON": ("JSON", {"tooltip": "JSON value to convert to string."}),
                "boolean": ("BOOLEAN", {"tooltip": "Boolean value to convert to string."}),
                "float": ("FLOAT", {"tooltip": "Float value to convert to string."}),
                "integer": ("INT", {"tooltip": "Integer value to convert to string."})
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"

    # Generating all combinations of inputs
    input_keys = ["JSON", "boolean", "float", "integer"]
    combinations_list = []

    for r in range(1, len(input_keys) + 1):
        for combo in combinations(input_keys, r):
            combo_name = "_".join(combo)
            combinations_list.append(combo_name)

    # Dynamically generating OUTPUT_IS_LIST, RETURN_TYPES, and RETURN_NAMES
    OUTPUT_IS_LIST = tuple([False] * len(combinations_list))
    RETURN_TYPES = tuple(["STRING"] * len(combinations_list))
    RETURN_NAMES = tuple(combinations_list)

    def on_exec(self, **kwargs):
        """
        Converts multiple inputs to strings and generates specific combinations.
        """
        def flatten_input(input_item):
            if isinstance(input_item, list):
                return [str(sub_item) for item in input_item for sub_item in flatten_input(item)]
            elif isinstance(input_item, str):
                return [input_item]
            else:
                return [str(input_item)]
        
        # Prepare output based on each combination
        results = []

        for combo_name in self.RETURN_NAMES:
            items = combo_name.split("_")
            flattened_combo = []
            for item in items:
                if item in kwargs:
                    flattened_combo.extend(flatten_input(kwargs[item]))
            results.append("".join(flattened_combo))

        return tuple(results)
    
class LF_WallOfText:
    @classmethod 
    def INPUT_TYPES(cls):
        return {
            "required": {
                "separator": ("STRING", {"default": ", ", "tooltip": "Character(s) separating each string apart."}),
                "text_1": ("STRING", {"default": "", "multiline": True, "tooltip": "The first required string."}),
                "text_2": ("STRING", {"default": "", "multiline": True, "tooltip": "The second required string."}),
            },
            "optional": {
                "text_3": ("STRING", {"default": "", "multiline": True, "tooltip": "The third optional string."}),
                "text_4": ("STRING", {"default": "", "multiline": True, "tooltip": "The fourth optional string."}),
                "text_5": ("STRING", {"default": "", "multiline": True, "tooltip": "The fifth optional string."}),
                "text_6": ("STRING", {"default": "", "multiline": True, "tooltip": "The sixth optional string."}),
                "text_7": ("STRING", {"default": "", "multiline": True, "tooltip": "The seventh optional string."}),
                "text_8": ("STRING", {"default": "", "multiline": True, "tooltip": "The eighth optional string."}),
                "text_9": ("STRING", {"default": "", "multiline": True, "tooltip": "The ninth optional string."}),
                "text_10": ("STRING", {"default": "", "multiline": True, "tooltip": "The tenth optional string."}),
                "shuffle_inputs": ("BOOLEAN", {"default": False, "tooltip": "Toggle shuffling of input strings."}),
                "seed": ("INT", {"default": 0, "tooltip": "Seed to control the randomness of the shuffling."}),
            } 
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("wall_of_text",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, **kwargs):
        texts = [kwargs.get(f"text_{i}", "") for i in range(1, 11)]
        wall_of_text = ""
        if len(texts) > 1:
            separator = kwargs.get("separator", "")
            shuffle_inputs = kwargs.get("shuffle_inputs", False)
            if shuffle_inputs:
                seed = kwargs.get("seed", 0)
                random.seed(seed)
                random.shuffle(texts)
            wall_of_text = separator.join([text for text in texts if text])
        else:
            wall_of_text = texts[0]

        return (wall_of_text,)
    

NODE_CLASS_MAPPINGS = {
    "LF_BlurImages": LF_BlurImages,
    "LF_Extractor": LF_Extractor,
    "LF_Lora2Prompt": LF_Lora2Prompt,
    "LF_LoraTag2Prompt": LF_LoraTag2Prompt,
    "LF_MultipleImageResizeForWeb": LF_MultipleImageResizeForWeb,
    "LF_ResizeImageToDimension": LF_ResizeImageToDimension,
    "LF_ResizeImageToSquare": LF_ResizeImageToSquare,
    "LF_ResizeImageByEdge": LF_ResizeImageByEdge,
    "LF_Something2Number": LF_Something2Number,
    "LF_Something2String": LF_Something2String,
    "LF_WallOfText": LF_WallOfText,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_BlurImages": "Blur images",
    "LF_Extractor": "Extracts something from text",
    "LF_Lora2Prompt": "Convert prompt and LoRAs",
    "LF_LoraTag2Prompt": "Convert LoRA tag to prompt",
    "LF_MultipleImageResizeForWeb": "Multiple image resize for Web",
    "LF_ResizeImageToDimension": "Resize image to dimension",
    "LF_ResizeImageToSquare": "Resize image to square",
    "LF_ResizeImageByEdge": "Resize image by edge",
    "LF_Something2Number": "Convert something to INT or FLOAT",
    "LF_Something2String": "Convert something to STRING",
    "LF_WallOfText": "Wall of text (string concatenate)",
}

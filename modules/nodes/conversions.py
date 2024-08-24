import json
import random
import re

from ..utils.conversions import *

category = "LF Nodes/Conversions"
    
class LF_ImageResizeByEdge:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input image tensor or a list of image tensors."}),
                "longest_edge": ("BOOLEAN", {"default": False, "tooltip": "Resizes the image by the longest side if set to True. Otherwise, resizes by the shortest side."}),
                "new_size": ("INT", {"default": 1024, "tooltip": "The size of the longest edge of the output image."}),
                "resize_method": (["bicubic", "bilinear", "linear", "nearest", "nearest exact"], {"default": "bicubic", "tooltip": "Method to resize the image."})
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("resized_image",)
    CATEGORY = category
    FUNCTION = "on_exec"

    def on_exec(self, image, longest_edge: bool, new_size: int, resize_method: str):
        if isinstance(image, list):
            resized_images = [resize_image(tensor, resize_method, longest_edge, new_size) for tensor in image]
            return (resized_images,)
        else:
            resized_image = resize_image(image, resize_method, longest_edge, new_size)
            return (resized_image,)
        
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

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("prompt", "loras",)
    CATEGORY = category
    FUNCTION = "on_exec"

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

    RETURN_TYPES = ("STRING", "INT",)
    RETURN_NAMES = ("keywords", "nr_keywords",)
    CATEGORY = category
    FUNCTION = "on_exec"

    def on_exec(self, tag: str, separator: str):
        clean_lora = cleanse_lora_tag(tag, separator)   
        keywords_count = count_words_in_comma_separated_string(clean_lora) 
        return (clean_lora, keywords_count,)
    
class LF_SequentialSeedsGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "global_seed": ("INT", {"default": 0, "tooltip": "Seed value from which the other seeds will be progressively increased."}),
            }
        }
    RETURN_TYPES = ("INT",) * 30
    CATEGORY = category
    FUNCTION = "on_exec"

    def on_exec(self, global_seed: int):
        seeds = [global_seed + i for i in range(20)] 
        return seeds
    
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

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("wall_of_text",)
    CATEGORY = category
    FUNCTION = "on_exec"

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
    
class LF_Something2String:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "JSON": ("JSON", {"tooltip": "JSON value to convert to string."}) ,
                "boolean": ("BOOLEAN", {"tooltip": "Boolean value to convert to string."}),
                "float": ("FLOAT", {"tooltip": "Float value to convert to string."}),
                "integer": ("INT", {"tooltip": "Integer value to convert to string."})
            }
        }

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("concatenate", "list",)
    OUTPUT_IS_LIST = (False, True,)
    FUNCTION = "on_exec"

    def on_exec(self, **kwargs):
        """
        Converts multiple inputs to strings, handling nested structures and mixed types.
        """
        flattened_values = []
        
        def flatten_input(input_item):
            if isinstance(input_item, list):
                for item in input_item:
                    flatten_input(item)
            elif isinstance(input_item, str):
                flattened_values.append(input_item)
            else:
                flattened_values.append(str(input_item))

        for _, value in kwargs.items():
            flatten_input(value)

        return (flattened_values, flattened_values,)


NODE_CLASS_MAPPINGS = {
    "LF_ImageResizeByEdge": LF_ImageResizeByEdge,
    "LF_Lora2Prompt": LF_Lora2Prompt,
    "LF_LoraTag2Prompt": LF_LoraTag2Prompt,
    "LF_SequentialSeedsGenerator": LF_SequentialSeedsGenerator,
    "LF_Something2String": LF_Something2String,
    "LF_WallOfText": LF_WallOfText,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ImageResizeByEdge": "Resize image by edge",
    "LF_Lora2Prompt": "Convert prompt and LoRAs",
    "LF_LoraTag2Prompt": "Convert LoRA tag to prompt",
    "LF_SequentialSeedsGenerator": "Generate sequential seeds",
    "LF_Something2String": "Convert something to STRING",
    "LF_WallOfText": "Wall of text (string concatenate)",
}

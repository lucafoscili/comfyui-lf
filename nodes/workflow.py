import re

category = "LF Nodes/Workflow"

class Lora2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "label": "Input Text with LoRAs"}),
                "separator": ("STRING", { "default": "SEP", "label": "Keywords separator"}),
                "weight": ("FLOAT", { "default": 0.5, "label": "LoRAs weight"}),
                "weight_placeholder": ("STRING", { "default": "wwWEIGHTww", "label": "Weight placeholder"}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("prompt", "loras",)
    CATEGORY = category
    FUNCTION = "extract_loras_and_keywords"

    def extract_loras_and_keywords(self, text: str, separator:str, weight:float, weight_placeholder:str):
        # Regular expression to match loras in <lora:...> format
        lora_pattern = r'<lora:[^<>]+>'
        
        # Find all matches of loras in the input text
        loras = re.findall(lora_pattern, text)
        
        # Extract keywords from each lora and prepare them for replacement
        lora_keyword_map = {}
        for lora in loras:
            # Remove the <lora: and last '>': part to get the safetensors file name and weight
            safetensors_info = lora[len('<lora:'):][:-1]
            
            # Split the safetensors_info by ':' to separate the file name and weight
            file_name_with_weight = safetensors_info.split(':')
            if len(file_name_with_weight) > 1:
                file_name, _ = file_name_with_weight
            else:
                file_name = file_name_with_weight[0]
            
            # Split the file name by '\\' to separate the file name and the folder containing it
            file_name_with_folder = file_name.split('\\')
            if len(file_name_with_folder) > 1:
                _, file_name = file_name_with_folder
            else:
                file_name = file_name_with_folder[0]
            
            # Split the file name by '.safetensors' to separate the file name and the extension
            file_name_with_extension = file_name.split('.safetensors')
            if len(file_name_with_extension) > 1:
                file_name, _ = file_name_with_extension
            else:
                file_name = file_name_with_extension[0]

            # Extract keywords from the file name
            if str(file_name).find(separator) > 1:
                keywords = file_name.split(separator)
            else:
                keywords = file_name

            # Join keywords into a string to replace the lora tag
            keyword_str = ''.join(keywords)
            
            # Map the original lora tag to its keywords
            lora_keyword_map[lora] = keyword_str
        
        # Replace each lora tag in the text with its corresponding keywords
        for lora_tag, keywords in lora_keyword_map.items():
            text = text.replace(lora_tag, keywords)
        
        # Replace the weight_placeholder with the actual weight
        loras = [lora.replace(weight_placeholder, str(weight)) for lora in loras]
        loras_string = "".join(loras)
        
        return (text, loras_string,)
    
class LoraName2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_name": ("STRING", {"multiline": True, "label": "LoRA file name"}),
                "separator": ("STRING", { "default": "SEP", "label": "Keywords separator"}),
            }
        }

    RETURN_TYPES = ("STRING", "INT",)
    RETURN_NAMES = ("keywords", "nr_keywords",)
    CATEGORY = category
    FUNCTION = "process_lora_to_prompt"

    def process_lora_to_prompt(self, file_name: str, separator: str):
        if file_name.endswith(".safetensors"):
            keywords = file_name[:-len(".safetensors")].split(separator)
        else:
            keywords = file_name.split(separator)

        keywords_str = ", ".join(keywords)
        keywords_count = len(keywords)

        return (keywords_str, keywords_count,)
    
class SeedGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "global_seed": ("INT", {"default": 0}),
            }
        }
    RETURN_TYPES = ("INT",) * 30
    CATEGORY = category
    FUNCTION = "generate_seeds"

    def generate_seeds(self, global_seed: int):
        seeds = [global_seed + i for i in range(20)] 
        return seeds

class WorkflowSettings:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "drawing_board": ("BOOLEAN", {"default": False, "label": "Drawing board?"}),
                "drawing_board_plus": ("STRING", {"default": "", "multiline": True, "label": "Drawing board +"}),
                "drawing_board_minus": ("STRING", {"default": "", "multiline": True, "label": "Drawing board -"}),
                "drawing_board_loras": ("STRING", {"default": "", "multiline": True, "label": "Drawing board LoRAs"}),
                "random_seed": ("BOOLEAN", {"default": False, "label": "Random seed?"}),
                "fixed_seed":  ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "label": "Fixed seed"}),
                "batch_size": ("INT", {"default": 4, "label": "Batch size"}),
                "random_framing": ("BOOLEAN", {"default": False, "label": "Random framing?"}),
                "random_pose": ("BOOLEAN", {"default": False, "label": "Random pose?"}),
                "random_character": ("BOOLEAN", {"default": False, "label": "Random character?"}),
                "random_outfit": ("BOOLEAN", {"default": False, "label": "Random outfit?"}),
                "random_location": ("BOOLEAN", {"default": False, "label": "Random location?"}),
                "random_style": ("BOOLEAN", {"default": False, "label": "Random style?"}),
                "character_selector": ("INT", {"default": 0, "label": "Character selector"}),
                "outfit_selector": ("INT", {"default": 0, "label": "Outfit selector"}),
                "location_selector": ("INT", {"default": 0, "label": "Location selector"}),
                "style_selector": ("INT", {"default": 0, "label": "Style selector"}),
                "square_format": ("BOOLEAN", {"default": False, "label": "Square format?"}),
                "xtra": ("BOOLEAN", {"default": False, "label": "Xtra?"}),
                "llm_prompt": ("BOOLEAN", {"default": False, "label": "LLM Prompt?"}),
                "character_lora_weight": ("FLOAT", {"default": 1.0, "label": "Character LoRA weight", "min": -10.0, "max": 10.0, "step": 0.1}),
                "additional_loras_weight": ("FLOAT", {"default": 0.5, "label": "Additional LoRAs weight", "min": -10.0, "max": 10.0, "step": 0.1}),
                "custom_images_urls": ("STRING", {"default": "", "multiline": True, "label": "Custom images URLs"}),
                "config_json_path": ("STRING", {"default": "", "multiline": True, "label": "Config JSON path"}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }
    
    RETURN_TYPES = ("BOOLEAN", "STRING", "STRING", "STRING", "BOOLEAN", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "INT", "INT", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "FLOAT", "FLOAT", "STRING", "STRING")
    RETURN_NAMES = ("drawing_board", "drawing_board_pos", "drawing_board_neg", "drawing_board_loras", "random_seed", "global_seed", "batch_size", "random_framing", "random_pose", "random_character", "random_outfit", "random_location", "random_style", "character_selector", "outfit_selector", "location_selector", "style_selector", "square_format", "xtra", "LLM_prompt", "character_lora_weight", "additional_loras_weight", "custom_images_urls", "config_json_path")
    CATEGORY =  category
    FUNCTION = "workflow_settings"
    
    def workflow_settings(self, seed, drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, fixed_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path):
        global_seed = seed if random_seed else fixed_seed
        return (drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, global_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path)


NODE_CLASS_MAPPINGS = {
    "Lora2Prompt": Lora2Prompt,
    "LoraName2Prompt": LoraName2Prompt,
    "SeedGenerator": SeedGenerator,
    "WorkflowSettings": WorkflowSettings,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "Lora2Prompt": "Convert prompt and LoRAs",
    "LoraName2Prompt": "Convert LoRA filename to prompt",
    "SeedGenerator": "Generate N unique seeds",
    "WorkflowSettings": "Workflow settings",
}

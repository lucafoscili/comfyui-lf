import random
import re

category = "LF Nodes/Workflow"

class LF_Lora2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "label": "Input Text with LoRAs", "tooltip": "The input text containing LoRa tags. These tags will be processed and replaced with extracted keywords."}),
                "separator": ("STRING", { "default": "SEP", "label": "Keywords separator", "tooltip": "Character(s) used to separate keywords within the name of a single LoRa file. Helps in extracting individual keywords."}),
                "weight": ("FLOAT", { "default": 0.5, "label": "LoRAs weight", "tooltip": "A weight value associated with LoRa tags, which may influence processing or output significance."}),
                "weight_placeholder": ("STRING", { "default": "wwWEIGHTww", "label": "Weight placeholder", "tooltip": "A placeholder within LoRa tags that gets replaced with the actual weight value during processing."}),
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
                keywords = ', '.join(file_name.split(separator))
            else: 
                keywords = file_name

            # Join keywords into a string to replace the lora tag
            # Assuming keywords can be a single string or a list of strings
            if isinstance(keywords, str):
            # If keywords is a single string, keep it as is
                keyword_str = keywords
            elif isinstance(keywords, list):
                keyword_str = ''.join(keywords[:-1]) + ', ' + keywords[-1]
            else:
                raise ValueError("keywords must be a string or a list of strings")
            
            # Map the original lora tag to its keywords
            lora_keyword_map[lora] = keyword_str
        
        # Replace each lora tag in the text with its corresponding keywords
        for lora_tag, keywords in lora_keyword_map.items():
            text = text.replace(lora_tag, keywords)
        
        # Replace the weight_placeholder with the actual weight
        loras = [lora.replace(weight_placeholder, str(weight)) for lora in loras]
        loras_string = "".join(loras)
        
        return (text, loras_string,)
    
class LF_LoraName2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_name": ("STRING", {"multiline": True, "label": "LoRA file name", "label": "LoRA file name."}),
                "separator": ("STRING", { "default": "SEP", "label": "Keywords separator", "tooltip": "String separating each keyword in a LoRA filename."}),
            }
        }

    RETURN_TYPES = ("STRING", "INT",)
    RETURN_NAMES = ("keywords", "nr_keywords",)
    CATEGORY = category
    FUNCTION = "on_exec"

    def on_exec(self, file_name: str, separator: str):
        if file_name.endswith(".safetensors"):
            keywords = file_name[:-len(".safetensors")].split(separator)
        else:
            keywords = file_name.split(separator)

        keywords_str = ", ".join(keywords)
        keywords_count = len(keywords)

        return (keywords_str, keywords_count,)
    
class LF_SeedGenerator:
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
                import random
                seed = kwargs.get("seed", 0)
                random.seed(seed)
                random.shuffle(texts)
            wall_of_text = separator.join([text for text in texts if text])
        else:
            wall_of_text = texts[0]

        return (wall_of_text,)
    
class LF_WorkflowSettings:
    @classmethod
    def INPUT_TYPES(cls):
        return {
           "required": {
               "drawing_board": ("BOOLEAN", {"default": False, "label": "Drawing board?", "tooltip": "Enables or disables the drawing board mode (alternative prompt)."}),
               "drawing_board_plus": ("STRING", {"default": "", "multiline": True, "label": "Drawing board +", "tooltip": "Positive prompt of the drawing board."}),
               "drawing_board_minus": ("STRING", {"default": "", "multiline": True, "label": "Drawing board -", "tooltip": "Negative prompt of the drawing board."}),
               "drawing_board_loras": ("STRING", {"default": "", "multiline": True, "label": "Drawing board LoRAs", "tooltip": "LoRA tags specific to the drawing board functionality."}),
               "random_seed": ("BOOLEAN", {"default": False, "label": "Random seed?", "tooltip": "Whether to use the random seed or the fixed seed."}),
               "fixed_seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "label": "Fixed seed", "tooltip": "Set a fixed seed value for deterministic operations."}),
               "batch_size": ("INT", {"default": 4, "label": "Batch size", "tooltip": "Number of items to process in a batch."}),
               "random_framing": ("BOOLEAN", {"default": False, "label": "Random framing?", "tooltip": "Enable random framing for dynamic compositions."}),
               "random_pose": ("BOOLEAN", {"default": False, "label": "Random pose?", "tooltip": "Enable random poses for characters."}),
               "random_character": ("BOOLEAN", {"default": False, "label": "Random character?", "tooltip": "Select characters randomly."}),
               "random_outfit": ("BOOLEAN", {"default": False, "label": "Random outfit?", "tooltip": "Randomly assign outfits to characters."}),
               "random_location": ("BOOLEAN", {"default": False, "label": "Random location?", "tooltip": "Randomly select locations for scenes."}),
               "random_style": ("BOOLEAN", {"default": False, "label": "Random style?", "tooltip": "Apply random styles to images."}),
               "character_selector": ("INT", {"default": 0, "label": "Character selector", "tooltip": "Select a specific character index."}),
               "outfit_selector": ("INT", {"default": 0, "label": "Outfit selector", "tooltip": "Select a specific outfit index."}),
               "location_selector": ("INT", {"default": 0, "label": "Location selector", "tooltip": "Select a specific location index."}),
               "style_selector": ("INT", {"default": 0, "label": "Style selector", "tooltip": "Select a specific style index."}),
               "square_format": ("BOOLEAN", {"default": False, "label": "Square format?", "tooltip": "Force output images to square format."}),
               "xtra": ("BOOLEAN", {"default": False, "label": "Xtra?", "tooltip": "Enable extra features."}),
               "llm_prompt": ("BOOLEAN", {"default": False, "label": "LLM Prompt?", "tooltip": "Use Language Model prompts."}),
               "character_lora_weight": ("FLOAT", {"default": 1.0, "label": "Character LoRA weight", "min": -10.0, "max": 10.0, "step": 0.1, "tooltip": "Weighting for character-related LoRAs."}),
               "additional_loras_weight": ("FLOAT", {"default": 0.5, "label": "Additional LoRAs weight", "min": -10.0, "max": 10.0, "step": 0.1, "tooltip": "Weighting for additional LoRAs."}),
               "custom_images_urls": ("STRING", {"default": "", "multiline": True, "label": "Custom images URLs", "tooltip": "IMG2IMG: URL for using a custom image as a base."}),
               "config_json_path": ("STRING", {"default": "", "multiline": True, "label": "Config JSON path", "tooltip": "Path to configuration JSON file."}),
               "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "label": "Seed", "tooltip": "Seed value for randomization."}),
            }
        }
    
    RETURN_TYPES = ("BOOLEAN", "STRING", "STRING", "STRING", "BOOLEAN", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "INT", "INT", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "FLOAT", "FLOAT", "STRING", "STRING")
    RETURN_NAMES = ("drawing_board", "drawing_board_pos", "drawing_board_neg", "drawing_board_loras", "random_seed", "global_seed", "batch_size", "random_framing", "random_pose", "random_character", "random_outfit", "random_location", "random_style", "character_selector", "outfit_selector", "location_selector", "style_selector", "square_format", "xtra", "LLM_prompt", "character_lora_weight", "additional_loras_weight", "custom_images_urls", "config_json_path")
    CATEGORY =  category
    FUNCTION = "on_exec"
    
    def on_exec(self, seed, drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, fixed_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path):
        global_seed = seed if random_seed else fixed_seed
        return (drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, global_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path)


NODE_CLASS_MAPPINGS = {
    "LF_Lora2Prompt": LF_Lora2Prompt,
    "LF_LoraName2Prompt": LF_LoraName2Prompt,
    "LF_SeedGenerator": LF_SeedGenerator,
    "LF_WallOfText": LF_WallOfText,
    "LF_WorkflowSettings": LF_WorkflowSettings,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_Lora2Prompt": "Convert prompt and LoRAs",
    "LF_LoraName2Prompt": "Convert LoRA filename to prompt",
    "LF_SeedGenerator": "Generate N unique seeds",
    "LF_WallOfText": "Wall of text (string concatenate)",
    "LF_WorkflowSettings": "Workflow settings",
}

category = "LF Nodes/Workflow"
    
class SeedGenerator:
    @classmethod
    def INPUT_TYPES(s):
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
    def INPUT_TYPES(s):
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
                "character_lora_weight": ("STRING", {"default": "1.0", "label": "Character LoRA weight"}),
                "additional_loras_weight": ("STRING", {"default": "0.5", "label": "Additional LoRAs weight"}),
                "custom_images_urls": ("STRING", {"default": "", "multiline": True, "label": "Custom images URLs"}),
                "config_json_path": ("STRING", {"default": "", "multiline": True, "label": "Config JSON path"}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            }
        }
    
    RETURN_TYPES = ("BOOLEAN", "STRING", "STRING", "STRING", "BOOLEAN", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "INT", "INT", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "STRING", "STRING", "STRING", "STRING")
    RETURN_NAMES = ("drawing_board", "drawing_board_pos", "drawing_board_neg", "drawing_board_loras", "random_seed", "global_seed", "batch_size", "random_framing", "random_pose", "random_character", "random_outfit", "random_location", "random_style", "character_selector", "outfit_selector", "location_selector", "style_selector", "square_format", "xtra", "LLM_prompt", "character_lora_weight", "additional_loras_weight", "custom_images_urls", "config_json_path")
    CATEGORY =  category
    FUNCTION = "workflow_settings"
    
    def workflow_settings(self, seed, drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, fixed_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path):
        global_seed = seed if random_seed else fixed_seed
        return (drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, global_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path)


NODE_CLASS_MAPPINGS = {
    "SeedGenerator": SeedGenerator,
    "WorkflowSettings": WorkflowSettings,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "SeedGenerator": "Generate N unique seeds",
    "WorkflowSettings": "Workflow settings",
}
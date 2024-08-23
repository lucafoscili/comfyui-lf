from server import PromptServer

category = "LF Nodes/Configuration"

class LF_ControlPanel:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "debug": ("BOOLEAN", {"default": False, "tooltip": "Enables log messages in the browser's console."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    RETURN_TYPES = ()
    CATEGORY = category
    FUNCTION = "on_exec"

    def on_exec(self):
        return ()
    
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
    "LF_ControlPanel": LF_ControlPanel,
    "LF_WorkflowSettings": LF_WorkflowSettings,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ControlPanel": "Control panel",
    "LF_WorkflowSettings": "Workflow settings",
}

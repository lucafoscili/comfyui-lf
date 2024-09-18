import folder_paths
import os

from comfy.samplers import KSampler
from ..utils.configuration import *

from server import PromptServer

category = "✨ LF Nodes/Configuration"

class LF_CivitAIMetadataSetup:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "checkpoint": (folder_paths.get_filename_list("checkpoints"), {"default": "None", "tooltip": "Checkpoint used to generate the image."}),
                "vae": (folder_paths.get_filename_list("vae"), {"tooltip": "VAE used to generate the image."}),
                "sampler": (KSampler.SAMPLERS, {"default": "None", "tooltip": "Sampler used to generate the image."}),
                "scheduler": (KSampler.SCHEDULERS, {"default": "None", "tooltip": "Scheduler used to generate the image."}),
                "embeddings": ("STRING", {"default": '', "multiline": True, "tooltip": "Embeddings used to generate the image."}),
                "lora_tags": ("STRING", {"default": '', "multiline": True, "tooltip": "Tags of the LoRAs used to generate the image."}),
                "positive_prompt": ("STRING", {"default": '', "multiline": True, "tooltip": "Prompt to generate the image."}),
                "negative_prompt": ("STRING", {"default": '', "multiline": True, "tooltip": "Negative prompt used to generate the image."}),
                "steps": ("INT", {"default": 30, "min": 1, "max": 10000, "tooltip": "Steps used to generate the image."}),
                "denoising": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "tooltip": "Denoising strength used to generate the image."}),
                "clip_skip": ("INT", {"default": -1, "min": -24, "max": -1, "tooltip": "CLIP skip used to generate the image."}),
                "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 30.0, "tooltip": "CFG used to generate the image."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff, "tooltip": "Seed used to generate the image."}),
                "width": ("INT", {"default": 1024, "tooltip": "Width of the image."}),
                "height": ("INT", {"default": 1024, "tooltip": "Height of the image."}),
                "hires_upscale": ("FLOAT", {"default": 1.5, "tooltip": "Upscale factor for Hires-fix."}),
                "hires_upscaler": (folder_paths.get_filename_list("upscale_models"), {"tooltip": "Upscale model for Hires-fix."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }
    
    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("metadata_string", "checkpoint", "vae", 
                    "sampler", "scheduler", "embeddings", "lora_tags",
                    "full_pos_prompt", "neg_prompt", "steps", "denoising", "clip_skip", "cfg", "seed", 
                    "width", "height", "hires_upscaler", "hires_upscale")
    RETURN_TYPES = ("STRING", folder_paths.get_filename_list("checkpoints"), folder_paths.get_filename_list("vae"),
                    KSampler.SAMPLERS, KSampler.SCHEDULERS, "STRING", "STRING",
                    "STRING", "STRING", "INT", "FLOAT", "INT", "FLOAT", "INT",
                    "INT", "INT", folder_paths.get_filename_list("upscale_models"), "FLOAT")

    def on_exec(self, node_id, checkpoint, vae, sampler, scheduler, positive_prompt, negative_prompt,
                steps, denoising, clip_skip, cfg, seed, width, height, hires_upscale, hires_upscaler, embeddings:str, lora_tags):
        
        checkpoint_path = folder_paths.get_full_path("checkpoints", checkpoint)
        try:
            checkpoint_hash = get_sha256(checkpoint_path)
        except Exception as e:
            checkpoint_hash = "Unknown"
            print(f"Error calculating hash for checkpoint: {e}")
        checkpoint_name = os.path.basename(checkpoint_path)

        if hires_upscaler:
            upscaler_path = folder_paths.get_full_path("upscale_models", hires_upscaler)
            upscaler_name = os.path.basename(upscaler_path)
        else:
            upscaler_name = "Latent"

        vae_path = folder_paths.get_full_path("vae", vae)
        try:
            vae_hash = get_sha256(vae_path)
        except Exception as e:
            vae_hash = "Unknown"
            print(f"Error calculating hash for VAE: {e}")
        vae_name = os.path.basename(vae_path)


        emb_hashes = get_embedding_hashes(embeddings) if embeddings else []
        emb_hashes_str = ", ".join(emb_hashes) if emb_hashes else "None"
                   
        lora_hashes = get_lora_hashes(lora_tags) if lora_tags else []
        lora_hashes_str = ", ".join(lora_hashes) if lora_hashes else "None"

        sampler_a1111 = SAMPLER_MAP.get(sampler, sampler)
        scheduler_a1111 = SCHEDULER_MAP.get(scheduler, scheduler)

        metadata_string = (
            f"{positive_prompt}, {embeddings.replace('embedding:','')}, {lora_tags}\n"
            f"Negative prompt: {negative_prompt}\n"
            f"Steps: {steps}, Sampler: {sampler_a1111}, Schedule type: {scheduler_a1111}, CFG scale: {cfg}, Seed: {seed}, Size: {width}x{height}, "
            f"Denoising strength: {denoising}, Clip skip: {abs(clip_skip)},  "
            f"VAE hash: {vae_hash}, VAE: {vae_name}, "
            f"Model hash: {checkpoint_hash}, Model: {checkpoint_name}, "
            f"Hires upscale: {hires_upscale}, Hires upscaler: {upscaler_name}, "
            f"Lora hashes: \"{lora_hashes_str}\", "
            f"TI hashes: \"{emb_hashes_str}\", Version: ComfyUI.LF Nodes"
        )
        
        PromptServer.instance.send_sync("lf-civitaimetadatasetup", {
            "node": node_id, 
            "metadataString": metadata_string, 
        })

        output_prompt = positive_prompt + ", " + embeddings if embeddings else positive_prompt

        return (metadata_string, checkpoint, vae, 
                sampler, scheduler, embeddings, lora_tags, 
                output_prompt, negative_prompt, steps, denoising, clip_skip, cfg, seed,
                width, height, hires_upscaler, hires_upscale)
    
class LF_ControlPanel:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "hidden": { "node_id": "UNIQUE_ID" }
        }
    
    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ()

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
    
    CATEGORY =  category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("drawing_board", "drawing_board_pos", "drawing_board_neg", "drawing_board_loras", "random_seed", "global_seed", "batch_size", "random_framing", "random_pose", "random_character", "random_outfit", "random_location", "random_style", "character_selector", "outfit_selector", "location_selector", "style_selector", "square_format", "xtra", "LLM_prompt", "character_lora_weight", "additional_loras_weight", "custom_images_urls", "config_json_path")    
    RETURN_TYPES = ("BOOLEAN", "STRING", "STRING", "STRING", "BOOLEAN", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "BOOLEAN", "INT", "INT", "INT", "INT", "BOOLEAN", "BOOLEAN", "BOOLEAN", "FLOAT", "FLOAT", "STRING", "STRING")
    
    def on_exec(self, seed, drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, fixed_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path):
        global_seed = seed if random_seed else fixed_seed
        return (drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, random_seed, global_seed, batch_size, random_framing, random_pose, random_character, random_outfit, random_location, random_style, character_selector, outfit_selector, location_selector, style_selector, square_format, xtra, llm_prompt, character_lora_weight, additional_loras_weight, custom_images_urls, config_json_path)

NODE_CLASS_MAPPINGS = {
    "LF_CivitAIMetadataSetup": LF_CivitAIMetadataSetup,
    "LF_ControlPanel": LF_ControlPanel,
    "LF_WorkflowSettings": LF_WorkflowSettings,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_CivitAIMetadataSetup": "CivitAI metadata setup",
    "LF_ControlPanel": "Control panel",
    "LF_WorkflowSettings": "Workflow settings",
}

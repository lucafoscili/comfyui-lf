import folder_paths
import os
from pathlib import Path

import comfy.sd
import comfy.utils
from comfy.samplers import KSampler

from ..constants.common import base64_web_prefix
from ..utils.configuration import *
from ..utils.image import tensor_to_base64
from ..utils.selector import prepare_model_dataset, process_model, send_multi_selector_message

from server import PromptServer

category = "✨ LF Nodes/Configuration"

class AnyType(str):
    def __ne__(self, __value: object) -> bool:
        return False

any = AnyType("*")

class LF_CivitAIMetadataSetup:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
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
                    "width", "height", "hires_upscaler", "hires_upscale", "analytics_dataset")
    RETURN_TYPES = ("STRING", folder_paths.get_filename_list("checkpoints"), folder_paths.get_filename_list("vae"),
                    KSampler.SAMPLERS, KSampler.SCHEDULERS, "STRING", "STRING",
                    "STRING", "STRING", "INT", "FLOAT", "INT", "FLOAT", "INT",
                    "INT", "INT", folder_paths.get_filename_list("upscale_models"), "FLOAT", "JSON")

    def on_exec(self, **kwargs):
        analytics_dataset = { "nodes": [] }

        cfg = kwargs.get("cfg")
        checkpoint = kwargs.get("checkpoint")
        clip_skip = kwargs.get("clip_skip")
        denoising = kwargs.get("denoising")
        embeddings = kwargs.get("embeddings")
        height = kwargs.get("height")
        hires_upscale = kwargs.get("hires_upscale")
        hires_upscaler = kwargs.get("hires_upscaler")
        lora_tags = kwargs.get("lora_tags")
        negative_prompt = kwargs.get("negative_prompt")
        node_id = kwargs.get("node_id")
        positive_prompt = kwargs.get("positive_prompt")
        sampler = kwargs.get("sampler")
        seed = kwargs.get("seed")
        steps = kwargs.get("steps")
        scheduler = kwargs.get("scheduler")
        vae = kwargs.get("vae")
        width = kwargs.get("width")
        
        if checkpoint:
            checkpoint_path = folder_paths.get_full_path("checkpoints", checkpoint)
            checkpoint_name = os.path.basename(checkpoint_path)
            try:
                checkpoint_hash = get_sha256(checkpoint_path)
                analytics_dataset["nodes"].append({ "children": [{ "id": checkpoint_name, "value": checkpoint_name }], "id": "checkpoints"})
            except Exception as e:
                checkpoint_hash = "Unknown"
                print(f"Error calculating hash for checkpoint: {e}")

        if embeddings:
            emb_hashes = get_embedding_hashes(embeddings, analytics_dataset) if embeddings else []
            emb_hashes_str = ", ".join(emb_hashes) if emb_hashes else "None"
        else:
            emb_hashes = []
            emb_hashes_str = ""

        if hires_upscaler:
            upscaler_path = folder_paths.get_full_path("upscale_models", hires_upscaler)
            upscaler_name = os.path.basename(upscaler_path)
            analytics_dataset["nodes"].append({ "children": [{ "id": upscaler_name, "value": upscaler_name }], "id": "upscale_models"})
        else:
            upscaler_name = "Latent"

        if lora_tags:
            lora_hashes = get_lora_hashes(lora_tags, analytics_dataset) if lora_tags else []
            lora_hashes_str = ", ".join(lora_hashes) if lora_hashes else "None"
        else:
            lora_hashes = []
            lora_hashes_str = ""

        if sampler:
            analytics_dataset["nodes"].append({ "children": [{ "id": sampler, "value": sampler }], "id": "samplers"})
            sampler_a1111 = SAMPLER_MAP.get(sampler, sampler)

        if scheduler:
            analytics_dataset["nodes"].append({ "children": [{ "id": scheduler, "value": scheduler }], "id": "schedulers"})
            scheduler_a1111 = SCHEDULER_MAP.get(scheduler, scheduler)

        if vae:
            vae_path = folder_paths.get_full_path("vae", vae)
            vae_name = os.path.basename(vae_path)
            try:
                vae_hash = get_sha256(vae_path)
                analytics_dataset["nodes"].append({ "children": [{ "id": vae_name, "value": vae_name }], "id": "vaes"})
            except Exception as e:
                vae_hash = "Unknown"
                print(f"Error calculating hash for VAE: {e}")
                   
        metadata_string = (
            f"{embeddings if embeddings else ''}, {positive_prompt if positive_prompt else ''}, {lora_tags if lora_tags else ''}\n"
            f"Negative prompt: {negative_prompt if negative_prompt else ''}\n"
            f"Steps: {steps if steps else ''}, Sampler: {sampler_a1111 if sampler else ''}, Schedule type: {scheduler_a1111 if scheduler else ''}, CFG scale: {cfg if cfg else ''}, "
            f"Seed: {seed if seed else ''}, Size: {width if width else ''}x{height if height else ''}, "
            f"Denoising strength: {denoising if denoising else ''}, Clip skip: {abs(clip_skip) if clip_skip else ''},  "
            f"VAE hash: {vae_hash if vae_hash else ''}, VAE: {vae_name if vae_name else ''}, "
            f"Model hash: {checkpoint_hash if checkpoint_hash else ''}, Model: {checkpoint_name if checkpoint_name else ''}, "
            f"Hires upscale: {hires_upscale if hires_upscale else ''}, Hires upscaler: {upscaler_name if upscaler_name else ''}, "
            f"Lora hashes: \"{lora_hashes_str if lora_hashes_str else ''}\", "
            f"TI hashes: \"{emb_hashes_str if emb_hashes_str else ''}\", Version: ComfyUI.LF Nodes"
        )
        
        clean_metadata_string = metadata_string.replace(".safetensors", "")
        clean_metadata_string = clean_metadata_string.replace("embedding:", "")
        
        PromptServer.instance.send_sync("lf-civitaimetadatasetup", {
            "node": node_id, 
            "metadataString": clean_metadata_string, 
        })

        if positive_prompt:
            output_prompt = f"{embeddings}, {positive_prompt}" if embeddings else positive_prompt
        else:
            output_prompt = ''

        return (clean_metadata_string, checkpoint, vae, 
                sampler, scheduler, embeddings, lora_tags, 
                output_prompt, negative_prompt, steps, denoising, clip_skip, cfg, seed,
                width, height, hires_upscaler, hires_upscale, analytics_dataset)
    
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

class LF_LoadLoraTags:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the models from CivitAI."}),
                "model": ("MODEL", {"tooltip": "The main model to apply the LoRA to."}),
                "clip": ("CLIP", {"tooltip": "The CLIP model to modify."}),
                "tags": ("STRING", {"default": '', "multiline": True, "tooltip": "Text containing LoRA tags, e.g., <lora:example:1.0>"}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("model_with_lora", "clip_with_lora")
    RETURN_TYPES = ("MODEL", "CLIP")

    def on_exec(self, node_id, get_civitai_info, model, clip, tags):
        datasets =  []
        chip_dataset =  {"nodes": []}

        regex = r"\<[0-9a-zA-Z\:\_\-\.\s\/\(\)\\\\]+\>"
        found_tags = re.findall(regex, tags)

        api_flags = []
        lora_paths = []
        hashes = []

        if not found_tags:

            send_multi_selector_message(node_id, [], [], [], [], "lf-loadloratags")

            return (model, clip)

        lora_status = {}
    
        for tag in found_tags:
            tag_content = tag[1:-1].split(":")
            if tag_content[0] != 'lora' or len(tag_content) < 2:
                chip_dataset["nodes"].append(self.add_chip(tag_content))
                continue

            lora_name, m_weight, c_weight = self.get_lora_weights(tag_content)
            if not lora_name:
                chip_dataset["nodes"].append(self.add_chip(lora_name))
                lora_status[tag_content[1]] = False
                continue

            if lora_name in lora_status:
                print(f"LoRA '{lora_name}' is already loaded, skipping.")
                continue

            lora_path = folder_paths.get_full_path("loras", lora_name)
            lora = self.load_lora_file(lora_path)

            model, clip = comfy.sd.load_lora_for_models(model, clip, lora, m_weight, c_weight)

            lora_status[lora_name] = True

            lora_data = process_model("lora", lora_name, "loras")
            name = lora_data["model_name"]
            hash = lora_data["model_hash"]
            path = lora_data["model_path"]
            base64 = lora_data["model_base64"]
            saved_info = lora_data["saved_info"]

            hashes.append(hash)
            lora_paths.append(path)

            if saved_info:
                datasets.append(saved_info)
                api_flags.append(False)
            else:
                datasets.append(prepare_model_dataset(name, hash, base64, path))
                api_flags.append(get_civitai_info)

        if not len(chip_dataset["nodes"]):
            chip_dataset["nodes"].append({ "icon": "check",
                                          "Description": "Every LoRA has been loaded successfully!", 
                                          "id": "0", 
                                          "value": "LoRA loaded successfully!"})
            
        send_multi_selector_message(node_id, datasets, hashes, api_flags, lora_paths, "lf-loadloratags", chip_dataset)

        return (model, clip)


    def get_lora_weights(self, tag_content):
        name = tag_content[1]
        try:
            m_weight = float(tag_content[2]) if len(tag_content) > 2 else 1.0
            c_weight = float(tag_content[3]) if len(tag_content) > 3 else m_weight
        except ValueError:
            return None, None, None
    
        lora_files = folder_paths.get_filename_list("loras")
    
        lora_name = None
        for lora_file in lora_files:
            if Path(lora_file).name.startswith(name) or lora_file.startswith(name):
                lora_name = lora_file
                break
    
        return lora_name, m_weight, c_weight

    def load_lora_file(self, lora_path):
        lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
        return lora

    def add_chip(self, value):
        return { "icon": "clear", "Description": "Failed to load this LoRA.", "id": value, "value": value}
        
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

class LF_Notify:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "any": (any, {"tooltip": "Pass-through data."}),
                "title": ("STRING", {"default": "ComfyUI - LF Nodes", "tooltip": "The title displayed by the notification."}),
                "message": ("STRING", {"default": "Your ComfyUI workflow sent you a notification!", "multiline": True, "tooltip": "The message displayed by the notification."}),
                "on_click_action": (["None", "Focus tab", "Interrupt", "Interrupt and queue", "Queue prompt"], {"tooltip": "Action triggered when clicking on the notification."}),
                "silent": ("BOOLEAN", {"default": True, "tooltip": "The notifications will be displayed without triggering a sound effect."}),
            },
            "optional": {
                "image": ("IMAGE", {"tooltip": "Image displayed in the notification."}),
                "tag": ("STRING", {"default": '', "tooltip": "Used to group notifications (old ones with the same tag will be replaced)."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (True, False, False, False, False, False, False)
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("any",)
    RETURN_TYPES = (any,)

    def on_exec(self, node_id, any, on_click_action:str, title, message, silent, tag=None, image=None):

        action_to_send = on_click_action[0] if isinstance(on_click_action, list) else on_click_action
        silent_to_send = silent[0] if isinstance(silent, list) else silent
        message_to_send = message[0] if isinstance(message, list) else message
        title_to_send = title[0] if isinstance(title, list) else title
        if image:
            image = image[0] if isinstance(image, list) else image
            image_to_send = base64_web_prefix + tensor_to_base64(image)
        else:
            image_to_send = None
        if tag:
            tag_to_send = tag[0] if isinstance(tag, list) else tag
        else:
            tag_to_send = None

        PromptServer.instance.send_sync("lf-notify", {
            "node": node_id, 
            "title": title_to_send,
            "message": message_to_send,
            "action": action_to_send.lower(),
            "image": image_to_send,
            "silent": silent_to_send,
            "tag": tag_to_send
        })

        return (any,)

NODE_CLASS_MAPPINGS = {
    "LF_CivitAIMetadataSetup": LF_CivitAIMetadataSetup,
    "LF_ControlPanel": LF_ControlPanel,
    "LF_LoadLoraTags": LF_LoadLoraTags,
    "LF_Lora2Prompt": LF_Lora2Prompt,
    "LF_LoraTag2Prompt": LF_LoraTag2Prompt,
    "LF_Notify": LF_Notify,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_CivitAIMetadataSetup": "CivitAI metadata setup",
    "LF_ControlPanel": "Control panel",
    "LF_LoadLoraTags": "Load LoRA tags",
    "LF_Lora2Prompt": "Convert prompt and LoRAs",
    "LF_LoraTag2Prompt": "Convert LoRA tag to prompt",
    "LF_Notify": "Notify",
}
import re
import torch

from folder_paths import get_full_path
from pathlib import Path

import comfy.sd
import comfy.utils

from ..utils.constants import ANY, BASE64_PNG_PREFIX, CATEGORY_PREFIX, CHECKPOINTS, EVENT_PREFIX, FUNCTION, INT_MAX, LORA_TAG_REGEX, LORAS, NOTIFY_COMBO, SAMPLERS, SCHEDULERS, UPSCALERS, VAES
from ..utils.helpers import count_words_in_comma_separated_string, get_embedding_hashes, get_lora_hashes, get_sha256, normalize_input_image, normalize_input_list, normalize_list_to_value, cleanse_lora_tag, prepare_model_dataset, process_model, send_multi_selector_message, tensor_to_base64

from server import PromptServer

CATEGORY = f"{CATEGORY_PREFIX}/Configuration"

# region LF_CivitAIMetadataSetup
class LF_CivitAIMetadataSetup:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "checkpoint": (CHECKPOINTS, {"default": "None", "tooltip": "Checkpoint used to generate the image."}),
            },
            "optional": {
                "vae": (VAES, {"tooltip": "VAE used to generate the image."}),
                "sampler": (SAMPLERS, {"default": "None", "tooltip": "Sampler used to generate the image."}),
                "scheduler": (SCHEDULERS, {"default": "None", "tooltip": "Scheduler used to generate the image."}),
                "embeddings": ("STRING", {"default": '', "multiline": True, "tooltip": "Embeddings used to generate the image."}),
                "lora_tags": ("STRING", {"default": '', "multiline": True, "tooltip": "Tags of the LoRAs used to generate the image."}),
                "positive_prompt": ("STRING", {"default": '', "multiline": True, "tooltip": "Prompt to generate the image."}),
                "negative_prompt": ("STRING", {"default": '', "multiline": True, "tooltip": "Negative prompt used to generate the image."}),
                "steps": ("INT", {"default": 30, "min": 1, "max": 10000, "tooltip": "Steps used to generate the image."}),
                "denoising": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "tooltip": "Denoising strength used to generate the image."}),
                "clip_skip": ("INT", {"default": -1, "min": -24, "max": -1, "tooltip": "CLIP skip used to generate the image."}),
                "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 30.0, "tooltip": "CFG used to generate the image."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": INT_MAX, "tooltip": "Seed used to generate the image."}),
                "width": ("INT", {"default": 1024, "tooltip": "Width of the image."}),
                "height": ("INT", {"default": 1024, "tooltip": "Height of the image."}),
                "hires_upscale": ("FLOAT", {"default": 1.5, "tooltip": "Upscale factor for Hires-fix."}),
                "hires_upscaler": (UPSCALERS, {"tooltip": "Upscale model for Hires-fix."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("metadata_string", "checkpoint", "vae", 
                    "sampler", "scheduler", "embeddings", "lora_tags",
                    "full_pos_prompt", "neg_prompt", "steps", "denoising", "clip_skip", "cfg", "seed", 
                    "width", "height", "hires_upscaler", "hires_upscale", "analytics_dataset")
    RETURN_TYPES = ("STRING", CHECKPOINTS, VAES,
                    SAMPLERS, SCHEDULERS, "STRING", "STRING",
                    "STRING", "STRING", "INT", "FLOAT", "INT", "FLOAT", "INT",
                    "INT", "INT", UPSCALERS, "FLOAT", "JSON")

    def on_exec(self, **kwargs:dict):
        def add_metadata_node(category, item):
            """Add metadata information for a specific category."""
            if item:
                analytics_dataset["nodes"].append({
                    "children": [{"id": item, "value": item}],
                    "id": category
                })

        cfg:float = normalize_list_to_value(kwargs.get("cfg"))
        checkpoint:str = normalize_list_to_value(kwargs.get("checkpoint"))
        clip_skip:int = normalize_list_to_value(kwargs.get("clip_skip"))
        denoising:float = normalize_list_to_value(kwargs.get("denoising"))
        embeddings:str = normalize_list_to_value(kwargs.get("embeddings"))
        height:int = normalize_list_to_value(kwargs.get("height"))
        hires_upscale:float = normalize_list_to_value(kwargs.get("hires_upscale"))
        hires_upscaler:str = normalize_list_to_value(kwargs.get("hires_upscaler"))
        lora_tags:str = normalize_list_to_value(kwargs.get("lora_tags"))
        negative_prompt:str = normalize_list_to_value(kwargs.get("negative_prompt"))
        positive_prompt:str = normalize_list_to_value(kwargs.get("positive_prompt"))
        sampler:str = normalize_list_to_value(kwargs.get("sampler"))
        scheduler:str = normalize_list_to_value(kwargs.get("scheduler"))
        seed:int = normalize_list_to_value(kwargs.get("seed"))
        steps:int = normalize_list_to_value(kwargs.get("steps"))
        vae:str = normalize_list_to_value(kwargs.get("vae"))
        width:int = normalize_list_to_value(kwargs.get("width"))

        analytics_dataset = {"nodes": []}

        # Adding nodes to analytics dataset
        add_metadata_node("checkpoints", checkpoint)
        add_metadata_node("samplers", sampler)
        add_metadata_node("schedulers", scheduler)
        add_metadata_node("upscale_models", hires_upscaler)
        add_metadata_node("vaes", vae)

        # Hashes for Model, VAE, LoRAs, and Embeddings
        model_hash = get_sha256(get_full_path("checkpoints", checkpoint)) if checkpoint else "Unknown"
        vae_hash = get_sha256(get_full_path("vae", vae)) if vae else "Unknown"
        emb_hashes_str = ", ".join(get_embedding_hashes(embeddings, analytics_dataset)) if embeddings else ""
        lora_hashes_str = ", ".join(get_lora_hashes(lora_tags, analytics_dataset)) if lora_tags else ""

        # Metadata string generation
        metadata_string = (
            f"{embeddings or ''}, {positive_prompt or ''}, {lora_tags or ''}\n"
            f"Negative prompt: {negative_prompt or ''}\n"
            f"Steps: {steps or ''}, Sampler: {sampler or ''}, Schedule type: {scheduler or ''}, CFG scale: {cfg or ''}, "
            f"Seed: {seed or ''}, Size: {width or ''}x{height or ''}, "
            f"Denoising strength: {denoising or ''}, Clip skip: {abs(clip_skip) or ''}, "
            f"VAE hash: {vae_hash}, "
            f"Model hash: {model_hash}, Model: {checkpoint}, "
            f"Hires upscale: {hires_upscale or ''}, Hires upscaler: {hires_upscaler or 'Latent'}, "
            f"Lora hashes: \"{lora_hashes_str}\", TI hashes: \"{emb_hashes_str}\", Version: ComfyUI.LF Nodes"
        )

        clean_metadata_string = metadata_string.replace(".safetensors", "").replace("embedding:", "")
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}civitaimetadatasetup", {
            "node": kwargs.get("node_id"),
            "metadataString": clean_metadata_string,
        })

        output_prompt = f"{embeddings}, {positive_prompt}" if positive_prompt else ""
        return (
            clean_metadata_string, checkpoint, vae, sampler, scheduler, embeddings, lora_tags,
            output_prompt, negative_prompt, steps, denoising, clip_skip, cfg, seed,
            width, height, hires_upscaler, hires_upscale, analytics_dataset
        )
# endregion
# region LF_ControlPanel
class LF_ControlPanel:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_TYPES = ()

    def on_exec(self):
        return ()
# endregion
# region LF_LoadLoraTags
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
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("model", "clip")
    RETURN_TYPES = ("MODEL", "CLIP")

    def on_exec(self, node_id: str, get_civitai_info: bool, model, clip, tags: str):   
        def get_lora_weights(tag_content: str):
            name = tag_content[1]
            try:
                m_weight = float(tag_content[2]) if len(tag_content) > 2 else 1.0
                c_weight = float(tag_content[3]) if len(tag_content) > 3 else m_weight
            except ValueError:
                return None, None, None

            lora_files = LORAS

            lora_name:str = None
            for lora_file in lora_files:
                if Path(lora_file).name.startswith(name) or lora_file.startswith(name):
                    lora_name = lora_file
                    break
                
            return lora_name, m_weight, c_weight
        def load_lora_file(lora_path: str):
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            return lora
        def add_chip(value: str):
            return { "icon": "clear", 
                     "description": "Failed to load this LoRA.", 
                     "id": value, 
                     "value": value } 
        
        clip = normalize_list_to_value(clip)
        get_civitai_info = normalize_list_to_value(get_civitai_info)
        model = normalize_list_to_value(model)
        tags = normalize_list_to_value(tags)

        regex = r"\<[0-9a-zA-Z\:\_\-\.\s\/\(\)\\\\]+\>"
        found_tags: list[str] = re.findall(regex, tags)

        api_flags = []
        nodes = []
        chip_dataset =  { "nodes": nodes }
        datasets =  []
        hashes = []
        lora_paths = []
        lora_status = {}

        if not found_tags:
            send_multi_selector_message(node_id, [], [], [], [], f"{EVENT_PREFIX}loadloratags")
            return (model, clip)

        for tag in found_tags:
            tag_content = tag[1:-1].split(":")
            if tag_content[0] != 'lora' or len(tag_content) < 2:
                nodes.append(add_chip(tag_content))
                continue

            lora_name, m_weight, c_weight = get_lora_weights(tag_content)
            if not lora_name:
                nodes.append(add_chip(lora_name))
                lora_status[tag_content[1]] = False
                continue

            if lora_name in lora_status:
                print(f"LoRA '{lora_name}' is already loaded, skipping.")
                continue

            lora_path = get_full_path("loras", lora_name)
            lora = load_lora_file(lora_path)

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

        if not len(nodes):
            nodes.append({ "icon": "check",
                           "description": "Each LoRA has been loaded successfully!", 
                           "id": "0", 
                           "value": "LoRA loaded successfully!" })
            
        send_multi_selector_message(node_id, datasets, hashes, api_flags, lora_paths, f"{EVENT_PREFIX}loadloratags", chip_dataset)

        return (model, clip)
# endregion
# region LF_Lora2Prompt
class LF_Lora2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "tooltip": "The input text containing LoRa tags. These tags will be processed and replaced with extracted keywords."}),
                "separator": ("STRING", { "default": "SEP", "tooltip": "Character(s) used to separate keywords within the name of a single LoRa file. Helps in extracting individual keywords."}),
                "weight": ("FLOAT", { "default": 0.5, "tooltip": "A weight value associated with LoRa tags, which may influence processing or output significance."}),
                "weight_placeholder": ("STRING", { "default": "wwWEIGHTww", "tooltip": "A placeholder within LoRa tags that gets replaced with the actual weight value during processing."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        } 

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("prompt", "loras")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, node_id: str, text: str, separator: str, weight: float, weight_placeholder: str):
        text = normalize_list_to_value(text)
        separator = normalize_list_to_value(separator)
        weight = normalize_list_to_value(weight)
        weight_placeholder = normalize_list_to_value(weight_placeholder)
        
        loras = re.findall(LORA_TAG_REGEX, text)
        
        lora_keyword_map = {}
        for lora in loras:
            lora_keyword_map[lora] = cleanse_lora_tag(lora, separator)
        
        for lora_tag, keywords in lora_keyword_map.items():
            text = text.replace(lora_tag, keywords)
        
        loras_weighted = [lora.replace(weight_placeholder, str(weight)) for lora in loras]
        loras_string = "".join(loras_weighted)

        log_entries = [f"## Breakdown\n"]
        log_entries.append(f"**Original Text**: {text}")
        log_entries.append(f"**Separator Used**: '{separator}'")
        log_entries.append(f"**Weight Placeholder**: '{weight_placeholder}', Weight Value: {weight}")
        
        log_entries.append("\n### Extracted LoRA Tags:\n")
        for lora_tag in loras:
            log_entries.append(f"- **LoRA Tag**: {lora_tag}")

        log_entries.append("\n### Keyword Mapping:\n")
        for lora_tag, keywords in lora_keyword_map.items():
            log_entries.append(f"- **Original Tag**: {lora_tag}")
            log_entries.append(f"  - **Cleansed Keywords**: {keywords}")

        log_entries.append("\n### Final Prompt Substitution:\n")
        log_entries.append(f"**Modified Text**: {text}")
        
        log = "\n".join(log_entries)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}lora2prompt", {
            "node": node_id, 
            "log": log
        })

        return (text, loras_string)
# endregion
# region LF_LoraTag2Prompt
class LF_LoraTag2Prompt:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "tag": ("STRING", {"multiline": True, "tooltip": "The LoRA tag to be converted."}),
                "separator": ("STRING", { "default": "SEP", "tooltip": "String separating each keyword in a LoRA filename."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("keywords", "keywords_count", "keywords_list", "keywords_count_list")
    RETURN_TYPES = ("STRING", "INT", "STRING", "INT")

    def on_exec(self, node_id: str, tag: str, separator: str):
        tag_list = normalize_input_list(tag)
        separator = normalize_list_to_value(separator)

        clean_loras = []
        keyword_counts = []
        log_entries = []

        for tag_entry in tag_list:
            tags_in_entry = re.findall(LORA_TAG_REGEX, tag_entry)

            for t in tags_in_entry:
                clean_lora = cleanse_lora_tag(t, separator)   
                keywords_count = count_words_in_comma_separated_string(clean_lora)
                clean_loras.append(clean_lora)
                keyword_counts.append(keywords_count)

                log_entries.append(f"""
### LoRA Tag Entry:
                                   
- **Original Tag**: {t}
- **Cleaned LoRA Tag**: {clean_lora}
- **Number of Keywords**: {keywords_count}
- **Keywords Extracted**: {clean_lora.split(', ') if clean_lora else '*No keywords extracted*'}
                """)

        log = f"""## Breakdown

### Input Details:

- **Original Tags**: {tag_list}
- **Separator Used**: '{separator}'

{''.join(log_entries)}
        """

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loratag2prompt", {
            "node": node_id, 
            "log": log
        })

        return (clean_loras, keyword_counts, clean_loras, keyword_counts)
# endregion
# region LF_Notify
class LF_Notify:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "any": (ANY, {"tooltip": "Pass-through data."}),
                "title": ("STRING", {"default": "ComfyUI - LF Nodes", "tooltip": "The title displayed by the notification."}),
                "message": ("STRING", {"default": "Your ComfyUI workflow sent you a notification!", "multiline": True, "tooltip": "The message displayed by the notification."}),
                "on_click_action": (NOTIFY_COMBO, {"tooltip": "Action triggered when clicking on the notification."}),
                "silent": ("BOOLEAN", {"default": True, "tooltip": "The notifications will be displayed without triggering a sound effect."}),
            },
            "optional": {
                "image": ("IMAGE", {"tooltip": "Image displayed in the notification."}),
                "tag": ("STRING", {"default": '', "tooltip": "Used to group notifications (old ones with the same tag will be replaced)."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    OUTPUT_NODE = True
    RETURN_NAMES = ("any", "any_list")
    RETURN_TYPES = (ANY, ANY)

    def on_exec(self, node_id: str, any, on_click_action: str, title: str, message: str, silent: bool, tag: str = None, image: torch.Tensor = None):
        any = normalize_list_to_value(any)
        on_click_action = normalize_list_to_value(on_click_action)
        title = normalize_list_to_value(title)
        message = normalize_list_to_value(message)
        silent = normalize_list_to_value(silent)
        tag = normalize_list_to_value(tag)
        if isinstance(image, torch.Tensor):
            image = normalize_input_image(image)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}notify", {
            "node": node_id, 
            "title": title,
            "message": message,
            "action": on_click_action.lower(),
            "image": f"{BASE64_PNG_PREFIX}{tensor_to_base64(image[0])}" if image != None else None,
            "silent": silent,
            "tag": tag
        })

        return (any, any)
# endregion
# region Mappings
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
# endregion
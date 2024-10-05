import folder_paths
import os
import random
from pathlib import Path

import comfy.sd
import comfy.utils
from comfy.samplers import KSampler

from ..utils.configuration import *

from server import PromptServer

category = "✨ LF Nodes/Configuration"

class LF_CheckpointSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "checkpoint": (folder_paths.get_filename_list("checkpoints"), {"default": "None", "tooltip": "Checkpoint used to generate the image."}),
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the model from CivitAI."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a checkpoint randomly from your checkpoints directory."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter checkpoint file names."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("checkpoint", "checkpoint_name", "checkpoint_image", "model_path")
    RETURN_TYPES = (folder_paths.get_filename_list("checkpoints"), "STRING", "IMAGE", "STRING")

    def on_exec(self, node_id, checkpoint, get_civitai_info, randomize, seed, filter):
        checkpoints = folder_paths.get_filename_list("checkpoints")

        if filter:
            checkpoints = [ckpt for ckpt in checkpoints if filter in ckpt]

        if randomize:
            random.seed(seed)
            checkpoint = random.choice(checkpoints)

        checkpoint_data = process_model("checkpoint", checkpoint, "checkpoints")
        model_name = checkpoint_data["model_name"]
        model_hash = checkpoint_data["model_hash"]
        model_path = checkpoint_data["model_path"]
        model_base64 = checkpoint_data["model_base64"]
        model_cover = checkpoint_data["model_cover"]
        saved_info = checkpoint_data["saved_info"]

        if saved_info:
            dataset = saved_info
            get_civitai_info = False
        else:
            dataset = prepare_model_dataset(model_name, model_hash, model_base64, model_path)

        send_single_selector_message(node_id, dataset, model_hash, get_civitai_info, model_path, "lf-checkpointselector")

        return (checkpoint, model_name, model_cover, model_path)

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

class LF_EmbeddingSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the model from CivitAI."}),
                "weight": ("FLOAT", {"default": 1.0, "min": -3.0, "max": 3.0, "tooltip": "Embedding's weight."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects an embedding randomly from your embeddings directory."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter embedding file names."}),
            },
            "optional": {
                "embedding": (["None"] + folder_paths.get_filename_list("embeddings"), {"default": "None", "tooltip": "Embedding to use."}),
                "embedding_stack": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Optional string usable to concatenate subsequent selector nodes."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("embedding", "formatted_embedding", "embedding_name", "model_path", "model_cover")
    RETURN_TYPES = (folder_paths.get_filename_list("embeddings"), "STRING", "STRING", "STRING", "IMAGE")

    def on_exec(self, node_id, embedding, get_civitai_info, weight, randomize, seed, filter, embedding_stack=""):
        embedding = None if embedding is None or str(embedding) == "None" else embedding

        if not embedding and not randomize:

            send_single_selector_message(node_id, None, None, False, None, "lf-embeddingselector")

            return (None, embedding_stack, "", "", None)
        
        embeddings = folder_paths.get_filename_list("embeddings")

        if filter:
            embeddings = [e for e in embeddings if filter in e]

        if randomize:
            random.seed(seed)
            embedding = random.choice(embeddings)

        embedding_data = process_model("embedding", embedding, "embeddings")
        model_name = embedding_data["model_name"]
        model_hash = embedding_data["model_hash"]
        model_path = embedding_data["model_path"]
        model_base64 = embedding_data["model_base64"]
        model_cover = embedding_data["model_cover"]
        saved_info = embedding_data["saved_info"]

        formatted_embedding =  f"embedding:{model_name}" if weight == 1 else f"(embedding:{model_name}:{weight})"

        if saved_info:
            dataset = saved_info
            get_civitai_info = False
        else:
            dataset = prepare_model_dataset(model_name, model_hash, model_base64, model_path)

        if embedding_stack:
            formatted_embedding = f"{formatted_embedding}, {embedding_stack}"

        send_single_selector_message(node_id, dataset, model_hash, get_civitai_info, model_path, "lf-embeddingselector")

        return (embedding, formatted_embedding, model_name, model_path, model_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True

class LF_LoadLoraTags:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the models from CivitAI."}),
                "model": ("MODEL", {"tooltip": "The main model to apply the LoRA to."}),
                "clip": ("CLIP", {"tooltip": "The CLIP model to modify."}),
                "tags": ("STRING", {"default": "", "multiline": True, "tooltip": "Text containing LoRA tags, e.g., <lora:example:1.0>"}),
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
            
        send_multi_selector_message(node_id, datasets, hashes, get_civitai_info, lora_paths, "lf-loadloratags", chip_dataset)

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
    
class LF_LoraAndEmbeddingSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the models from CivitAI."}),
                "weight": ("FLOAT", {"default": 1.0, "min": -3.0, "max": 3.0, "tooltip": "Lora and embedding weights."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a combination of Lora and Embedding randomly from your directories."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter file names."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "optional": {
                "lora": (["None"] + folder_paths.get_filename_list("loras"), {"default": "None", "tooltip": "Lora model to use, it will also select the embedding with the same name."}),
                "lora_stack": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Optional string usable to concatenate subsequent Lora selector nodes."}),
                "embedding_stack": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Optional string usable to concatenate subsequent embedding selector nodes."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("lora", "embedding", "lora_tag", "formatted_embedding", "lora_name", "embedding_name",
                    "lora_path", "embedding_path", "lora_cover", "embedding_cover")
    RETURN_TYPES = (folder_paths.get_filename_list("loras"), folder_paths.get_filename_list("embeddings"), "STRING", "STRING", "STRING", "STRING",
                    "STRING", "STRING", "IMAGE", "IMAGE",)

    def on_exec(self, node_id, lora, get_civitai_info, weight, randomize, seed, filter, lora_stack="", embedding_stack=""):
        lora = None if lora is None or str(lora) == "None" else lora

        if not lora and not randomize:

            send_single_selector_message(node_id, [], [], [], [], "lf-loraandembeddingselector")

            return (None, None, lora_stack, embedding_stack, "", "", "", "", None, None)
        
        loras = folder_paths.get_filename_list("loras")
        embeddings = folder_paths.get_filename_list("embeddings")

        if filter:
            loras = [l for l in loras if filter in l]

        if randomize:
            random.seed(seed)
            lora = random.choice(loras)

        embedding = lora
        if embedding not in embeddings:
            raise ValueError(f"Not found an embedding named {lora}")

        lora_data = process_model("lora", lora, "loras")
        l_name = lora_data["model_name"]
        l_hash = lora_data["model_hash"]
        l_path = lora_data["model_path"]
        l_base64 = lora_data["model_base64"]
        l_cover = lora_data["model_cover"]
        l_saved_info = lora_data["saved_info"]

        embedding_data = process_model("embedding", embedding, "embeddings")
        e_name = embedding_data["model_name"]
        e_hash = embedding_data["model_hash"]
        e_path = embedding_data["model_path"]
        e_base64 = embedding_data["model_base64"]
        e_cover = embedding_data["model_cover"]
        e_saved_info = embedding_data["saved_info"]

        lora_tag = f"<lora:{l_name}:{weight}>"
        formatted_embedding = f"embedding:{e_name}" if weight == 1 else f"(embedding:{e_name}:{weight})"

        if l_saved_info:
            l_dataset = l_saved_info
        else:
            l_dataset = prepare_model_dataset(l_name, l_hash, l_base64, l_path)

        if e_saved_info:
            e_dataset = e_saved_info
        else:
            e_dataset = prepare_model_dataset(e_name, e_hash, e_base64, e_path)

        if lora_stack:
            lora_tag = f"{lora_tag}, {lora_stack}"

        if embedding_stack:
            formatted_embedding = f"{formatted_embedding}, {embedding_stack}"

        api_flags = [False if l_saved_info else get_civitai_info, False if e_saved_info else get_civitai_info],
        datasets = [l_dataset, e_dataset]
        hashes = [l_hash, e_hash]
        paths = [l_path, e_path]

        send_multi_selector_message(node_id, datasets, hashes, api_flags, paths, "lf-loraandembeddingselector")

        return (lora, embedding, lora_tag, formatted_embedding, l_name, e_name, l_path, e_path, l_cover, e_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True

class LF_LoraSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the model from CivitAI."}),
                "weight": ("FLOAT", {"default": 1.0, "min": -3.0, "max": 3.0, "tooltip": "Lora weight."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a Lora randomly from your loras directory."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter Lora file names."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "optional": {
                "lora": (["None"] + folder_paths.get_filename_list("loras"), {"default": "None", "tooltip": "Lora model to use."}),
                "lora_stack": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Optional string usable to concatenate subsequent selector nodes."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("lora", "lora_tag", "lora_name", "model_path", "model_cover")
    RETURN_TYPES = (folder_paths.get_filename_list("loras"), "STRING", "STRING", "STRING", "IMAGE")

    def on_exec(self, node_id, lora, get_civitai_info, weight, randomize, seed, filter, lora_stack=""):
        lora = None if lora is None or str(lora) == "None" else lora

        if not lora and not randomize:

            send_single_selector_message(node_id, None, None, False, None, "lf-loraselector")

            return (None, lora_stack, "", "", None)
        
        loras = folder_paths.get_filename_list("loras")

        if filter:
            loras = [l for l in loras if filter in l]

        if randomize:
            random.seed(seed)
            lora = random.choice(loras)

        lora_data = process_model("lora", lora, "loras")
        model_name = lora_data["model_name"]
        model_hash = lora_data["model_hash"]
        model_path = lora_data["model_path"]
        model_base64 = lora_data["model_base64"]
        model_cover = lora_data["model_cover"]
        saved_info = lora_data["saved_info"]

        lora_tag = f"<lora:{model_name}:{weight}>"

        if saved_info:
            dataset = saved_info
            get_civitai_info = False
        else:
            dataset = prepare_model_dataset(model_name, model_hash, model_base64, model_path)

        send_single_selector_message(node_id, dataset, model_hash, get_civitai_info, model_path, "lf-loraselector")

        if lora_stack:
            lora_tag = f"{lora_tag}, {lora_stack}"

        return (lora, lora_tag, model_name, model_path, model_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True

class LF_SamplerSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "sampler": (KSampler.SAMPLERS, {"default": "None", "tooltip": "Sampler used to generate the image."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a sampler randomly."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter sampler names."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("sampler",)
    RETURN_TYPES = (KSampler.SAMPLERS,)

    def on_exec(self, sampler, randomize, seed, filter):
        samplers = KSampler.SAMPLERS

        if filter:
            samplers = [s for s in samplers if filter in s]

        if randomize:
            random.seed(seed)
            sampler = random.choice(samplers)

        return (sampler,)
        
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
    
    def on_exec(self, seed, drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras, 
                random_seed, fixed_seed, batch_size, random_framing, 
                random_pose, random_character, random_outfit, random_location, 
                random_style, character_selector, outfit_selector, 
                location_selector, style_selector, square_format, xtra, 
                llm_prompt, character_lora_weight, additional_loras_weight,
                custom_images_urls, config_json_path):
        global_seed = seed if random_seed else fixed_seed
        return (drawing_board, drawing_board_plus, drawing_board_minus, drawing_board_loras,
                random_seed, global_seed, batch_size, random_framing,
                random_pose, random_character, random_outfit, random_location,
                random_style, character_selector, outfit_selector,
                location_selector, style_selector, square_format, xtra,
                llm_prompt, character_lora_weight, additional_loras_weight,
                custom_images_urls, config_json_path)

NODE_CLASS_MAPPINGS = {
    "LF_CheckpointSelector": LF_CheckpointSelector,
    "LF_CivitAIMetadataSetup": LF_CivitAIMetadataSetup,
    "LF_ControlPanel": LF_ControlPanel,
    "LF_EmbeddingSelector": LF_EmbeddingSelector,
    "LF_LoadLoraTags": LF_LoadLoraTags,
    "LF_LoraAndEmbeddingSelector": LF_LoraAndEmbeddingSelector,
    "LF_LoraSelector": LF_LoraSelector,
    "LF_SamplerSelector": LF_SamplerSelector,
    "LF_WorkflowSettings": LF_WorkflowSettings,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_CheckpointSelector": "Checkpoint selector",
    "LF_CivitAIMetadataSetup": "CivitAI metadata setup",
    "LF_ControlPanel": "Control panel",
    "LF_EmbeddingSelector": "Embedding selector",
    "LF_LoadLoraTags": "Load LoRA tags",
    "LF_LoraAndEmbeddingSelector": "LoRA and embedding selector",
    "LF_LoraSelector": "LoRA selector",
    "LF_SamplerSelector": "Sampler selector",
    "LF_WorkflowSettings": "Workflow settings",
}
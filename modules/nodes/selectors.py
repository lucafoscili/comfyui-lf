import folder_paths
import random

from comfy.samplers import KSampler
from server import PromptServer

from ..utils.selectors import *

category = "✨ LF Nodes/Selectors"

class LF_CheckpointSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "checkpoint": (folder_paths.get_filename_list("checkpoints"), {"default": "None", "tooltip": "Checkpoint used to generate the image."}),
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the model from CivitAI."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a checkpoint randomly from your checkpoints directory."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter checkpoint file names. Supports wildcards (*)"}),
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
            checkpoints = filter_list(filter, checkpoints)
            if not checkpoints:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

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

class LF_EmbeddingSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the model from CivitAI."}),
                "weight": ("FLOAT", {"default": 1.0, "min": -3.0, "max": 3.0, "tooltip": "Embedding's weight."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects an embedding randomly from your embeddings directory."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter embedding file names. Supports wildcards (*)."}),
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
            embeddings = filter_list(filter, embeddings)
            if not embeddings:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

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
    
class LF_LoraAndEmbeddingSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "get_civitai_info": ("BOOLEAN", {"default": True, "tooltip": "Attempts to retrieve more info about the models from CivitAI."}),
                "weight": ("FLOAT", {"default": 1.0, "min": -3.0, "max": 3.0, "tooltip": "Lora and embedding weights."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a combination of Lora and Embedding randomly from your directories."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter file names. Supports wildcards (*)."}),
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
            loras = filter_list(filter, loras)
            if not loras:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

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

        api_flags = [False if l_saved_info else get_civitai_info, False if e_saved_info else get_civitai_info]
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
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter Lora file names. Supports wildcards (*)."}),
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
            loras = filter_list(filter, loras)
            if not loras:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

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
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a sampler randomly."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter sampler names. Supports wildcards (*)."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("sampler", "sampler_name")
    RETURN_TYPES = (KSampler.SAMPLERS, "STRING")

    def on_exec(self, node_id, sampler, enable_history, randomize, seed, filter):
        samplers = KSampler.SAMPLERS

        if filter:
            samplers = filter_list(filter, samplers)
            if not samplers:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

        if randomize:
            random.seed(seed)
            sampler = random.choice(samplers)

        PromptServer.instance.send_sync("lf-samplerselector", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": sampler,
        })

        return (sampler, sampler)

class LF_SchedulerSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "scheduler": (KSampler.SCHEDULERS, {"default": "None", "tooltip": "Scheduler used to generate the image."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a scheduler randomly."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter scheduler names. Supports wildcards (*)."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("scheduler", "scheduler_name")
    RETURN_TYPES = (KSampler.SCHEDULERS, "STRING")

    def on_exec(self, node_id, scheduler, enable_history, randomize, seed, filter):
        schedulers = KSampler.SCHEDULERS

        if filter:
            schedulers = filter_list(filter, schedulers)
            if not schedulers:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

        if randomize:
            random.seed(seed)
            scheduler = random.choice(schedulers)

        PromptServer.instance.send_sync("lf-schedulerselector", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": scheduler,
        })

        return (scheduler, scheduler)

class LF_UpscaleModelSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "upscale_model": (folder_paths.get_filename_list("upscale_models"), {"default": "None", "tooltip": "Upscale model used to upscale the image."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a scheduler randomly."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter upscale models names. Supports wildcards (*)."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("upscale_model", "upscale_model_name")
    RETURN_TYPES = (folder_paths.get_filename_list("upscale_models"), "STRING")

    def on_exec(self, node_id, upscale_model, enable_history, randomize, seed, filter):
        upscalers = folder_paths.get_filename_list("upscale_models")

        if filter:
            upscalers = filter_list(filter, upscalers)
            if not upscalers:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

        if randomize:
            random.seed(seed)
            upscale_model = random.choice(upscalers)

        PromptServer.instance.send_sync("lf-upscalemodelselector", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": upscale_model,
        })

        return (upscale_model, upscale_model)

class LF_VAESelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "vae": (folder_paths.get_filename_list("vae"), {"default": "None", "tooltip": "VAE used to generate the image."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget."}),
                "randomize": ("BOOLEAN", {"default": False, "tooltip": "Selects a VAE randomly."}),
                "filter": ("STRING", {"default": "", "tooltip": "When randomization is active, this field can be used to filter VAE names. Supports wildcards (*)."}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF, "tooltip": "Seed value for when randomization is active."}),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("vae", "vae_name")
    RETURN_TYPES = (folder_paths.get_filename_list("vae"), "STRING")

    def on_exec(self, node_id, vae, enable_history, randomize, seed, filter):
        vaes = folder_paths.get_filename_list("vae")

        if filter:
            vaes = filter_list(filter, vaes)
            if not vaes:
                raise ValueError(f"Not found a model with the specified filter: {filter}")

        if randomize:
            random.seed(seed)
            vae = random.choice(vaes)

        PromptServer.instance.send_sync("lf-upscalemodelselector", {
            "node": node_id, 
            "isHistoryEnabled": enable_history,
            "value": vae,
        })

        return (vae, vae)
    
NODE_CLASS_MAPPINGS = {
    "LF_CheckpointSelector": LF_CheckpointSelector,
    "LF_EmbeddingSelector": LF_EmbeddingSelector,
    "LF_LoraAndEmbeddingSelector": LF_LoraAndEmbeddingSelector,
    "LF_LoraSelector": LF_LoraSelector,
    "LF_SamplerSelector": LF_SamplerSelector,
    "LF_SchedulerSelector": LF_SchedulerSelector,
    "LF_UpscaleModelSelector": LF_UpscaleModelSelector,
    "LF_VAESelector": LF_VAESelector,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_CheckpointSelector": "Checkpoint selector",
    "LF_EmbeddingSelector": "Embedding selector",
    "LF_LoraAndEmbeddingSelector": "LoRA and embedding selector",
    "LF_LoraSelector": "LoRA selector",
    "LF_SamplerSelector": "Sampler selector",
    "LF_SchedulerSelector": "Scheduler selector",
    "LF_UpscaleModelSelector": "Upscale model selector",
    "LF_VAESelector": "VAE selector",
}
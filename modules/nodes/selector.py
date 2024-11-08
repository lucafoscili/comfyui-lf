import random

from server import PromptServer

from ..utils.constants import CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, Input, INT_MAX, SAMPLERS, SCHEDULERS
from ..utils.helpers import create_history_node, filter_list, get_comfy_list, is_none, normalize_json_input, normalize_list_to_value, prepare_model_dataset, process_model

CATEGORY = f"{CATEGORY_PREFIX}/Selectors"

# region LF_CheckpointSelector
class LF_CheckpointSelector:
    initial_list = get_comfy_list("checkpoints")

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "get_civitai_info": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Attempts to retrieve more info about the model from CivitAI."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects a checkpoint randomly from your checkpoints directory."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter checkpoint file names. Supports wildcards (*)"
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional": {
                "checkpoint": (["None"] + self.initial_list, {
                    "default": "None", 
                    "tooltip": "Checkpoint used to generate the image."
                }),
                "ui_widget": (Input.KUL_CARD, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("combo", "string", "path", "image")
    RETURN_TYPES = (initial_list, "STRING", "STRING", "IMAGE")

    def on_exec(self, **kwargs: dict):
        checkpoint: str = normalize_list_to_value(kwargs.get("checkpoint"))
        get_civitai_info: bool = normalize_list_to_value(kwargs.get("get_civitai_info"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))

        if is_none(checkpoint):
            checkpoint = None 
        
        checkpoints = get_comfy_list("checkpoints")

        if randomize:
            if filter:
                checkpoints = filter_list(filter, checkpoints)
                if not checkpoints:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}checkpointselector", {
            "node": kwargs.get("node_id"),
            "datasets": [dataset],
            "hashes": [model_hash],
            "apiFlags": [get_civitai_info],
            "paths": [model_path],
        })

        return (checkpoint, model_name, model_path, model_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True
# endregion
# region LF_EmbeddingSelector
class LF_EmbeddingSelector:
    initial_list = get_comfy_list("embeddings")

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "get_civitai_info": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Attempts to retrieve more info about the model from CivitAI."
                }),
                "weight": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": -3.0, 
                    "max": 3.0, 
                    "tooltip": "Embedding's weight."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects an embedding randomly from your embeddings directory."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter embedding file names. Supports wildcards (*)."
                }),
            },
            "optional": {
                "embedding": (["None"] + self.initial_list, {
                    "default": "None", 
                    "tooltip": "Embedding to use."
                }),
                "embedding_stack": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "Optional string usable to concatenate subsequent selector nodes."
                }),
                "ui_widget": (Input.KUL_CARD, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("combo", "prompt", "string", "path", "image")
    RETURN_TYPES = (initial_list, "STRING", "STRING", "STRING", "IMAGE")

    def on_exec(self, **kwargs: dict):
        embedding: str = normalize_list_to_value(kwargs.get("embedding"))
        get_civitai_info: bool = normalize_list_to_value(kwargs.get("get_civitai_info"))
        weight: float = normalize_list_to_value(kwargs.get("weight"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        embedding_stack: str = normalize_list_to_value(kwargs.get("embedding_stack", ""))

        if is_none(embedding):
            embedding = None

        passthrough = bool(not embedding and not randomize)

        if passthrough:

            PromptServer.instance.send_sync(f"{EVENT_PREFIX}embeddingselector", {
                "node": kwargs.get("node_id"),
                "apiFlags": [False],
            })

            return (None, embedding_stack, "", "", None)
        
        embeddings = get_comfy_list("embeddings")

        if randomize:
            if filter:
                embeddings = filter_list(filter, embeddings)
                if not embeddings:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}embeddingselector", {
            "node": kwargs.get("node_id"),
            "datasets": [dataset],
            "hashes": [model_hash],
            "apiFlags": [get_civitai_info],
            "paths": [model_path],
        })

        return (embedding, formatted_embedding, model_name, model_path, model_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True
# endregion
# region LF_LoraAndEmbeddingSelector
class LF_LoraAndEmbeddingSelector:
    initial_emb_list = get_comfy_list("embeddings")
    initial_lora_list = get_comfy_list("loras")
        
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "get_civitai_info": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Attempts to retrieve more info about the models from CivitAI."
                }),
                "weight": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": -3.0, 
                    "max": 3.0, 
                    "tooltip": "Lora and embedding weights."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects a combination of Lora and Embedding randomly from your directories."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter file names. Supports wildcards (*)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional": {
                "lora": (["None"] + self.initial_lora_list, {
                    "default": "None", 
                    "tooltip": "Lora model to use, it will also select the embedding with the same name."
                }),
                "lora_stack": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "Optional string usable to concatenate subsequent Lora selector nodes."
                }),
                "embedding_stack": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "Optional string usable to concatenate subsequent embedding selector nodes."
                }),
                "ui_widget": (Input.KUL_CARD, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("lora_combo", "emb_combo", "lora_tag", "emb_prompt", "lora_string", "emb_string",
                    "lora_path", "emb_path", "lora_image", "emb_image")
    RETURN_TYPES = (initial_lora_list, initial_emb_list, "STRING", "STRING", "STRING", "STRING",
                    "STRING", "STRING", "IMAGE", "IMAGE",)

    def on_exec(self, **kwargs: dict):
        lora: str = normalize_list_to_value(kwargs.get("lora"))
        get_civitai_info: bool = normalize_list_to_value(kwargs.get("get_civitai_info"))
        weight: float = normalize_list_to_value(kwargs.get("weight"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        lora_stack: str = normalize_list_to_value(kwargs.get("lora_stack", ""))
        embedding_stack: str = normalize_list_to_value(kwargs.get("embedding_stack", ""))

        if is_none(lora):
            lora = None
        
        passthrough = bool(not lora and not randomize)

        if passthrough:

            PromptServer.instance.send_sync(f"{EVENT_PREFIX}loraandembeddingselector", {
                "node": kwargs.get("node_id"),
                "apiFlags": [False],
            })

            return (None, None, lora_stack, embedding_stack, "", "", "", "", None, None)
        
        EMBEDDINGS = get_comfy_list("embeddings")
        LORAS = get_comfy_list("loras")

        if randomize:
            if filter:
                LORAS = filter_list(filter, LORAS)
                if not LORAS:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
            random.seed(seed)
            lora = random.choice(LORAS)

        embedding = lora
        if embedding not in EMBEDDINGS:
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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loraandembeddingselector", {
            "node": kwargs.get("node_id"),
            "datasets": [l_dataset, e_dataset],
            "hashes": [l_hash, e_hash],
            "apiFlags": [False if l_saved_info else get_civitai_info, False if e_saved_info else get_civitai_info],
            "paths": [l_path, e_path],
        })

        return (lora, embedding, lora_tag, formatted_embedding, l_name, e_name, l_path, e_path, l_cover, e_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True
# endregion
# region LF_LoraSelector
class LF_LoraSelector:
    initial_list = get_comfy_list("loras")
        
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "get_civitai_info": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Attempts to retrieve more info about the model from CivitAI."
                }),
                "weight": (Input.FLOAT, {
                    "default": 1.0, 
                    "min": -3.0, 
                    "max": 3.0, 
                    "tooltip": "Lora weight."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects a Lora randomly from your loras directory."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter Lora file names. Supports wildcards (*)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional": {
                "lora": (["None"] + self.initial_list, {
                    "default": "None", 
                    "tooltip": "Lora model to use."
                }),
                "lora_stack": (Input.STRING, {
                    "default": "", 
                    "defaultInput": True, 
                    "tooltip": "Optional string usable to concatenate subsequent selector nodes."
                }),
                "ui_widget": (Input.KUL_CARD, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("lora", "lora_tag", "lora_name", "model_path", "model_cover")
    RETURN_TYPES = (initial_list, "STRING", "STRING", "STRING", "IMAGE")

    def on_exec(self, **kwargs: dict):
        lora: str = normalize_list_to_value(kwargs.get("lora"))
        get_civitai_info: bool = normalize_list_to_value(kwargs.get("get_civitai_info"))
        weight: float = normalize_list_to_value(kwargs.get("weight"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        lora_stack: str = normalize_list_to_value(kwargs.get("lora_stack", ""))

        if is_none(lora):
            lora = None

        passthrough = bool(not lora and not randomize)

        if passthrough:

            PromptServer.instance.send_sync(f"{EVENT_PREFIX}loraselector", {
                "node": kwargs.get("node_id"),
                "apiFlags": [False],
            })

            return (None, lora_stack, "", "", None)
        
        loras = get_comfy_list("loras")

        if randomize:
            if filter:
                loras = filter_list(filter, loras)
                if not loras:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
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

        if lora_stack:
            lora_tag = f"{lora_tag}, {lora_stack}"

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loraselector", {
            "node": kwargs.get("node_id"),
            "datasets": [dataset],
            "hashes": [model_hash],
            "apiFlags": [get_civitai_info],
            "paths": [model_path],
        })

        return (lora, lora_tag, model_name, model_path, model_cover)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True
# endregion
# region LF_SamplerSelector
class LF_SamplerSelector:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                    }),
                "randomize": (Input.BOOLEAN, {
                    "default": False,
                    "tooltip": "Selects a sampler randomly."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter sampler names. Supports wildcards (*)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
                "sampler": (["None"] + SAMPLERS, {
                    "default": "None", 
                    "tooltip": "Sampler used to generate the image."
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("combo", "string")
    RETURN_TYPES = (SAMPLERS, "STRING")

    def on_exec(self, **kwargs: dict):
        sampler: str = normalize_list_to_value(kwargs.get("sampler"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))
        
        samplers = SAMPLERS

        nodes: list[dict] = ui_widget.get("nodes", [])
        dataset: dict = {
            "nodes": nodes
        }

        if randomize:
            if filter:
                samplers = filter_list(filter, samplers)
                if not samplers:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
            random.seed(seed)
            sampler = random.choice(samplers)
        
        if enable_history:
            create_history_node(sampler, nodes)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}samplerselector", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (sampler, sampler)
# endregion
# region LF_SchedulerSelector
class LF_SchedulerSelector:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects a scheduler randomly."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter scheduler names. Supports wildcards (*)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
                "scheduler": (["None"] + SCHEDULERS, {
                    "default": "None", 
                    "tooltip": "Scheduler used to generate the image."
                }),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("combo", "string")
    RETURN_TYPES = (SCHEDULERS, "STRING")

    def on_exec(self, **kwargs: dict):
        scheduler: str = normalize_list_to_value(kwargs.get("scheduler"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        schedulers = SCHEDULERS

        nodes: list[dict] = ui_widget.get("nodes", [])
        dataset: dict = {
            "nodes": nodes
        }

        if randomize:
            if filter:
                schedulers = filter_list(filter, schedulers)
                if not schedulers:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
            random.seed(seed)
            scheduler = random.choice(schedulers)
        
        if enable_history:
            create_history_node(scheduler, nodes)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}schedulerselector", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (scheduler, scheduler)
# endregion
# region LF_UpscaleModelSelector
class LF_UpscaleModelSelector:
    initial_list = get_comfy_list("upscale_models")
        
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects a scheduler randomly."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter upscale models names. Supports wildcards (*)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
                "upscale_model": (["None"] + self.initial_list, {
                    "default": "None", 
                    "tooltip": "Upscale model used to upscale the image."
                }),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("combo", "string")
    RETURN_TYPES = (initial_list, "STRING")
        
    def on_exec(self, **kwargs: dict):
        upscale_model: str = normalize_list_to_value(kwargs.get("upscale_model"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        upscalers = get_comfy_list("upscale_models")

        nodes: list[dict] = ui_widget.get("nodes", [])
        dataset: dict = {
            "nodes": nodes
        }

        if randomize:
            if filter:
                upscalers = filter_list(filter, upscalers)
                if not upscalers:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
            random.seed(seed)
            upscale_model = random.choice(upscalers)
        
        if enable_history:
            create_history_node(upscale_model, nodes)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}upscalemodelselector", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (upscale_model, upscale_model)
# endregion
# region LF_VAESelector
class LF_VAESelector:
    initial_list = get_comfy_list("vae")
        
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "enable_history": (Input.BOOLEAN, {
                    "default": True, 
                    "tooltip": "Enables history, saving the execution value and date of the widget."
                }),
                "randomize": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Selects a VAE randomly."
                }),
                "filter": (Input.STRING, {
                    "default": "", 
                    "tooltip": "When randomization is active, this field can be used to filter VAE names. Supports wildcards (*)."
                }),
                "seed": (Input.INTEGER, {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Seed value for when randomization is active."
                }),
            },
            "optional":{
                "ui_widget": (Input.KUL_HISTORY, {
                    "default": {}
                }),
                "vae": (["None"] + self.initial_list, {
                    "default": "None", 
                    "tooltip": "VAE used to generate the image."
                }),
            },
            "hidden": {"node_id": "UNIQUE_ID"}
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("combo", "string")
    RETURN_TYPES = (initial_list, "STRING")
        
    def on_exec(self, **kwargs: dict):
        vae: str = normalize_list_to_value(kwargs.get("vae"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        randomize: bool = normalize_list_to_value(kwargs.get("randomize"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        filter: str = normalize_list_to_value(kwargs.get("filter"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        vaes = get_comfy_list("vae")

        nodes: list[dict] = ui_widget.get("nodes", [])
        dataset: dict = {
            "nodes": nodes
        }

        if randomize:
            if filter:
                vaes = filter_list(filter, vaes)
                if not vaes:
                    raise ValueError(f"Not found a model with the specified filter: {filter}")
            random.seed(seed)
            vae = random.choice(vaes)
        
        if enable_history:
            create_history_node(vae, nodes)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}vaeselector", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (vae, vae)
# endregion
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
import folder_paths
import os

from comfy.samplers import KSampler
from server import PromptServer

from ..utils.analysis import *

category = "✨ LF Nodes/Analysis"

class LF_ImageHistogram:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"label": "Image tensor", "tooltip": "Input image tensor to generate histograms from."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "dataset",)
    RETURN_TYPES = ("IMAGE", "JSON",)

    def on_exec(self, image, node_id):
        """
        Generate histograms for the RGB channels and their sum from an input image tensor,
        and format it to the KulDataDataset structure.

        Args:
            image (torch.Tensor): Input image tensor in the shape [1, H, W, 3].
            node_id (str): Unique identifier for the node instance.

        Returns:
            dict: A formatted KulDataDataset containing the histogram data.
        """
        histograms = calculate_histograms(image)
        dataset = adapt_histograms_for_kuldata(histograms)

        PromptServer.instance.send_sync("lf-imagehistogram", {
            "node": node_id, 
            "dataset": dataset,
        })

        return (image, dataset,)
    
class LF_KeywordCounter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "tooltip": "Prompt containing keywords to count."}),
                "separator": ("STRING", {"default": ", ", "tooltip": "Character(s) used to separate keywords in the prompt."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("chart_dataset", "chip_dataset")
    RETURN_TYPES = ("JSON", "JSON")

    def on_exec(self, prompt, separator, node_id):
        keywords = prompt.split(separator)
        keyword_count = {}

        for keyword in keywords:
            keyword = keyword.strip().lower()
            if keyword:
                keyword_count[keyword] = keyword_count.get(keyword, 0) + 1

        chart_dataset = adapt_keyword_count_for_chart(keyword_count)
        chip_dataset = adapt_keyword_count_for_chip(keyword_count)

        PromptServer.instance.send_sync("lf-keywordcounter", {
            "node": node_id, 
            "chartDataset": chart_dataset,
            "chipDataset": chip_dataset,
        })

        return (chart_dataset, chip_dataset)
    
class LF_UpdateUsageStatistics:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "datasets_dir": ("STRING", {"default": os.path.join(folder_paths.input_directory, "LF_Nodes"), "tooltip": "The directory where the JSON datasets are stored."}),
            },
            "optional": {
                "checkpoints": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Checkpoint names' count to update."}),
                "embeddings": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Embedding names' count to update."}),
                "loras": ("STRING", {"default": "", "defaultInput": True, "tooltip": "LoRA names' count to update."}),
                "samplers": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Sampler names' count to update."}),
                "schedulers": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Scheduler names' count to update."}),
                "upscale_models": ("STRING", {"default": "", "defaultInput": True, "tooltip": "Upscale model names' count to update."}),
                "vaes": ("STRING", {"default": "", "defaultInput": True, "tooltip": "VAE names' count to update."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID" 
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    INPUT_IS_LIST = (False, True, True, True)
    OUTPUT_NODE = True
    RETURN_TYPES = ()

    def on_exec(self, node_id, datasets_dir, checkpoints=None, embeddings=None, 
                loras=None, samplers=None, schedulers=None, upscale_models=None, vaes=None):
        def normalize_input (input): 
            if input and (input != (str(input) == "None")) and len(input) > 0:
                if not isinstance(input, list):
                    input = [input]
            else:
                input = None

            return input

        datasets_dir = datasets_dir[0] if isinstance(datasets_dir, list) else datasets_dir
        checkpoints = normalize_input(checkpoints)
        embeddings = normalize_input(embeddings)
        loras = normalize_input(loras)
        samplers = normalize_input(samplers)
        schedulers = normalize_input(schedulers)
        upscale_models = normalize_input(upscale_models)
        vaes = normalize_input(vaes)
        
        log = "# Update summary\n"

        if checkpoints:
            checkpoints_file = os.path.join(datasets_dir, "checkpoints_usage.json")
            log += "\n## Checkpoints:\n"
            for c in checkpoints:
                log += update_usage_json(checkpoints_file, "Checkpoint name", c)

        if embeddings:
            embeddings_file = os.path.join(datasets_dir, "embeddings_usage.json")
            log += "\n## Embeddings:\n"
            for e in embeddings:
                log += update_usage_json(embeddings_file, "Embedding name", e)

        if loras:
            loras_file = os.path.join(datasets_dir, "loras_usage.json")
            log += "\n## LoRAs:\n"
            for l in loras:
                log += update_usage_json(loras_file, "LoRA name", l)

        if samplers:
            samplers_file = os.path.join(datasets_dir, "samplers_usage.json")
            log += "\n## Samplers:\n"
            for s in samplers:
                log += update_usage_json(samplers_file, "Sampler name", s)

        if schedulers:
            schedulers_file = os.path.join(datasets_dir, "schedulers_usage.json")
            log += "\n## Schedulers:\n"
            for s in schedulers:
                log += update_usage_json(schedulers_file, "Scheduler name", s)

        if upscale_models:
            upscale_models_file = os.path.join(datasets_dir, "upscale_models_usage.json")
            log += "\n## Upscale models:\n"
            for u in upscale_models:
                log += update_usage_json(upscale_models_file, "Upscale model name", u)

        if vaes:
            vaes_file = os.path.join(datasets_dir, "vaes_usage.json")
            log += "\n## VAEs:\n"
            for v in vaes:
                log += update_usage_json(vaes_file, "VAE name", v)


        PromptServer.instance.send_sync("lf-updateusagestatistics", {
            "node": node_id, 
            "log": log,
        })

        return ()

NODE_CLASS_MAPPINGS = {
    "LF_ImageHistogram": LF_ImageHistogram,
    "LF_KeywordCounter": LF_KeywordCounter,
    "LF_UpdateUsageStatistics": LF_UpdateUsageStatistics,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ImageHistogram":  "Image Histogram",
    "LF_KeywordCounter": "Keyword counter",
    "LF_UpdateUsageStatistics": "Update usage statistics",
}

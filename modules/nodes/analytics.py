import folder_paths
import os

from server import PromptServer

from ..constants.analytics import *
from ..utils.analytics import *

category = "✨ LF Nodes/Analytics"

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
            image (torch.Tensor): Input image tensor in the shape [B, H, W, C].
            node_id (str): Unique identifier for the node instance.

        Returns:
            dict: A formatted KulDataDataset containing the histogram data.
        """
        histograms = calculate_histograms(image)
        datasets = adapt_histograms_for_kuldata(histograms)

        PromptServer.instance.send_sync("lf-imagehistogram", {
            "node": node_id, 
            "datasets": datasets,
        })

        return (image, datasets,)
    
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
                "datasets_dir": ("STRING", {"default": "Workflow_name", "tooltip": "The files are saved in the user directory of ComfyUI under LF_Nodes. This field can be used to add additional folders."}),
            },
            "optional": {
                "dataset": ("JSON", {"defaultInput": True, "tooltip": "Dataset including the resources (produced by CivitAIMetadataSetup)."}),
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
    INPUT_IS_LIST = (False, False, True, True, True, True, True, True, True)
    OUTPUT_NODE = True
    RETURN_TYPES = ()

    def on_exec(self, node_id, datasets_dir, dataset=None, checkpoints=None, embeddings=None, 
                loras=None, samplers=None, schedulers=None, upscale_models=None, vaes=None):
        def normalize_list(input): 
            if input and (input != (str(input) == "None")) and len(input) > 0:
                if not isinstance(input, list):
                    input = [input]
            else:
                input = None
            return input
        def process_list(input, type): 
            filename = get_usage_filename(type)
            file = os.path.join(actual_path, filename)
            log = get_usage_title(filename, "markdown")
            for i in input:
                log += update_usage_json(file, get_usage_title(filename), i)
            return log
        
        datasets_dir = datasets_dir[0] if isinstance(datasets_dir, list) else datasets_dir
        dataset = dataset[0] if isinstance(dataset, list) else dataset

        checkpoints = normalize_list(checkpoints)
        embeddings = normalize_list(embeddings)
        loras = normalize_list(loras)
        samplers = normalize_list(samplers)
        schedulers = normalize_list(schedulers)
        upscale_models = normalize_list(upscale_models)
        vaes = normalize_list(vaes)
        
        base_path = os.path.join(folder_paths.user_directory, "LF_Nodes")
        actual_path = os.path.join(base_path, datasets_dir)

        log_title = "# Update summary\n"
        log = ""

        if dataset and isinstance(dataset, dict):
            if "nodes" in dataset and isinstance(dataset["nodes"], list):
                for node in dataset["nodes"]:
                    resource = node["id"]
                    resource_list = []
                    if isinstance(node, dict):
                        for child in node.get("children", []):
                            if isinstance(child, dict) and "id" in child:
                                resource_list.append(child["id"])
                    if len(resource_list) > 0:
                        log += process_list(resource_list, resource)
            else:
                print(f"Unexpected dataset structure, 'nodes' not found or not a list: {dataset}")
        else:
            print(f"Unexpected dataset format: {dataset}")

        if checkpoints:
            log += process_list(checkpoints, "checkpoints")
        if embeddings:
            log += process_list(embeddings, "embeddings")
        if loras:
            log += process_list(loras, "loras")
        if samplers:
            log += process_list(samplers, "samplers")
        if schedulers:
            log += process_list(schedulers, "schedulers")
        if upscale_models:
            log += process_list(upscale_models, "upscale_models")
        if vaes:
            log += process_list(vaes, "vaes")

        PromptServer.instance.send_sync("lf-updateusagestatistics", {
            "node": node_id, 
            "log": log_title + log if log else log_title + "\nThere were no updates this run!"
        })

        return ()

class LF_UsageStatistics:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
        }
    
    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ()

    def on_exec(self):
        return ()

NODE_CLASS_MAPPINGS = {
    "LF_ImageHistogram": LF_ImageHistogram,
    "LF_KeywordCounter": LF_KeywordCounter,
    "LF_UpdateUsageStatistics": LF_UpdateUsageStatistics,
    "LF_UsageStatistics": LF_UsageStatistics,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ImageHistogram":  "Image Histogram",
    "LF_KeywordCounter": "Keyword counter",
    "LF_UpdateUsageStatistics": "Update usage statistics",
    "LF_UsageStatistics": "Usage statistics",
}

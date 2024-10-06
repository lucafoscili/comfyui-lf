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
                "checkpoint": (folder_paths.get_filename_list("checkpoints"), {"default": "", "tooltip": "The checkpoint resource used."}),
                "datasets_dir": ("STRING", {"default": os.path.join(folder_paths.input_directory, "LF_Nodes"), "tooltip": "The directory containing the JSON datasets."}),
            },
            "optional": {
                "lora": (["None"] + folder_paths.get_filename_list("loras"), {"default": "", "tooltip": "The LoRA resource used."}),
                "sampler": (["None"] + KSampler.SAMPLERS, {"default": "", "tooltip": "The sampler used."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_TYPES = ()

    def on_exec(self, node_id, datasets_dir, checkpoint=None, lora=None, sampler=None):
        dataset = None

        lora = None if lora is None or str(lora) == "None" else lora
        sampler = None if sampler is None or str(sampler) == "None" else sampler

        if lora:
            lora_file = os.path.join(datasets_dir, "lora_usage.json")
            dataset = update_resource_json(lora_file, "LoRA name", lora)
        if checkpoint:
            checkpoint_file = os.path.join(datasets_dir, "checkpoint_usage.json")
            dataset = update_resource_json(checkpoint_file, "Checkpoint name", checkpoint)
        if sampler:
            sampler_file = os.path.join(datasets_dir, "sampler_usage.json")
            dataset = update_resource_json(sampler_file, "Sampler name", sampler)


        PromptServer.instance.send_sync("lf-tracker", {
            "node": node_id, 
            "dataset": dataset,
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

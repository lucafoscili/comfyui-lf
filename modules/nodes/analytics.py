import folder_paths
import os
import torch

from server import PromptServer

from ..constants.analytics import *
from ..constants.common import *
from ..utils.common import *
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
    FUNCTION = fun
    OUTPUT_IS_LIST = (False, True, False)
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "image_list", "dataset")
    RETURN_TYPES = ("IMAGE", "IMAGE", "JSON")

    def on_exec(self, node_id:int, image:torch.Tensor):
        image = normalize_input_image(image)

        histograms = calculate_histograms(image)
        datasets = adapt_histograms_for_kuldata(histograms)

        PromptServer.instance.send_sync("lf-imagehistogram", {
            "node": node_id, 
            "datasets": datasets,
        })

        batch, list = normalize_output_image(image)

        return (batch[0], list, datasets)
    
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
    FUNCTION = fun
    OUTPUT_NODE = True
    RETURN_NAMES = ("chart_dataset", "chip_dataset")
    RETURN_TYPES = ("JSON", "JSON")

    def on_exec(self, node_id:int, prompt:str, separator:str):
        prompt = normalize_list_to_value(prompt)
        separator = normalize_list_to_value(separator)

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
                "dataset": ("JSON", {"defaultInput": True, "tooltip": "Dataset including the resources (produced by CivitAIMetadataSetup)."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID" 
            }
        }

    CATEGORY = category
    FUNCTION = fun
    OUTPUT_NODE = True
    RETURN_NAMES = ("dir", "dataset")
    RETURN_TYPES = ("STRING", "JSON")

    def on_exec(self, node_id:int, datasets_dir:str, dataset:str|dict):
        def process_list(input, type): 
            filename = get_usage_filename(type)
            file = os.path.join(actual_path, filename)
            log = get_usage_title(filename, "markdown")
            for i in input:
                log += update_usage_json(file, get_usage_title(filename), i)
            return log

        datasets_dir = normalize_list_to_value(datasets_dir)                
        dataset = normalize_input_json(dataset)
        
        base_path = os.path.join(folder_paths.user_directory, user_folder)
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

        PromptServer.instance.send_sync("lf-updateusagestatistics", {
            "node": node_id, 
            "log": log_title + log if log else log_title + "\nThere were no updates this run!"
        })

        return (actual_path, dataset)

class LF_UsageStatistics:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
        }
    
    CATEGORY = category
    FUNCTION = fun
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

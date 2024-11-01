import json
import numpy as np
import os
import torch

from server import PromptServer

from ..utils.constants import BASE_PATH, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, get_usage_filename, get_usage_title
from ..utils.helpers import normalize_input_image, normalize_json_input, normalize_list_to_value, normalize_output_image

CATEGORY = f"{CATEGORY_PREFIX}/Analytics"

# region LF_ImageHistogram
class LF_ImageHistogram:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input images to generate histograms from."}),
            },
            "optional": {
                "ui_widget": ("KUL_TAB_BAR_CHART", {"default": {}})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True, False)
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "image_list", "dataset")
    RETURN_TYPES = ("IMAGE", "IMAGE", "JSON")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image", []))

        batch_histograms: list[dict] = []
        datasets: dict = {}

        for img in image:
            image_batch_np = img.cpu().numpy() * 255.0
            image_batch_np = image_batch_np.astype(np.uint8)

            for i in range(image_batch_np.shape[0]):
                image_np = image_batch_np[i]

                red_channel = image_np[:, :, 0]
                green_channel = image_np[:, :, 1]
                blue_channel = image_np[:, :, 2]

                red_hist = np.histogram(red_channel, bins=256, range=(0, 255))[0]
                green_hist = np.histogram(green_channel, bins=256, range=(0, 255))[0]
                blue_hist = np.histogram(blue_channel, bins=256, range=(0, 255))[0]

                sum_channel = red_channel.astype(np.int32) + green_channel.astype(np.int32) + blue_channel.astype(np.int32)
                sum_hist = np.histogram(sum_channel, bins=256, range=(0, 765))[0]

                batch_histograms.append({
                    "red_hist": red_hist.tolist(),
                    "green_hist": green_hist.tolist(),
                    "blue_hist": blue_hist.tolist(),
                    "sum_hist": sum_hist.tolist(),
                })

        for index, hist in enumerate(batch_histograms):
            nodes: list[dict] = []
            dataset: dict = {
                "columns": [
                    {"id": "Axis_0", "title": "Intensity"},
                    {"id": "Series_0", "shape": "number", "title": "Red Channel"},
                    {"id": "Series_1", "shape": "number", "title": "Green Channel"},
                    {"id": "Series_2", "shape": "number", "title": "Blue Channel"},
                    {"id": "Series_3", "shape": "number", "title": "Sum of Channels"},
                ],
                "nodes": nodes
            }

            for i in range(256):
                node: dict = {
                    "cells": {
                        "Axis_0": {"value": i},
                        "Series_0": {"value": hist["red_hist"][i]},
                        "Series_1": {"value": hist["green_hist"][i]},
                        "Series_2": {"value": hist["blue_hist"][i]},
                        "Series_3": {"value": hist["sum_hist"][i] if i < len(hist["sum_hist"]) else 0},
                    },
                    "id": str(i),
                }
                nodes.append(node)

            datasets[f"Image #{index + 1}"] = dataset

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}imagehistogram", {
            "node": kwargs.get("node_id"), 
            "datasets": datasets,
        })

        b, l = normalize_output_image(image)

        return (b[0], l, datasets)
# endregion
# region LF_KeywordCounter
class LF_KeywordCounter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "tooltip": "Prompt containing keywords to count."}),
                "separator": ("STRING", {"default": ", ", "tooltip": "Character(s) used to separate keywords in the prompt."}),
            },
            "optional": {
                "ui_widget": ("KUL_COUNT_BAR_CHART", {"default": {}})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("chart_dataset", "chip_dataset")
    RETURN_TYPES = ("JSON", "JSON")

    def on_exec(self, **kwargs: dict):
        prompt: str = normalize_list_to_value(kwargs.get("prompt"))
        separator: str = normalize_list_to_value(kwargs.get("separator"))

        keywords: list[str] = prompt.split(separator)
        keyword_count: dict = {}

        for keyword in keywords:
            keyword = keyword.strip().lower()
            if keyword:
                keyword_count[keyword] = keyword_count.get(keyword, 0) + 1

        chart_nodes: list[dict] = []
        chart_dataset: dict = {
            "columns": [
                {"id": "Axis_0", "title": "Keyword"},
                {"id": "Series_0", "shape": "number", "title": "Count"},
            ],
            "nodes": chart_nodes
        }

        for idx, (keyword, count) in enumerate(keyword_count.items()):
            node = {
                "cells": {
                    "Axis_0": {"value": keyword},
                    "Series_0": {"value": count},
                },
                "id": str(idx)
            }
            chart_nodes.append(node)

        chip_nodes: list[dict] = []
        chip_dataset: dict = {
            "nodes": chip_nodes
        }

        for keyword in keyword_count:
            node = {
                "id": keyword,
                "value": keyword
            }
            chip_nodes.append(node)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}keywordcounter", {
            "node": kwargs.get("node_id"),
            "datasets": {
                "chart": chart_dataset,
                "chip": chip_dataset,
            }
        })

        return (chart_dataset, chip_dataset)
# endregion
# region LF_UpdateUsageStatistics
class LF_UpdateUsageStatistics:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "datasets_dir": ("STRING", {"default": "Workflow_name", "tooltip": "The files are saved in the user directory of ComfyUI under LF_Nodes. This field can be used to add additional folders."}),
                "dataset": ("JSON", {"defaultInput": True, "tooltip": "Dataset including the resources (produced by CivitAIMetadataSetup)."}),
            },
            "optional": {
                "ui_widget": ("KUL_CODE", {"default": {}})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("dir", "dataset")
    RETURN_TYPES = ("STRING", "JSON")

    def on_exec(self, **kwargs: dict):
        def update_usage_json(resource_file: str, resource_name: str, resource_value: str):
            resource_value = os.path.splitext(resource_value)[0]
            template = {"columns": [{"id": "name", "title": resource_name}, {"id": "counter", "title": "Nr. of times used", "shape": "number"}], "nodes": []}
            if os.path.exists(resource_file):
                with open(resource_file, 'r') as file:
                    try:
                        json_data = json.load(file)
                    except json.JSONDecodeError:
                        json_data = template
            else:
                json_data = template
        
            for node in json_data["nodes"]:
                resource = node["cells"]["name"]["value"]
                if resource == resource_value:
                    counter = node["cells"]["counter"]
                    oldValue = int(counter["value"])
                    counter["value"] += 1
                    newValue = int(counter["value"])
                    break
            else:
                oldValue = 0
                newValue = 1
                new_id = len(json_data["nodes"])
                json_data["nodes"].append({
                    "cells": {
                        "name": {"value": resource_value},
                        "counter": {"value": 1}
                    },
                    "id": str(new_id)
                })
            
            os.makedirs(os.path.dirname(resource_file), exist_ok=True)
            with open(resource_file, 'w') as file:
                json.dump(json_data, file, indent=4)
            
            return f"\n**{resource_value}** count: {oldValue} => {newValue}\n"
        
        def process_list(input, type): 
            filename = get_usage_filename(type)
            file = os.path.join(actual_path, filename)
            log = get_usage_title(filename, "markdown")
            for i in input:
                log += update_usage_json(file, get_usage_title(filename), i)
            return log

        datasets_dir: str = normalize_list_to_value(kwargs.get("datasets_dir"))
        dataset: dict = normalize_json_input(kwargs.get("dataset"))
        
        actual_path = os.path.join(BASE_PATH, datasets_dir)

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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}updateusagestatistics", {
            "node": kwargs.get("node_id"), 
            "value": log_title + log if log else log_title + "\nThere were no updates this run!"
        })

        return (actual_path, dataset)
# endregion
# region LF_UsageStatistics
class LF_UsageStatistics:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "ui_widget": ("KUL_TAB_BAR_CHART", {"default": {}})
            },
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_TYPES = ()

    def on_exec(self, **kwargs: dict):
        return ()
# endregion
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
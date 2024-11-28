import json
import numpy as np
import os
import torch

from server import PromptServer

from ..utils.constants import BLUE_CHANNEL_ID, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, get_usage_filename, get_usage_title, GREEN_CHANNEL_ID, Input, INTENSITY_ID, RED_CHANNEL_ID, SUM_ID
from ..utils.helpers import get_comfy_dir, normalize_input_image, normalize_json_input, normalize_list_to_value, normalize_output_image, tensor_to_numpy

CATEGORY = f"{CATEGORY_PREFIX}/Analytics"

# region LF_ColorAnalysis
class LF_ColorAnalysis:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "source_image": (Input.IMAGE, {
                    "tooltip": "Source image from which to extract the color style."
                }),
                "target_image": (Input.IMAGE, {
                    "tooltip": "Target image to be adjusted to match the source color pattern."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_TAB_BAR_CHART, {
                    "default": {}
                })
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
        source_image: list[torch.Tensor] = normalize_input_image(kwargs.get("source_image", []))
        target_image: list[torch.Tensor] = normalize_input_image(kwargs.get("target_image", []))

        if len(source_image) != len(target_image):
            raise ValueError("Source and Target batches should have the same number of images.")

        mapping_datasets: dict = {}

        for idx in range(len(source_image)):
            source_np = tensor_to_numpy(source_image[idx])
            target_np = tensor_to_numpy(target_image[idx])

            source_histograms: dict = {
                RED_CHANNEL_ID: np.histogram(source_np[:, :, 0], bins=256, range=(0, 256))[0],
                GREEN_CHANNEL_ID: np.histogram(source_np[:, :, 1], bins=256, range=(0, 256))[0],
                BLUE_CHANNEL_ID: np.histogram(source_np[:, :, 2], bins=256, range=(0, 256))[0]
            }

            target_histograms: dict = {
                RED_CHANNEL_ID: np.histogram(target_np[:, :, 0], bins=256, range=(0, 256))[0],
                GREEN_CHANNEL_ID: np.histogram(target_np[:, :, 1], bins=256, range=(0, 256))[0],
                BLUE_CHANNEL_ID: np.histogram(target_np[:, :, 2], bins=256, range=(0, 256))[0]
            }

            mapping_json: dict = {
                "red_channel": self.generate_mapping(target_histograms[RED_CHANNEL_ID], source_histograms[RED_CHANNEL_ID]),
                "green_channel": self.generate_mapping(target_histograms[GREEN_CHANNEL_ID], source_histograms[GREEN_CHANNEL_ID]),
                "blue_channel": self.generate_mapping(target_histograms[BLUE_CHANNEL_ID], source_histograms[BLUE_CHANNEL_ID]),
            }

            nodes: list[dict] = []
            dataset: dict = {
                "columns": [
                    {"id": INTENSITY_ID, "title": "Color Intensity (From)"},
                    {"id": RED_CHANNEL_ID, "title": "Red Channel Mapping", "shape": "number"},
                    {"id": GREEN_CHANNEL_ID, "title": "Green Channel Mapping", "shape": "number"},
                    {"id": BLUE_CHANNEL_ID, "title": "Blue Channel Mapping", "shape": "number"}
                ],
                "nodes": nodes
            }

            for i in range(256):
                node: dict = {
                    "id": str(i),
                    "cells": {
                        INTENSITY_ID: {"value": str(i)},
                        RED_CHANNEL_ID: {"value": str(mapping_json["red_channel"][i]), "shape": "number"},
                        GREEN_CHANNEL_ID: {"value": str(mapping_json["green_channel"][i]), "shape": "number"},
                        BLUE_CHANNEL_ID: {"value": str(mapping_json["blue_channel"][i]), "shape": "number"}
                    }
                }
                nodes.append(node)

            mapping_datasets[f"Image #{idx + 1}"] = dataset

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}coloranalysis", {
            "node": kwargs.get("node_id"),
            "datasets": mapping_datasets
        })

        image_batch, image_list = normalize_output_image(target_image)

        return (image_batch[0], image_list, mapping_datasets)

    @staticmethod
    def generate_mapping(target_hist, source_hist):
        source_cdf = np.cumsum(source_hist).astype(np.float64)
        source_cdf /= source_cdf[-1]
        target_cdf = np.cumsum(target_hist).astype(np.float64)
        target_cdf /= target_cdf[-1]

        mapping = np.zeros(256, dtype=np.uint8)

        for r in range(256):
            s = np.argmin(np.abs(source_cdf - target_cdf[r]))
            mapping[r] = s
        return mapping.tolist()
# endregion

# region LF_ImageHistogram
class LF_ImageHistogram:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input images to generate histograms from."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_TAB_BAR_CHART, {
                    "default": {}
                })
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

                r = np.histogram(red_channel, bins=256, range=(0, 255))[0]
                g = np.histogram(green_channel, bins=256, range=(0, 255))[0]
                b = np.histogram(blue_channel, bins=256, range=(0, 255))[0]

                sum_channel = red_channel.astype(np.int32) + green_channel.astype(np.int32) + blue_channel.astype(np.int32)
                s = np.histogram(sum_channel, bins=256, range=(0, 765))[0]

                batch_histograms.append({
                    "r": r.tolist(),
                    "g": g.tolist(),
                    "b": b.tolist(),
                    "s": s.tolist(),
                })

        for index, hist in enumerate(batch_histograms):
            nodes: list[dict] = []
            dataset: dict = {
                "columns": [
                    {"id": INTENSITY_ID, "title": "Intensity"},
                    {"id": RED_CHANNEL_ID, "shape": "number", "title": "Red Channel"},
                    {"id": GREEN_CHANNEL_ID, "shape": "number", "title": "Green Channel"},
                    {"id": BLUE_CHANNEL_ID, "shape": "number", "title": "Blue Channel"},
                    {"id": SUM_ID, "shape": "number", "title": "Sum of Channels"},
                ],
                "nodes": nodes
            }

            for i in range(256):
                node: dict = {
                    "cells": {
                        INTENSITY_ID: {"value": i},
                        RED_CHANNEL_ID: {"value": hist["r"][i]},
                        GREEN_CHANNEL_ID: {"value": hist["g"][i]},
                        BLUE_CHANNEL_ID: {"value": hist["b"][i]},
                        SUM_ID: {"value": hist["s"][i] if i < len(hist["s"]) else 0},
                    },
                    "id": str(i),
                }
                nodes.append(node)

            datasets[f"Image #{index + 1}"] = dataset

        b, l = normalize_output_image(image)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}imagehistogram", {
            "node": kwargs.get("node_id"), 
            "datasets": datasets,
        })

        return (b[0], l, datasets)
# endregion

# region LF_KeywordCounter
class LF_KeywordCounter:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "prompt": (Input.STRING, {
                    "multiline": True, 
                    "tooltip": "Prompt containing keywords to count."
                }),
                "separator": (Input.STRING, {
                    "default": ", ", 
                    "tooltip": "Character(s) used to separate keywords in the prompt."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_COUNT_BAR_CHART, {
                    "default": {}
                })
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

# region LF_LUTGeneration
class LF_LUTGeneration:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "color_analysis_dataset": (Input.JSON, {
                    "tooltip": "Transformation dataset generated by Color Analysis Node."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_TAB_BAR_CHART, {
                    "default": {}
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False,)
    OUTPUT_NODE = True
    RETURN_NAMES = ("lut_dataset",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, **kwargs: dict):
        color_analysis: dict = normalize_json_input(kwargs.get("color_analysis_dataset"))

        lut_datasets: dict = {}
        for image_key, color_analysis in color_analysis.items():
            nodes: list[dict] = []
            dataset: dict = {
                "columns": [
                    {"id": INTENSITY_ID, "title": "Color Intensity"},
                    {"id": RED_CHANNEL_ID, "title": "Red Channel LUT"},
                    {"id": GREEN_CHANNEL_ID, "title": "Green Channel LUT"},
                    {"id": BLUE_CHANNEL_ID, "title": "Blue Channel LUT"}
                ],
                "nodes": nodes
            }

            for node in color_analysis["nodes"]:
                i = node["cells"][INTENSITY_ID]["value"]
                r = node["cells"][RED_CHANNEL_ID]["value"]
                g = node["cells"][GREEN_CHANNEL_ID]["value"]
                b = node["cells"][BLUE_CHANNEL_ID]["value"]

                lut_node = {
                    "id": INTENSITY_ID,
                    "cells": {
                        INTENSITY_ID: {"value": i},
                        RED_CHANNEL_ID: {"value": r, "shape": "number"},
                        GREEN_CHANNEL_ID: {"value": g, "shape": "number"},
                        BLUE_CHANNEL_ID: {"value": b, "shape": "number"}
                    }
                }
                nodes.append(lut_node)

            lut_datasets[image_key] = dataset

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}lutgeneration", {
            "node": kwargs.get("node_id"),
            "datasets": lut_datasets
        })

        return (lut_datasets,)
# endregion

# region LF_UpdateUsageStatistics
class LF_UpdateUsageStatistics:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "datasets_dir": (Input.STRING, {
                    "default": "Workflow_name", 
                    "tooltip": "The files are saved in the user directory of ComfyUI under LF_Nodes. This field can be used to add additional folders."
                }),
                "dataset": (Input.JSON, {
                    "defaultInput": True, 
                    "tooltip": "Dataset including the resources (produced by CivitAIMetadataSetup)."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, {
                    "default": {}
                })
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
        
        actual_path = os.path.join(get_comfy_dir("base"), datasets_dir)

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
    def INPUT_TYPES(self):
        return {
            "required": {},
            "optional": {
                "ui_widget": (Input.KUL_TAB_BAR_CHART, {
                    "default": {}
                })
            },
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_TYPES = ()

    def on_exec(self, **kwargs: dict):
        return ()
# endregion

NODE_CLASS_MAPPINGS = {
    "LF_ColorAnalysis": LF_ColorAnalysis,
    "LF_ImageHistogram": LF_ImageHistogram,
    "LF_KeywordCounter": LF_KeywordCounter,
    "LF_LUTGeneration": LF_LUTGeneration,
    "LF_UpdateUsageStatistics": LF_UpdateUsageStatistics,
    "LF_UsageStatistics": LF_UsageStatistics,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ColorAnalysis": "Color Analysis",
    "LF_ImageHistogram":  "Image Histogram",
    "LF_KeywordCounter": "Keyword counter",
    "LF_LUTGeneration": "LUT Generation",
    "LF_UpdateUsageStatistics": "Update usage statistics",
    "LF_UsageStatistics": "Usage statistics",
}
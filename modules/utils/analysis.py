import json
import numpy as np
import os

def adapt_histograms_for_kuldata(histograms):
    """
    Adapt the histogram data to the KulDataDataset format for use in a line chart.

    Args:
        histograms (dict): Dictionary containing histogram data.

    Returns:
        dict: A KulDataDataset-compatible dictionary.
    """
    kuldata = {
        "columns": [
            {"id": "Axis_0", "title": "Intensity"},
            {"id": "Series_0", "shape": "number", "title": "Red Channel"},
            {"id": "Series_1", "shape": "number", "title": "Green Channel"},
            {"id": "Series_2", "shape": "number", "title": "Blue Channel"},
            {"id": "Series_3", "shape": "number", "title": "Sum of Channels"},
        ],
        "nodes": []
    }

    for i in range(256):
        node = {
            "cells": {
                "Axis_0": {"value": i},
                "Series_0": {"value": histograms["red_hist"][i]},
                "Series_1": {"value": histograms["green_hist"][i]},
                "Series_2": {"value": histograms["blue_hist"][i]},
                "Series_3": {"value": histograms["sum_hist"][i] if i < len(histograms["sum_hist"]) else 0},
            },
            "id": str(i),
        }
        kuldata["nodes"].append(node)

    return kuldata

def adapt_keyword_count_for_chart(keyword_count):
    """
    Adapt the keyword count data to the KulDataDataset format for use in a bar chart.
    Args:
        keyword_count (dict): Dictionary containing keyword counts.
    Returns:
        dict: A KulDataDataset-compatible dictionary.
    """
    kuldata = {
        "columns": [
            {"id": "Axis_0", "title": "Keyword"},
            {"id": "Series_0", "shape": "number", "title": "Count"},
        ],
        "nodes": []
    }
    
    for idx, (keyword, count) in enumerate(keyword_count.items()):
        node = {
            "cells": {
                "Axis_0": {"value": keyword},
                "Series_0": {"value": count},
            },
            "id": str(idx)
        }
        kuldata["nodes"].append(node)

    return kuldata

def adapt_keyword_count_for_chip(keyword_count):
    """
    Adapt the keyword count data to the KulDataDataset format for use in a chip set.
    Args:
        keyword_count (dict): Dictionary containing keyword counts.
    Returns:
        dict: A KulDataDataset-compatible dictionary.
    """
    kuldata = {
        "nodes": []
    }
    
    for keyword in keyword_count:
        node = {
            "id": keyword,
            "value": keyword
        }
        kuldata["nodes"].append(node)

    return kuldata

def calculate_histograms(image_tensor):
    """
    Calculate the histograms for the RGB channels and their sum from a given image tensor
    formatted in the shape [1, H, W, 3].

    Args:
        image_tensor (torch.Tensor): A tensor representing the image, assumed to be in the shape [1, H, W, 3].
    
    Returns:
        dict: A dictionary containing the histograms for the R, G, B channels and their sum.
    """
    # Convert tensor to numpy array, expected shape [1, H, W, 3]
    image_np = image_tensor.squeeze(0).cpu().numpy() * 255.0
    image_np = image_np.astype(np.uint8)

    # Extract individual RGB channels
    red_channel = image_np[:, :, 0]
    green_channel = image_np[:, :, 1]
    blue_channel = image_np[:, :, 2]

    # Calculate histograms for each channel
    red_hist = np.histogram(red_channel, bins=256, range=(0, 255))[0]
    green_hist = np.histogram(green_channel, bins=256, range=(0, 255))[0]
    blue_hist = np.histogram(blue_channel, bins=256, range=(0, 255))[0]

    # Calculate the sum of the RGB channels
    sum_channel = red_channel.astype(np.int32) + green_channel.astype(np.int32) + blue_channel.astype(np.int32)
    sum_hist = np.histogram(sum_channel, bins=256, range=(0, 765))[0]

    return {
        "red_hist": red_hist.tolist(),
        "green_hist": green_hist.tolist(),
        "blue_hist": blue_hist.tolist(),
        "sum_hist": sum_hist.tolist(),
    }

def update_usage_json(resource_file:str, resource_name:str, resource_value:str):
    resource_value = os.path.splitext(resource_value)[0]
    if os.path.exists(resource_file):
        with open(resource_file, 'r') as file:
            try:
                json_data = json.load(file)
            except json.JSONDecodeError:
                json_data = {"columns": [{"id": "name", "value": resource_name}, {"id": "counter", "name": "Nr. of times used", "shape": "number"}], "nodes": []}
    else:
        json_data = {"columns": [{"id": "name", "value": resource_name}, {"id": "counter", "name": "Nr. of times used", "shape": "number"}], "nodes": []}

    for node in json_data["nodes"]:
        if node["cells"]["name"]["value"] == resource_value:
            oldValue = int(node["cells"]["counter"]["value"])
            node["cells"]["counter"]["value"] += 1
            newValue = int(node["cells"]["counter"]["value"])
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
    
    base_name = os.path.splitext(os.path.basename(resource_value))[0]
    return f"\n**{resource_value}** count: {oldValue} => {newValue}\n"
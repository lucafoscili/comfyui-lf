import fnmatch
import folder_paths
import json
import os

from PIL import Image

from server import PromptServer

from ..utils.configuration import get_sha256
from ..utils.conversions import pil_to_tensor, tensor_to_base64

def filter_list(filter, list):
    normalized_filter = filter.replace('\\', '/')
    return [model for model in list if fnmatch.fnmatch(model.replace('\\', '/'), normalized_filter)]

def find_checkpoint_image(checkpoint_path):
    extensions = ["jpg", "jpeg", "JPEG", "png", "webp", "WEBP"]
    
    for ext in extensions:
        image_path = f"{os.path.splitext(checkpoint_path)[0]}.{ext}"
        if os.path.exists(image_path):
            return image_path
    return None

def prepare_model_dataset (model_name, model_hash, model_base64, model_path):
    dataset = {
                "nodes": [
                    {
                        "cells": {
                            "text1": {
                                "value": model_name
                            },
                            "text2": {
                                "value": model_hash
                            },
                            "text3": {
                                "value": "Selected checkpoint cover, hash and name." +
                                         ("" if model_path 
                                             else "Note: to set the cover, create an image with the same name of the checkpoint in its folder.")
                            },
                            "kulCode": { 
                                'shape': 'code', 
                                'value': '{' +  f"'hash': '{model_hash}', 'path': '{model_path}'" + '}'
                            },
                            "kulImage": {
                                "kulStyle": "img {object-fit: cover;}",
                                "shape": "image",
                                "value": "data:image/webp;base64," + model_base64 if model_path else "broken_image"
                            }
                        },
                        "id": model_name
                    }
                ]
            }
    
    return dataset

def process_model(model_type, model_name, folder):
    model_path = folder_paths.get_full_path(folder, model_name)
    model_info_path = os.path.splitext(model_path)[0] + ".info"

    saved_info = None
    if os.path.exists(model_info_path):
        try:
            with open(model_info_path, 'r') as f:
                file_content = f.read().strip()

                if not file_content:
                    os.remove(model_info_path)
                else:
                    try:
                        saved_info = json.loads(file_content)
                    except json.JSONDecodeError as e:
                        print(f"JSONDecodeError for {model_info_path}: {e}")
        except Exception as e:
            print(f"Error reading {model_info_path}: {e}")

    try:
        model_hash = get_sha256(model_path)
    except Exception as e:
        model_hash = "Unknown"
        print(f"Error calculating hash for {model_type}: {e}")

    model_image_path = find_checkpoint_image(model_path)

    if model_image_path:
        pil_image = Image.open(model_image_path)
        model_cover = pil_to_tensor(pil_image)
        model_base64 = tensor_to_base64(model_cover)
    else:
        model_base64 = "None"
        model_cover = None

    return {
        "model_path": model_path,
        "model_name": model_name,
        "model_hash": model_hash,
        "model_cover": model_cover,
        "model_base64": model_base64,
        "saved_info": saved_info
    }

def send_single_selector_message(node_id, dataset, model_hash, get_civitai_info, model_path, event_name):

    PromptServer.instance.send_sync(event_name, {
        "node": node_id, 
        "dataset": dataset,
        "hash": model_hash,
        "apiFlag": get_civitai_info,
        "path": model_path
    })

    return

def send_multi_selector_message(node_id, datasets, model_hashes, get_civitai_info, model_paths, event_name, chip_dataset=None):

    PromptServer.instance.send_sync(event_name, {
        "node": node_id, 
        "datasets": datasets,
        "hashes": model_hashes,
        "apiFlags": get_civitai_info,
        "paths": model_paths,
        "chipDataset": chip_dataset
    })

    return
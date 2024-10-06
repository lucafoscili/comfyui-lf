import fnmatch
import folder_paths
import hashlib
import json
import os
import re

from PIL import Image

from ..utils.conversions import pil_to_tensor, tensor_to_base64

from server import PromptServer

SAMPLER_MAP = {
    "euler": "Euler",
    "euler_cfg_pp": "Euler a",
    "euler_ancestral": "Euler a",
    "heun": "Heun",
    "dpm_2": "DPM2",
    "dpm_2_ancestral": "DPM2 a",
    "lms": "LMS",
    "dpmpp_2s_ancestral": "DPM++ 2S a",
    "dpmpp_sde": "DPM++ SDE",
    "dpmpp_2m": "DPM++ 2M",
    "dpmpp_2m_sde": "DPM++ 2M SDE",
    "dpmpp_3m_sde": "DPM++ 3M SDE",
    "ddpm": "DDPM",
    "dpm_fast": "DPM fast",
    "dpm_adaptive": "DPM adaptive",
    "ipndm": "IPNDM",
    "ipndm_v": "IPNDM V",
    "deis": "DEIS",
    "restart": "Restart"
}

SCHEDULER_MAP = {
    "normal": "Normal",
    "karras": "Karras",
    "exponential": "Exponential",
    "sgm_uniform": "SGM Uniform",
    "simple": "Simple",
    "ddim_uniform": "DDIM",
    "beta": "Beta"
}

def clean_prompt(prompt):
    return re.sub(r'(embedding:)?(.*?)(\.pt|\.pth|\.sft|\.safetensors)?', r'\2', prompt).strip()

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

def get_embedding_hashes(embeddings):
    emb_hashes = []
    emb_entries = [emb.strip() for emb in embeddings.split(',')]
    for emb_entry in emb_entries:
        match = re.match(r'(?:embedding:)?(.*)', emb_entry)
        if match:
            emb_name = match.group(1).strip()
            if emb_name:
                if not emb_name.endswith('.pt') and not emb_name.endswith('.safetensors'):
                    emb_name_with_ext = f"{emb_name}.safetensors"
                else:
                    emb_name_with_ext = emb_name
                emb_file_path = folder_paths.get_full_path("embeddings", emb_name_with_ext)
                try:
                    emb_hash = get_sha256(emb_file_path)
                    emb_hashes.append(f"{emb_name_with_ext}: {emb_hash}")
                except Exception as e:
                    emb_hashes.append(f"{emb_name}: Unknown")
    return emb_hashes

def get_lora_hashes(lora_tags):
    lora_hashes = []
    lora_tags = lora_tags.replace("><", ">,<")
    lora_entries = [tag.strip('<>').split(':') for tag in lora_tags.split(',')]
    for lora_entry in lora_entries:
        if len(lora_entry) >= 2:
            lora_name = lora_entry[1].strip()
            if not lora_name.endswith('.pt') and not lora_name.endswith('.safetensors'):
                lora_name_with_ext = f"{lora_name}.safetensors"
            else:
                lora_name_with_ext = lora_name
            lora_file_path = folder_paths.get_full_path("loras", lora_name_with_ext)
            try:
                lora_hash = get_sha256(lora_file_path)
                lora_hashes.append(f"{lora_name_with_ext}: {lora_hash}")
            except Exception:
                lora_hashes.append(f"{lora_name}: Unknown")
    return lora_hashes

def get_sha256(file_path):
    hash_file_path = f"{os.path.splitext(file_path)[0]}.sha256"
    
    if os.path.exists(hash_file_path):
        with open(hash_file_path, "r") as hash_file:
            return hash_file.read().strip()[:10]
    
    sha256_value = hashlib.sha256()

    with open(file_path, "rb") as file:
        for byte_block in iter(lambda: file.read(4096), b""):
            sha256_value.update(byte_block)

    with open(hash_file_path, "w") as hash_file:
        hash_file.write(sha256_value.hexdigest())

    return sha256_value.hexdigest()[:10]

def prepare_model_dataset (model_name, model_hash, model_base64, model_path):
    dataset = {
                "nodes": [
                    {
                        "cells": {
                            "icon": {
                                "kulStyle": "img {object-fit: cover;}",
                                "shape": "image",
                                "value": "data:image/webp;base64," + model_base64 if model_path else "broken_image"
                            },
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
import folder_paths
import hashlib
import os
import re

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


def cleanse_lora_tag(lora_tag: str, separator: str):
    """
    Cleanse the lora tag by removing unnecessary parts and extracting keywords.

    Args:
        lora_tag (str): The input lora tag string.
        separator (str): The separator used in the file name.

    Returns:
        str: The cleaned up string with extracted keywords.
    """
    # Remove the <lora: and last '>': part to get the safetensors file name and weight
    safetensors_info = lora_tag[len('<lora:'):][:-1]
    
    # Split the safetensors_info by ':' to separate the file name and weight
    file_name_with_weight = safetensors_info.split(':')
    if len(file_name_with_weight) > 1:
        file_name, _ = file_name_with_weight
    else:
        file_name = file_name_with_weight[0]
    
    # Split the file name by '\\' to separate the file name and the folder containing it
    file_name_with_folder = file_name.split('\\')
    if len(file_name_with_folder) > 1:
        _, file_name = file_name_with_folder
    else:
        file_name = file_name_with_folder[0]
    
    # Split the file name by '.safetensors' to separate the file name and the extension
    file_name_with_extension = file_name.split('.safetensors')
    if len(file_name_with_extension) > 1:
        file_name, _ = file_name_with_extension
    else:
        file_name = file_name_with_extension[0]
    # Extract keywords from the file name
    if str(file_name).find(separator) > 1:
        keywords = ', '.join(file_name.split(separator))
    else: 
        keywords = file_name
    # Join keywords into a string to replace the lora tag
    # Assuming keywords can be a single string or a list of strings
    if isinstance(keywords, str):
    # If keywords is a single string, keep it as is
        keyword_str = keywords
    elif isinstance(keywords, list):
        keyword_str = ''.join(keywords[:-1]) + ', ' + keywords[-1]
    else:
        raise ValueError("keywords must be a string or a list of strings")
    
    return keyword_str

def count_words_in_comma_separated_string(input_string):
    """
    Count the number of words in a comma-separated string.

    Args:
        input_string (str): The input string containing comma-separated words.

    Returns:
        int: The total count of words in the input string.
    """    
    words_list = input_string.split(',')
    word_count = len(words_list)
    return word_count

def get_embedding_hashes(embeddings, analytics_dataset:dict):
    children = []
    emb_hashes = []
    emb_entries = [emb.strip() for emb in embeddings.split(',')]
    analytics_dataset["nodes"].append({ "children": children, "id": "embeddings"})

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
                    children.append({ "id": emb_name, "value": emb_name })
                except Exception as e:
                    emb_hashes.append(f"{emb_name}: Unknown")
    return emb_hashes

def get_lora_hashes(lora_tags, analytics_dataset):
    children = []
    lora_hashes = []
    lora_tags = lora_tags.replace("><", ">,<")
    lora_entries = [tag.strip('<>').split(':') for tag in lora_tags.split(',')]
    analytics_dataset["nodes"].append({ "children": children, "id": "loras"})

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
                children.append({ "id": lora_name, "value": lora_name })
            except Exception:
                lora_hashes.append(f"{lora_name}: Unknown")
    return lora_hashes

def get_sha256(file_path):
    hash_file_path = f"{os.path.splitext(file_path)[0]}.sha256"
    
    if os.path.exists(hash_file_path):
        with open(hash_file_path, "r") as hash_file:
            return hash_file.read().strip()
    
    sha256_value = hashlib.sha256()

    with open(file_path, "rb") as file:
        for byte_block in iter(lambda: file.read(4096), b""):
            sha256_value.update(byte_block)

    with open(hash_file_path, "w") as hash_file:
        hash_file.write(sha256_value.hexdigest())

    return sha256_value.hexdigest()
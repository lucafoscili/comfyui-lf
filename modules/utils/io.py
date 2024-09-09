import hashlib
import json
import numpy as np
import piexif
import torch

from PIL.ExifTags import TAGS
from PIL import Image


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

def create_dummy_image_tensor():
    """
    Creates a dummy image tensor, typically used when there are no real images to process.
    This function generates a small black image (1x1 pixels) and converts it to a PyTorch tensor.
    The resulting tensor can be used as a placeholder in scenarios where no actual image data is available.

    Returns:
        torch.Tensor: A single-element tensor representing a dummy image.
    """    
    # Create a small black image
    img = Image.new('RGB', (64, 64), color=(0, 0, 0))
    
    # Convert to tensor
    img_tensor = torch.from_numpy(np.array(img)).float() / 255.0
    
    return img_tensor.unsqueeze(0)

def extract_jpeg_metadata(pil_image, file_name):
    """
    Extract EXIF metadata from a JPEG image.
    """
    try:
        exif_bytes = pil_image.info.get('exif', None)
        if exif_bytes is None:
            return {"error": f"No EXIF metadata found in {file_name}"}

        exif_data = piexif.load(exif_bytes)
        
        if isinstance(exif_data, bytes):
            return {"format": "JPEG", "metadata": {}}
        
        if not exif_data:
            return {"error": f"Failed to load EXIF data from {file_name}"}

        exif_json = {}
        
        def safe_convert_value(v):
            if isinstance(v, bytes):
                return v.decode('utf-8', errors='ignore')
            elif isinstance(v, list):
                return [safe_convert_value(i) for i in v]
            else:
                return v
        
        for item in exif_data.values():
            if hasattr(item, 'items'):
                for tag, value in item.items():
                    tag_name = TAGS.get(tag, tag)
                    exif_json[tag_name] = safe_convert_value(value)
        
        try:
            json.dumps(exif_json)
        except TypeError as e:
            for k, v in list(exif_json.items()):
                try:
                    json.dumps({k: v})
                except TypeError:
                    del exif_json[k]
        
        return  exif_json
    
    except Exception as e:
        return {"error": f"An unexpected error occurred while extracting EXIF data from {file_name}: {str(e)}"}

def extract_png_metadata(pil_image):
    """
    Extract metadata from PNG text chunks.
    """
    png_info = pil_image.info
    metadata = {}
    
    for key, value in png_info.items():
        if isinstance(value, str):
            metadata[key] = value
    
    return metadata

def get_sha256(file_path):
    sha256_value = hashlib.sha256()

    with open(file_path, "rb") as file:
        for byte_block in iter(lambda: file.read(4096), b""):
            sha256_value.update(byte_block)

    return sha256_value.hexdigest()[:10]

def resize_image(img, max_size=1024):
    """
    Resizes the image to ensure the longest side is max_size pixels.
    """
    width, height = img.size
    scaling_factor = max_size / float(max(width, height))
    if scaling_factor < 1.0:
        new_size = (int(width * scaling_factor), int(height * scaling_factor))
        img = img.resize(new_size, Image.Resampling.BILINEAR)
    return img
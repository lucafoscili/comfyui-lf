import io
import base64
import folder_paths
import json
import numpy as np
import os
import piexif
import requests
import torch

from comfy.cli_args import args
from datetime import datetime
from PIL import Image
from PIL.PngImagePlugin import PngInfo
from server import PromptServer

from ..utils.io import *

category = "✨ LF Nodes/IO Operations"
 
class LF_LoadImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"label": "Directory path", "tooltip": "Path to the directory containing the images to load."}),
                "subdir": ("BOOLEAN", {"default": False, "label": "Load from subdir", "tooltip": "Indicates whether to also load images from subdirectories."}),
                "strip_ext": ("BOOLEAN", {"default": True, "label": "Strip extension from name", "tooltip": "Whether to remove file extensions from filenames."}),
                "load_cap": ("INT", {"default": 0, "label": "Maximum images to load, 0 to disable.", "tooltip": "Maximum number of images to load before stopping. Set 0 for an unlimited amount."}),
                "dummy_output": ("BOOLEAN", {"default": False, "label": "Outputs a dummy image in tensor format when the list is empty", "tooltip": "Flag indicating whether to output a dummy image tensor and string when the list is empty."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
                "KUL_IMAGE_PREVIEW_B64": ("KUL_IMAGE_PREVIEW_B64", {"default": ""})
            } 
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_IS_LIST = (True, True, False, False, False, False)
    RETURN_NAMES = ("images", "names", "nr", "selected_image", "selected_index", "selected_name")
    RETURN_TYPES = ("IMAGE", "STRING", "INT", "IMAGE", "INT", "STRING")

    def on_exec(self, dir, subdir, strip_ext, load_cap, dummy_output, node_id, KUL_IMAGE_PREVIEW_B64):
        images_buffer = []
        images = []
        file_names = []
        count = 0
        selected_image = None

        try:
            json_string = json.dumps(KUL_IMAGE_PREVIEW_B64)
            json_data = json.loads(json_string)
            selected_index = json_data.get("selectedIndex", None)
            selected_name = json_data.get("selectedName", None)
        except json.JSONDecodeError:
            selected_index = None
            selected_name = None
        except KeyError:
            selected_index = None
            selected_name = None
        except Exception as e:
            selected_index = None
            selected_name = None

        for root, dirs, files in os.walk(dir):
            if not subdir:
                dirs[:] = []
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                    image_path = os.path.join(root, file)
                    with open(image_path, 'rb') as img_file:
                        img_data = img_file.read()
                        img = Image.open(io.BytesIO(img_data)).convert("RGB")
                        img_resized = resize_image(img, max_size=1024)
                        buffered = io.BytesIO()
                        img_resized.save(buffered, format="JPEG")
                        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                        images_buffer.append(img_base64)
                        img_tensor = torch.from_numpy(np.array(img).astype(np.float32) / 255.0).unsqueeze(0)
                        images.append(img_tensor)
 
                        if strip_ext:
                            file = os.path.splitext(file)[0]
                        file_names.append(file)  
                        if count == selected_index and file == selected_name:
                            selected_image = img_tensor
                            selected_index = count
                            selected_name = file
 
                        count += 1
                        if load_cap > 0 and count >= load_cap:
                            break

            if load_cap > 0 and count >= load_cap:
                break

        if dummy_output and not images:
            file_names.append("empty")
            selected_image = create_dummy_image_tensor()
            images.append(selected_image)         

        if dummy_output and images and selected_image is None:
            selected_image = create_dummy_image_tensor()

        PromptServer.instance.send_sync("lf-loadimages", {
            "node": node_id, 
            "fileNames": file_names,
            "images": images_buffer,
            "selectedIndex": selected_index,
            "selectedName": selected_name
        })

        return (images, file_names, count, selected_image, selected_index, selected_name)

class LF_LoadLocalJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "url": ("STRING", {"default": "", "multiline": True, "tooltip": "The local URL where the JSON file is stored (i.e.: file://C:/myjson.json)."}),
            },
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_TYPES = ("JSON",)

    def on_exec(self, url: str):
        if not url.startswith("file://"):
            url = "file://" + url
        
        file_path = requests.utils.unquote(url[7:])
        with open(file_path, 'r') as file:
            data = json.load(file)

        return (data,)
    
class LF_LoadMetadata:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_names": ("KUL_UPLOAD", {"label": "File Names", "tooltip": "List of file names separated by semicolons (e.g., file1.jpg;file2.png;file3.jpg)."}),
            }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    RETURN_NAMES = ("metadata_list",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, file_names):
        input_dir = folder_paths.get_input_directory()
        metadata_list = []

        file_names_list = file_names.split(';')

        for file_name in file_names_list:
            file_path = os.path.join(input_dir, file_name.strip())

            try:
                pil_image = Image.open(file_path)
                
                if pil_image.format == "JPEG":
                    metadata = extract_jpeg_metadata(pil_image, file_name)
                elif pil_image.format == "PNG":
                    metadata = extract_png_metadata(pil_image)
                else:
                    metadata = {"error": f"Unsupported image format for {file_name}"}

                metadata_list.append({"file": file_name, "metadata": metadata})
            except Exception as e:
                metadata_list.append({"file": file_name, "error": str(e)})

        return (metadata_list,)

class LF_SaveImageForCivitAI:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", {"label": "Images tensor", "tooltip": "Input image tensor batch to save with metadata."}),
                "filepath": ("STRING", {"default": '', "tooltip": "Path and filename. Use slashes to specify directories."}),
                "add_timestamp": ("BOOLEAN", {"default": True, "tooltip": "Sets the execution time's timestamp as a suffix of the file name."}),
                "extension": (['png', 'jpeg', 'webp'], {"tooltip": "Supported file formats."}),
                "quality": ("INT", {"default": 100, "min": 1, "max": 100, "tooltip": "Quality of saved images in jpeg or webp format."}),
            },
            "optional": {
                "civitai_metadata": ("STRING", {"defaultInput": True, "tooltip": "String containing CivitAI compatible metadata (created by the node LF_CivitAIMetadataSetup)."}),
            },
            "hidden": {
                "extra_pnginfo": "EXTRA_PNGINFO",
                "node_id": "UNIQUE_ID",
                "prompt": "PROMPT",
            }
        }
    
    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_TYPES = ()

    def on_exec(self, extra_pnginfo, node_id, prompt, images, filepath, add_timestamp, extension, quality, civitai_metadata):
        
        file_names = []
        images_buffer = []
        output_dir = folder_paths.output_directory
        batch_size = images.shape[0]

        if add_timestamp:
            ts = datetime.now()
            timestamp = ts.strftime("%Y%m%d-%H%M%S")
            filepath = f"{filepath}_{timestamp}"

        for i in range(batch_size):
            img_array = images[i].cpu().numpy()
            img = Image.fromarray(np.clip(img_array * 255, 0, 255).astype(np.uint8))

            directory, filename = os.path.split(filepath)
            file_name = f"{filename}_{i}.{extension}"

            directory = os.path.join(output_dir, directory)
            if not os.path.exists(directory):
                os.makedirs(directory, exist_ok=True)

            output_file = os.path.join(directory, file_name)

            if extension == 'png':
                png_info = PngInfo()
                if not args.disable_metadata:
                    if prompt is not None:
                        png_info.add_text("prompt", json.dumps(prompt))
                    if extra_pnginfo is not None:
                        for x in extra_pnginfo:
                            png_info.add_text(x, json.dumps(extra_pnginfo[x]))

                if civitai_metadata:
                    png_info.add_text("parameters", civitai_metadata)

                img.save(output_file, format="PNG", pnginfo=png_info)

            elif extension == 'jpeg':
                exif_bytes = piexif.dump({
                    "Exif": {
                        piexif.ExifIFD.UserComment: piexif.helper.UserComment.dump(civitai_metadata, encoding="unicode")
                    }
                }) if civitai_metadata else None
                img.save(output_file, format="JPEG", quality=quality)
                if exif_bytes:
                    piexif.insert(exif_bytes, output_file)
            else:
                img.save(output_file, format=extension.upper(), quality=quality)

            img_resized = resize_image(img, max_size=1024)
            buffered = io.BytesIO()
            img_resized.save(buffered, format="JPEG")
            img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
            images_buffer.append(img_base64)

            file_names.append(output_file)

        PromptServer.instance.send_sync("lf-saveimageforcivitai", {
            "node": node_id, 
            "fileNames": file_names,
            "images": images_buffer,
        })

        return ()
    
NODE_CLASS_MAPPINGS = {
    "LF_LoadImages": LF_LoadImages,
    "LF_LoadLocalJSON": LF_LoadLocalJSON,
    "LF_LoadMetadata": LF_LoadMetadata,
    "LF_SaveImageForCivitAI": LF_SaveImageForCivitAI
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_LoadImages": "Load images from disk",
    "LF_LoadLocalJSON": "Load JSON from disk",
    "LF_LoadMetadata": "Load metadata from image",
    "LF_SaveImageForCivitAI": "Save image with CivitAI-compatible metadata"
}
import io
import json
import os
import piexif
import re
import requests
import torch

from comfy.cli_args import args
from datetime import datetime
from PIL import Image
from PIL.PngImagePlugin import PngInfo
from server import PromptServer

from ..utils.constants import BASE_OUTPUT_PATH, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, BASE_INPUT_PATH, USER_FOLDER
from ..utils.helpers import create_dummy_image_tensor, create_history_node, create_masonry_node, extract_jpeg_metadata, extract_png_metadata, get_resource_url, normalize_input_image, normalize_input_list, normalize_json_input, normalize_list_to_value, normalize_output_image, pil_to_tensor, resolve_filepath, tensor_to_numpy

CATEGORY = f"{CATEGORY_PREFIX}/IO Operations"

# region LF_LoadFileOnce
class LF_LoadFileOnce:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"tooltip": "Path to the directory containing the images to load."}),
                "subdir": ("BOOLEAN", {"default": False, "tooltip": "Indicates whether to also load images from subdirectories."}),
                "strip_ext": ("BOOLEAN", {"default": True, "tooltip": "Whether to remove file extensions from filenames."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the execution value and date of the widget to prevent the same filename to be loaded twice."}),
            },
            "optional": {
                "json_input": ("KUL_HISTORY", {"default": {}}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, False, True, True)
    RETURN_NAMES = ("file", "name", "file_list", "name_list")
    RETURN_TYPES = ("*", "STRING", "*", "STRING")

    def on_exec(self, node_id: str, dir: str, subdir: str, strip_ext: bool, enable_history: bool, json_input: dict = {}):
        dir = normalize_list_to_value(dir)
        subdir = normalize_list_to_value(subdir)
        strip_ext = normalize_list_to_value(strip_ext)
        enable_history = normalize_list_to_value(enable_history)
        json_input = normalize_json_input(json_input)

        nodes = json_input.get("nodes", [])
        previous_files = {node['value'] for node in nodes} if nodes else set()

        file, file_name = None, None
        for root, dirs, filenames in os.walk(dir):
            if not subdir:
                dirs[:] = []
            for filename in filenames:
                file_name_stripped = os.path.splitext(filename)[0] if strip_ext else filename

                if file_name_stripped in previous_files:
                    continue

                file_path = os.path.join(root, filename)
                with open(file_path, 'rb') as f:
                    file = f.read()
                    file_name = file_name_stripped

                if enable_history:
                    create_history_node(file_name_stripped, nodes)
                break

        dataset = {"nodes": nodes}

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loadfileonce", {
            "node": node_id,
            "dataset": dataset
        })

        return (file, file_name, file, file_name)
# endregion
# region LF_LoadImages
class LF_LoadImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"default":"", "tooltip": "Path to the directory containing the images to load."}),
                "subdir": ("BOOLEAN", {"default": False, "tooltip": "Indicates whether to also load images from subdirectories."}),
                "strip_ext": ("BOOLEAN", {"default": True, "tooltip": "Whether to remove file extensions from filenames."}),
                "load_cap": ("INT", {"default": 0, "tooltip": "Maximum number of images to load before stopping. Set 0 for an unlimited amount."}),
                "dummy_output": ("BOOLEAN", {"default": False, "tooltip": "Flag indicating whether to output a dummy image tensor and string when the list is empty."}),
            },
            "optional": {
                "json_input": ("KUL_MASONRY", {"default": ""})
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True, True, True, False, False, False, False)
    RETURN_NAMES = ("image", "image_list", "name", "creation_date", "nr", "selected_image", "selected_index", "selected_name")
    RETURN_TYPES = ("IMAGE", "IMAGE", "STRING", "STRING", "INT", "IMAGE", "INT", "STRING")

    def on_exec(self, node_id: str, dir: str, subdir: bool, strip_ext: bool, load_cap: int, dummy_output: bool, json_input: dict = None):
        dir = normalize_list_to_value(dir)
        subdir = normalize_list_to_value(subdir)
        strip_ext = normalize_list_to_value(strip_ext)
        load_cap = normalize_list_to_value(load_cap)
        dummy_output = normalize_list_to_value(dummy_output)
        json_input = normalize_json_input(json_input)

        index = 0
        file_names = []
        images = []
        output_creation_dates = []
        selected_image = None

        nodes = []
        dataset = { "nodes": nodes }

        if json_input:
            selected_index = json_input.get("index", None)
            selected_name = json_input.get("name", None)
        else:
            selected_index = None
            selected_name = None

        for root, dirs, files in os.walk(dir):
            if not subdir:
                dirs[:] = []
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                    image_path = os.path.join(root, file)
                    with open(image_path, 'rb') as img_file:
                        f, e = os.path.splitext(file)
                        e = e.lstrip('.')

                        file_names.append(file)  

                        output_file, subfolder, filename = resolve_filepath(f"{USER_FOLDER}", BASE_INPUT_PATH, index, False, f, e, False)
                        url = get_resource_url(subfolder, filename, "input")
              
                        file_creation_time = os.path.getctime(image_path)
                        creation_date = datetime.fromtimestamp(file_creation_time).strftime('%Y-%m-%d')
                        output_creation_dates.append(creation_date)
        
                        pil_img = Image.open(io.BytesIO(img_file.read())).convert("RGB")
                        pil_img.save(output_file, format=e)

                        img_tensor = pil_to_tensor(pil_img)
                        images.append(img_tensor)
                        
                        nodes.append(create_masonry_node(filename, url, index))

                        if index == selected_index:
                            selected_image = img_tensor
                            selected_index = index
                            selected_name = filename

                        index += 1
                        if load_cap > 0 and index >= load_cap:
                            break

            if load_cap > 0 and index >= load_cap:
                break

        if dummy_output and not images:
            file_names.append("empty")
            selected_image = create_dummy_image_tensor()
            images.append(selected_image)         

        if dummy_output and images and selected_image is None:
            selected_image = create_dummy_image_tensor()

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loadimages", {
            "node": node_id, 
            "dataset": dataset,
            "selectedIndex": selected_index,
            "selectedName": selected_name
        })

        image_batch, image_list = normalize_output_image(images)

        return (image_batch[0], image_list, file_names, output_creation_dates, index, selected_image, selected_index, selected_name)
# endregion
# region LF_LoadLocalJSON
class LF_LoadLocalJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "url": ("STRING", {"default": "", "multiline": True, "tooltip": "The local URL where the JSON file is stored (i.e.: file://C:/myjson.json)."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id: str, url: str):
        url = normalize_list_to_value(url)

        if not url.startswith("file://"):
            url = f"file://{url}"
        
        file_path = requests.utils.unquote(url[7:])
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            
        return (data,)
# endregion
# region LF_LoadMetadata
class LF_LoadMetadata:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_names": ("KUL_UPLOAD", {"tooltip": "List of file names separated by semicolons (e.g., file1.jpg;file2.png;file3.jpg)."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("metadata_list",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id: str, file_names: str):
        file_names = normalize_list_to_value(file_names)

        input_dir = BASE_INPUT_PATH
        metadata_list = []

        if file_names:
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
# endregion
# region LF_RegionExtractor
class LF_RegionExtractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"tooltip": "Path to the directory containing the Python files."}),
                "subdir": ("BOOLEAN", {"default": False, "tooltip": "Whether to load Python files from subdirectories as well."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Tracks extracted regions to avoid reprocessing."}),
                "extension": ("STRING", {"default": "py", "tooltip": "Extension of the files that will be read."}),
            },
            "optional": {
                "json_input": ("KUL_HISTORY", {"default": {}}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("regions", "regions_list")
    RETURN_TYPES = ("JSON", "JSON")

    def on_exec(self, node_id: str, dir: str, subdir: bool, enable_history: bool, extension: str,  json_input: dict = {}):
        dir = normalize_list_to_value(dir)
        subdir = normalize_list_to_value(subdir)
        enable_history = normalize_list_to_value(enable_history)
        extension = normalize_list_to_value(extension)
        json_input = normalize_json_input(json_input)

        if not extension.startswith("."):
            extension = f".{extension}"
        
        files = []
        for root, _, f in os.walk(dir):
            if not subdir and root != dir:
                continue
            files.extend([os.path.join(root, file) for file in f if file.endswith(".py")])
        
        regions_list = []

        nodes = json_input.get("nodes", [])
        
        for file_path in files:
            with open(file_path, 'r') as f:
                code = f.read()
                
                if enable_history and json_input.get(file_path):
                    continue
                
                pattern = r"# region (.+?)\n(.*?)# endregion"
                matches = re.findall(pattern, code, re.DOTALL)
                
                for match in matches:
                    name = match[0].strip()
                    code = match[1].strip()

                    if enable_history:
                        create_history_node(name, nodes)

                    regions_list.append({
                        "file": file_path,
                        "name": name,
                        "code": code
                    })

        dataset = {"nodes": nodes}
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}regionextractor", {
            "node": node_id, 
            "dataset": dataset,
        })

        return (regions_list, regions_list)
# endregion
# region LF_SaveImageForCivitAI
class LF_SaveImageForCivitAI:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"tooltip": "Input images to save."}),
                "filepath": ("STRING", {"default": '', "tooltip": "Path and filename. Use slashes to specify directories."}),
                "add_timestamp": ("BOOLEAN", {"default": True, "tooltip": "Sets the execution time's timestamp as a suffix of the file name."}),
                "embed_workflow": ("BOOLEAN", {"default": True, "tooltip": "Whether to embed inside the images the current workflow or not."}),
                "extension": (['png', 'jpeg', 'webp'], {"default": "png", "tooltip": "Supported file formats."}),
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

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, True, False, False, False, False, False)
    OUTPUT_IS_LIST = (True, False)
    OUTPUT_NODE = True
    RETURN_NAMES = ("file_names", "civitai_metadata")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, node_id: str, extra_pnginfo, prompt: dict, image: torch.Tensor,
                filepath: str, add_timestamp: bool, embed_workflow: bool, extension: str, 
                quality: int, civitai_metadata: str = None):

        image = normalize_input_image(image)
        filepath = normalize_input_list(filepath)
        add_timestamp = normalize_list_to_value(add_timestamp)
        embed_workflow = normalize_list_to_value(embed_workflow)
        extension = normalize_list_to_value(extension)
        quality = normalize_list_to_value(quality)
        civitai_metadata = normalize_list_to_value(civitai_metadata)
        prompt = normalize_list_to_value(prompt)
        extra_pnginfo = normalize_list_to_value(extra_pnginfo)

        file_names = []

        nodes = []
        dataset = { "nodes": nodes }

        for index, img in enumerate(image):
            output_file, subfolder, filename = resolve_filepath(filepath, BASE_OUTPUT_PATH, index, add_timestamp, "output", extension)

            pil_img = Image.fromarray(tensor_to_numpy(img))
            url = get_resource_url(subfolder, filename, "output")
        
            if extension == 'png':
                png_info = PngInfo()
                if embed_workflow and not args.disable_metadata:
                    if prompt is not None:
                        png_info.add_text("prompt", json.dumps(prompt))
                    if extra_pnginfo is not None:
                        for key, value in extra_pnginfo.items():
                            png_info.add_text(key, json.dumps(value))
        
                if civitai_metadata:
                    png_info.add_text("parameters", civitai_metadata)
        
                pil_img.save(output_file, format="PNG", pnginfo=png_info)
        
            elif extension == 'jpeg':
                exif_bytes = piexif.dump({
                    "Exif": {
                        piexif.ExifIFD.UserComment: piexif.helper.UserComment.dump(civitai_metadata, encoding="unicode")
                    }
                }) if civitai_metadata else None
                pil_img.save(output_file, format="JPEG", quality=quality)
                if exif_bytes:
                    piexif.insert(exif_bytes, output_file)
            else:
                pil_img.save(output_file, format=extension.upper(), quality=quality)

            nodes.append(create_masonry_node(filename, url, index))
            file_names.append(filename)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}saveimageforcivitai", {
            "node": node_id, 
            "dataset": dataset
        })

        return (file_names, civitai_metadata)
# endregion
# region LF_SaveJSON
class LF_SaveJSON:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_data": ("JSON", {"tooltip": "JSON data to save."}),
                "filepath": ("STRING", {"default": '', "tooltip": "Path and filename for saving the JSON. Use slashes to specify directories."}),
                "add_timestamp": ("BOOLEAN", {"default": True, "tooltip": "Add timestamp to the filename as a suffix."}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("json",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, node_id: str, json_data: dict, filepath: str, add_timestamp: bool):
        json_data = normalize_json_input(json_data)
        filepath = normalize_list_to_value(filepath)
        add_timestamp = normalize_list_to_value(add_timestamp)

        try:
            output_file, _, _ = resolve_filepath(filepath, BASE_OUTPUT_PATH, 0, add_timestamp=add_timestamp)

            with open(output_file, 'w', encoding='utf-8') as json_file:
                json.dump(json_data, json_file, ensure_ascii=False, indent=4)

            nodes = []
            root = { "children": nodes, "icon":"check", "id": "root", "value": "JSON saved successfully!" }
            dataset = { "nodes": [root] }
            nodes.append({ "description": output_file, "icon": "json", "id": output_file, "value": output_file })

            PromptServer.instance.send_sync(f"{EVENT_PREFIX}savejson", {
                "node": node_id,
                "dataset": dataset,
            })

            return (json_data,)

        except Exception as e:
            print(f"Error saving JSON: {e}")
            return None
# endregion
NODE_CLASS_MAPPINGS = {
    "LF_LoadFileOnce": LF_LoadFileOnce,
    "LF_LoadImages": LF_LoadImages,
    "LF_LoadLocalJSON": LF_LoadLocalJSON,
    "LF_LoadMetadata": LF_LoadMetadata,
    "LF_RegionExtractor": LF_RegionExtractor,
    "LF_SaveJSON": LF_SaveJSON,
    "LF_SaveImageForCivitAI": LF_SaveImageForCivitAI
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_LoadFileOnce": "Load file from disk once",
    "LF_LoadImages": "Load images from disk",
    "LF_LoadLocalJSON": "Load JSON from disk",
    "LF_LoadMetadata": "Load metadata from image",
    "LF_RegionExtractor": "Extract region from sources",
    "LF_SaveJSON": "Save JSON",
    "LF_SaveImageForCivitAI": "Save image with CivitAI-compatible metadata"
}
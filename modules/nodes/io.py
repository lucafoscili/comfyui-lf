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

from ..utils.constants import CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION
from ..utils.helpers import create_dummy_image_tensor, create_history_node, create_masonry_node, extract_jpeg_metadata, extract_png_metadata, get_comfy_dir, get_resource_url, normalize_input_image, normalize_input_list, normalize_json_input, normalize_list_to_value, normalize_output_image, pil_to_tensor, resolve_filepath, tensor_to_pil

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
                "ui_widget": ("KUL_HISTORY", {"default": {}}),
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

    def on_exec(self, **kwargs: dict):
        dir: str = normalize_list_to_value(kwargs.get("dir"))
        subdir: bool = normalize_list_to_value(kwargs.get("subdir"))
        strip_ext: bool = normalize_list_to_value(kwargs.get("strip_ext"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        nodes: list[dict] = ui_widget.get("nodes", [])
        previous_files: dict = { node['value'] for node in nodes } if nodes else set()

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

        dataset: dict  = { "nodes": nodes }

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loadfileonce", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
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
                "ui_widget": ("KUL_MASONRY", {"default": {}}),
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

    def on_exec(self, **kwargs: dict):
        dir: str = normalize_list_to_value(kwargs.get("dir"))
        subdir: bool = normalize_list_to_value(kwargs.get("subdir"))
        strip_ext: bool = normalize_list_to_value(kwargs.get("strip_ext"))
        load_cap: int = normalize_list_to_value(kwargs.get("load_cap"))
        dummy_output: bool = normalize_list_to_value(kwargs.get("dummy_output"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        index = 0
        file_names: list[str] = []
        images: list[torch.Tensor] = []
        output_creation_dates: list[str] = []
        selected_image = None

        nodes: list[dict] = []
        dataset: dict = { "nodes": nodes }

        if ui_widget:
            selected_index = ui_widget.get("index", None)
            selected_name = ui_widget.get("name", None)
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

                        if strip_ext:
                            file_names.append(f)  
                        else:
                            file_names.append(file)
              
                        file_creation_time = os.path.getctime(image_path)
                        creation_date = datetime.fromtimestamp(file_creation_time).strftime('%Y-%m-%d')
                        output_creation_dates.append(creation_date)
                        pil_img = Image.open(io.BytesIO(img_file.read())).convert("RGB")
                        img_tensor = pil_to_tensor(pil_img)
  
                        output_file, subfolder, filename = resolve_filepath(
                            filename_prefix=f,
                            base_output_path=get_comfy_dir("input"),
                            extension=e,
                            add_counter=False,
                            image=img_tensor
                        )
                        url = get_resource_url(subfolder, filename, "input")
                        pil_img.save(output_file, format=e)

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

        image_batch, image_list = normalize_output_image(images)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loadimages", {
            "node": kwargs.get("node_id"), 
            "dataset": dataset,
        })

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
            "optional": {
                "ui_widget": ("KUL_TREE", {"default": {}}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_TYPES = ("JSON",)

    def on_exec(self, **kwargs: dict):
        url: str = normalize_list_to_value(kwargs.get("url"))

        if not url.startswith("file://"):
            url = f"file://{url}"
        
        file_path = requests.utils.unquote(url[7:])
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
 
        nodes: list[dict] = []
        root: dict = { "children": nodes, "icon":"check", "id": "root", "value": "JSON loaded successfully!" }
        dataset: dict = { "nodes": [root] }
        nodes.append({ "description": url, "icon": "json", "id": url, "value": url })
 
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}savejson", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

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
            "optional": {
                "ui_widget": ("KUL_CODE", {"default": ""}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("metadata", "metadata_list")
    RETURN_TYPES = ("JSON",)

    def on_exec(self, **kwargs: dict):
        file_names: str = normalize_list_to_value(kwargs.get("file_names"))

        input_dir = get_comfy_dir("base")
        metadata_list: list[str] = []
        metadata = ""

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

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}loadmetadata", {
            "node": kwargs.get("node_id"),
            "value": metadata,
        })

        return (metadata_list, metadata_list)
# endregion
# region LF_RegionExtractor
class LF_RegionExtractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"tooltip": "Path to the directory or file containing the Python files."}),
                "subdir": ("BOOLEAN", {"default": False, "tooltip": "Whether to load Python files from subdirectories as well."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Tracks extracted regions to avoid reprocessing."}),
                "extension": ("STRING", {"default": "py", "tooltip": "Extension of the files that will be read."}),
            },
            "optional": {
                "ui_widget": ("KUL_HISTORY", {"default": {}}),
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

    def on_exec(self, **kwargs: dict):
        def find_missing_references(code):
            """
            Identify constants and helper functions that are used but not defined in the code region.
            """
            # Patterns for constants (uppercase words) and function calls
            constant_pattern = r'\b([A-Z_][A-Z0-9_]*)\b'
            function_pattern = r'\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\('

            # All defined names within the region
            defined_names = set(re.findall(r'\bdef ([a-zA-Z_][a-zA-Z0-9_]*)\b|\b([A-Z_][A-Z0-9_]*)\b\s*=', code))
            defined_functions = {name[0] for name in defined_names if name[0]}
            defined_constants = {name[1] for name in defined_names if name[1]}

            # Find all constants and functions used in the code
            used_constants = set(re.findall(constant_pattern, code))
            used_functions = set(re.findall(function_pattern, code))

            # Missing constants and functions
            missing_constants = list(used_constants - defined_constants)
            missing_functions = list(used_functions - defined_functions)

            return missing_constants, missing_functions

        dir_path: str = normalize_list_to_value(kwargs.get("dir"))
        subdir: bool = normalize_list_to_value(kwargs.get("subdir"))
        enable_history: bool = normalize_list_to_value(kwargs.get("enable_history"))
        extension: str = normalize_list_to_value(kwargs.get("extension"))
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        if not extension.startswith("."):
            extension = f".{extension}"

        files: list[str] = []
        if os.path.isfile(dir_path):
            # 'dir' is actually a file
            if dir_path.endswith(extension):
                files.append(dir_path)
            else:
                # The file does not have the correct extension
                print(f"The file {dir_path} does not have the '{extension}' extension.")
                return ({}, [])
        elif os.path.isdir(dir_path):
            # 'dir' is a directory
            for root, _, f in os.walk(dir_path):
                if not subdir and root != dir_path:
                    continue
                files.extend([os.path.join(root, file) for file in f if file.endswith(extension)])
        else:
            print(f"The path {dir_path} is neither a file nor a directory.")
            return ({}, [])

        regions_list: list[dict] = []
        nodes: list[dict] = ui_widget.get("nodes", [])

        for file_path in files:
            with open(file_path, 'r') as f:
                code = f.read()

                if enable_history and ui_widget.get(file_path):
                    continue

                pattern = r"# region (.+?)\n(.*?)# endregion"
                matches = re.findall(pattern, code, re.DOTALL)

                for match in matches:
                    name = match[0].strip()
                    code_region = match[1].strip()

                    constants, helper_functions = find_missing_references(code_region)

                    if enable_history:
                        create_history_node(name, nodes)

                    regions_list.append({
                        "file": file_path,
                        "name": name,
                        "code": code_region,
                        "constants": constants,
                        "helperFunctions": helper_functions
                    })

        dataset: dict = {"nodes": nodes}

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}regionextractor", {
            "node": kwargs.get("node_id"),
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
                "filename_prefix": ("STRING", {"default": '', "tooltip": "Path and filename. Use slashes to specify directories."}),
                "add_timestamp": ("BOOLEAN", {"default": True, "tooltip": "Sets the execution time's timestamp as a suffix of the file name."}),
                "embed_workflow": ("BOOLEAN", {"default": True, "tooltip": "Whether to embed inside the images the current workflow or not."}),
                "extension": (['png', 'jpeg', 'webp'], {"default": "png", "tooltip": "Supported file formats."}),
                "quality": ("INT", {"default": 100, "min": 1, "max": 100, "tooltip": "Quality of saved images in jpeg or webp format."}),
            },
            "optional": {
                "civitai_metadata": ("STRING", {"defaultInput": True, "tooltip": "String containing CivitAI compatible metadata (created by the node LF_CivitAIMetadataSetup)."}),
                "ui_widget": ("KUL_MASONRY", {"default": {}}),
            },
            "hidden": {
                "extra_pnginfo": "EXTRA_PNGINFO",
                "node_id": "UNIQUE_ID",
                "prompt": "PROMPT",
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    INPUT_IS_LIST = (True, True, False, False, False, False, False, False)
    OUTPUT_IS_LIST = (True, False)
    OUTPUT_NODE = True
    RETURN_NAMES = ("file_names", "civitai_metadata")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        filename_prefix: list[str] = normalize_input_list(kwargs.get("filename_prefix"))
        extra_pnginfo: list[torch.Tensor] = normalize_list_to_value(kwargs.get("extra_pnginfo"))
        prompt: dict = normalize_list_to_value(kwargs.get("prompt"))
        add_timestamp: bool = normalize_list_to_value(kwargs.get("add_timestamp"))
        embed_workflow: bool = normalize_list_to_value(kwargs.get("embed_workflow"))
        extension: str = normalize_list_to_value(kwargs.get("extension"))
        quality: int = normalize_list_to_value(kwargs.get("quality"))
        civitai_metadata: str = normalize_list_to_value(kwargs.get("civitai_metadata", None))

        file_names: list[str] = []

        nodes: list[dict] = []
        dataset: dict = { "nodes": nodes }

        for index, img in enumerate(image):
            pil_img = tensor_to_pil(img)

            output_file, subfolder, filename = resolve_filepath(
                filename_prefix=filename_prefix,
                base_output_path=get_comfy_dir("output"),
                add_timestamp=add_timestamp,
                extension=extension,
                image=img
            )
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
            "node": kwargs.get("node_id"),
            "dataset": dataset,
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
                "filename_prefix": ("STRING", {"default": '', "tooltip": "Path and filename for saving the JSON. Use slashes to set directories."}),
                "add_timestamp": ("BOOLEAN", {"default": True, "tooltip": "Add timestamp to the filename as a suffix."}),
            },
            "optional": {
                "ui_widget": ("KUL_TREE", {"default": {}}),
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

    def on_exec(self, **kwargs: dict):
        json_data: dict = normalize_json_input(kwargs.get("json_data"))
        filename_prefix: str = normalize_list_to_value(kwargs.get("filename_prefix"))
        add_timestamp: bool = normalize_list_to_value(kwargs.get("add_timestamp"))

        output_file, _, _ = resolve_filepath(
            filename_prefix=filename_prefix,
            base_output_path=get_comfy_dir("output"),
            add_timestamp=add_timestamp,
            extension="json"
        )
 
        with open(output_file, 'w', encoding='utf-8') as json_file:
            json.dump(json_data, json_file, ensure_ascii=False, indent=4)
 
        nodes: list[dict] = []
        root: dict = { "children": nodes, "icon":"check", "id": "root", "value": "JSON saved successfully!" }
        dataset: dict = { "nodes": [root] }
        nodes.append({ "description": output_file, "icon": "json", "id": output_file, "value": output_file })
 
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}savejson", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })
 
        return (json_data,)
# endregion
# region LF_SaveMarkdown
class LF_SaveMarkdown:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "markdown_text": ("STRING", {"default": "", "multiline": True, "tooltip": "Markdown data to save."}),
                "filename_prefix": ("STRING", {"default": '', "tooltip": "Path and filename for saving the Markdown. Use slashes to set directories."}),
                "add_timestamp": ("BOOLEAN", {"default": True, "tooltip": "Add timestamp to the filename as a suffix."}),
            },
            "optional": {
                "ui_widget": ("KUL_TREE", {"default": {}}),
            },
            "hidden": { 
                "node_id": "UNIQUE_ID",
            } 
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("string",)
    RETURN_TYPES = ("STRING",)

    def on_exec(self, **kwargs: dict):
        markdown_text: str = normalize_list_to_value(kwargs.get("markdown_text"))
        filename_prefix: str = normalize_list_to_value(kwargs.get("filename_prefix"))
        add_timestamp: bool = normalize_list_to_value(kwargs.get("add_timestamp"))

        output_file, _, _ = resolve_filepath(
            filename_prefix=filename_prefix,
            base_output_path=get_comfy_dir("output"),
            add_timestamp=add_timestamp,
            extension="md"
        )

        with open(output_file, 'w', encoding='utf-8') as md_file:
            md_file.write(markdown_text)

        nodes: list[dict] = []
        root: dict = { "children": nodes, "icon":"check", "id": "root", "value": "Markdown saved successfully!" }
        dataset: dict = { "nodes": [root] }
        nodes.append({ "description": output_file, "icon": "document", "id": output_file, "value": output_file })

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}savemarkdown", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (markdown_text,)
# endregion
NODE_CLASS_MAPPINGS = {
    "LF_LoadFileOnce": LF_LoadFileOnce,
    "LF_LoadImages": LF_LoadImages,
    "LF_LoadLocalJSON": LF_LoadLocalJSON,
    "LF_LoadMetadata": LF_LoadMetadata,
    "LF_RegionExtractor": LF_RegionExtractor,
    "LF_SaveJSON": LF_SaveJSON,
    "LF_SaveMarkdown": LF_SaveMarkdown,
    "LF_SaveImageForCivitAI": LF_SaveImageForCivitAI
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_LoadFileOnce": "Load file from disk once",
    "LF_LoadImages": "Load images from disk",
    "LF_LoadLocalJSON": "Load JSON from disk",
    "LF_LoadMetadata": "Load metadata from image",
    "LF_RegionExtractor": "Extract region from sources",
    "LF_SaveJSON": "Save JSON",
    "LF_SaveMarkdown": "Save Markdown",
    "LF_SaveImageForCivitAI": "Save image with CivitAI-compatible metadata"
}
import io
import base64
import os
import numpy as np
import torch

from PIL import Image
from server import PromptServer

from ..utils.loaders import *

category = "LF Nodes/Loaders"
 
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
            "hidden": { "node_id": "UNIQUE_ID" } 
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_IS_LIST = (True, True, False)
    RETURN_NAMES = ("images", "names", "nr")
    RETURN_TYPES = ("IMAGE", "STRING", "INT")

    def on_exec(self, dir, subdir, strip_ext, load_cap, dummy_output, node_id):
        """
        Loads images from a specified directory and subdirectories, optionally stripping extensions from filenames.
        Images are converted to tensors and returned along with their filenames and the total number of images processed.
        If the 'dummy_output' flag is set and no images are found, a dummy image tensor is appended to the image list and a dummy string is appended to the file names string.

        Parameters:
            dir (str): The root directory from which to load images.
            subdir (bool): Indicates whether to also load images from subdirectories.
            strip_ext (bool): Whether to remove file extensions from filenames.
            load_cap (int): Maximum number of images to load before stopping. Set 0 for an unlimited amount.
            node_id (str): Unique identifier for the node instance.
            dummy_output (bool): Flag indicating whether to output a dummy image tensorand string when the list is empty. Defaults to False.

        Returns:
            tuple: A tuple containing three elements:
                - list[torch.Tensor]: A list of image tensors.
                - list[str]: A list of image filenames.
                - int: The total number of images processed.
        """
        images_buffer = []  # List to hold image buffers (for the GUI)
        images = []
        file_names = []
        count = 0

        for root, dirs, files in os.walk(dir):
            if not subdir:
                dirs[:] = []
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                    image_path = os.path.join(root, file)
                    # Load image using PIL and convert to tensor
                    with open(image_path, 'rb') as img_file:
                        img_data = img_file.read()
                        img = Image.open(io.BytesIO(img_data)).convert("RGB")

                        # Resize the image for front-end
                        img_resized = resize_image(img, max_size=1024)
                        
                        # Convert PIL Image to BytesIO buffer
                        buffered = io.BytesIO()
                        img_resized.save(buffered, format="JPEG")
                        
                        # Encode BytesIO buffer to base64 string
                        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                        
                        # Append base64-encoded string to the GUI list
                        images_buffer.append(img_base64)                    

                        # Convert the original (non-resized) image to tensor
                        img_tensor = torch.from_numpy(np.array(img).astype(np.float32) / 255.0).unsqueeze(0)

                        # Append image in tensor format to the tensor list
                        images.append(img_tensor)
 
                        if strip_ext:
                            file = os.path.splitext(file)[0]
                        file_names.append(file)  
 
                    # Stop loading images if the cap is reached
                        count += 1
                        if load_cap > 0 and count >= load_cap:
                            break

            # Break out of the outer loop as well if the cap is reached
            if load_cap > 0 and count >= load_cap:
                break

        # Check if we should output the dummy image and string
        if dummy_output and not images:
            # Add a dummy image tensor to the list
            file_names.append("empty")
            images.append(create_dummy_image_tensor())
        
        PromptServer.instance.send_sync("lf-loadimages", {
            "node": node_id, 
            "fileNames": file_names,
            "images": images_buffer,
        })

        return (images, file_names, count)

NODE_CLASS_MAPPINGS = {
    "LF_LoadImages": LF_LoadImages,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_LoadImages": "Load images from disk",
}

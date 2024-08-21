import os
import numpy as np
import torch

from PIL import Image

category = "LF Nodes/Loaders"

class LF_LoadImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"label": "Directory path"}),
                "subdir": ("BOOLEAN", {"default": False, "label": "Load from subdir"}),
                "strip_ext": ("BOOLEAN", {"default": True, "label": "Strip extension from name"}),
                "load_cap": ("INT", {"default": 1, "label": "Maximum images to load", "min": 1})
            },
        }

    RETURN_TYPES = ("IMAGE", "STRING", "INT")
    RETURN_NAMES = ("images", "names", "nr")
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (True, True, False)
    CATEGORY = category
    FUNCTION = "load_images"

    def load_images(self, dir, subdir, strip_ext, load_cap):
        images = []
        file_names = []
        count = 0

        for root, dirs, files in os.walk(dir):
            if subdir and dirs:
                dirs[:] = [d for d in dirs if os.path.isdir(os.path.join(root, d))]
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                    image_path = os.path.join(root, file)
                    # Load image using PIL and convert to tensor
                    img = Image.open(image_path).convert("RGB")
                    img_tensor = torch.from_numpy(np.array(img).astype(np.float32) / 255.0).unsqueeze(0)
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
        
        return (images, file_names, count)

NODE_CLASS_MAPPINGS = {
    "LF_LoadImages": LF_LoadImages,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_LoadImages": "Load images from disk",
}
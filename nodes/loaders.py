import io
import base64
import os
import numpy as np
import torch

from PIL import Image
from server import PromptServer

category = "LF Nodes/Loaders"

def create_dummy_image_tensor():
    """
    Creates a dummy image tensor, typically used when there are no real images to process.
    This function generates a small black image (1x1 pixels) and converts it to a PyTorch tensor.
    The resulting tensor can be used as a placeholder in scenarios where no actual image data is available.

    Returns:
        torch.Tensor: A single-element tensor representing a dummy image.
    """    
    # Create a small black image
    img = Image.new('RGB', (1, 1), color=(0, 0, 0))
    
    # Convert to tensor
    img_tensor = torch.from_numpy(np.array(img)).float() / 255.0
    
    return img_tensor.unsqueeze(0)

class LF_LoadImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dir": ("STRING", {"label": "Directory path"}),
                "subdir": ("BOOLEAN", {"default": False, "label": "Load from subdir"}),
                "strip_ext": ("BOOLEAN", {"default": True, "label": "Strip extension from name"}),
                "load_cap": ("INT", {"default": 1, "label": "Maximum images to load", "min": 1}),
                "dummy_output": ("BOOLEAN", {"default": False, "label": "Outputs a dummy image in tensor format when the list is empty"}),
            },
            "hidden": { "node_id": "UNIQUE_ID" } 
        }

    RETURN_TYPES = ("IMAGE", "STRING", "INT")
    RETURN_NAMES = ("images", "names", "nr")
    OUTPUT_IS_LIST = (True, True, False)
    CATEGORY = category
    FUNCTION = "load_images"

    def load_images(self, dir, subdir, strip_ext, load_cap, dummy_output, node_id):
        """
        Loads images from a specified directory and subdirectories, optionally stripping extensions from filenames.
        Images are converted to tensors and returned along with their filenames and the total number of images processed.
        If the 'dummy_output' flag is set and no images are found, a dummy image tensor is appended to the image list and a dummy string is appended to the file names string.

        Parameters:
            dir (str): The root directory from which to load images.
            subdir (bool): Indicates whether to also load images from subdirectories.
            strip_ext (bool): Whether to remove file extensions from filenames.
            load_cap (int): Maximum number of images to load before stopping.
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
            if subdir and dirs:
                dirs[:] = [d for d in dirs if os.path.isdir(os.path.join(root, d))]
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                    image_path = os.path.join(root, file)
                    # Load image using PIL and convert to tensor
                    with open(image_path, 'rb') as img_file:
                        img_data = img_file.read()
                        img = Image.open(io.BytesIO(img_data))

                        # Convert PIL Image to RGB
                        img_rgb = img.convert("RGB")
                        
                        # Convert PIL Image to BytesIO buffer
                        buffered = io.BytesIO()
                        img_rgb.save(buffered, format="JPEG")
                        
                        # Encode BytesIO buffer to base64 string
                        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                        
                        # Append base64-encoded string to the GUI list
                        images_buffer.append(img_base64)                    

                        # Convert to tensor
                        img = Image.open(image_path).convert("RGB")
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
            file_names.append("*empty*")
            images.append(create_dummy_image_tensor())
        
        PromptServer.instance.send_sync("lf-loadimages", {
            "node": node_id, 
            "images": images_buffer,
        })

        return (images, file_names, count)

NODE_CLASS_MAPPINGS = {
    "LF_LoadImages": LF_LoadImages,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_LoadImages": "Load images from disk",
}
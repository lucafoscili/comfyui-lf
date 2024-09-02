import numpy as np
import torch

from PIL import Image

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
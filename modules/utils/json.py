import numpy as np
import torch
from PIL import Image

def create_blank_image(width, height):
    return Image.new('RGB', (width, height), color='white')

def create_noisy_image(width, height):
    noise = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
    return Image.fromarray(noise)

def pil_batch_to_tensor_bhwc(image_batch):
    """
    Convert a batch of PIL Images to a PyTorch tensor in [B, H, W, C] format.

    Args:
        image_batch (list): List of PIL Image objects.

    Returns:
        torch.Tensor: A tensor representing the batch of images.
        Shape: [B, H, W, C], where B is the batch size, H is height, W is width, and C is the number of channels.
    """
    tensors = []
    for image in image_batch:
        # Convert PIL to NumPy and normalize
        np_image = np.array(image).astype("float32") / 255.0
        
        # Keep it in [H, W, C] format for ComfyUI
        tensor = torch.tensor(np_image)  # Already in [H, W, C] format
        
        tensors.append(tensor)

    # Stack all tensors into a single tensor with shape [B, H, W, C]
    return torch.stack(tensors)
import io
import base64

from PIL import Image

def tensor_to_b64 (image):
    """
    Converts a PyTorch tensor representing an image into a base64 encoded string.

    This function takes a PyTorch tensor, checks if it has four dimensions (typical for batches of images),
    squeezes the batch dimension down to zero if present, converts the tensor to a PIL Image,
    saves the image to a BytesIO buffer in PNG format, encodes the buffer contents as base64,
    and returns the resulting base64 string.

    Parameters:
    - image (torch.Tensor): The input tensor containing the image data. Expected to be of dtype float32
                             and normalized to [0, 1] range. If the tensor represents a batch of images,
                             the batch dimension will be squeezed out.

    Returns:
    - str: Base64 encoded string representation of the image.
    """    
    if image.ndim == 4:
        image = image.squeeze(0)

    pil_image = Image.fromarray((image.numpy() * 255).astype('uint8'))
    buffer = io.BytesIO()
    pil_image.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.read()).decode('utf-8')


def handle_response(response: dict, method: str = "GET"):
    """
    Handles the response from a Language Model (LLM) endpoint.

    Args:
    - response (dict): The response dictionary from the LLM endpoint.
    - method (str): The HTTP method used for the request. Defaults to "GET".

    Returns:
    - tuple: A tuple containing the status code, method, and the content of the response.
    """
    # Check for common error status codes
    if response.status_code == 400:
        return response.status_code, method, "Bad Request"
    elif response.status_code == 401:
        return response.status_code, method, "Unauthorized"
    elif response.status_code == 403:
        return response.status_code, method, "Forbidden"
    elif response.status_code == 404:
        return response.status_code, method, "Not Found"
    elif response.status_code == 500:
        return response.status_code, method, "Internal Server Error"
    else:
        # Process successful responses
        if response.status_code == 200:
            llm_result = response.json()
            if 'choices' in llm_result and len(llm_result['choices']) > 0:
                first_choice = llm_result['choices'][0]
                if 'message' in first_choice and 'content' in first_choice['message']:
                    answer = first_choice['message']['content']
                    return response.status_code, method, answer
                
        return response.status_code, method, "Whoops! Something went wrong."
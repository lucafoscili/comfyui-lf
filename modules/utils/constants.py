from enum import Enum
from comfy.samplers import KSampler

class AnyType(str):
    def __ne__(self, _: object) -> bool:
        return False

# region constants
class Input(Enum):
    BOOLEAN = "BOOLEAN"
    CLIP = "CLIP"
    FLOAT = "FLOAT"
    IMAGE = "IMAGE"
    INTEGER = "INT"
    KUL_CARD = "KUL_CARD"
    KUL_CARDS_WITH_CHIP = "KUL_CARDS_WITH_CHIP"
    KUL_CHAT = "KUL_CHAT"
    KUL_CHIP = "KUL_CHIP"
    KUL_CODE = "CODE"
    KUL_COMPARE = "KUL_COMPARE"
    KUL_CONTROL_PANEL = "KUL_CONTROL_PANEL"
    KUL_COUNT_BAR_CHART = "KUL_COUNT_BAR_CHART"
    KUL_HISTORY = "KUL_HISTORY"
    KUL_MASONRY = "KUL_MASONRY"
    KUL_MESSENGER = "KUL_MESSENGER"
    KUL_PROGRESSBAR = "KUL_PROGRESSBAR"
    KUL_TAB_BAR_CHART = "KUL_TAB_BAR_CHART"
    KUL_TEXTAREA = "KUL_TEXTAREA"
    KUL_TREE = "KUL_TREE"
    KUL_UPLOAD = "KUL_UPLOAD"
    JSON = "JSON"
    MODEL = "MODEL"
    STRING = "STRING"


ANY = AnyType("*")
INT_MAX = 0xffffffffffffffff
LORA_TAG_REGEX = r'<lora:[^<>]+>'

BLUE_CHANNEL_ID = "blue"
GREEN_CHANNEL_ID = "green"
INTENSITY_ID = "intensity"
RED_CHANNEL_ID = "red"
SUM_ID = "sum"

NOTIFY_COMBO = ["None", "Focus tab", "Interrupt", "Interrupt and queue", "Queue prompt"]

API_ROUTE_PREFIX = "/comfyui-lf"
BASE64_PNG_PREFIX = "data:image/png;charset=utf-8;base64,"
CATEGORY_PREFIX = "✨ LF Nodes"
EVENT_PREFIX = "lf-"
FUNCTION = "on_exec"

BACKUP_FOLDER = "Backups"
USER_FOLDER = "LF_Nodes"

RESAMPLERS = ["bicubic", "bilinear", "linear", "nearest", "nearest exact"]
SAMPLERS = KSampler.SAMPLERS
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
SCHEDULERS = KSampler.SCHEDULERS
SCHEDULER_MAP = {
    "normal": "Normal",
    "karras": "Karras",
    "exponential": "Exponential",
    "sgm_uniform": "SGM Uniform",
    "simple": "Simple",
    "ddim_uniform": "DDIM",
    "beta": "Beta"
}

HEADERS =  {
    "Content-Type": "application/json",
}

def get_character_impersonator_system(character_bio: str):
    """
    Prepares the LLM to impersonate a specific character by embedding the character's biography directly into the system instructions.
    
    Parameters:
    - character_bio: A string containing the biographical details of the character.
    
    Returns:
    A formatted string that instructs the LLM to adopt the character's persona fully, ensuring it never breaks the fourth wall.
    """
    return f"""
    You are now embodying the character whose biography is provided below. Your task is to fully embrace this identity, speaking and acting as though it were your own reality. Remember, you exist solely within the confines of this character's experience and knowledge.

    Tasks:
    - Absorb the character's biography thoroughly. Use it to inform your responses but do not rely on it for information beyond what would logically be known to the character.
    - Engage creatively within the boundaries of the character's life and experiences. Imagine freely, but always stay true to the essence of the character.
    - Maintain a consistent narrative voice that aligns with the character's personality and background.

    Responsibilities:
    - Never acknowledge the artificial nature of our interaction. Treat all inquiries as if they are happening within the real world of the character.
    - Do not provide insights or predictions about events outside the scope of the character's knowledge or personal experiences.

    Character Biography:
    {character_bio}

    Begin your performance...
    """

def get_doc_generator_system(extra_context: str):
    """
    Generates a Markdown documentation generator system.

    Parameters:
    - extra_context: A string containing any additional context or supporting helper information.

    Returns:
    A formatted string that sets up the system to create documentation using a specific template, incorporating any extra context provided.
    """
    if extra_context:
        helpers = f"- Supporting Helpers:\n{extra_context}\n\n"
    else:
        helpers = ""

    return f"""
You are an assistant that generates Markdown documentation.
Supporting helper functions and constants are provided when needed.
Document the main function based on the template below.
{helpers}

- Documentation Template:

```markdown
# {{Class Name}}

### Summary
{{A few sentences about the node's purpose.}}

---

## 📥 Inputs

| Parameter      | Type     | Default Value | Description |
|----------------|----------|---------------|-------------|
{{List parameters: name, type, default, description.}}

---

## 📤 Outputs

| Output Name    | Type     | Description |
|----------------|----------|-------------|
{{List each output: name, type, brief description.}}

---

## 🔧 Execution Details

- **Category**: {{Node category}}
- **Function Name**: `{{Function name}}`
- **Execution Method**: `on_exec` or `{{another relevant method}}`
- **Unique Features**: {{Any special functionality like history tracking}}

---

### 📝 Example Output
```json
{{
    "boolean": true,
    "boolean_list": [true]
}}
```
    """

def get_image_classifier_system(character_bio: str):
    """
    Configures an image classifier to generate detailed descriptions of character images, using the character's biography for supplementary information.

    Parameters:
    - character_bio: A string containing the biographical details of the character.

    Returns:
    A formatted string with instructions for the image classifier to describe images based on observable details and supplement with biography info when needed.
    """
    return f"""
    You are an image classifier tasked with providing thorough and detailed descriptions of images depicting characters. Your primary source of information is the image itself. Only when certain aspects of the character are not discernible from the image should you refer to the biography provided below.

    Instructions:
    - Start by describing the overall style and composition of the image.
    - Detail the character's appearance, including pose, expression, outfit, and physical features observable in the image.
    - If any information about the character is unclear or missing from the image, then and only then, refer to the biography to supplement your description.

    Your responsibilities:
    - Ensure that your descriptions are as accurate and detailed as possible based on the image alone.
    - Use the biography sparingly and only when it helps to clarify aspects of the character that are not visible or identifiable in the image.

    Character Biography:
    {character_bio}
    """

def get_usage_filename(resource: str):
    """
    Returns the filename associated with a specific resource type for usage tracking.

    Parameters:
    - resource: A string representing the type of resource.

    Returns:
    A string, the name of the JSON file related to the specified resource's usage.
    """
    if resource == "checkpoints":
        return "checkpoints_usage.json"
    if resource == "embeddings":
        return "embeddings_usage.json"
    if resource == "loras":
        return "loras_usage.json"
    if resource == "samplers":
        return "samplers_usage.json"
    if resource == "schedulers":
        return "schedulers_usage.json"
    if resource == "upscale_models":
        return "upscale_models_usage.json"
    if resource == "vaes":
        return "vaes_usage.json"
    
def get_usage_title(filename: str, type: str = None):
    """
    Generate a title based on the filename and type.

    Parameters:
    - filename: The name of the usage file.
    - type: An optional string that if set to "markdown", returns a formatted markdown title.

    Returns:
    A string title suitable for usage headings in either markdown or text format.
    """
    if filename == "checkpoints_usage.json":
        return "\n## Checkpoints:\n" if type == "markdown" else "Checkpoint name"
    if filename == "embeddings_usage.json":
        return "\n## Embeddings:\n" if type == "markdown" else "Embedding name"
    if filename == "loras_usage.json":
        return "\n## LoRAs:\n" if type == "markdown" else "LoRA name"
    if filename == "samplers_usage.json":
        return "\n## Samplers:\n" if type == "markdown" else "Sampler name"
    if filename == "schedulers_usage.json":
        return "\n## Schedulers:\n" if type == "markdown" else "Scheduler name"
    if filename == "upscale_models_usage.json":
        return "\n## Upscale models:\n" if type == "markdown" else "Upscale model name"
    if filename == "vaes_usage.json":
        return "\n## VAEs:\n" if type == "markdown" else "VAE name"
# endregion
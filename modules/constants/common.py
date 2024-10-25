import os

from folder_paths import get_filename_list, output_directory, user_directory
from comfy.samplers import KSampler

class AnyType(str):
    def __ne__(self, _: object) -> bool:
        return False

ANY = AnyType("*")
INT_MAX = 0xffffffffffffffff

NOTIFY_COMBO = ["None", "Focus tab", "Interrupt", "Interrupt and queue", "Queue prompt"]

API_ROUTE_PREFIX = "/comfyui-lf"
BASE64_PNG_PREFIX = "data:image/png;charset=utf-8;base64,"
CATEGORY_PREFIX = "✨ LF Nodes"
EVENT_PREFIX = "lf-"

USER_FOLDER = "LF_Nodes"
BACKUP_FOLDER = "Backups"

BASE_PATH = os.path.join(user_directory, USER_FOLDER)
BACKUP_PATH = os.path.join(BASE_PATH, BACKUP_FOLDER)

FUNCTION = "on_exec"

BASE_OUTPUT_PATH = output_directory
CHECKPOINTS = get_filename_list("checkpoints")
RESAMPLERS = ["bicubic", "bilinear", "linear", "nearest", "nearest exact"]
SAMPLERS = KSampler.SAMPLERS
SCHEDULERS = KSampler.SCHEDULERS
UPSCALERS = get_filename_list("upscale_models")
VAES = get_filename_list("vae")
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
SCHEDULER_MAP = {
    "normal": "Normal",
    "karras": "Karras",
    "exponential": "Exponential",
    "sgm_uniform": "SGM Uniform",
    "simple": "Simple",
    "ddim_uniform": "DDIM",
    "beta": "Beta"
}
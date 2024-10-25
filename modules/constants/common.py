import os

from folder_paths import user_directory

API_ROUTE_PREFIX = "/comfyui-lf"
BASE64_PNG_PREFIX = "data:image/png;charset=utf-8;base64,"
CATEGORY_PREFIX = "✨ LF Nodes"
EVENT_PREFIX = "lf-"

USER_FOLDER = "LF_Nodes"
BACKUP_FOLDER = "Backups"

BASE_PATH = os.path.join(user_directory, USER_FOLDER)
BACKUP_PATH = os.path.join(BASE_PATH, BACKUP_FOLDER)

FUNCTION = "on_exec"
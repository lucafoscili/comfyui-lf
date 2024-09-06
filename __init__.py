import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

version = "3.1.4"

# Directory containing the submodules
modules_dir = os.path.join(os.path.dirname(__file__), "modules")

# Recursively find all Python files in the modules directory
for dirpath, dirnames, filenames in os.walk(modules_dir):
    for filename in filenames:
        if filename.endswith(".py") and filename != "__init__.py":
            # Construct the module's relative path
            relative_path = os.path.relpath(os.path.join(dirpath, filename), modules_dir)
            module_name = os.path.splitext(relative_path.replace(os.path.sep, "."))[0]
            
            # Import the module
            try:
                module = __import__(f"comfyui-lf.modules.{module_name}", fromlist=[''])
                NODE_CLASS_MAPPINGS.update(getattr(module, "NODE_CLASS_MAPPINGS", {}))
                NODE_DISPLAY_NAME_MAPPINGS.update(getattr(module, "NODE_DISPLAY_NAME_MAPPINGS", {}))
            except ImportError as e:
                print(f"Failed to import {module_name}: {e}")

WEB_DIRECTORY = "./web/deploy"
__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]

print(f'\033[34mLF Nodes initialized   \033[0m[v{version}]\033[92m\033[0m')
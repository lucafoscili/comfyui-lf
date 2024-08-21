import importlib.util
import os

# Function to dynamically import a module
def import_module(module_path):
    spec = importlib.util.spec_from_file_location("module.name", module_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

# Initialize main dictionaries
NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

# Directory containing the submodules
submodules_dir = os.path.join(os.path.dirname(__file__), "nodes")

# Iterate through each file in the submodules directory
for filename in os.listdir(submodules_dir):
    if filename.endswith(".py") and not filename.startswith("__"):
        module_name = filename[:-3]  # Remove '.py' from the end
        module_path = os.path.join(submodules_dir, filename)
        
        # Dynamically import the module
        module = import_module(module_path)
        
        # Update main dictionaries with the ones from the submodule
        NODE_CLASS_MAPPINGS.update(getattr(module, "NODE_CLASS_MAPPINGS", {}))
        NODE_DISPLAY_NAME_MAPPINGS.update(getattr(module, "NODE_DISPLAY_NAME_MAPPINGS", {}))

# Make sure to add any additional setup or initialization code here

WEB_DIRECTORY = "./web/js"
__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
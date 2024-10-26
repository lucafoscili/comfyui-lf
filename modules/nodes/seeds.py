import json
import os
import time

from datetime import datetime

from server import PromptServer

from ..utils.constants import *
from ..utils.helpers import *

CATEGORY = f"{CATEGORY_PREFIX}/Seed generation"
    
# region LF_SequentialSeedsGenerator
class LF_SequentialSeedsGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "max": INT_MAX, "tooltip": "Seed value from which the other seeds will be progressively increased."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = ("seed",) * 20
    RETURN_TYPES = ("INT",) * 20

    def on_exec(self, node_id: str, seed: int):
        seeds = [seed + i for i in range(20)] 
        return seeds
# endregion
# region LF_UrandomSeedGenerator
class LF_UrandomSeedGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "regen_each_run": ("BOOLEAN", {"default": True, "tooltip": "Generates new random seeds each run, while still keeping the seeds fed through the fixed_seeds JSON."}),
                "enable_history": ("BOOLEAN", {"default": True, "tooltip": "Enables history, saving the random seeds at execution time."}),
            },
            "optional": {
                "fixed_seeds": ("JSON", {"default": {}, "tooltip": "A Ketchup Lite-compatible dataset containing 20 previously generated seeds."}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_NODE = True
    RETURN_NAMES = tuple(["fixed_seeds_dataset"] + ["seed"] * 20)
    RETURN_TYPES = tuple(["JSON"] + ["INT"] * 20)

    def on_exec(self, node_id: str, enable_history: bool, regen_each_run: bool, fixed_seeds: dict = None):
        json_data = normalize_json_input(fixed_seeds)
        existing_seeds = [None] * 20

        if json_data:
            try:
                for node in json_data.get("nodes", []):
                    children = node.get("children", [])
                    for child in children:
                        seed_id = child["id"]
                        seed_value = int(child["value"])
                        # Extract the index from 'seedX'
                        index = int(seed_id.replace("seed", "")) - 1
                        if 0 <= index < 20:
                            existing_seeds[index] = seed_value
            except json.JSONDecodeError:
                print("Invalid JSON input. Generating all random seeds.")

        current_timestamp = int(datetime.now().timestamp())
        
        for i in range(20):
            # Generate urandom seed
            urandom_seed = int.from_bytes(os.urandom(4), 'big')
            
            # Only XOR with timestamp if the current seconds meet certain criteria
            current_seconds = datetime.now().second
            if current_seconds % 2 == 0:  # XOR only if seconds are even
                urandom_seed ^= current_timestamp
            
            # Set seed if it was not provided in the input
            if existing_seeds[i] is None:
                existing_seeds[i] = urandom_seed
            
            # Slight delay to refresh system entropy pool
            time.sleep(0.01)

        execution_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        json_dataset = {
            "nodes": [
                {
                    "children": [
                        {"id": f"seed{i+1}", "value": str(seed)} for i, seed in enumerate(existing_seeds)
                    ],
                    "icon": "history",
                    "id": f"Execution time: {execution_time}",
                    "value": f"Execution time: {execution_time}"
                }
            ]
        }

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}urandomseedgenerator", {
            "node": node_id, 
            "dataset": json_dataset,
            "isHistoryEnabled": enable_history,
            "regenEachRun": regen_each_run,
        })

        return (json_dataset, *existing_seeds)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        regen_each_run = kwargs.get('regen_each_run', False)
        if regen_each_run:
            return float("NaN")
# endregion
# region Mappings
NODE_CLASS_MAPPINGS = {
    "LF_SequentialSeedsGenerator": LF_SequentialSeedsGenerator,
    "LF_UrandomSeedGenerator": LF_UrandomSeedGenerator,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_SequentialSeedsGenerator": "Generate sequential seeds",
    "LF_UrandomSeedGenerator": "Urandom Seed Generator",
}
# endregion
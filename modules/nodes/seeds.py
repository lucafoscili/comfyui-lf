import json
import os
import time

from datetime import datetime

from server import PromptServer

category = "✨ LF Nodes/Seed generation"
    
class LF_SequentialSeedsGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "global_seed": ("INT", {"default": 0, "tooltip": "Seed value from which the other seeds will be progressively increased."}),
            }
        }
    
    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("seed",) * 20
    RETURN_TYPES = ("INT",) * 20

    def on_exec(self, global_seed: int):
        seeds = [global_seed + i for i in range(20)] 
        return seeds
    
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
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = tuple(["fixed_seeds_dataset"] + ["seed"] * 20)
    RETURN_TYPES = tuple(["JSON"] + ["INT"] * 20)
    
    def on_exec(self, node_id, enable_history: bool, regen_each_run, fixed_seeds=None):
        existing_seeds = [None] * 20
        if fixed_seeds:
            try:
                json_string = json.dumps(fixed_seeds)
                json_data = json.loads(json_string)
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
            if existing_seeds[i] is None:
                urandom_seed = int.from_bytes(os.urandom(4), 'big')
                existing_seeds[i] = urandom_seed ^ current_timestamp
                time.sleep(0.1)  # Add a tiny delay to let system entropy pool refresh

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

        PromptServer.instance.send_sync("lf-urandomseedgenerator", {
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
    
NODE_CLASS_MAPPINGS = {
    "LF_SequentialSeedsGenerator": LF_SequentialSeedsGenerator,
    "LF_UrandomSeedGenerator": LF_UrandomSeedGenerator,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_SequentialSeedsGenerator": "Generate sequential seeds",
    "LF_UrandomSeedGenerator": "Urandom Seed Generator",
}
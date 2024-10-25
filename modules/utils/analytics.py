import json
import os

def update_usage_json(resource_file:str, resource_name:str, resource_value:str):
    resource_value = os.path.splitext(resource_value)[0]
    template = {"columns": [{"id": "name", "title": resource_name}, {"id": "counter", "title": "Nr. of times used", "shape": "number"}], "nodes": []}
    if os.path.exists(resource_file):
        with open(resource_file, 'r') as file:
            try:
                json_data = json.load(file)
            except json.JSONDecodeError:
                json_data = template
    else:
        json_data = template

    for node in json_data["nodes"]:
        resource = node["cells"]["name"]["value"]
        if resource == resource_value:
            counter = node["cells"]["counter"]
            oldValue = int(counter["value"])
            counter["value"] += 1
            newValue = int(counter["value"])
            break
    else:
        oldValue = 0
        newValue = 1
        new_id = len(json_data["nodes"])
        json_data["nodes"].append({
            "cells": {
                "name": {"value": resource_value},
                "counter": {"value": 1}
            },
            "id": str(new_id)
        })
    
    os.makedirs(os.path.dirname(resource_file), exist_ok=True)
    with open(resource_file, 'w') as file:
        json.dump(json_data, file, indent=4)
    
    return f"\n**{resource_value}** count: {oldValue} => {newValue}\n"
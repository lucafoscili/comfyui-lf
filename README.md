# LF Nodes

This repository contains custom nodes that I use in my workflow.

## Nodes

### JSON Nodes (`json.py`)

- **DisplayJSON**: Displays JSON data.
- **GetRandomKeyFromJSON**: Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
- **GetValueFromJSON**: Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.
- **LoadLocalJSON**: Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.

### Large Language Model Nodes (`llm.py`)

- **CharacterImpersonator**: Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.

### Loader Nodes (`loaders.py`)

- **LoadImages**: Node used to load multiple images from disk given a directory. Optionally it can fetch images from subdirectories.

### Logic Nodes (`logic.py`)

- **SwitchInteger**: A simple logic node that returns one of two integer values based on a boolean condition. Useful for conditional branching in workflows.

### Workflow Nodes (`workflow.py`)

- **Lora2Prompt**: Converts a prompt and LoRAs to a formatted string.
- **LoraName2Prompt**: Processes a LoRA file name to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
- **SeedGenerator**: Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
- **WorkflowSettings**: Configures various settings for a workflow, including options for randomization, selection criteria, and integration with large language models. This node serves as a central configuration point for complex workflows.

## Installation

- Go to `ComfyUI/custom_nodes` folder
- Open a terminal.
- Copy and Paste this command `git clone https://github.com/lucafoscili/comfyui-lf.git`

## Usage

To use these nodes in ComfyUI, ensure they are properly installed and recognized within your ComfyUI environment. Each node comes with predefined input and output types, which should be connected appropriately within your workflow to achieve the desired functionality.

## Contributing

Contributions to this repository are welcome. Please feel free to submit pull requests or open issues for discussion.

## License

MIT License

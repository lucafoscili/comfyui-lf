# LF Nodes

This repository contains custom nodes that I use in my workflow.

## Nodes

### JSON Nodes (`json.py`)

- **LoadLocalJSON**: Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.
- **GetRandomKeyFromJSON**: Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
- **GetValueFromJSON**: Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.

### Large Language Model Nodes (`llm.py`)

- **CharacterImpersonator**: Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.

### Logic Nodes (`logic.py`)

- **SwitchInteger**: A simple logic node that returns one of two integer values based on a boolean condition. Useful for conditional branching in workflows.

### Workflow Nodes (`workflow.py`)

- **SeedGenerator**: Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
- **WorkflowSettings**: Configures various settings for a workflow, including options for randomization, selection criteria, and integration with large language models. This node serves as a central configuration point for complex workflows.
- **Lora2Prompt**: Converts prompts and LoRAs (Large Object Representations) into a format suitable for processing. It extracts keywords from LoRAs and replaces them in the input text.
- **LoraName2Prompt**: Processes a LoRA file name to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
- **Extract LoRAs and Keywords**: Similar to Lora2Prompt but focuses on extracting LoRAs and their associated keywords from the input text.
- **Process LoRA to Prompt**: Similar to LoraName2Prompt but emphasizes converting LoRA file names into prompts.

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
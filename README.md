# LF Nodes

This repository contains custom nodes that I use in my workflow.
It's just a side project that I'm developing in my free time while I'm waiting for generations to complete!

## Nodes

### Analysis Nodes (`analysis.py`)

- **ImageHistogram**: Displays a widget that plots the RGB channels of a photo in tensor format on a line chart.

### JSON Nodes (`json.py`)

- **DisplayJSON**: Displays JSON data.
- **GetRandomKeyFromJSON**: Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
- **GetValueFromJSON**: Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.
- **LoadLocalJSON**: Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.

### Large Language Model Nodes (`llm.py`)

- **CharacterImpersonator**: Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.
- **ImageClassifier**: Utilizes a large language model to generate descriptions of images portraying characters.

### Loader Nodes (`loaders.py`)

- **LoadImages**: Node used to load multiple images from the disk given a directory. Optionally, it can fetch images from subdirectories.

### Logic Nodes (`logic.py`)

- **SwitchImage**: A simple logic node that returns one of two images in tensor format based on a boolean condition.
- **SwitchInteger**: A simple logic node that returns one of two integer values based on a boolean condition.
- **SwitchJSON**: A simple logic node that returns one of two JSON objects based on a boolean condition.
- **SwitchString**: A simple logic node that returns one of two string values based on a boolean condition.

### Workflow Nodes (`workflow.py`)

- **Lora2Prompt**: Converts a prompt and LoRAs to a formatted string.
- **LoraName2Prompt**: Processes a LoRA file name to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
- **SeedGenerator**: Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
- **WallOfText**: Concatenates up to 10 strings, with the optional toggle to shuffle the order of concatenation.
- **WorkflowSettings**: Configures various settings for a workflow, including options for randomization, selection criteria, and integration with large language models. This node serves as a central configuration point for complex workflows.

## Installation

### Manager

- Open ComfyUI Manager.
- Search LF Nodes.
- Click install.

### Manual

- Go to the `ComfyUI/custom_nodes` folder.
- Open a terminal.
- Copy and Paste this command `git clone https://github.com/lucafoscili/comfyui-lf.git`.

## Contributing

Contributions to this repository are welcome, feel free to submit pull requests or open issues for discussion!

## License

MIT License

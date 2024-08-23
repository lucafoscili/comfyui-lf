# LF Nodes

This repository contains custom nodes that I use in my workflow.
It's just a side project that I'm developing in my free time while I'm waiting for generations to complete!
There is a big JS bundled coming from another side-project of mine, [a webcomponents library](https://github.com/lucafoscili/ketchup-lite) that I'm going to use to add custom widgets to the nodes.

## Nodes

### Analysis Nodes (`analysis.py`)

- **ImageHistogram**: Displays a widget that plots the RGB channels of a photo in tensor format on a line chart.
  
![ImageHistogram](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/ImageHistogram.png "Displays the RGB channels of an image")

### Conversions Nodes (`conversions.py`)

- **Lora2Prompt**: Converts a prompt and LoRAs to a formatted string.
- **LoraTag2Prompt**: Processes a LoRA tag to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
- **SequentialSeedsGenerator**: Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
- **WallOfText**: Concatenates up to 10 strings, with the optional toggle to shuffle the order of concatenation.

![Lora2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/Lora2Prompt.png "Extracts keywords from LoRA filenames")

![PromptLora2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/PromptLora2Prompt.png "Splits LoRA tags from a prompt, extracting keywords in their place")

![SequentialSeedsGenerator](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/SequentialSeedGenerator.png "Massive seed generator")

![WallOfText](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/WallOfText.png "Massive string concat")

### JSON Nodes (`json.py`)

- **DisplayJSON**: Displays JSON data.
- **GetRandomKeyFromJSON**: Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
- **GetValueFromJSON**: Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.
- **LoadLocalJSON**: Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.

![DisplayJSON](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/DisplayJSON.png "Displays JSON data")

![LoadLocalJSON_GetRandomKeyFromJSON_DisplayJSON](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/LoadLocalJSON_GetRandomKeyFromJSON_DisplayJSON.png "Demonstrates loading local JSON and displaying it")

### Large Language Model Nodes (`llm.py`)

- **CharacterImpersonator**: Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.
- **ImageClassifier**: Utilizes a large language model to generate descriptions of images portraying characters.

![CharacterImpersonator](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/CharacterLLM.png "Talking with Cleopatra")

![ImageClassifier](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/ImageClassifier.png "Describe images")

### Loader Nodes (`loaders.py`)

- **LoadImages**: Node used to load multiple images from the disk given a directory. Optionally, it can fetch images from subdirectories.

![LoadImages](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/LoadImages.png "Loads base64 previews and displays filename on hover")

### Logic Nodes (`logic.py`)

- **SwitchImage**: A simple logic node that returns one of two images in tensor format based on a boolean condition.
- **SwitchInteger**: A simple logic node that returns one of two integer values based on a boolean condition.
- **SwitchJSON**: A simple logic node that returns one of two JSON objects based on a boolean condition.
- **SwitchString**: A simple logic node that returns one of two string values based on a boolean condition.

![SwitchImage](https://github.com/lucafoscili/comfyui-lf/blob/792f573544096949c8123939d77006f5bfb00216/docs/images/SwitchImage.png "Displays a text showing whether the boolean is true or not")

## Installation

### Manager

- Open ComfyUI Manager.
- Search LF Nodes.
- Click install.

### Manual

- Go to the `ComfyUI/custom_nodes` folder.
- Open a terminal.
- Copy and paste this command `git clone https://github.com/lucafoscili/comfyui-lf.git`.

## Notes

The LLM node is designed to work with [Koboldcpp](https://github.com/LostRuins/koboldcpp/tree/v1.73).
The model used in the workflows samples is [UCLA-AGI/Llama-3-Instruct-8B-SPPO-Iter3](https://huggingface.co/UCLA-AGI/Llama-3-Instruct-8B-SPPO-Iter3) with [ChaoticNeutrals/LLaVA-Llama-3-8B-mmproj-Updated](https://huggingface.co/ChaoticNeutrals/LLaVA-Llama-3-8B-mmproj-Updated).

## Contributing

Contributions to this repository are welcome, feel free to submit pull requests or open issues for discussion!

## License

MIT License

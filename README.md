# LF Custom Nodes for ComfyUI

![LFNodes](https://github.com/lucafoscili/comfyui-lf/blob/a7ef3c6e62c266b9f09f2f843e8f8590663f6bb6/docs/images/LFNodes.png "LF Nodes for ComfyUI")

This repository contains custom nodes that I use in my workflow.
It's just a side project that I'm developing in my free time while I'm waiting for generations to complete!
There is a big JS bundled coming from another side-project of mine, [a webcomponents library](https://github.com/lucafoscili/ketchup-lite) that I'm going to use to add custom widgets to the nodes.

## Nodes

### Analysis nodes (`analysis.py`)

#### ImageHistogram

Displays a widget that plots the RGB channels of a photo in tensor format on a line chart.
![ImageHistogram](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageHistogram.png "Displays the RGB channels of an image")

### Conversions nodes (`conversions.py`)

#### BlurImages

Applies the gaussian blur filter to a list of images and edits the filename of each image by adding the '_Blur' suffix.
![Blurimages](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/BlurImages.png "Applies the gaussian blur filter to a list of images")

#### ImageResizeByEdge

Resizes an image in tensor format's longest or shortest edge to the specified size.
![ImageResizeByEdge](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageResizeByEdge.png "Resizes an image in tensor format's longest or shortest edge to the specified size")

#### Lora2Prompt

Converts a prompt and LoRAs to a formatted string.
![Lora2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Lora2Prompt.png "Extracts keywords from LoRA filenames")

#### LoraTag2Prompt

Processes a LoRA tag to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
![LoraTag2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoraTag2Prompt.png "Splits LoRA tags from a prompt, extracting keywords in their place")

#### MultipleImageResizeForWeb

The node takes a list of images as input and generates eight additional images, each resized to common web resolutions (256px, 320px, 512px, 640px, 1024px, 1280px, 2048px, 2560px) along the longest edge.
![MultipleImageResizeForWeb](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/MultipleImageResizeForWeb.png "The node takes a list of images as input and generates eight additional images, each resized to common web resolutions (256px, 320px, 512px, 640px, 1024px, 1280px, 2048px, 2560px) along the longest edge")

#### SequentialSeedsGenerator

Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
![SequentialSeedsGenerator](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SequentialSeedGenerator.png "Massive seed generator")

#### Something2Number

Converts multiple inputs to integers and floats, handling nested structures and mixed types. If multiple numbers are sent to the node, they are summed.
![Something2Number](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Something2Number.png "Converts multiple inputs to integers and floats, handling nested structures and mixed types. If multiple numbers are sent to the node, they are summed")

#### Something2String

Converts multiple inputs to strings, handling nested structures and mixed types.
![Something2String](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Something2String.png "Converts multiple inputs to strings, handling nested structures and mixed types")

#### WallOfText

Concatenates up to 10 strings, with the optional toggle to shuffle the order of concatenation.
![WallOfText](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/WallOfText.png "Massive string concat")

### JSON nodes (`json.py`)

#### DisplayJSON

Displays JSON data with a handy button to copy the content.
![DisplayJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/DisplayJSON.png "Displays JSON data")

#### GetRandomKeyFromJSON

Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
![GetRandomKeyFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/GetRandomKeyFromJSON.png "Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data")

#### GetValueFromJSON

Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.
![GetValueFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/GetValueFromJSON.png "Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans")

#### LoadLocalJSON

Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.
![LoadLocalJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoadLocalJSON.png "Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows")

#### WriteJSON

A simple text area that lets the user input a JSON file which will be validated when the workflow is queued. Each 2500ms the text is formatted, if there is an error it will be displayed in the title of the textarea (visible on mouseover).

![WriteJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/WriteJSON.png "A simple text area that lets the user input a JSON file which will be validated when the workflow is queued. Each 2500ms the text is formatted, if there is an error it will be displayed in the title of the textarea (visible on mouseover)")

### Large Language Model nodes (`llm.py`)

#### CharacterImpersonator

Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.
![CharacterImpersonator](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/CharacterImpersonator.png "Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits")

#### ImageClassifier

Utilizes a large language model to generate descriptions of images portraying characters.
![ImageClassifier](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageClassifier.png "Describe images")

### Loader nodes (`loaders.py`)

#### LoadImages

Node used to load multiple images from the disk given a directory. Optionally, it can fetch images from subdirectories.
![LoadImages](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoadImages.png "Loads base64 previews and displays filename on hover")

### Logic nodes (`logic.py`)

#### SwitchImage

Returns one of two images in tensor format based on a boolean condition.
![SwitchImage](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchImage.png "Returns one of two images in tensor format based on a boolean condition")

#### SwitchInteger

Returns one of two integer values based on a boolean condition.
![SwitchInteger](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchInteger.png "Returns one of two integer values based on a boolean condition")

#### SwitchJSON

Returns one of two JSON objects based on a boolean condition.
![SwitchJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchJSON.png "Returns one of two JSON objects based on a boolean condition")

#### SwitchString

Returns one of two string values based on a boolean condition.
![SwitchString](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchString.png "Returns one of two string values based on a boolean condition.")

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

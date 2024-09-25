# LF Custom Nodes for ComfyUI

![LFNodes](https://github.com/lucafoscili/comfyui-lf/blob/a7ef3c6e62c266b9f09f2f843e8f8590663f6bb6/docs/images/LFNodes.png "Screenshot showcasing LF Nodes for the ComfyUI workflow")

This repository contains custom nodes that I use in my workflow.
It's just a side project that I'm developing in my free time while I'm waiting for generations to complete!
There is a big JS bundled coming from another side-project of mine, [a webcomponents library](https://github.com/lucafoscili/ketchup-lite) that I'm going to use to add custom widgets to the nodes.

## Nodes

### Analysis nodes (`analysis.py`)

#### ImageHistogram

Displays a widget that plots the RGB channels of a photo in tensor format on a line chart.
![ImageHistogram](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageHistogram.png "Screenshot of RGB histogram plotted by the node")

#### KeywordCounter

Counts the number of each keyword in a prompt and displays a bar chart showing their distribution, a chip-shaped widget will also allow to copy one or more keywords in the clipboard.
![KeywordCounter](https://github.com/lucafoscili/comfyui-lf/blob/20764344d55b6e361af11d14298fc826b37eae2d/docs/images/KeywordCounter.png "Keywords displayed with a widget for copying them")

### Configuration nodes (`configuration.py`)

#### CivitAIMetadataSetup

Allows to setup and generate [CivitAI](https://civitai.com)-compatible metadata information usable in the node SaveImageForCivitAI.
![CivitAIMetadataSetup](https://github.com/lucafoscili/comfyui-lf/blob/273b908521957c51c655be8203efc4819bcf1e81/docs/images/CivitAIMetadataSetup.png "The metadata string will be displayed below the settings")

#### ControlPanel

Includes a switch that enables verbose debug logs in the browser's console and a button that allows to change the theme of Ketchup Lite webcomponents.
![ControlPanel](https://github.com/lucafoscili/comfyui-lf/blob/ab8e1230892452d989a022076e26fa512277c5e2/docs/images/ControlPanel.png "List of the available themes")

### Conversions nodes (`conversions.py`)

#### BlurImages

Applies the gaussian blur filter to a list of images and edits the filename of each image by adding the '_Blur' suffix.
![Blurimages](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/BlurImages.png "Screenshot of the list of images processed with Gaussian blur")

#### Extractor

Extracts text enclosed by a starting and ending delimiter.
![Extractor](https://github.com/lucafoscili/comfyui-lf/blob/713db4caae57bf6ac9c4b14633bc21734667c42a/docs/images/Extractor.png "Extraction")

#### Lora2Prompt

Converts a prompt and LoRAs to a formatted string.
![Lora2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Lora2Prompt.png "Screenshot showing how Lora2Prompt converts LoRA and prompts to strings")

#### LoraTag2Prompt

Processes a LoRA tag to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
![LoraTag2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoraTag2Prompt.png "Interface of LoraTag2Prompt node splitting LoRA tags to extract keywords")

#### MultipleImageResizeForWeb

The node takes a list of images as input and generates eight additional images, each resized to common web resolutions (256px, 320px, 512px, 640px, 1024px, 1280px, 2048px, 2560px) along the longest edge.
![MultipleImageResizeForWeb](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/MultipleImageResizeForWeb.png "Batch resize GUI showing multiple common web resolutions")

#### ResizeImageByEdge

Resizes one or more images in tensor format's longest or shortest edge to the specified size.
![ResizeImageByEdge](https://github.com/lucafoscili/comfyui-lf/blob/9ff43a168d56a4ba7174f0a69365d6226686e26e/docs/images/ResizeImageByEdge.png "Interface of image resizing node showing edge selection")

#### ResizeImageToSquare

Resizes one or more images in tensor format to fit a square (by cropping when the image is rectangular).
![ResizeImageToSquare](https://github.com/lucafoscili/comfyui-lf/blob/f146784989b4511a10dfc5e4be1eeb5fa1d93ae1/docs/images/ResizeImageToSquare.png "Interface of image resizing node to square")

#### Something2Number

Converts multiple inputs to integers and floats, handling nested structures and mixed types. If multiple numbers are sent to the node, they are summed.
![Something2Number](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Something2Number.png "Interface example of how inputs are converted to numbers")

#### Something2String

Converts multiple inputs to strings, handling nested structures and mixed types.
![Something2String](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Something2String.png "Example of results where various structures are converted to strings")

#### WallOfText

Concatenates up to 10 strings, with the optional toggle to shuffle the order of concatenation.
![WallOfText](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/WallOfText.png "Output example of concatenated text sequences")

### IO Operations nodes (`io.py`)

#### LoadFileOnce

Loads a file from a directory and then saves the name to the history. Files present in the history are skipped.
![LoadFileOnce](https://github.com/lucafoscili/comfyui-lf/blob/713db4caae57bf6ac9c4b14633bc21734667c42a/docs/images/LoadFileOnce.png "Load the content of the directory only once")

#### LoadImages

Node used to load multiple images from the disk given a directory. Optionally, it can fetch images from subdirectories.
![LoadImages](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoadImages.png "Node interface showing disk-based image loading with optional subdirectory fetching")

#### LoadMetadata

Enables uploading files to the input directory of ComfyUI, then on the workflow's execution the metadata will be extracted from the files included in the uploading process.
![LoadMetadata](https://github.com/lucafoscili/comfyui-lf/blob/273b908521957c51c655be8203efc4819bcf1e81/docs/images/LoadMetadata.png "Uploaded files with their metadata.")

#### SaveImageForCivitAI

Saves images with [CivitAI](https://civitai.com)-compatible metadata generated by the node CivitAIMetadataSetup.
![SaveImageForCivitAI](https://github.com/lucafoscili/comfyui-lf/blob/273b908521957c51c655be8203efc4819bcf1e81/docs/images/SaveImageForCivitAI.png "Images will be displayed as Base64 encoded previews.")

#### SaveJSON

Saves a JSON file at the specified path.
![SaveJSON](https://github.com/lucafoscili/comfyui-lf/blob/b21290182b780330c9d35d6dac0a617237311e4c/docs/images/SaveJSON.png "SaveJSON node.")

### JSON nodes (`json.py`)

#### DisplayJSON

Displays JSON data with a handy button to copy the content.
![DisplayJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/DisplayJSON.png "Interface helping to visualize JSON and copy data")

#### GetRandomKeyFromJSON

Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
![GetRandomKeyFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/GetRandomKeyFromJSON.png "Node UI to randomly extract keys from a JSON object")

#### GetValueFromJSON

Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.
![GetValueFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/GetValueFromJSON.png "Interface displaying node to retrieve specific JSON values")

#### ImageListFromJSON

Creates a list of images with the number set by the number of keys inside the input JSON. It also outputs the list of keys themselves.
![ImageListFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/89937003edcebb4941e18af64eee08941bf9e5db/docs/images/ImageListFromJSON.png "Node UI to randomly extract keys from a JSON object")

#### KeywordToggleFromJSON

Allows the selection of keywords received from a Ketchup Lite compatible JSON dataset. Values are refreshed every time the input changes.
![KeywordToggleFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/f146784989b4511a10dfc5e4be1eeb5fa1d93ae1/docs/images/KeywordToggleFromJSON.png "Keywords toggled with a chip set")

#### LoadLocalJSON

Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.
![LoadLocalJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoadLocalJSON.png "Interface showing local JSON load functionality")

#### SetValueInJSON

Sets a new key or updates an existing one with a new value.
![SetValueInJSON](https://github.com/lucafoscili/comfyui-lf/blob/460888f68f9568b05d390add9733dc480ee0950f/docs/images/SetValueInJSON.png "JSON updated with the new value")

#### StringToJSON

Converts a string to a JSON object.
![StringToJSON](https://github.com/lucafoscili/comfyui-lf/blob/460888f68f9568b05d390add9733dc480ee0950f/docs/images/StringToJSON.png "JSON output from a string")

#### WriteJSON

A simple text area that lets the user input a JSON file which will be validated when the workflow is queued. Each 2500ms the text is formatted, if there is an error it will be displayed in the title of the textarea (visible on mouseover).

![WriteJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/WriteJSON.png "Text area for direct JSON input and validation")

### Large Language Model nodes (`llm.py`)

#### CharacterImpersonator

Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.
![CharacterImpersonator](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/CharacterImpersonator.png "Sample interaction simulating character impersonation based on a biography")

#### ImageClassifier

Utilizes a large language model to generate descriptions of images portraying characters.
![ImageClassifier](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageClassifier.png "Example classification output describing an image character")

#### LLMChat

Real-time chat with an LLM model served through Koboldcpp (<http://localhost:5001>).
It's possible to select the last messages as an output, sending them to the next node.
![LLMChat](https://github.com/lucafoscili/comfyui-lf/blob/69181cfe1c3b2062a40035e8b59cece8e8688483/docs/images/LLMChat.png "Example of LLM chat")

#### LLMMessenger

A user interface capable of loading characters through a Ketchup Lite-compatible JSON and then connects to your local Koboldcpp instance (<http://localhost:5001>).
The location, outfit and timeframe options are included in the system prompt to give more context to the LLM.
Together with the biography, they define the identity of the LLM.
![LLMMessenger](https://github.com/lucafoscili/comfyui-lf/blob/fd52deb44d199e222833fbc159628aceeac48ab9/docs/images/LLMMessenger.png "Example of chat with Freya")

### Logic nodes (`logic.py`)

#### ResolutionSwitcher

Selects a random resolution between portrait and landscape orientations. The chances for landscape to occur can be set with a percentage.
![ResolutionSwitcher](https://github.com/lucafoscili/comfyui-lf/blob/5882f6809e687b4296719e376db34482dd8fd840/docs/images/ResolutionSwitcher.png "Resolution was set to landscape")

#### SwitchFloat

Returns one of two float values depending on a boolean condition.
![SwitchFloat](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/SwitchFloat.png "Choose between two float values based on a boolean condition")

#### SwitchImage

Returns one of two images in tensor format based on a boolean condition.
![SwitchImage](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchImage.png "Switch between two images in tensor format based on a boolean condition")

#### SwitchInteger

Returns one of two integer values depending on a boolean condition.
![SwitchInteger](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchInteger.png "Choose between two integer values based on a boolean condition")

#### SwitchJSON

Returns one of two JSON objects depending on a boolean condition.
![SwitchJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchJSON.png "Conditionally select between two JSON objects using a boolean condition")

#### SwitchString

Returns one of two string values based on a boolean condition.
![SwitchString](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchString.png "Dynamically choose between two string values based on a boolean condition.")

### Primitive nodes (`primitives.py`)

#### Boolean

Used to select a boolean. It keeps record of old values, displaying a clickable list below the widget.
![Boolean](https://github.com/lucafoscili/comfyui-lf/blob/7deb085a3649ec873435cb092308c4e7a01cefe9/docs/images/Boolean.png "Boolean node with history")

#### DisplayBoolean

Displays the value of a boolean in a widget.
![DisplayBoolean](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/DisplayBoolean.png "Boolean value displayed")

#### DisplayFloat

Displays the value of a float in a widget.
![DisplayFloat](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/DisplayFloat.png "Float value displayed")

#### DisplayInteger

Displays the value of a integer in a widget.
![DisplayInteger](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/DisplayInteger.png "Integer value displayed")

#### DisplayPrimitiveAsJSON

Displays different primitive values as a JSON output or directly in-widget through a tree-like view.
![DisplayPrimitiveAsJSON](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/DisplayPrimitiveAsJSON.png "Primitive values displayed as JSON")

#### DisplayString

Displays the value of a string in a widget.
![DisplayString](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/DisplayString.png "String value displayed")

#### Float

Used to select a float. It keeps record of old values, displaying a clickable list below the widget.
![Float](https://github.com/lucafoscili/comfyui-lf/blob/7deb085a3649ec873435cb092308c4e7a01cefe9/docs/images/Float.png "Float node with history")

#### Integer

Used to select an integer. It keeps record of old values, displaying a clickable list below the widget.
![Integer](https://github.com/lucafoscili/comfyui-lf/blob/460888f68f9568b05d390add9733dc480ee0950f/docs/images/Integer.png "Integer node with history")

#### String

Used to select a string. It keeps record of old prompts, displaying a clickable list below the textarea.
![String](https://github.com/lucafoscili/comfyui-lf/blob/22813956c616ec89b97b53411a0fc77dedef747b/docs/images/String.png "String node with history")

#### RandomBoolean

Outputs False or True depending on the chances specified by the percentage widget. 0 always false, 100 always true.
![RandomBoolean](https://github.com/lucafoscili/comfyui-lf/blob/d45405d1e87b73b6bf7f42f8827aecf1ababc582/docs/images/RandomBoolean.png "20% chance to return True")

### Seed generation nodes (`seeds.py`)

#### SequentialSeedsGenerator

Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
![SequentialSeedsGenerator](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SequentialSeedGenerator.png "Visualization of the generated seed series for sequences")

#### UrandomSeedGenerator

Generates up to 20 different seeds through the use of the Python urandom function which leverages CPU generated entropy for increased randomness.
![UrandomSeedGenerator](https://github.com/lucafoscili/comfyui-lf/blob/7deb085a3649ec873435cb092308c4e7a01cefe9/docs/images/UrandomSeedGenerator.png "Random seeds with history enabled")

## Installation

### Manager

- Open ComfyUI Manager.
- Search LF Nodes.
- Install the node suite and restart ComfyUI.

### Manual

- Go to the `ComfyUI/custom_nodes` folder.
- Open a terminal.
- Copy and paste this command `git clone https://github.com/lucafoscili/comfyui-lf.git`.

## Notes

The LLM nodes are designed to work with [Koboldcpp](https://github.com/LostRuins/koboldcpp/tree/v1.73).
The model used in the workflows samples is [UCLA-AGI/Llama-3-Instruct-8B-SPPO-Iter3](https://huggingface.co/UCLA-AGI/Llama-3-Instruct-8B-SPPO-Iter3) with [ChaoticNeutrals/LLaVA-Llama-3-8B-mmproj-Updated](https://huggingface.co/ChaoticNeutrals/LLaVA-Llama-3-8B-mmproj-Updated).

## Contributing

Contributions to this repository are welcome, feel free to submit pull requests or open issues for discussion!
To setup the environment clone this repository, then from the root open a terminal and run the command

`pip install -r requirements.txt`

This will install all the required dependencies for the Python back-end.

`npm run setup`

This command will install all the frontend dependencies.
Note that the repository includes the compiled files directly to allow Comfy to load them, dependencies are only needed for actual development.

`npm run build`

This command will compile all the frontend sources and generate/refresh the actual web directory.

## License

MIT License

<!-- markdownlint-disable MD033 -->
# LF Nodes for ComfyUI

<div align="center">

![LF Nodes](https://img.shields.io/badge/dynamic/json?logo=python&logoColor=black&labelColor=white&color=black&label=Nodes&query=nodes&url=https://raw.githubusercontent.com/lucafoscili/comfyui-lf/master/count.json)

</div>

<div align="center">

![LFNodes](https://github.com/lucafoscili/comfyui-lf/blob/780ac30dd51350ba4ec7d5e0a5af39edd350b61d/docs/images/LFNodes.png "LF Nodes logo")

</div>

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/lucafoscili/comfyui-lf?logo=github&logoColor=black&labelColor=white&color=black)

</div>

## Overview

A suite of custom nodes for [ComfyUI](https://github.com/comfyanonymous/ComfyUI) aimed at enhancing user experience with more interactive and visually engaging widgets.

Whether you're after quality-of-life improvements or specific functionalities, this collection has something for everyone.

Most UI elements used by the widgets come from the  [Ketchup Lite web components library](https://github.com/lucafoscili/ketchup-lite).

![LoRA tester workflow](https://github.com/lucafoscili/comfyui-lf/blob/0b438784ecce5bb2a3bde66cf3029d91ced61911/docs/images/Screenshot%202024-11-01%20204059.png "Screenshot taken from the LoRA tester workflow")

## What kind of nodes does it offer?

That's a tough one—the nodes span quite a few categories. Here's a quick breakdown:

- **Analytics nodes**: Visualize and track data, like checkpoint/LoRA usage or image histograms.
- **Configuration nodes**: Manage CivitAI metadata, and control the suite via the Control Panel.
- **Image manipulation nodes**: Tools to manipulate images, such as filter and resize nodes.
- **IO Operations nodes**: Load and save files to/from the file system.
- **JSON nodes**: Tools to manipulate and display JSON data.
- **LLM nodes**: Interface with locally running LLMs, like the Messenger node, which also manages characters.
- **Logic nodes**: Control flow using simple switches.
- **Primitive nodes**: Work with primitive data types, offering features like history.
- **Seed generation nodes**: Generate seeds for complex workflows.
- **Selector nodes**: Resource selection widgets with metadata display for models.
  
![CICD](https://github.com/lucafoscili/comfyui-lf/blob/0b438784ecce5bb2a3bde66cf3029d91ced61911/docs/images/Screenshot%202024-11-01%20195600.png "Screenshot taken from the C.I. workflow")

## Table of Contents

- [LF Nodes for ComfyUI](#lf-nodes-for-comfyui)
  - [Overview](#overview)
  - [What kind of nodes does it offer?](#what-kind-of-nodes-does-it-offer)
  - [Table of Contents](#table-of-contents)
  - [Analytics nodes (`analytics.py`)](#analytics-nodes-analyticspy)
    - [ImageHistogram](#imagehistogram)
    - [KeywordCounter](#keywordcounter)
    - [UpdateUsageStatistics](#updateusagestatistics)
    - [UsageStatistics](#usagestatistics)
  - [Configuration nodes (`configuration.py`)](#configuration-nodes-configurationpy)
    - [CivitAIMetadataSetup](#civitaimetadatasetup)
    - [ControlPanel](#controlpanel)
    - [LoadLoraTags](#loadloratags)
    - [Lora2Prompt](#lora2prompt)
    - [LoraTag2Prompt](#loratag2prompt)
    - [Notify](#notify)
  - [Image manipulation nodes (`image.py`)](#image-manipulation-nodes-imagepy)
    - [BlurImages](#blurimages)
    - [ClarityEffect](#clarityeffect)
    - [MultipleImageResizeForWeb](#multipleimageresizeforweb)
    - [ResizeImageByEdge](#resizeimagebyedge)
    - [ResizeImageToDimension](#resizeimagetodimension)
    - [ResizeImageToSquare](#resizeimagetosquare)
  - [IO Operations nodes (`io.py`)](#io-operations-nodes-iopy)
    - [LoadFileOnce](#loadfileonce)
    - [LoadImages](#loadimages)
    - [LoadMetadata](#loadmetadata)
    - [SaveImageForCivitAI](#saveimageforcivitai)
    - [SaveJSON](#savejson)
  - [JSON nodes (`json.py`)](#json-nodes-jsonpy)
    - [DisplayJSON](#displayjson)
    - [GetRandomKeyFromJSON](#getrandomkeyfromjson)
    - [GetValueFromJSON](#getvaluefromjson)
    - [ImageListFromJSON](#imagelistfromjson)
    - [KeywordToggleFromJSON](#keywordtogglefromjson)
    - [LoadLocalJSON](#loadlocaljson)
    - [SetValueInJSON](#setvalueinjson)
    - [ShuffleJSONKeys](#shufflejsonkeys)
    - [SortJSONKeys](#sortjsonkeys)
    - [StringToJSON](#stringtojson)
    - [WriteJSON](#writejson)
  - [Large Language Model nodes (`llm.py`)](#large-language-model-nodes-llmpy)
    - [CharacterImpersonator](#characterimpersonator)
    - [ImageClassifier](#imageclassifier)
    - [LLMChat](#llmchat)
    - [LLMMessenger](#llmmessenger)
  - [Logic nodes (`logic.py`)](#logic-nodes-logicpy)
    - [MathOperation](#mathoperation)
    - [ResolutionSwitcher](#resolutionswitcher)
    - [SwitchFloat](#switchfloat)
    - [SwitchImage](#switchimage)
    - [SwitchInteger](#switchinteger)
    - [SwitchJSON](#switchjson)
    - [SwitchString](#switchstring)
  - [Primitive nodes (`primitives.py`)](#primitive-nodes-primitivespy)
    - [Boolean](#boolean)
    - [DisplayBoolean](#displayboolean)
    - [DisplayFloat](#displayfloat)
    - [DisplayInteger](#displayinteger)
    - [DisplayPrimitiveAsJSON](#displayprimitiveasjson)
    - [DisplayString](#displaystring)
    - [Extractor](#extractor)
    - [Float](#float)
    - [Integer](#integer)
    - [RandomBoolean](#randomboolean)
    - [Something2Number](#something2number)
    - [Something2String](#something2string)
    - [String](#string)
    - [WallOfText](#walloftext)
  - [Seed generation nodes (`seeds.py`)](#seed-generation-nodes-seedspy)
    - [SequentialSeedsGenerator](#sequentialseedsgenerator)
    - [UrandomSeedGenerator](#urandomseedgenerator)
  - [Selector nodes (`selectors.py`)](#selector-nodes-selectorspy)
    - [CheckpointSelector](#checkpointselector)
    - [EmbeddingSelector](#embeddingselector)
    - [LoraSelector](#loraselector)
    - [LoraAndEmbeddingSelector](#loraandembeddingselector)
    - [SamplerSelector](#samplerselector)
    - [SchedulerSelector](#schedulerselector)
    - [UpscaleModelSelector](#upscalemodelselector)
    - [VAESelector](#vaeselector)
  - [Installation](#installation)
    - [Using ComfyUI Manager](#using-comfyui-manager)
    - [Manual](#manual)
  - [Notes](#notes)
  - [Contributing](#contributing)
  - [License](#license)

## Analytics nodes (`analytics.py`)

### ImageHistogram

Displays a widget that plots the RGB channels of a photo in tensor format on a line chart.
![ImageHistogram](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageHistogram.png "Screenshot of RGB histogram plotted by the node")

### KeywordCounter

Counts the number of each keyword in a prompt and displays a bar chart showing their distribution, a chip-shaped widget will also allow to copy one or more keywords in the clipboard.
![KeywordCounter](https://github.com/lucafoscili/comfyui-lf/blob/20764344d55b6e361af11d14298fc826b37eae2d/docs/images/KeywordCounter.png "Keywords displayed with a widget for copying them")

### UpdateUsageStatistics

Keep tracks of the resources used by saving datasets in the input folder of ComfyUI. The datasets will be plotted on area/scatter charts inside the twin node UsageStatistics.
![UpdateUsageStatistics](https://github.com/lucafoscili/comfyui-lf/blob/de49b4964ecc55c32438cc829928d90b9b5a8346/docs/images/UpdateUsageStatistics.png "Keeps track of resources' usage")

### UsageStatistics

Displays datasets tracking the usage of resources saved with the UpdateUsageStatistics node.
![UsageStatistics](https://github.com/lucafoscili/comfyui-lf/blob/72d54488d179be2f345b84f526956c730f191663/docs/images/UsageStatistics.png "Plots the usage of resources")

## Configuration nodes (`configuration.py`)

### CivitAIMetadataSetup

Allows to setup and generate [CivitAI](https://civitai.com)-compatible metadata information usable in the node SaveImageForCivitAI.
![CivitAIMetadataSetup](https://github.com/lucafoscili/comfyui-lf/blob/273b908521957c51c655be8203efc4819bcf1e81/docs/images/CivitAIMetadataSetup.png "The metadata string will be displayed below the settings")

### ControlPanel

Utilities to debug nodes and to change the theme of Ketchup Lite webcomponents.
![ControlPanel](https://github.com/lucafoscili/comfyui-lf/blob/6d4cf455b031a8ffae96ba322689dd3853004495/docs/images/ControlPanel.png "Utilities included in the control panel")

### LoadLoraTags

LoRA models are loaded in tag format, with a status widget displayed at the bottom indicating the loading progress.
![LoadLoraTags](https://github.com/lucafoscili/comfyui-lf/blob/947e736fd6505b9de5b89a5a85ef86d528eae644/docs/images/LoadLoraTags.png "Loaded LoRA tags")

### Lora2Prompt

Converts a prompt and LoRAs to a formatted string.
![Lora2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Lora2Prompt.png "Screenshot showing how Lora2Prompt converts LoRA and prompts to strings")

### LoraTag2Prompt

Processes a LoRA tag to extract keywords and count them. This node is useful for preparing prompts based on LoRA file names.
![LoraTag2Prompt](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoraTag2Prompt.png "Interface of LoraTag2Prompt node splitting LoRA tags to extract keywords")

### Notify

Triggers a browser notification when executed. Optionally, when clicked, it can queue a new prompt or focus the workflow's tab.
![Notify](https://github.com/lucafoscili/comfyui-lf/blob/8f648bf3e9380bb410125d3e04a71baaf7d99ccf/docs/images/Notify.png "Simple notification example")

## Image manipulation nodes (`image.py`)

### BlurImages

Applies the gaussian blur filter to a list of images and edits the filename of each image by adding the '_Blur' suffix.
![Blurimages](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/BlurImages.png "Screenshot of the list of images processed with Gaussian blur")

### ClarityEffect

Applies a filter mimicking the clarity effect of Lightroom and Camera Raw.
![ClarityEffect](https://github.com/lucafoscili/comfyui-lf/blob/6b74811c1b96259cca53cb96882fc1f9f55e5337/docs/images/ClarityEffect.png "Enhanced clarity")

### MultipleImageResizeForWeb

The node takes a list of images as input and generates eight additional images, each resized to common web resolutions (256px, 320px, 512px, 640px, 1024px, 1280px, 2048px, 2560px) along the longest edge.
![MultipleImageResizeForWeb](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/MultipleImageResizeForWeb.png "Batch resize GUI showing multiple common web resolutions")

### ResizeImageByEdge

Resizes one or more images in tensor format's longest or shortest edge to the specified size.
![ResizeImageByEdge](https://github.com/lucafoscili/comfyui-lf/blob/9ff43a168d56a4ba7174f0a69365d6226686e26e/docs/images/ResizeImageByEdge.png "Interface of image resizing node showing edge selection")

### ResizeImageToDimension

Resizes an image to the longest dimension and then crops it/pads it to fit the canvas.
![ResizeImageToDimension](https://github.com/lucafoscili/comfyui-lf/blob/84e5b7c3fe90ec17ef4902738102dc45e963d1b2/docs/images/ResizeImageToDimension.png "Image resized and cropped/padded")

### ResizeImageToSquare

Resizes one or more images in tensor format to fit a square (by cropping when the image is rectangular).
![ResizeImageToSquare](https://github.com/lucafoscili/comfyui-lf/blob/f146784989b4511a10dfc5e4be1eeb5fa1d93ae1/docs/images/ResizeImageToSquare.png "Interface of image resizing node to square")

## IO Operations nodes (`io.py`)

### LoadFileOnce

Loads a file from a directory and then saves the name to the history. Files present in the history are skipped.
![LoadFileOnce](https://github.com/lucafoscili/comfyui-lf/blob/713db4caae57bf6ac9c4b14633bc21734667c42a/docs/images/LoadFileOnce.png "Load the content of the directory only once")

### LoadImages

Node used to load multiple images from the disk given a directory. Optionally, it can fetch images from subdirectories.
![LoadImages](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoadImages.png "Node interface showing disk-based image loading with optional subdirectory fetching")

### LoadMetadata

Enables uploading files to the input directory of ComfyUI, then on the workflow's execution the metadata will be extracted from the files included in the uploading process.
![LoadMetadata](https://github.com/lucafoscili/comfyui-lf/blob/273b908521957c51c655be8203efc4819bcf1e81/docs/images/LoadMetadata.png "Uploaded files with their metadata.")

### SaveImageForCivitAI

Saves images with [CivitAI](https://civitai.com)-compatible metadata generated by the node CivitAIMetadataSetup.
![SaveImageForCivitAI](https://github.com/lucafoscili/comfyui-lf/blob/273b908521957c51c655be8203efc4819bcf1e81/docs/images/SaveImageForCivitAI.png "Images will be displayed as Base64 encoded previews.")

### SaveJSON

Saves a JSON file at the specified path.
![SaveJSON](https://github.com/lucafoscili/comfyui-lf/blob/b21290182b780330c9d35d6dac0a617237311e4c/docs/images/SaveJSON.png "SaveJSON node.")

## JSON nodes (`json.py`)

### DisplayJSON

Displays JSON data with a handy button to copy the content.
![DisplayJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/DisplayJSON.png "Interface helping to visualize JSON and copy data")

### GetRandomKeyFromJSON

Extracts a random key from a given JSON object. This can be used to introduce variability or select random elements from JSON data.
![GetRandomKeyFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/GetRandomKeyFromJSON.png "Node UI to randomly extract keys from a JSON object")

### GetValueFromJSON

Extracts a specific value from a JSON object based on a provided key. This node supports extracting various types of values including JSON objects, strings, numbers, integers, floats, and booleans.
![GetValueFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/GetValueFromJSON.png "Interface displaying node to retrieve specific JSON values")

### ImageListFromJSON

Creates a list of images with the number set by the number of keys inside the input JSON. It also outputs the list of keys themselves.
![ImageListFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/89937003edcebb4941e18af64eee08941bf9e5db/docs/images/ImageListFromJSON.png "Node UI to randomly extract keys from a JSON object")

### KeywordToggleFromJSON

Allows the selection of keywords received from a Ketchup Lite compatible JSON dataset. Values are refreshed every time the input changes.
![KeywordToggleFromJSON](https://github.com/lucafoscili/comfyui-lf/blob/f146784989b4511a10dfc5e4be1eeb5fa1d93ae1/docs/images/KeywordToggleFromJSON.png "Keywords toggled with a chip set")

### LoadLocalJSON

Loads JSON data from a local file specified by a URL. This node is useful for importing static JSON configurations or datasets directly into ComfyUI workflows.
![LoadLocalJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/LoadLocalJSON.png "Interface showing local JSON load functionality")

### SetValueInJSON

Sets a new key or updates an existing one with a new value.
![SetValueInJSON](https://github.com/lucafoscili/comfyui-lf/blob/460888f68f9568b05d390add9733dc480ee0950f/docs/images/SetValueInJSON.png "JSON updated with the new value")

### ShuffleJSONKeys

Sorts the keys at root level of a JSON, returning the sorted object. Optionally it can also sort the input JSON in place without making a copy of it.
![ShuffleJSONKeys](https://github.com/lucafoscili/comfyui-lf/blob/87801285fbe09db887633a6c984983b78a9146ff/docs/images/ShuffleJSONKeys.png "JSON keys shuffled")

### SortJSONKeys

Sorts the keys at root level of a JSON, returning the sorted object. Optionally it can also sort the input JSON in place without making a copy of it.
![SortJSONKeys](https://github.com/lucafoscili/comfyui-lf/blob/87801285fbe09db887633a6c984983b78a9146ff/docs/images/SortJSONKeys.png "JSON sorted")

### StringToJSON

Converts a string to a JSON object.
![StringToJSON](https://github.com/lucafoscili/comfyui-lf/blob/460888f68f9568b05d390add9733dc480ee0950f/docs/images/StringToJSON.png "JSON output from a string")

### WriteJSON

A simple text area that lets the user input a JSON file which will be validated when the workflow is queued. Each 2500ms the text is formatted, if there is an error it will be displayed in the title of the textarea (visible on mouseover).

![WriteJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/WriteJSON.png "Text area for direct JSON input and validation")

## Large Language Model nodes (`llm.py`)

### CharacterImpersonator

Utilizes a large language model to generate text responses as if coming from a character described by a provided biography. This node can be used for creative writing, role-playing scenarios, or generating dynamic content based on character traits.
![CharacterImpersonator](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/CharacterImpersonator.png "Sample interaction simulating character impersonation based on a biography")

### ImageClassifier

Utilizes a large language model to generate descriptions of images portraying characters.
![ImageClassifier](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/ImageClassifier.png "Example classification output describing an image character")

### LLMChat

Real-time chat with an LLM model served through Koboldcpp (<http://localhost:5001>).
It's possible to select the last messages as an output, sending them to the next node.
![LLMChat](https://github.com/lucafoscili/comfyui-lf/blob/69181cfe1c3b2062a40035e8b59cece8e8688483/docs/images/LLMChat.png "Example of LLM chat")

### LLMMessenger

A user interface capable of loading characters through a Ketchup Lite-compatible JSON and then connects to your local Koboldcpp instance (<http://localhost:5001>).
The location, outfit and timeframe options are included in the system prompt to give more context to the LLM.
Together with the biography, they define the identity of the LLM.
![LLMMessenger](https://github.com/lucafoscili/comfyui-lf/blob/fd52deb44d199e222833fbc159628aceeac48ab9/docs/images/LLMMessenger.png "Example of chat with Freya")

## Logic nodes (`logic.py`)

### MathOperation

Performs mathematical operations involving up to four variables.
![MathOperation](https://github.com/lucafoscili/comfyui-lf/blob/0dd555212e2a7bdd9f38cf1ef96ab4bf474594d8/docs/images/MathOperation.png "Result logged as a markdown-formatted text")

### ResolutionSwitcher

Selects a random resolution between portrait and landscape orientations. The chances for landscape to occur can be set with a percentage.
![ResolutionSwitcher](https://github.com/lucafoscili/comfyui-lf/blob/5882f6809e687b4296719e376db34482dd8fd840/docs/images/ResolutionSwitcher.png "Resolution was set to landscape")

### SwitchFloat

Returns one of two float values depending on a boolean condition.
![SwitchFloat](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/SwitchFloat.png "Choose between two float values based on a boolean condition")

### SwitchImage

Returns one of two images in tensor format based on a boolean condition.
![SwitchImage](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchImage.png "Switch between two images in tensor format based on a boolean condition")

### SwitchInteger

Returns one of two integer values depending on a boolean condition.
![SwitchInteger](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchInteger.png "Choose between two integer values based on a boolean condition")

### SwitchJSON

Returns one of two JSON objects depending on a boolean condition.
![SwitchJSON](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchJSON.png "Conditionally select between two JSON objects using a boolean condition")

### SwitchString

Returns one of two string values based on a boolean condition.
![SwitchString](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SwitchString.png "Dynamically choose between two string values based on a boolean condition.")

## Primitive nodes (`primitives.py`)

### Boolean

Used to select a boolean. It keeps record of old values, displaying a clickable list below the widget.
![Boolean](https://github.com/lucafoscili/comfyui-lf/blob/7deb085a3649ec873435cb092308c4e7a01cefe9/docs/images/Boolean.png "Boolean node with history")

### DisplayBoolean

Displays the value of a boolean in a widget.
![DisplayBoolean](https://github.com/lucafoscili/comfyui-lf/blob/8f37015be9e81511fd159e59a468e12a251f54ef/docs/images/DisplayBoolean.png "Boolean value displayed")

### DisplayFloat

Displays the value of a float in a widget.
![DisplayFloat](https://github.com/lucafoscili/comfyui-lf/blob/8f37015be9e81511fd159e59a468e12a251f54ef/docs/images/DisplayFloat.png "Float value displayed")

### DisplayInteger

Displays the value of a integer in a widget.
![DisplayInteger](https://github.com/lucafoscili/comfyui-lf/blob/8f37015be9e81511fd159e59a468e12a251f54ef/docs/images/DisplayInteger.png "Integer value displayed")

### DisplayPrimitiveAsJSON

Displays different primitive values as a JSON output or directly in-widget through a tree-like view.
![DisplayPrimitiveAsJSON](https://github.com/lucafoscili/comfyui-lf/blob/e2d71390d90b44841cf2080afcfd3869793de573/docs/images/DisplayPrimitiveAsJSON.png "Primitive values displayed as JSON")

### DisplayString

Displays the value of a string in a widget.
![DisplayString](https://github.com/lucafoscili/comfyui-lf/blob/8f37015be9e81511fd159e59a468e12a251f54ef/docs/images/DisplayString.png "String value displayed")

### Extractor

Extracts text enclosed by a starting and ending delimiter.
![Extractor](https://github.com/lucafoscili/comfyui-lf/blob/713db4caae57bf6ac9c4b14633bc21734667c42a/docs/images/Extractor.png "Extraction")

### Float

Used to select a float. It keeps record of old values, displaying a clickable list below the widget.
![Float](https://github.com/lucafoscili/comfyui-lf/blob/7deb085a3649ec873435cb092308c4e7a01cefe9/docs/images/Float.png "Float node with history")

### Integer

Used to select an integer. It keeps record of old values, displaying a clickable list below the widget.
![Integer](https://github.com/lucafoscili/comfyui-lf/blob/460888f68f9568b05d390add9733dc480ee0950f/docs/images/Integer.png "Integer node with history")

### RandomBoolean

Outputs False or True depending on the chances specified by the percentage widget. 0 always false, 100 always true.
![RandomBoolean](https://github.com/lucafoscili/comfyui-lf/blob/d45405d1e87b73b6bf7f42f8827aecf1ababc582/docs/images/RandomBoolean.png "20% chance to return True")

### Something2Number

Converts multiple inputs to integers and floats, handling nested structures and mixed types. If multiple numbers are sent to the node, they are summed.
![Something2Number](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Something2Number.png "Interface example of how inputs are converted to numbers")

### Something2String

Converts multiple inputs to strings, handling nested structures and mixed types.
![Something2String](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/Something2String.png "Example of results where various structures are converted to strings")

### String

Used to select a string. It keeps record of old prompts, displaying a clickable list below the textarea.
![String](https://github.com/lucafoscili/comfyui-lf/blob/22813956c616ec89b97b53411a0fc77dedef747b/docs/images/String.png "String node with history")

### WallOfText

Concatenates up to 10 strings, with the optional toggle to shuffle the order of concatenation.
![WallOfText](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/WallOfText.png "Output example of concatenated text sequences")

## Seed generation nodes (`seeds.py`)

### SequentialSeedsGenerator

Generates a series of unique seeds based on a global seed value. This node is useful for creating reproducible random sequences in workflows.
![SequentialSeedsGenerator](https://github.com/lucafoscili/comfyui-lf/blob/6d3c7e0ef3806a9e7755ec2878bc9dcfefac46a0/docs/images/SequentialSeedGenerator.png "Visualization of the generated seed series for sequences")

### UrandomSeedGenerator

Generates up to 20 different seeds through the use of the Python urandom function which leverages CPU generated entropy for increased randomness.
![UrandomSeedGenerator](https://github.com/lucafoscili/comfyui-lf/blob/7deb085a3649ec873435cb092308c4e7a01cefe9/docs/images/UrandomSeedGenerator.png "Random seeds with history enabled")

## Selector nodes (`selectors.py`)

### CheckpointSelector

Used to select a checkpoint. It's possible to fetch additional data from CivitAI or by loading the related cover inside the checkpoints folder.
![CheckpointSelector](https://github.com/lucafoscili/comfyui-lf/blob/f317945c6794d119cb3b51a0b55ee20609b1f5a4/docs/images/CheckpointSelector.png "Checkpoints additional info")

### EmbeddingSelector

Used to select an embedding. It's possible to fetch additional data from CivitAI or by loading the related cover inside the embeddings folder.
![EmbeddingSelector](https://github.com/lucafoscili/comfyui-lf/blob/8393783e3cb4dcb486be37ca0c79985e9dd28447/docs/images/EmbeddingSelector.png "Embedding additional info")

### LoraSelector

Used to select a LoRA. It's possible to fetch additional data from CivitAI or by loading the related cover inside the loras folder.
![LoraSelector](https://github.com/lucafoscili/comfyui-lf/blob/865badc13204cef0af28da1f285dc4433ae495c7/docs/images/LoraSelector.png "LoRA additional info")

### LoraAndEmbeddingSelector

Using a LoRA name as pilot, it also selects its related embedding (it must have the same name). Useful for models trained with pivotal training.
![LoraAndEmbeddingSelector](https://github.com/lucafoscili/comfyui-lf/blob/84c0e46686c39fb521dc6d4ae46396ae002d390d/docs/images/LoraAndEmbeddingSelector.png "LoRA and related embedding")

### SamplerSelector

Used to select a sampler, the history widget allows for a quick swap between the most used samplers.
![SamplerSelector](https://github.com/lucafoscili/comfyui-lf/blob/e704d1c6602217387498472ebacf284e8204080b/docs/images/SamplerSelector.png "Sampler selector")

### SchedulerSelector

Used to select a scheduler, the history widget allows for a quick swap between the most used schedulers.
![SchedulerSelector](https://github.com/lucafoscili/comfyui-lf/blob/e704d1c6602217387498472ebacf284e8204080b/docs/images/SchedulerSelector.png "Scheduler selector")

### UpscaleModelSelector

Used to select an upscale model, the history widget allows for a quick swap between the most used upscale models.
![UpscaleModelSelector](https://github.com/lucafoscili/comfyui-lf/blob/de49b4964ecc55c32438cc829928d90b9b5a8346/docs/images/UpscaleModelSelector.png "Upscale model selector")

### VAESelector

Used to select a VAE, the history widget allows for a quick swap between the most used VAEs.
![VAESelector](https://github.com/lucafoscili/comfyui-lf/blob/de49b4964ecc55c32438cc829928d90b9b5a8346/docs/images/VAESelector.png "VAE selector")

## Installation

### Using ComfyUI Manager

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

import json
import requests
import torch

from server import PromptServer

from ..utils.constants import BASE64_PNG_PREFIX, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, HEADERS, INT_MAX, get_character_impersonator_system, get_doc_generator_system, get_image_classifier_system
from ..utils.helpers import handle_response, normalize_input_image, normalize_json_input, normalize_list_to_value, tensor_to_base64

CATEGORY = f"{CATEGORY_PREFIX}/LLM"

# region LF_CharacterImpersonator
class LF_CharacterImpersonator:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "temperature": ("FLOAT", {
                    "max": 1.901, 
                    "min": 0.1, 
                    "step": 0.1, 
                    "round": 0.1, 
                    "default": 0.7, 
                    "tooltip": "Controls the randomness of the generated text. Higher values make the output more random."
                }),
                "max_tokens": ("INT", {
                    "max": 8000, 
                    "min": 20, 
                    "step": 10, 
                    "default": 500, 
                    "tooltip": "Limits the length of the generated text. Adjusting this value can help control the verbosity of the output."
                }),
                "prompt": ("STRING", {
                    "multiline": True, 
                    "default": "", 
                    "tooltip": "The initial input or question that guides the generation process. Can be a single line or multiple lines of text."
                }),
                "seed": ("INT", {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Determines the starting point for generating random numbers. Setting a specific seed ensures reproducibility of results."
                }),
                "character_bio": ("STRING", {
                    "multiline": True, 
                    "default": "", 
                    "tooltip": "Biographical details of the character to be impersonated. Helps in shaping the tone and content of the generated text."
                }),
                "url": ("STRING", {
                    "default": "http://localhost:5001/v1/chat/completions", 
                    "tooltip": "URL of the local endpoint where the request is sent."
                }),
            },
            "optional":{
                "image" : ("IMAGE", {
                    "default": None, 
                    "tooltip": "An optional image that can be included in the generation process to influence the output based on visual cues."
                }),
                "ui_widget" : ("KUL_CODE", {
                    "default": ""
                })
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("request_json", "response_json", "answer")
    RETURN_TYPES = ("JSON", "JSON", "STRING")

    def on_exec(self, **kwargs: dict):
        temperature: float = normalize_list_to_value(kwargs.get("temperature"))
        max_tokens: int = normalize_list_to_value(kwargs.get("max_tokens"))
        prompt: str = normalize_list_to_value(kwargs.get("prompt"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        character_bio: str = normalize_list_to_value(kwargs.get("character_bio"))
        url: str = normalize_list_to_value(kwargs.get("url"))
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image", []))

        system = get_character_impersonator_system(character_bio)

        content = []
        if isinstance(image, list) and len(image) > 0:
            image = normalize_input_image(image)
            b64_image = tensor_to_base64(image[0])
            image_url = f"{BASE64_PNG_PREFIX}{b64_image}"
            content.append({"type": "image_url", "image_url": {"url":image_url}})
        
        if prompt:
            content.append({"type": "text", "text": prompt})


        request = {
            "temperature": temperature,
            "max_tokens": max_tokens,
            "seed": seed,
            "messages": [
              {
                "role": "system",
                "content": system
              },
              {
                "role": "user",
                "content": content
              },
            ],
        }

        response = requests.post(url, headers=HEADERS, data=json.dumps(request))
        response_data = response.json()
        status_code, method, message = handle_response(response, method="POST")
        if status_code != 200:
            message = f"Whoops! Request failed with status code {status_code} and method {method}."
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}characterimpersonator", {
            "node": kwargs.get("node_id"),
            "value": message,
        })

        return (request, response_data, message)
# endregion

# region LF_ImageClassifier
class LF_ImageClassifier:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image" : ("IMAGE", {
                    "default": None, 
                    "tooltip": "The image that the LLM will try to classify."
                }),
                "temperature" : ("FLOAT", {
                    "max": 1.901, 
                    "min": 0.1, 
                    "step": 0.1, 
                    "round": 0.1, 
                    "default": 0.7, 
                    "tooltip": "Controls the randomness of the generated text. Higher values make the output more random."
                }),
                "max_tokens" : ("INT", {
                    "max": 8000, 
                    "min": 20, 
                    "step": 10, 
                    "default": 500, 
                    "tooltip": "Limits the length of the generated text. Adjusting this value can help control the verbosity of the output."
                }),
                "prompt": ("STRING", {
                    "multiline": True, 
                    "default": "", 
                    "tooltip": "The initial input or question that guides the generation process. Can be a single line or multiple lines of text."
                }),
                "seed": ("INT", {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Determines the starting point for generating random numbers. Setting a specific seed ensures reproducibility of results."
                }),
                "url": ("STRING", {
                    "default": "http://localhost:5001/v1/chat/completions", 
                    "tooltip": "URL of the local endpoint where the request is sent."
                }),
            },
            "optional": {
                "character_bio": ("STRING", {
                    "multiline": True, 
                    "default": "", 
                    "tooltip": "Biographical details of the character to be impersonated. Helps in shaping the tone and content of the generated text."
                }),
                "ui_widget" : ("KUL_CODE", {
                    "default": ""
                })
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("request_json", "response_json", "message")
    RETURN_TYPES = ("JSON", "JSON", "STRING")

    def on_exec(self, **kwargs: dict):
        temperature: float = normalize_list_to_value(kwargs.get("temperature"))
        max_tokens: int = normalize_list_to_value(kwargs.get("max_tokens"))
        prompt: str = normalize_list_to_value(kwargs.get("prompt"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        url: str = normalize_list_to_value(kwargs.get("url"))
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))
        character_bio: str = normalize_list_to_value(kwargs.get("character_bio", ""))

        system = get_image_classifier_system(character_bio)

        content = []
        if isinstance(image, list) and len(image) > 0:
            b64_image = tensor_to_base64(image[0])
            image_url = f"{BASE64_PNG_PREFIX}{b64_image}"
            content.append({"type": "image_url", "image_url": {"url":image_url}})
        
        if prompt:
            content.append({"type": "text", "text": prompt})

        request = {
            "temperature": temperature,
            "max_tokens": max_tokens,
            "seed": seed,
            "messages": [
              {
                "role": "system",
                "content": system
              },
              {
                "role": "user",
                "content": content
              },
            ],
        }

        response = requests.post(url, headers=HEADERS, data=json.dumps(request))
        response_data = response.json()
        status_code, method, message = handle_response(response, method="POST")
        if status_code != 200:
            message = f"Whoops! Request failed with status code {status_code} and method {method}."
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}imageclassifier", {
            "node": kwargs.get("node_id"),
            "value": message,
        })

        return (request, response_data, message)
# endregion

# region LF_LLMChat
class LF_LLMChat:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "ui_widget": ("KUL_CHAT", {
                    "default": ""
                }),
            },
        }
    
    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, False, False, False, True)
    RETURN_NAMES = ("chat_history_json", "last_message", "last_user_message", "last_llm_message", "all_messages")
    RETURN_TYPES = ("JSON", "STRING", "STRING", "STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))

        all_messages = [message.get("content") for message in ui_widget]
        last_message = all_messages[-1]
        last_user_message = next((message.get("content") for message in reversed(ui_widget) if message["role"] == "user"), "")
        last_llm_message = next((message.get("content") for message in reversed(ui_widget) if message["role"] == "assistant"), "")

        return (ui_widget, last_message, last_user_message, last_llm_message, all_messages)
# endregion

# region LF_LLMMessenger
class LF_LLMMessenger:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "ui_widget": ("KUL_MESSENGER", {
                    "default": ""
                }),
            },
            "optional": {
                "dataset": ("JSON", {
                    "default": "",
                    "tooltip": "The dataset JSON containing characters to talk to."
                }),
                "config": ("JSON", {
                    "default": "",
                    "tooltip": "Set of parameters that initializes the interface."
                }),
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = (
        "chat_history_json", "chat_history_string", 
        "last_message", "last_user_message", "last_llm_message", "styled_prompt", 
        "character_name", "outfit_name", "location_name", "style_name", "timeframe_name"
    )
    RETURN_TYPES = (
        "JSON", "STRING", "STRING", "STRING", "STRING", "STRING", 
        "STRING", "STRING", "STRING", "STRING", "STRING"
    )

    def on_exec(self, **kwargs: dict):
        # Helper functions
        def find_node_by_id(dataset: dict, target_id: str):
            return next((node for node in dataset if isinstance(node, dict) and node.get('id') == target_id), None)

        def get_value_and_description(node: dict):
            """Returns the 'value' and 'description' fields from the node for styled prompt usage."""
            return node.get("value", "No data"), node.get("description", "")
        
        ui_widget: dict = normalize_json_input(kwargs.get("ui_widget", {}))
        dataset: dict = ui_widget.get("dataset", {})
        config: dict = ui_widget.get("config", {})
        
        if not dataset or not config:
            raise ValueError("It looks like the chat is empty!")
        if "currentCharacter" not in config:
            raise ValueError("You must choose a character")

        # Character data
        character_data: dict = find_node_by_id(dataset.get("nodes"), config.get("currentCharacter"))
        if not character_data:
            raise ValueError(f"Character with id {config['currentCharacter']} not found in dataset")
        character_name: str = character_data.get("value")

        # Process chat data
        try:
            chat_node: dict = find_node_by_id(character_data.get("children"), "chat")
            chat_data: list[dict] = chat_node.get("cells")["kulChat"]["value"]
        except (json.JSONDecodeError, KeyError):
            raise ValueError(f"It looks like the chat with {character_name} is empty")

        all_messages = [message.get("content") for message in chat_data]
        last_message = all_messages[-1] if all_messages else ""
        last_user_message = next((msg.get("content") for msg in reversed(chat_data) if msg["role"] == "user"), "")
        last_llm_message = next((msg.get("content") for msg in reversed(chat_data) if msg["role"] == "assistant"), "")

        # Chat history
        chat_history_string = "\n".join(
            f"User: \"{msg['content']}\"" if msg["role"] == "user" else f"{character_name}: \"{msg['content']}\""
            for msg in chat_data
        )

        # Retrieve additional character settings (style, location, etc.)
        attributes: list[str] = ["styles", "locations", "outfits", "timeframes"]
        settings: dict = {}
        descriptions: dict = {}  # Separate dictionary for styled prompt descriptions

        for attr in attributes:
            node: dict = find_node_by_id(character_data.get("children"), attr)
            if node:
                children = node.get("children")
                index = node.get("value")
                if isinstance(index, int) and isinstance(children, list) and len(children) > 0:
                    value, description = get_value_and_description(children[index])
                    settings[attr[:-1]] = value  # Only 'value' for return
                    descriptions[attr[:-1]] = f"{value}, {description}" if description else value  # 'value, description' for styled prompt

        # Construct the styled prompt
        styled_prompt: str = (
            f"Envision the scene described below from the viewer's point of view.\n"
            f"{character_name} said to the viewer:\n\"{last_llm_message}\"\n"
            + (f"Style of the image: {descriptions['style']}\n" if descriptions.get("style") else "")
            + (f"{character_name}'s outfit: {descriptions['outfit']}\n" if descriptions.get("outfit") else "")
            + (f"Location: {descriptions['location']}\n" if descriptions.get("location") else "")
            + (f"Timeframe: {descriptions['timeframe']}\n" if descriptions.get("timeframe") else "")
            if last_llm_message else None
        )

        # Return values with only names (no descriptions)
        return (
            chat_data, chat_history_string, last_message, last_user_message, 
            last_llm_message, styled_prompt, character_name, settings.get("outfit"),
            settings.get("location"), settings.get("style"), settings.get("timeframe")
        )
# endregion

# region LF_MarkdownDocGenerator
class LF_MarkdownDocGenerator:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "prompt": ("STRING", {
                    "default": "", 
                    "multiline": True, 
                    "tooltip": "The source file to document."
                }),
                "temperature": ("FLOAT", {
                    "max": 1.901, 
                    "min": 0.1, 
                    "step": 0.1, 
                    "round": 0.1, 
                    "default": 0.5, 
                    "tooltip": "Controls the randomness of the generated text. Higher values make the output more random."
                }),
                "max_tokens": ("INT", {
                    "max": 8000, 
                    "min": 20, 
                    "step": 10, 
                    "default": 2000, 
                    "tooltip": "Limits the length of the generated text. Adjusting this value can help control the verbosity of the output."
                }),
                "seed": ("INT", {
                    "default": 42, 
                    "min": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Determines the starting point for generating random numbers. Setting a specific seed ensures reproducibility of results."
                }),
                "url": ("STRING", {
                    "default": "http://localhost:5001/v1/chat/completions", 
                    "tooltip": "URL of the local endpoint for the LLM."
                }),
            },
            "optional": { 
                "extra_context": ("STRING", {
                    "default": "", 
                    "multiline": True, 
                    "tooltip": "Additional context to guide the LLM (out of scope constants and helpers definitions)."
                }),
                "ui_widget" : ("KUL_CODE", {
                    "default": ""
                })
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, False, False, True)
    RETURN_NAMES = ("request_json", "response_json", "markdown", "markdown_list")
    RETURN_TYPES = ("JSON", "JSON", "STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        temperature: float = normalize_list_to_value(kwargs.get("temperature"))
        max_tokens: int = normalize_list_to_value(kwargs.get("max_tokens"))
        prompt: str = normalize_list_to_value(kwargs.get("prompt"))
        seed: int = normalize_list_to_value(kwargs.get("seed"))
        url: str = normalize_list_to_value(kwargs.get("url"))
        extra_context: str = normalize_list_to_value(kwargs.get("extra_context", ""))

        request = {
            "temperature": temperature,
            "max_tokens": max_tokens,
            "seed": seed,
            "messages": [
              {
                "role": "system",
                "content": get_doc_generator_system(extra_context)
              },
              {
                "role": "user",
                "content": prompt
              },
            ],
        }

        response = requests.post(url, headers=HEADERS, data=json.dumps(request))
        response_data = response.json()
        status_code, _, message = handle_response(response, method="POST")
        
        if status_code != 200:
            message = f"Oops! Documentation generation failed with status code {status_code}."

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}markdowndocgenerator", {
            "node": kwargs.get("node_id"),
            "value": message,
        })

        return (request, response_data, message, [message])
# endregion

NODE_CLASS_MAPPINGS = {
    "LF_CharacterImpersonator": LF_CharacterImpersonator,
    "LF_ImageClassifier": LF_ImageClassifier,
    "LF_LLMChat": LF_LLMChat,
    "LF_LLMMessenger": LF_LLMMessenger,
    "LF_MarkdownDocGenerator": LF_MarkdownDocGenerator
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_CharacterImpersonator": "LLM <-> Character",
    "LF_ImageClassifier": "LLM Image classifier",
    "LF_LLMChat": "LLM Chat",
    "LF_LLMMessenger": "LLM Messenger",
    "LF_MarkdownDocGenerator": "Markdown doc. generator"
}

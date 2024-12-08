import math
import random
import re
import torch

from server import PromptServer

from ..utils.constants import ANY, CATEGORY_PREFIX, EVENT_PREFIX, FUNCTION, Input, INT_MAX, LORA_TAG_REGEX
from ..utils.helpers import count_words_in_comma_separated_string, cleanse_lora_tag, normalize_input_list, convert_to_boolean, convert_to_float, convert_to_int, convert_to_json, normalize_input_image, normalize_input_list, normalize_list_to_value, not_none

CATEGORY = f"{CATEGORY_PREFIX}/Logic"

# region LF_ExtractString
class LF_ExtractString:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "text": (Input.STRING, {
                    "default": "", 
                    "multiline": True, 
                    "tooltip": "The string from which the output will be extracted."
                }),
                "starting_delimiter": (Input.STRING, {
                    "default": "{", 
                    "tooltip": "The delimiter where extraction starts."
                }),
                "ending_delimiter": (Input.STRING, {
                    "default": "}", 
                    "tooltip": "The delimiter where extraction ends."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, {
                    "default": ""
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("result_as_json", "extracted_text", "result_as_int", "result_as_float", "result_as_boolean")
    RETURN_TYPES = ("JSON", "STRING", "INT", "FLOAT", "BOOLEAN")

    def on_exec(self, **kwargs: dict):
        def extract_nested(text, start_delim, end_delim):
            start_idx = text.rfind(start_delim)
            if start_idx == -1:
                return ""
            end_idx = text.find(end_delim, start_idx + len(start_delim))
            if end_idx == -1:
                return ""
            return text[start_idx + len(start_delim):end_idx]
    
        text: str = normalize_list_to_value(kwargs.get("text"))
        starting_delimiter: str = normalize_list_to_value(kwargs.get("starting_delimiter"))
        ending_delimiter: str = normalize_list_to_value(kwargs.get("ending_delimiter"))
    
        extracted_text = extract_nested(text, starting_delimiter, ending_delimiter)
        
        result_as_json: dict = convert_to_json(extracted_text)
        result_as_int: int = convert_to_int(extracted_text)
        result_as_float: float = convert_to_float(extracted_text)
        result_as_boolean: bool = convert_to_boolean(extracted_text)
    
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}extractstring", {
            "node": kwargs.get("node_id"),
            "value": extracted_text or "...No matches...",
        })
        
        return (result_as_json, extracted_text, result_as_int, result_as_float, result_as_boolean)
# endregion

# region LF_ExtractPromptFromLoraTag
class LF_ExtractPromptFromLoraTag:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "tag": (Input.STRING, {
                    "multiline": True, 
                    "tooltip": "The LoRA tag to be converted."
                }),
                "separator": (Input.STRING, { 
                    "default": "SEP", 
                    "tooltip": "String separating each keyword in a LoRA filename."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, {
                    "default": ""
                })
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("keywords", "keywords_count", "keywords_list", "keywords_count_list")
    RETURN_TYPES = ("STRING", "INT", "STRING", "INT")

    def on_exec(self, **kwargs: dict):
        tag_list: list[str] = normalize_input_list(kwargs.get("tag"))
        separator: str = normalize_list_to_value(kwargs.get("separator"))

        clean_loras: list[str] = []
        keyword_counts: list[int] = []
        log_entries: list[str] = []

        for tag_entry in tag_list:
            tags_in_entry = re.findall(LORA_TAG_REGEX, tag_entry)

            for t in tags_in_entry:
                clean_lora = cleanse_lora_tag(t, separator)   
                keywords_count = count_words_in_comma_separated_string(clean_lora)
                clean_loras.append(clean_lora)
                keyword_counts.append(keywords_count)

                log_entries.append(f"""
### LoRA Tag Entry:
                                   
- **Original Tag**: {t}
- **Cleaned LoRA Tag**: {clean_lora}
- **Number of Keywords**: {keywords_count}
- **Keywords Extracted**: {clean_lora.split(', ') if clean_lora else '*No keywords extracted*'}
                """)

        log = f"""## Breakdown

### Input Details:

- **Original Tags**: {tag_list}
- **Separator Used**: '{separator}'

{''.join(log_entries)}
        """

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}extractpromptfromloratag", {
            "node": kwargs.get("node_id"), 
            "value": log
        })

        return (clean_loras, keyword_counts, clean_loras, keyword_counts)
# endregion

# region LF_IsLandscape
class LF_IsLandscape:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "image": (Input.IMAGE, {
                    "tooltip": "Input image/images."
                })
            },
            "optional": {
                "ui_widget": (Input.KUL_TREE, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, False, False, True, True, True)
    RETURN_NAMES = ("is_landscape", "height", "width", 
                    "is_landscape_list", "heights_list", "widths_list")
    RETURN_TYPES = ("BOOLEAN", "INT", "INT", "BOOLEAN", "INT", "INT")

    def on_exec(self, **kwargs: dict):
        image: list[torch.Tensor] = normalize_input_image(kwargs.get("image"))

        nodes: list[dict] = []
        dataset: dict = {"nodes": nodes}

        heights_list: list[int] = []
        widths_list: list[int] = []
        is_landscape_list: list[bool] = []

        counter = 0

        for img in image:
            counter += 1
            _, height, width, _ = img.shape
            heights_list.append(height)
            widths_list.append(width)
            result = width >= height
            is_landscape_list.append(result)
            nodes.append({"icon": "check" if result else "clear",
                          "id": counter, 
                          "value": f"Image {counter}: {str(result)}"})

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}islandscape", {
            "node": kwargs.get("node_id"),
            "dataset": dataset,
        })

        return (is_landscape_list[0], heights_list[0], widths_list[0], 
                is_landscape_list, heights_list, widths_list)
# endregion

# region LF_MathOperation
class LF_MathOperation:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "operation": (Input.STRING, {
                    "default": "a * b / c + d", 
                    "tooltip": "Math operation to execute. Use variables like 'a', 'b', 'c', 'd'."
                }),
            },
            "optional": {
                "a": (ANY, {
                    "tooltip": "Value or list of values for 'a'."
                }),
                "b": (ANY, {
                    "tooltip": "Value or list of values for 'b'."
                }),
                "c": (ANY, {
                    "tooltip": "Value or list of values for 'c'."
                }),
                "d": (ANY, {
                    "tooltip": "Value or list of values for 'd'."
                }),
                "ui_widget": (Input.KUL_CODE, {
                    "default": ""
                })
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("int_result", "float_result")
    RETURN_TYPES = ("INT", "FLOAT")

    def on_exec(self, **kwargs: dict):
        def normalize_and_sum_with_log(variable):
            normalized = normalize_input_list(variable)

            if len(normalized) > 1:
                itemized_log = "\n".join(
                    [f"    {i+1}. *{1 if val is True else 0 if val is False else val}* <{type(val).__name__}>" 
                     for i, val in enumerate(normalized)]
                )
                total_sum = sum(1 if val is True else 0 if val is False else val for val in normalized)
                return total_sum, f"**{total_sum}** <list>\n{itemized_log}"

            single_value = 1 if normalized[0] is True else 0 if normalized[0] is False else normalized[0]
            return float(single_value), f"**{single_value}** <{type(single_value).__name__}>"

        operation: str = normalize_list_to_value(kwargs.get("operation"))
        a = kwargs.get("a", None)
        b = kwargs.get("b", None)
        c = kwargs.get("c", None)
        d = kwargs.get("d", None)

        na_placeholder = "N/A"

        a_sum, a_log = normalize_and_sum_with_log(a) if not_none(a) else (None, na_placeholder)
        b_sum, b_log = normalize_and_sum_with_log(b) if not_none(b) else (None, na_placeholder)
        c_sum, c_log = normalize_and_sum_with_log(c) if not_none(c) else (None, na_placeholder)
        d_sum, d_log = normalize_and_sum_with_log(d) if not_none(d) else (None, na_placeholder)

        str_operation = operation.replace("a", str(a_sum)).replace("b", str(b_sum)).replace("c", str(c_sum)).replace("d", str(d_sum))

        try:
            result = eval(operation, {"a": a_sum, "b": b_sum, "c": c_sum, "d": d_sum, "math": math})
        except Exception:
            result = float("NaN")

        log = f"""## Result:
  **{str(result)}**

## Variables:
  a: {a_log}
  b: {b_log}
  c: {c_log}
  d: {d_log}

## Full operation:
  {str_operation}
        """    

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}mathoperation", {
            "node": kwargs.get("node_id"),
            "value": log,
        })
        
        return (int(result), result)
    
    @classmethod
    def VALIDATE_INPUTS(self, **kwargs):
         return True
# endregion

# region LF_ParsePromptWithLoraTags
class LF_ParsePromptWithLoraTags:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "text": (Input.STRING, {
                    "multiline": True, 
                    "tooltip": "The input text containing LoRa tags. These tags will be processed and replaced with extracted keywords."
                }),
                "separator": (Input.STRING, { 
                    "default": "SEP", 
                    "tooltip": "Character(s) used to separate keywords within the name of a single LoRa file. Helps in extracting individual keywords."
                }),
                "weight": (Input.FLOAT, { 
                    "default": 0.5, 
                    "tooltip": "A weight value associated with LoRa tags, which may influence processing or output significance."
                }),
                "weight_placeholder": (Input.STRING, { 
                    "default": "wwWEIGHTww", 
                    "tooltip": "A placeholder within LoRa tags that gets replaced with the actual weight value during processing."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, {
                    "default": ""
                })
            },
            "hidden": { 
                "node_id": "UNIQUE_ID"
            }
        } 

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("prompt", "loras")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        text: str = normalize_list_to_value(kwargs.get("text"))
        separator: str = normalize_list_to_value(kwargs.get("separator"))
        weight: float = normalize_list_to_value(kwargs.get("weight"))
        weight_placeholder: int = normalize_list_to_value(kwargs.get("weight_placeholder"))
        
        loras = re.findall(LORA_TAG_REGEX, text)
        
        lora_keyword_map = {}
        for lora in loras:
            lora_keyword_map[lora] = cleanse_lora_tag(lora, separator)
        
        for lora_tag, keywords in lora_keyword_map.items():
            text = text.replace(lora_tag, keywords)
        
        loras_weighted = [lora.replace(weight_placeholder, str(weight)) for lora in loras]
        loras_string = "".join(loras_weighted)

        log_entries = [f"## Breakdown\n"]
        log_entries.append(f"**Original Text**: {text}")
        log_entries.append(f"**Separator Used**: '{separator}'")
        log_entries.append(f"**Weight Placeholder**: '{weight_placeholder}', Weight Value: {weight}")
        
        log_entries.append("\n### Extracted LoRA Tags:\n")
        for lora_tag in loras:
            log_entries.append(f"- **LoRA Tag**: {lora_tag}")

        log_entries.append("\n### Keyword Mapping:\n")
        for lora_tag, keywords in lora_keyword_map.items():
            log_entries.append(f"- **Original Tag**: {lora_tag}")
            log_entries.append(f"  - **Cleansed Keywords**: {keywords}")

        log_entries.append("\n### Final Prompt Substitution:\n")
        log_entries.append(f"**Modified Text**: {text}")
        
        log = "\n".join(log_entries)

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}parsepromptwithloratags", {
            "node": kwargs.get("node_id"), 
            "value": log
        })

        return (text, loras_string)
# endregion

# region LF_RegexReplace
class LF_RegexReplace:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "input_text": (Input.STRING, {
                    "default": "", 
                    "tooltip": "The text where the regex replacements will occur."
                }),
                "pattern": (Input.STRING, {
                    "default": "", 
                    "tooltip": "The regex pattern to match."
                }),
                "replacement": (Input.STRING, {
                    "default": "", 
                    "tooltip": "The substring to replace the regex matches with."
                }),
            },
            "optional": {
                "flags": (Input.STRING, {
                    "default": "0",
                    "tooltip": "Regex flags to use. Comma-separated list: IGNORECASE, MULTILINE, DOTALL, etc."
                }),
                "ui_widget": (Input.KUL_CODE, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("string", "string_list")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        input_text: str = normalize_list_to_value(kwargs.get("input_text"))
        pattern: str = normalize_list_to_value(kwargs.get("pattern"))
        replacement: str = normalize_list_to_value(kwargs.get("replacement"))
        flags_raw: str = normalize_list_to_value(kwargs.get("flags", "0"))

        flag_mapping = {
            "IGNORECASE": re.IGNORECASE,
            "MULTILINE": re.MULTILINE,
            "DOTALL": re.DOTALL,
            "VERBOSE": re.VERBOSE,
        }
        flags = 0
        if flags_raw:
            for flag in flags_raw.split(","):
                flag = flag.strip().upper()
                if flag in flag_mapping:
                    flags |= flag_mapping[flag]

        if not input_text or not pattern:
            log = f"**Error**: Input text or pattern is empty. Replacement cannot proceed."
            PromptServer.instance.send_sync(f"{EVENT_PREFIX}regexreplace", {
                "node": kwargs.get("node_id"),
                "value": log,
            })
            return ("", [])

        replacement_count = 0
        modified_text = input_text
        try:
            modified_text, replacement_count = re.subn(pattern, replacement, input_text, flags=flags)
        except re.error as e:
            log = f"""## Regex Error:

  **Invalid Pattern**: {pattern}
  **Error Message**: {str(e)}
            """
            PromptServer.instance.send_sync(f"{EVENT_PREFIX}regexreplace", {
                "node": kwargs.get("node_id"),
                "value": log,
            })
            return ("", [])

        log = f"""## Regex Replacement Log:

  **Original Text**: {input_text}
  **Regex Pattern**: {pattern}
  **Replacement Substring**: {replacement}
  **Regex Flags**: {flags_raw}
  **Resulting Text**: {modified_text}
  **Replacements Made**: {replacement_count}
        """

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}regexreplace", {
            "node": kwargs.get("node_id"),
            "value": log,
        })

        return (modified_text, [modified_text])

# endregion

# region LF_ResolutionSwitcher
class LF_ResolutionSwitcher:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "chance_landscape": (Input.FLOAT, {
                    "default": 20.0, 
                    "step": 5, 
                    "min": 0, 
                    "max": 100, 
                    "tooltip": "Percentage chance for landscape output, 0-100."
                }),
                "portrait_width": (Input.INTEGER, {
                    "default": 832, 
                    "min": 1, 
                    "step": 1, 
                    "tooltip": "Width when the image is portrait-oriented."
                }),
                "portrait_height": (Input.INTEGER, {
                    "default": 1216, "min": 1, 
                    "step": 1, 
                    "tooltip": "Height when the image is portrait-oriented."
                }),
                "landscape_width": (Input.INTEGER, {
                    "default": 1216, "min": 1, 
                    "step": 1, 
                    "tooltip": "Width when the image is landscape-oriented."
                }),
                "landscape_height": (Input.INTEGER, {
                    "default": 832, "min": 1, 
                    "step": 1, 
                    "tooltip": "Height when the image is landscape-oriented."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {"default": {}}),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("width", "height", "is_landscape")
    RETURN_TYPES = ("INT", "INT", "BOOLEAN")

    def on_exec(self, **kwargs: dict):
        chance_landscape: float = normalize_list_to_value(kwargs.get("chance_landscape"))
        landscape_width: int = normalize_list_to_value(kwargs.get("landscape_width"))
        portrait_width: int = normalize_list_to_value(kwargs.get("portrait_width"))
        landscape_height: int = normalize_list_to_value(kwargs.get("landscape_height"))
        portrait_height: int = normalize_list_to_value(kwargs.get("portrait_height"))

        percentage = max(0, min(100, chance_landscape))
        random_value = random.uniform(0, 100)

        is_landscape = random_value <= percentage

        width = landscape_width if is_landscape else portrait_width
        height = landscape_height if is_landscape else portrait_height

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}resolutionswitcher", {
            "node": kwargs.get("node_id"),
            "bool": is_landscape,
            "roll": random_value,
        })

        return (width, height, is_landscape)
# endregion

# region LF_StringReplace
class LF_StringReplace:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "input_text": (Input.STRING, {
                    "default": "", 
                    "tooltip": "The text where replacements will occur."
                }),
                "target": (Input.STRING, {
                    "default": "", 
                    "tooltip": "The substring to be replaced."
                }),
                "replacement": (Input.STRING, {
                    "default": "", 
                    "tooltip": "The substring to replace the target with."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_CODE, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    RETURN_NAMES = ("string", "string_list")
    RETURN_TYPES = ("STRING", "STRING")

    def on_exec(self, **kwargs: dict):
        input_text: str = normalize_list_to_value(kwargs.get("input_text"))
        target: str = normalize_list_to_value(kwargs.get("target"))
        replacement: str = normalize_list_to_value(kwargs.get("replacement"))

        if not input_text or not target:
            log = f"**Error**: Input text or target is empty. Replacement cannot proceed."
            PromptServer.instance.send_sync(f"{EVENT_PREFIX}stringreplace", {
                "node": kwargs.get("node_id"),
                "value": log,
            })
            return ("", [])

        replacement_count = input_text.count(target)
        modified_text = input_text.replace(target, replacement)

        log = f"""## Result:

  **Original Text**: {input_text}
  **Target Substring**: {target}
  **Replacement Substring**: {replacement}
  **Resulting Text**: {modified_text}
  **Replacements Made**: {replacement_count}
        """

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}stringreplace", {
            "node": kwargs.get("node_id"),
            "value": log,
        })

        return (modified_text, [modified_text])
# endregion

# region LF_SwitchFloat
class LF_SwitchFloat:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "on_true": (Input.FLOAT, {
                    "lazy": True, 
                    "default": 0, 
                    "tooltip": "Value to return if the boolean condition is true."
                }),
                "on_false": (Input.FLOAT, {
                    "lazy": True, 
                    "default": 0, 
                    "tooltip": "Value to return if the boolean condition is false."
                }),
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("float", "float_list")
    RETURN_TYPES = ("FLOAT", "FLOAT")

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, **kwargs: dict):
        boolean: bool = normalize_list_to_value(kwargs.get("boolean"))
        on_false: float = kwargs.get("on_false")
        on_true: float = kwargs.get("on_true")
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchfloat", {
            "node": kwargs.get("node_id"),
            "bool": boolean, 
        })

        value = on_true if boolean else on_false

        return (value, [value])
# endregion

# region LF_SwitchImage
class LF_SwitchImage:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "on_true": (Input.IMAGE, {
                    "lazy": True, 
                    "tooltip": "Value to return if the boolean condition is true."
                }),
                "on_false": (Input.IMAGE, {
                    "lazy": True, 
                    "tooltip": "Value to return if the boolean condition is false."
                }),
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("image", "image_list")
    RETURN_TYPES = ("IMAGE", "IMAGE")

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, **kwargs: dict):
        boolean: bool = normalize_list_to_value(kwargs.get("boolean"))
        on_false: torch.Tensor = kwargs.get("on_false")
        on_true: torch.Tensor = kwargs.get("on_true")

        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchimage", {
            "node": kwargs.get("node_id"),
            "bool": boolean, 
        })

        value = on_true if boolean else on_false

        return (value, [value])
# endregion

# region LF_SwitchInteger    
class LF_SwitchInteger:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "on_true": (Input.INTEGER, {
                    "default": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Value to return if the boolean condition is true."
                }),
                "on_false": (Input.INTEGER, {
                    "default": 0, 
                    "max": INT_MAX, 
                    "tooltip": "Value to return if the boolean condition is false."
                }),
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        } 

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("int", "int_list")
    RETURN_TYPES = ("INT", "INT")
        
    def on_exec(self, **kwargs: dict):
        boolean: bool = normalize_list_to_value(kwargs.get("boolean"))
        on_false: int = kwargs.get("on_false")
        on_true: int = kwargs.get("on_true")
        on_true = normalize_list_to_value(on_true)
        on_false = normalize_list_to_value(on_false)
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchinteger", {
            "node": kwargs.get("node_id"),
            "bool": boolean, 
        })

        value = on_true if boolean else on_false

        return (value, [value])
# endregion

# region LF_SwitchJSON
class LF_SwitchJSON:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "on_true": (Input.JSON, {
                    "lazy": True, 
                    "tooltip": "Value to return if the boolean condition is true."
                }),
                "on_false": (Input.JSON, {
                    "lazy": True, 
                    "tooltip": "Value to return if the boolean condition is false."
                }),
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID"
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("json", "json_list")
    RETURN_TYPES = ("JSON", "JSON")

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, **kwargs: dict):
        boolean: bool = normalize_list_to_value(kwargs.get("boolean"))
        on_false: dict = kwargs.get("on_false")
        on_true: dict = kwargs.get("on_true")
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchjson", {
            "node": kwargs.get("node_id"),
            "bool": boolean, 
        })

        value = on_true if boolean else on_false

        return (value, [value])
# endregion

# region LF_SwitchString
class LF_SwitchString:
    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "on_true": (Input.STRING, {
                    "lazy": True, 
                    "multiline": True, 
                    "tooltip": "Value to return if the boolean condition is true."
                }),
                "on_false": (Input.STRING, {
                    "lazy": True, 
                    "multiline": True, 
                    "tooltip": "Value to return if the boolean condition is false."
                }),
                "boolean": (Input.BOOLEAN, {
                    "default": False, 
                    "tooltip": "Boolean condition to switch between 'on_true' and 'on_false' values."
                }),
            },
            "optional": {
                "ui_widget": (Input.KUL_PROGRESSBAR, {
                    "default": {}
                }),
            },
            "hidden": {
                "node_id": "UNIQUE_ID" 
            }
        }

    CATEGORY = CATEGORY
    FUNCTION = FUNCTION
    OUTPUT_IS_LIST = (False, True)
    RETURN_NAMES = ("string", "string_list")
    RETURN_TYPES = ("STRING", "STRING")

    def check_lazy_status(self, **kwargs: dict):
        switch_value = kwargs["boolean"]
        if switch_value:
            return ["on_true"]
        else:
            return ["on_false"]

    def on_exec(self, **kwargs: dict):
        boolean: bool = normalize_list_to_value(kwargs.get("boolean"))
        on_false: str = kwargs.get("on_false")
        on_true: str = kwargs.get("on_true")
        
        PromptServer.instance.send_sync(f"{EVENT_PREFIX}switchstring", {
            "node": kwargs.get("node_id"),
            "bool": boolean, 
        })

        value = on_true if boolean else on_false

        return (value, [value])
# endregion

NODE_CLASS_MAPPINGS = {
    "LF_ExtractPromptFromLoraTag": LF_ExtractPromptFromLoraTag,
    "LF_ExtractString": LF_ExtractString,
    "LF_IsLandscape": LF_IsLandscape,
    "LF_MathOperation": LF_MathOperation,
    "LF_ParsePromptWithLoraTags": LF_ParsePromptWithLoraTags,
    "LF_RegexReplace": LF_RegexReplace,
    "LF_ResolutionSwitcher": LF_ResolutionSwitcher,
    "LF_StringReplace": LF_StringReplace,
    "LF_SwitchFloat": LF_SwitchFloat,
    "LF_SwitchImage": LF_SwitchImage,
    "LF_SwitchInteger": LF_SwitchInteger,
    "LF_SwitchJSON": LF_SwitchJSON,
    "LF_SwitchString": LF_SwitchString,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ExtractPromptFromLoraTag": "Extract prompt from LoRA tag",
    "LF_ExtractString": "Extract string",
    "LF_IsLandscape": "Is image in landscape res.?",
    "LF_MathOperation": "Math operation",
    "LF_ParsePromptWithLoraTags": "Parse Prompt with LoRA tags",
    "LF_RegexReplace": "Regex replace",
    "LF_ResolutionSwitcher": "Resolution switcher",
    "LF_StringReplace": "String replace",
    "LF_SwitchFloat": "Switch Float",
    "LF_SwitchImage": "Switch Image",
    "LF_SwitchInteger": "Switch Integer",
    "LF_SwitchJSON": "Switch JSON",
    "LF_SwitchString": "Switch String",
} 
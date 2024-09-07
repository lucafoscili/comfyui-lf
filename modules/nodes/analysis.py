from server import PromptServer

from ..utils.analysis import *

category = "✨ LF Nodes/Analysis"

class LF_ImageHistogram:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE", {"label": "Image tensor", "tooltip": "Input image tensor to generate histograms from."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("image", "dataset",)
    RETURN_TYPES = ("IMAGE", "JSON",)

    def on_exec(self, image, node_id):
        """
        Generate histograms for the RGB channels and their sum from an input image tensor,
        and format it to the KulDataDataset structure.

        Args:
            image (torch.Tensor): Input image tensor in the shape [1, H, W, 3].
            node_id (str): Unique identifier for the node instance.

        Returns:
            dict: A formatted KulDataDataset containing the histogram data.
        """
        histograms = calculate_histograms(image)
        dataset = adapt_histograms_for_kuldata(histograms)

        PromptServer.instance.send_sync("lf-imagehistogram", {
            "node": node_id, 
            "dataset": dataset,
        })

        return (image, dataset,)
    
class LF_KeywordCounter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "tooltip": "Prompt containing keywords to count."}),
                "separator": ("STRING", {"default": ", ", "tooltip": "Character(s) used to separate keywords in the prompt."}),
            },
            "hidden": { "node_id": "UNIQUE_ID" }
        }

    CATEGORY = category
    FUNCTION = "on_exec"
    OUTPUT_NODE = True
    RETURN_NAMES = ("dataset",)
    RETURN_TYPES = ("JSON",)

    def on_exec(self, prompt, separator, node_id):
        """
        Count the occurrence of each keyword in the prompt and output the result in JSON format.

        Args:
            prompt (str): The input prompt containing the keywords.
            separator (str): The character(s) used to separate keywords.

        Returns:
            dict: A KulDataDataset-compatible JSON with the counted keywords.
        """
        keywords = prompt.split(separator)
        keyword_count = {}

        for keyword in keywords:
            keyword = keyword.strip().lower()
            if keyword:
                keyword_count[keyword] = keyword_count.get(keyword, 0) + 1

        dataset = adapt_keyword_count_for_kuldata(keyword_count)

        PromptServer.instance.send_sync("lf-keywordcounter", {
            "node": node_id, 
            "dataset": dataset,
        })

        return (dataset,)

NODE_CLASS_MAPPINGS = {
    "LF_ImageHistogram": LF_ImageHistogram,
    "LF_KeywordCounter": LF_KeywordCounter,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_ImageHistogram":  "Image Histogram",
    "LF_KeywordCounter": "Keyword counter",
}

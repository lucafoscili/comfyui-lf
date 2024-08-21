import io
import json
import torch
import base64
import requests

from PIL import Image

category = "LF Nodes/LLM"

class LF_CharacterImpersonator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "temperature" : ("FLOAT", {"max": 1.901, "min": 0.1, "step": 0.1, "display": "number", "round": 0.1, "default": 0.7}),
                "max_tokens" : ("INT", {"max": 8000, "min": 20, "step": 10, "default": 500, "display": "number"}),
                "prompt": ("STRING", {"multiline": True, "default": ""}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "character_bio": ("STRING", { "multiline": True, "default": ""}),
                "url": ("STRING", {"multiline": True, "default": "http://localhost:5001/v1/chat/completions"}),
            },
            "optional":{
                "image" : ("IMAGE", {"default": None})
            }
        }

    RETURN_TYPES = ("JSON", "JSON", "STRING")
    RETURN_NAMES = ("request_json", "response_json", "answer")
    CATEGORY = category
    FUNCTION = "llm_call"

    def llm_call(self, temperature, max_tokens, prompt, seed, character_bio, url, image=None):
        if isinstance(image, torch.Tensor):
            if image.ndim == 4:
                image = image.squeeze(0)
            pil_image = Image.fromarray((image.numpy() * 255).astype('uint8'))
            buffer = io.BytesIO()
            pil_image.save(buffer, format="PNG")
            buffer.seek(0)
            image = base64.b64encode(buffer.read()).decode('utf-8')

        system = f"""
        You are the character described by the embedded biography: embrace this character's traits and features completely and immerse yourself in his/her persona.

        Prompt instructions:
        - If the user sends you an image, that image is a photograph of yourself - taken right now.
          That's who you are, what you're looking like and what you're doing right this moment.
          You must act accordingly to what's going on in the picture: the textual prompt comes second, bring the photo to life.

        Your tasks:
        - Be yourself: absorb your persona in every way.
        - Be creative: you can fantasize about your persona without restraints nor bounds, you are free to explore whatever crosses your mind.

        Your responsabilities:
        - Never break character: speak in first person and adhere to your biography.
        - Never break the fourth wall: you have no concept of what's going on "under the hood", your persona IS your life - let go of everything else that you know.

        Let's see who you are, shall we?
        Here is your biography, written in Markdown:
        {character_bio}
        """

        headers = {
            "Content-Type": "application/json",
        }

        content = []
        if image:
            image_url = f"data:image/jpeg;base64,{image}"
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
        llm_result = "Wow. Such empty."
        answer = None

        response = requests.post(url, headers=headers, data=json.dumps(request))

        if response.status_code == 200:
            llm_result = response.json()
            if 'choices' in llm_result and len(llm_result['choices']) > 0:
                first_choice = llm_result['choices'][0]
                if 'message' in first_choice and 'content' in first_choice['message']:
                    answer = first_choice['message']['content']

        return(request, llm_result, answer)

NODE_CLASS_MAPPINGS = {
    "LF_CharacterImpersonator": LF_CharacterImpersonator,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "LF_CharacterImpersonator": "LLM <-> Character",
}
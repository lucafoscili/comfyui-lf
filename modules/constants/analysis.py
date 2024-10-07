def get_usage_filename(resource): 
    if resource == "checkpoints":
        return "checkpoints_usage.json"
    if resource == "embeddings":
        return "embeddings_usage.json"
    if resource == "loras":
        return "loras_usage.json"
    if resource == "samplers":
        return "samplers_usage.json"
    if resource == "schedulers":
        return "schedulers_usage.json"
    if resource == "upscale_models":
        return "upscale_models_usage.json"
    if resource == "vaes":
        return "vaes_usage.json"
    
def get_usage_title(filename, type=None): 
    if filename == "checkpoints_usage.json":
        return "\n## Checkpoints:\n" if type == "markdown" else "Checkpoint name"
    if filename == "embeddings_usage.json":
        return "\n## Embeddings:\n" if type == "markdown" else "Embedding name"
    if filename == "loras_usage.json":
        return "\n## LoRAs:\n" if type == "markdown" else "LoRA name"
    if filename == "samplers_usage.json":
        return "\n## Samplers:\n" if type == "markdown" else "Sampler name"
    if filename == "schedulers_usage.json":
        return "\n## Schedulers:\n" if type == "markdown" else "Scheduler name"
    if filename == "upscale_models_usage.json":
        return "\n## Upscale models:\n" if type == "markdown" else "Upscale model name"
    if filename == "vaes_usage.json":
        return "\n## VAEs:\n" if type == "markdown" else "VAE name"
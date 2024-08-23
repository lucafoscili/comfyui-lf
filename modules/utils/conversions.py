
def cleanse_lora_tag(lora_tag: str, separator: str):
    # Remove the <lora: and last '>': part to get the safetensors file name and weight
    safetensors_info = lora_tag[len('<lora:'):][:-1]
    
    # Split the safetensors_info by ':' to separate the file name and weight
    file_name_with_weight = safetensors_info.split(':')
    if len(file_name_with_weight) > 1:
        file_name, _ = file_name_with_weight
    else:
        file_name = file_name_with_weight[0]
    
    # Split the file name by '\\' to separate the file name and the folder containing it
    file_name_with_folder = file_name.split('\\')
    if len(file_name_with_folder) > 1:
        _, file_name = file_name_with_folder
    else:
        file_name = file_name_with_folder[0]
    
    # Split the file name by '.safetensors' to separate the file name and the extension
    file_name_with_extension = file_name.split('.safetensors')
    if len(file_name_with_extension) > 1:
        file_name, _ = file_name_with_extension
    else:
        file_name = file_name_with_extension[0]
    # Extract keywords from the file name
    if str(file_name).find(separator) > 1:
        keywords = ', '.join(file_name.split(separator))
    else: 
        keywords = file_name
    # Join keywords into a string to replace the lora tag
    # Assuming keywords can be a single string or a list of strings
    if isinstance(keywords, str):
    # If keywords is a single string, keep it as is
        keyword_str = keywords
    elif isinstance(keywords, list):
        keyword_str = ''.join(keywords[:-1]) + ', ' + keywords[-1]
    else:
        raise ValueError("keywords must be a string or a list of strings")
    
    return keyword_str

def count_words_in_comma_separated_string(input_string):
    words_list = input_string.split(',')
    word_count = len(words_list)
    return word_count
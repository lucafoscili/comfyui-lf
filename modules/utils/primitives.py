import json

def convert_to_boolean(text):
    text_lower = text.strip().lower()
    if text_lower in ['true', 'yes']:
        return True
    elif text_lower in ['false', 'no', '']:
        return False
    return None

def convert_to_float(text):
    try:
        return float(text)
    except ValueError:
        return None
    
def convert_to_int(text):
    try:
        return int(text)
    except ValueError:
        return None
    
def convert_to_json(text):
    try:
        return json.loads(text)
    except (json.JSONDecodeError, TypeError):
        return None

def extract_nested(text, start_delim, end_delim):
    stack = []
    start_idx = None
    extracted = []
    for idx, char in enumerate(text):
        if char == start_delim:
            if not stack:
                start_idx = idx
            stack.append(start_delim)
        elif char == end_delim and stack:
            stack.pop()
            if not stack:
                extracted.append(text[start_idx + 1:idx])
    return ''.join(extracted) if extracted else ""
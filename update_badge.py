import os

def count_nodes_in_file(file_path):
    try:
        with open(file_path, "r") as file:
            content = file.read()
        print(f"Parsing file: {file_path}")
        print("---")
        mappings_start = content.find('NODE_DISPLAY_NAME_MAPPINGS = {')
        mappings_end = content.find('}', mappings_start)
        if mappings_start != -1 and mappings_end != -1:
            mappings_content = content[mappings_start:mappings_end+1]
            exec(mappings_content, globals())
            node_class_mappings = globals().get('NODE_DISPLAY_NAME_MAPPINGS', {})
            return len(node_class_mappings.keys()) if callable(node_class_mappings.keys) else len(node_class_mappings)
    except Exception as e:
        print(f"Error parsing file {file_path}: {str(e)}")
        return 0

def count_all_nodes(directory):
    node_counts = {}
    for filename in os.listdir(directory):
        if filename.endswith(".py") and filename != "__init__.py":
            file_path = os.path.join(directory, filename)
            count = count_nodes_in_file(file_path)
            node_counts[filename] = count
    return node_counts

def generate_badge(counts):
    total_nodes = sum(counts.values())
    badge = f"![Node Count](https://img.shields.io/badge/Node%20Count-{total_nodes}-brightgreen)"
    return badge

def update_readme(badge):
    readme_file = "README.md"
    
    with open(readme_file, "r") as file:
        content = file.readlines()

    with open(readme_file, "w") as file:
        for line in content:
            if line.strip().startswith("![Node Count]"):
                file.write(f"{badge}\n")
            else:
                file.write(line)

if __name__ == "__main__":
    directory = "modules/nodes"  # Update this path if needed
    node_counts = count_all_nodes(directory)
    badge_markdown = generate_badge(node_counts)
    
    # Update the README with the new badge
    update_readme(badge_markdown)

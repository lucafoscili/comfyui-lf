import os
import ast

def count_nodes_in_file(file_path):
    with open(file_path, "r") as file:
        tree = ast.parse(file.read(), filename=file_path)

    node_class_mappings = None
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == 'NODE_CLASS_MAPPINGS':
                    if isinstance(node.value, ast.Dict):
                        node_class_mappings = node.value
                        break
        if node_class_mappings:
            break

    if node_class_mappings:
        return len(node_class_mappings.keys())
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

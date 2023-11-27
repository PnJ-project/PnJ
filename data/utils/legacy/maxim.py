import json

# Define a function to process each line
def process_line(line):
    parts = line.split("-")
    print(parts)

    data = {
        "author": parts[1].strip() if len(parts)==2 else "",
        "maxim": parts[0][5:].strip(),
    }
    if data["maxim"][-1] != ".":
        data["maxim"] += "."
    if len(parts) == 2:
        return data
    else:
        return None

# Define a function to convert the txt file to JSON
def txt_to_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        maxims = [process_line(line.strip()) for line in file if process_line(line.strip())]

    return json.dumps(maxims, ensure_ascii=False, indent=4)

# Use the function on your file
json_output = txt_to_json('maxim.txt')

# Optionally, save the result to a JSON file
with open('maxim.json', 'w', encoding='utf-8') as json_file:
    json_file.write(json_output)

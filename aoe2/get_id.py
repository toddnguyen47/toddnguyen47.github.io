import re

def replace_special_chars(str_input):
    special_chars = ["\\", "\"", ".", "(", ")"]
    for char in special_chars:
        str_input = str_input.replace(char, "".join(("\\", char)))

    return str_input


f = "index.html"

with open(f, "r") as file:
    data = file.read()

pattern = r"<a[\s]+?href=\"https://ageofempires\.wikia\.com[\s\S]+?</a>"
iter1 = re.finditer(pattern, data)

for elem in iter1:
    found_str = elem.group()
    found_str_pattern = replace_special_chars(found_str)

    pattern = r"(?<=>)[\s\S]+(?=</)"
    new_id = re.search(pattern, found_str).group().strip().lower().replace(" ", "_")
    new_id_str = "".join(("id=\"", new_id, "\" href="))

    found_str_replacement = found_str.replace("href=", new_id_str)

    data = re.sub(found_str_pattern, found_str_replacement, data)

with open(f, "w") as file:
    file.write(data)

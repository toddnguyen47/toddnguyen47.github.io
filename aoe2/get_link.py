import re

input2 = input("Link: ")

pattern = r"(?:/wiki/)([\s\S]*)"
match_obj = re.search(pattern, input2)
if match_obj:
    link_name = match_obj.group(1)

pattern = "\_\(Age_of[\s\S]*"
link_name = re.sub(pattern, "", link_name)
link_name = link_name.replace("_", " ")

str1 = "<td><a href=\"{}\" target=\"_blank\">{}</a></td>".format(input2, link_name)
with open("output.txt", "w") as file:
	file.write(str1 + "\n")

print(str1)


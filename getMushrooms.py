import requests
import json
from bs4 import BeautifulSoup
import regex as re


print("Mushrooms!")
url = "https://www.pilzfinder.de/pilze.html"
response = requests.get(url)

html = BeautifulSoup(response.content, "html.parser")
headlines = html.find_all('h3')
mushrooms = html.find_all("div", {"class": "mushroom-container"})

data = {}
data["Pilze"] = []
data["Adjektive"] = []
adList = []

for shroom in mushrooms:
    adjective = ""
    name = shroom.find("h3").get_text()
    latinName = shroom.find("h4").get_text()
    isMaskuline = 1
    isPoisonous = 0

    if re.search(' +', name):
        p = re.compile(r'(\S*)')
        placeholder = p.findall(name)
        if len(placeholder) > 3:
            adjective = placeholder[0]
            name = placeholder[2]

    if shroom.find("div", {"class": "danger"}):
        isPoisonous = 1
    if ((name[-1:] == "e") | (name[-6:] == "orchel")) & (name[-4:] != "hase"):
        isMaskuline = 0
    if (name[-3:] == "ohr"):
        isMaskuline = 2

    data["Pilze"].append({
        "Adjektiv": adjective,
        "Name": name,
        "Lateinisch": latinName,
        "Giftig": isPoisonous,
        "Genus": isMaskuline
    })

    if adjective != "":
        if (adjective[-1:] == "s") | (adjective[-1:] == "r"):
            adjective = adjective[:-2]
        if adjective[-1:] == "e":
            adjective = adjective[:-1]

        if adjective not in adList:
            data["Adjektive"].append(adjective)

        adList.append(adjective)

with open('data.json', 'w', encoding='utf8') as outfile:
    json.dump(data, outfile, ensure_ascii=False)
import requests
import json
r = requests.get("http://127.0.0.1:8000/bulk_items/?entity_id=4931&format=json")
main_json = json.loads(r.text)

p = [item['entity_timestamp'] * 1000 for item in main_json if item['item'] == 4931]
q = [item['min_price'] for item in main_json if item['item'] == 4931]

print(p)
print(q)

r = requests.get("http://127.0.0.1:8000/bulk_items/?entity_id=5273&format=json")
main_json = json.loads(r.text)


x = [item['entity_timestamp'] * 1000 for item in main_json if item['item'] == 5273]
y = [item['min_price'] for item in main_json if item['item'] == 5273]

print(x)
print(y)
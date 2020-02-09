import requests
import json
url = "http://localhost:8080/restaurants"

payload = {}
headers = {
  'api-key': '88303f66-0fc5-4b97-adab-490634908445'
}

response = requests.request("GET", url, headers=headers, data = payload)
response = response.text.encode('utf8')

response2 = json.loads(response)
branches = response2[1]['restaurant_branches']
for branch in branches:
    print(branches[branch]['branch_name'])

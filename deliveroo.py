import requests
import json
url = "https://roo-api-sandbox.deliveroo.net/restaurants"

payload = {}
headers = {
  'api-key': 'ab764166-02d3-4335-b8d7-d6e06d139c2f'
}

response = requests.request("GET", url, headers=headers, data = payload)
response = response.text.encode('utf8')

response2 = json.loads(response)
branches = response2[1]['restaurant_branches']
for branch in branches:
    print(branches[branch]['branch_name'])

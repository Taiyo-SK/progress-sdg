# exploring the UN's SDG API

import requests
import json

# 1. Getting a list of all 17 goals

# goal_list = requests.get('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false')

# goals = goal_list.json()

# for goal in goals:
#     code = goal['code']
#     name = goal['title']
#     descr = goal['description']
#     uri = goal['uri']
#     print(f'{code}. {name}: \n {descr} \n {uri}')

# 2. Getting progress on each goal
# payload = {'dataPointType': '2', 'natureOfData': 'All'}
url = 'https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetWorldbyGoal'
data = 'dataPointType=1&natureOfData=All'
headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}
res = requests.post(url, data=data, headers=headers)
print(res.text)

### TO DO###
# add goals to database (requires set up of database, crud, seed, etc.)


# I think the right link is: https://unstats.un.org/SDGAPI/v1/sdg/
# goal_targets = res.json()


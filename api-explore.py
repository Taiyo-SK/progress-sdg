# exploring the UN's SDG API

import requests

# 1. Getting a list of all 17 goals

goal_list = requests.get('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false')

goals = goal_list.json()

for goal in goals:
    code = goal['code']
    name = goal['title']
    descr = goal['description']
    uri = goal['uri']
    print(f'{code}. {name}: \n {descr} \n {uri}')


### TO DO###
# add goals to database (requires set up of database, crud, seed, etc.)

# res = requests.post('https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetWorldbyGoal', data=payload)
# print(res.text)

# I think the right link is: https://unstats.un.org/SDGAPI/v1/sdg/
# goal_targets = res.json()


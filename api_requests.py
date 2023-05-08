"""Gathers goal and progress data from UN SDG API."""

import requests

### 1. Getting list of goals
goal_results = requests.get('https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false')
goals_list = goal_results.json()

def print_goal(goals_list):
    """Return output of each goal."""

    for goal in goals_list:
        code, title, description, uri = (
            goal['code'],
            goal['title'],
            goal['description'],
            goal['uri'],
        )

        print(f'{code}. {title}: \n {description} \n {uri}')


### 2. Getting list of progress data

url = 'https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetWorldbyGoal'
data = 'dataPointType=2&natureOfData=All'
headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}

progress_results = requests.post(url, data=data, headers=headers)
progress_list = progress_results.json()


def print_progress(progress_list):
    """Output each goal's progress."""

    for item in progress_list:
        goal = item['goal']
        years = item['years']
        percentage = item['percentage']
        print(f'Goal {goal}. \n Years: {years} \n Percentage: {percentage}')




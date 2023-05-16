"""Gathers goal and progress data from UN SDG API."""

import crud
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


### 2. Getting list of goal progress data

goal_url = 'https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetWorldbyGoal'
goal_data = 'dataPointType=2&natureOfData=All'
goal_headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}

goal_progress_results = requests.post(goal_url, data=goal_data, headers=goal_headers)
goal_progress_list = goal_progress_results.json()


def print_goal_progress(progress_list):
    """Output each goal's progress."""

    for item in progress_list:
        goal = item['goal']
        years = item['years']
        percentage = item['percentage']
        print(f'Goal {goal}. \n Years: {years} \n Percentage: {percentage}')


### 3. Getting list of indicators and their progress data

ind_url = 'https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetIndicatorsAllCountries'
ind_data = 'dataPointType=2&countryId=0&natureOfData=All'
ind_headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}

ind_progress_results = requests.post(ind_url, data=ind_data, headers=ind_headers)
ind_progress_list = ind_progress_results.json()

def ind_progress_data(ind_progress_list):
    """Output each indicator's description and progress, organized by goal."""

    progress_data = []
    for goal in ind_progress_list:
        goal_code = goal['goalId']
        indicators = goal['indicators']
        
        for indicator in indicators:
            code = indicator['code']
            description = indicator['description']
            percentage = indicator['percentage']

            ind_dict = {
                'code': code,
                'goal': goal_code,
                'description': description,
                'percentage': percentage
            }
            
            progress_data.append(ind_dict)

    return progress_data
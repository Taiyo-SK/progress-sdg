"""Seeding database using the UN's SDG API."""

import os
import json
# import api_requests 
## decided it was better to save api output as static json file

import crud
import model
import server

os.system('dropdb sdgprogress')
os.system('createdb sdgprogress')

model.connect_to_db(server.app)
model.db.create_all()


### 1. Goals

# need to load it in

with open('static/data/goals.json') as f:
    goals_list = json.loads(f.read())

goals_in_db = []
for goal in goals_list:
    code, title, description, uri = (
        goal['code'],
        goal['title'],
        goal['description'],
        goal['uri'],
    )

    db_goal = crud.create_goal(code, title, description, uri)
    goals_in_db.append(db_goal)

model.db.session.add_all(goals_in_db) 
model.db.session.commit()


### 2. Progress data

with open('static/data/progress.json') as w:
    progress_list = json.loads(w.read())

progress_in_db = []
for entry in progress_list:
    code, years_to_date, progress = (
        entry['goal'],
        entry['years'],
        entry['percentage'],
        )

    db_progress_entry = crud.enter_progress_data(code, years_to_date, progress)
    progress_in_db.append(db_progress_entry)

model.db.session.add_all(progress_in_db) 
model.db.session.commit()
"""Server for ProgressSDG app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined

## Local Imports
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined


### Routes and views

@app.route('/')
def view_goals():
    """Load the spa. View a list of all SDGs via the navbar dropdown."""

    goals = crud.get_goals()

    return render_template('goals.html', goals=goals)


@app.route('/progress_data.json/<code>')
def get_goal_progress_data(code):
    """Fetch progress data for a specific SDG.

    Progress is defined as a percentage.

    Years_to_date represents the number of years since the SDG began,
    up until progress data was last provided.
    """

    progress_data = crud.get_progress_by_goal(code)

    indicators_sqla_objs = progress_data.goal.indicator
    indicators_list = []
    for ind_obj in indicators_sqla_objs:
        indicator_dict = { 'id': ind_obj.id, 
                            'description': ind_obj.description, 
                            'progress': ind_obj.progress
                            }

        indicators_list.append(indicator_dict)

    return jsonify(
            code = progress_data.code,
            title = progress_data.goal.title,
            description = progress_data.goal.description,
            progress = progress_data.progress,
            ytd = progress_data.years_to_date,
            indicators = indicators_list,
            )


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
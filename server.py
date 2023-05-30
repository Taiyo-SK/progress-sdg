"""Server for SDGs progress app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined

## Local Imports
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined


### Routes and views

### Goals/homepage


@app.route('/')
def view_goals():
    """View all SDGs. Acts as homepage."""

    goals = crud.get_goals()
    # progress = crud.get_progress() # might not need? trying to fix the goal cards

    return render_template('goals.html', goals=goals) #progress=progress


@app.route('/goals/<code>')
def show_goal(code):
    """Show details on a particular SDG."""

    progress = crud.get_progress_by_goal(code)
    indicators = crud.get_indicators_by_goal(code)

    return render_template('goal_details.html', progress=progress, indicators=indicators)


@app.route('/progress_data.json/<code>')
def get_goal_progress_data(code):
    """Get progress data for a specific SDG.

    Progress is defined as a percentage.

    Years_to_date represents the number of years since the SDG began,
    up until progress data was last provided.
    """

    # 1. Get progress data using crud function
    ## This is returned as SQLA object--need to turn it into a dictionary
    ## Turn Python dict into JSON

    progress_data = crud.get_progress_by_goal(code)

    indicators_sqla_objs = progress_data.goal.indicator
    indicators_list = []
    for ind_obj in indicators_sqla_objs:
        indicator_dict = { 'id': ind_obj.id, 
                            'description': ind_obj.description, 
                            'progress': ind_obj.progress
                            }

        indicators_list.append(indicator_dict)

    # {2.1.1: Prevalence of undernourishment, 69.171}


    return jsonify(
            code = progress_data.code,
            title = progress_data.goal.title,
            description = progress_data.goal.description,
            progress = progress_data.progress,
            ytd = progress_data.years_to_date,
            indicators = indicators_list,
            )


### Indicators


@app.route('/indicators')
def view_indicators():
    """View all SDG indicators."""

    indicators = crud.get_indicators()

    return render_template('indicators.html', indicators=indicators)


@app.route('/indicators/<id>')
def show_indicator(id):
    """Show progress and description of a specific indicator."""

    ind_details = crud.get_details_by_indicator(id)

    return render_template('indicator_details.html', ind_details=ind_details)


@app.route('/indicator_data.json/<id>')
def get_indicator_progress_data(id):
    """Get progress data for a specific indicator.
    
    Progress is defined as a percentage."""

    progress_data = crud.get_details_by_indicator(id)

    return jsonify(progress=progress_data.progress)


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
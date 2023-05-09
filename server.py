"""Server for SDGs progress app."""

from flask import Flask, render_template, request, flash, session, redirect
from jinja2 import StrictUndefined

## Local Imports
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined


### Routes and views


@app.route('/')
def homepage():
    """View homepage."""

    return render_template('homepage.html')


@app.route('/goals')
def view_goals():
    """View all goals."""

    goals = crud.get_goals()

    return render_template('goals.html', goals=goals)


@app.route('/goal_details/<code>')
def show_goal(code):
    """Show details on a particular goal."""

    goal = crud.get_progress_by_goal()

    return render_template('goal_details.html', goal=goal)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
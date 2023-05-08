"""Server for SDGs progress app."""

from flask import Flask, render_template, request, session, redirect

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route("/")
def homepage():
    """View homepage."""

    # goals = crud.get_goals()

    return render_template("homepage.html")


@app.route("/goal_details/<goal_id>")
def show_goal(goal_id):
    """Show details on a particular goal."""

    # Will add here. goals = crud.get_goal_by_id()

    return render_template("mgoal_details.html", goal=goal)

if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)
"""CRUD functions for SDG progress app."""

from model import db, Goal, Progress, connect_to_db


### CREATE functions


def create_goal(code, title, description, uri):
    """Create and return a new SDG."""

    goal = Goal(code=code, 
                title=title, 
                description=description, 
                uri=uri)

    return goal

def enter_progress_data(code, years_to_date, progress, deadline=15):
    """Create and return a new entry for goal progress."""

    progress_entry = Progress(code=code, 
                              years_to_date=years_to_date, 
                              progress=progress, 
                              deadline=deadline)

    return progress_entry


### GET functions


def get_goals():
    """Return all goals."""

    return Goal.query.all()

def get_progress_by_goal(code):
    """Return the most up to date progress for a specific goal."""

    return Progress.query.get(code)


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

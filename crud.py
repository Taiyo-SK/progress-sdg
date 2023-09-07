"""CRUD functions for ProgressSDG app."""

from model import db, Goal, Progress, Indicator, connect_to_db


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


def enter_ind_data(id, goal_code, description, progress):
    """Create and return a new entry for an indicator and its progress."""

    ind_entry = Indicator(id=id,
                          goal_code=goal_code,
                          description=description,
                          progress=progress)

    return ind_entry

    
### GET functions

def get_goals():
    """Return all goals."""

    return Goal.query.all()


def get_progress_by_goal(code):
    """Return the most up to date progress for a specific goal."""

    return Progress.query.filter_by(code=code).one()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

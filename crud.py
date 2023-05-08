"""CRUD functions for SDG progress app."""

from model import db, Goal, Progress, connect_to_db


def create_goal(code, title, description, uri):
    """Create and return a new SDG."""

    goal = Goal(code=code, title=title, description=description, uri=uri)

    return goal

def enter_progress_data(code, years, percentage, deadline=15):
    """Create and return a new entry for goal progress."""

    progress_entry = Progress(code=code, years=years, percentage=percentage, deadline=deadline)

    return progress_entry
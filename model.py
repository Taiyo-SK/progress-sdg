"""Models for SDG progress app."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Goal(db.Model):
    """A Sustainable Development Goal."""

    # Will add later.

def connect_to_db(flask_app, db_uri="postgresql:///sdgprogress", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to your db ;)")

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
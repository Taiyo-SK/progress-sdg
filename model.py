"""Models for SDG progress app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Goal(db.Model):
    """A Sustainable Development Goal."""

    __tablename__ = 'goals'

    code = db.Column(db.Integer, primary_key=True) #'code'
    title = db.Column(db.String(200)) # 'title'
    description = db.Column(db.Text) #'description'
    uri = db.Column(db.String(20)) #'uri'

    progress = db.relationship('Progress', back_populates='goal')

    def __repr__(self):
        return f"<Goal {self.code}: {self.title}>"

class Progress(db.Model):
    """A Sustainable Development Goal's most recent progress."""

    __tablename__ = 'progress_data'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    code = db.Column(db.Integer, db.ForeignKey('goals.code')) # 'goal'
    years = db.Column(db.Float) # 'years'
    percentage = db.Column(db.Float) # 'percentage'
    deadline = db.Column(db.Integer)

    goal = db.relationship('Goal', back_populates='progress')

    def __repr__(self):
        return f"<Progress for SDG {self.code}: {self.percentage}% over >"

def connect_to_db(flask_app, db_uri='postgresql:///sdgprogress', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to your db ;)')

if __name__ == '__main__':
    from server import app

    connect_to_db(app)
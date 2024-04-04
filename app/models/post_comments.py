from flask_sqlalchemy import SQLAlchemy
from .db import db, environment

class PostComment(db.Model):
    __tablename__ = "post_comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False,)

    #Post Comments has a Many to one relationship with posts, users
    post = db.relationship('Post', back_populates="comments")
    user = db.relationship('User', back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "body": self.body,
            "date_created": self.date_created.isoformat(),
            "author": self.user.username
        }
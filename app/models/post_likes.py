from flask_sqlalchemy import SQLAlchemy
from .db import db, environment

class PostLike(db.Model):
    __tablename__ ="post_likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    # Post Likes has a many <= one relationship with users and posts

    user = db.relationship('User', back_populates="likes")
    posts = db.relationship('Post', back_populates="likes")

    def to_dict(self):
            return {
                "id": self.id,
                "user_id": self.user_id,
                "post_id": self.post_id
            }
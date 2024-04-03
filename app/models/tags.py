from flask_sqlalchemy import SQLAlchemy
from .db import db, environment
from .posts import tag_post_association

class Tag(db.Model):
    __tablename__= "tags"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)

    #Tags has a many to one relationship with tags
    user = db.relationship('User', back_populates="tags")

    #Tags has a many to many relationship with posts

    tag_posts = db.relationship('Post', secondary=tag_post_association, back_populates='post_tags')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }
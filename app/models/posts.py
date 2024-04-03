from flask_sqlalchemy import SQLAlchemy
from .db import db, environment

tag_post_association = db.Table('post_tag',
    db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True),
)

class Post(db.Model):
    __tablename__ = "posts"


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)

    # Posts has a one => many relationship with PostLikes, PostComments
    comments = db.relationship('PostComment', back_populates='post')
    likes = db.relationship('Like', back_populates='post')

    #Posts has a many <= one relationship with Users
    user = db.relationship('User', back_populates='posts')
    
    # Posts has a many <=> many relationship with PostTags
    post_tags = db.relationship('Tag', secondary=tag_post_association, back_populates="tag_posts")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "date_created": self.date_created
        }
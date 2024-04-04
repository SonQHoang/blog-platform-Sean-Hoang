from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class PostCommentForm(FlaskForm):
    userId = IntegerField("user_id",validators=[DataRequired()])
    comment = StringField("Caption", validators=[DataRequired()])
    postId = IntegerField("post_id", validators=[DataRequired()]) 
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired

class NewPostForm(FlaskForm):
    user_id = IntegerField('User_Id')
    title = StringField("Title", validators=[DataRequired()])
    content = StringField("Content", validators=[DataRequired()])
    date_created = DateField("Date Created")
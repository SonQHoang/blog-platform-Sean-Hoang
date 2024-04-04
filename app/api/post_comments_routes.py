from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.post_comments_form import PostCommentForm
from datetime import datetime
from ..models.db import db
from app.models import PostComment
from .auth_routes import validation_errors_to_error_messages

post_comments_routes = Blueprint('comments', __name__, url_prefix="")

def post_comment_validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'A post {field} is required')
    return errorMessages

@post_comments_routes.route('/new', methods=['POST'])
@login_required
def new_comment():
    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = PostComment(
            user_id=current_user.id,
            body=form.comment.data,
            post_id=form.postId.data,
            date_created=datetime.utcnow()
        )

        db.session.add(comment)
        db.session.commit()

        return jsonify(comment.to_dict())
    else:
        return jsonify({"errors": form.errors}), 400

@post_comments_routes.route('/posts/<int:postId>', methods=['GET'])
def get_post_comments(postId):
    all_comments = PostComment.query.all()
    comments_list = [comment.to_dict() for comment in all_comments]
    return jsonify(comments_list)
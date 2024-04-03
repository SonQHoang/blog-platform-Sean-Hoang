from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.create_post_form import NewPostForm
from ..forms.update_post_form import UpdatePostForm
from datetime import datetime
from ..models.db import db
from app.models import Post
from .auth_routes import validation_errors_to_error_messages



post_routes = Blueprint('posts', __name__, url_prefix="")


def story_validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'A post {field} is required')
    return errorMessages

@login_required
@post_routes.route('/new', methods=["POST"])
def new_post():
    form = NewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = request.json["title"]
        content = request.json["content"]
        post = Post(
            user_id=current_user.id,
            title=title,
            content=content,
            date_created=datetime.now()
        )

        db.session.add(post)
        db.session.commit()

        post_data = post.to_dict()
        post_data['author'] = current_user.username

        return jsonify(post_data)
    else:
        return jsonify({"errors": form.errors}), 400

@post_routes.route('/all', methods=["GET"])
def get_all_posts():
    all_posts = Post.query.all()
    posts_list = [post.to_dict() for post in all_posts]
    return jsonify(posts_list)

@login_required
@post_routes.route('/<int:post_id>/update', methods=["PUT"])
def update_post(post_id):
    form = UpdatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get_or_404(post_id)
    if form.validate_on_submit():
        if post.user_id != current_user.id:
            return jsonify({"message": "You cannot edit a post that is not your own"}), 401

        post.title = form.title.data
        post.content = form.content.data
        post.date_udpated = datetime.utcnow()
        db.session.commit()

        return jsonify(post.to_dict())
    else:
        return jsonify({"errors": form.errors})

@login_required
@post_routes.route('/<int:post_id>/delete', methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post.user_id != current_user.id:
        return jsonify({"message": "You cannot delete a post that is not your own"}), 401

    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
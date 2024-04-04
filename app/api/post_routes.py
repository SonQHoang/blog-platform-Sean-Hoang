from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..forms.create_post_form import NewPostForm
from ..forms.update_post_form import UpdatePostForm
from datetime import datetime
from ..models.db import db
from app.models import Post, Tag
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__, url_prefix="")


def post_validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append('A post {field} is required')
    return errorMessages

@login_required
@post_routes.route('/new', methods=["POST"])
def new_post():
    form = NewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = request.json
        title = request.json["title"]
        content = request.json["content"]
        tag_names = sorted([tag_name.capitalize() for tag_name in data.get("tags", [])])

        post = Post(
            user_id=current_user.id,
            title=title,
            content=content,
            date_created=datetime.now(),
        )

        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(user_id=current_user.id, name=tag_name)
                db.session.add(tag)
            post.post_tags.append(tag)

        db.session.add(post)
        db.session.commit()

        post_data = post.to_dict()
        post_data['tags'] = sorted([tag.name for tag in post.post_tags])
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
    data = request.get_json()
    
    form = UpdatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get_or_404(post_id)
    if form.validate_on_submit():
        if post.user_id != current_user.id:
            return jsonify({"message": "You cannot edit a post that is not your own"}), 401

        post.title = form.title.data
        post.content = form.content.data
        post.date_updated = datetime.utcnow()

        # Adding Tags
        updated_tags = [tag.capitalize() for tag in data.get('tags', [])]
        updated_tags.sort()
        current_tags = {tag.name for tag in post.post_tags}

        #Removing Tags
        for tag in list(post.post_tags):
            if tag.name not in updated_tags:
                post.post_tags.remove(tag)

        for tag_name in updated_tags:
            if tag_name not in current_tags:
                tag = Tag.query.filter_by(name=tag_name).first()
                if not tag:
                    tag = Tag(name=tag_name, user_id=current_user.id)
                    db.session.add(tag)
                post.post_tags.append(tag)

        db.session.commit()

        post_data = post.to_dict()
        post_data['tags'] = sorted([tag.name.capitalize() for tag in post.post_tags])

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

@post_routes.route('/<int:post_id>', methods=["GET"])
def get_post_by_id(post_id):
    post = Post.query.get(post_id)

    if post is None:
        return jsonify({"error": "Post not found"}), 404
    
    post_data = post.to_dict()
    return jsonify(post_data)

@post_routes.route('/search')
def search_posts():
    query = request.args.get('query', '')
    if query:
        search = f"%{query}"
        posts = Post.query.filter(
            db.or_(
                Post.title.ilike(search),
                Post.content.ilike(search),
                Post.tags.any(Tag.name.ilike(search))

            )
        ).all()
        return jsonify([post.to_dict() for post in posts])
    else:
        return jsonify([])
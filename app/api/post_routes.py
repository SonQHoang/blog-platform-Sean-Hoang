from flask import Blueprint, request, jsonify

post_routes = Blueprint('posts', __name__)
session = db.session


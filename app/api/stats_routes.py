from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

stats_routes = Blueprint('stats', __name__)


@stats_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

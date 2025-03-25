from flask import Blueprint, jsonify

flask_routes = Blueprint("flask_routes", __name__)

@flask_routes.route("/")
def home():
    return jsonify({"message": "Welcome to Flask API!"})

@flask_routes.route("/flask-endpoint")
def flask_data():
    return jsonify({"message": "Flask endpoint is working!"})

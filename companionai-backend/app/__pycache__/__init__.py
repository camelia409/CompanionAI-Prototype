from flask import Flask
from .routes import flask_routes

# Initialize Flask App
flask_app = Flask(__name__)

# Register Routes
flask_app.register_blueprint(flask_routes)

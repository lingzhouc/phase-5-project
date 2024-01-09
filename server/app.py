#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
import models

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# @app.before_request
# def check_logged_id():
#     if request.endpoint in ["productions"] and not session.get("user_id"):
#         return make_response({"error": "Unauthorized. Please log in."})

if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Card, User, Review

# Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

# @app.before_request
# def check_logged_id():
#     if request.endpoint in ["productions"] and not session.get("user_id"):
#         return make_response({"error": "Unauthorized. Please log in."})


class Cards(Resource):
    def get(self):
        card_list = [card.to_dict() for card in Card.query.all()]
        return make_response(card_list, 200)

api.add_resource(Cards, "/cards")

class CardById(Resource):
    def get(self, id):
        card = Card.query.get(id)
        if not card:
            return make_response({"error": "Card not found"}, 404)
        return make_response(card.to_dict(), 200)

api.add_resource(CardById, "/cards/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)


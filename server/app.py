#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource, reqparse

# Local imports
from config import app, db, api

# Add your model imports
from models import Card, User, Review
import traceback

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

class CardReviews(Resource):
    def get(self, id):
        try:
            card = Card.query.get(id)
            if not card: 
                return make_response({"error": "Card not found"}, 404)
            
            reviews = Review.query.filter_by(card_id=id).all()
            review_list = [review.to_dict() for review in reviews]
            return make_response(review_list, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

    def patch(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument("id", type=int, required=True, help="Review id is required.")
        parser.add_argument("review", type=str, required=True, help="Review content is required.")

        try:
            card = Card.query.get(id)
            if not card: return make_response({"error": "Card not found"}, 404)

            args = parser.parse_args()
            review_id = args["id"]
            new_review = args["review"]

            review = Review.query.get(review_id)
            if not review or review.card_id != id:
                return make_response({"error": "Review not found for the specified card"}, 404)
            
            review.review = new_review
            db.session.commit()

            return make_response(review.to_dict(), 200)
        except Exception as e:
            traceback.print_exc()
            return make_response({"error": str(e)}, 500)
            
    
api.add_resource(CardReviews, "/cards/<int:id>/reviews")

class Users(Resource):
    def get(self):
        user_list = [user.to_dict() for user in User.query.all()]
        return make_response(user_list, 200)

api.add_resource(Users, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"error": "User not found"}, 404)
        return make_response(user.to_dict(), 200)

api.add_resource(UserById, "/users/<int:id>")

class Reviews(Resource):
    def get(self):
        review_list = [review.to_dict() for review in Review.query.all()]
        return make_response(review_list, 200)

api.add_resource(Reviews, "/reviews")

class ReviewById(Resource):
    def get(self, id):
        review = Review.query.get(id)
        if not review:
            return make_response({"error": "Review not found"}, 404)
        return make_response(review.to_dict(), 200)

api.add_resource(ReviewById, "/reviews/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource, reqparse

# Local imports
from config import app, db, api

# Add your model imports
from models import Card, User, Review, Glossary
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
    
    def post(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument("cardId", type=int, required=True, help="Card id is required.")
        parser.add_argument("review", type=str, required=True, help="Review content is required.")
        parser.add_argument("userId", type=int, required=True, help="User id is required.")
        
        args = parser.parse_args()
        review = args["review"]
        user_id = args["userId"]

        if not review.strip():
            return make_response({"error": "Review cannot be empty"}, 400)

        card = Card.query.get(id)
        if not card:
            return make_response({"error": "Card not found"}, 404)
        
        user = User.query.get(user_id)
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        new_review = Review(review=review, card=card, user=user)

        try:
            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 500)
        
api.add_resource(CardReviews, "/cards/<int:id>/reviews")
        
class CardReviewsById(Resource):

    def patch(self, card_id, review_id):
        parser = reqparse.RequestParser()
        parser.add_argument("review", type=str, required=True, help="Review content is required.")

        try:
            card = Card.query.get(card_id)
            if not card: return make_response({"error": "Card not found"}, 404)

            args = parser.parse_args()
            new_review = args["review"]

            review = Review.query.get(review_id)
            if not review:
                return make_response({"error": "Review not found for the specified card"}, 404)
            
            review.review = new_review
            db.session.commit()

            return make_response(review.to_dict(), 200)
        except Exception as e:
            traceback.print_exc()
            return make_response({"error": str(e)}, 500)
        
    def delete(self,card_id, review_id):
        try: 
            card = Card.query.get(card_id)
            if not card: return make_response({"error": "Card not found"}, 404)

            review = Review.query.get(review_id)
            if not review:
                return make_response({"error": "Review not found for the specified card"}, 404)
            
            db.session.delete(review)
            db.session.commit()

            return make_response({"message": "Review deleted successfully"}, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(CardReviewsById, "/cards/<int:card_id>/reviews/<int:review_id>")

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

class GlossaryItems(Resource):
    def get(self):
        glossary_list = [glossary.to_dict() for glossary in Glossary.query.all()]
        return make_response(glossary_list, 200)

api.add_resource(GlossaryItems, "/glossary")

if __name__ == '__main__':
    app.run(port=5555, debug=True)


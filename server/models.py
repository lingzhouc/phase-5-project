from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

import re

class Card(db.Model, SerializerMixin):
    __tablename__ = "cards"

    # serialize_rules
    serialize_rules = ("-reviews.card",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    img = db.Column(db.String, nullable=False)
    url = db.Column(db.String)
    issuer = db.Column(db.String, nullable=False)
    
    welcome_bonus = db.Column(db.String)
    annual_fee = db.Column(db.Integer, nullable=False)
    bal_trans_fee = db.Column(db.String)
    intro_apr = db.Column(db.String)
    reg_apr = db.Column(db.String)
    other_details = db.Column(db.Text)

    user_type = db.Column(db.String, nullable=False)
    secured = db.Column(db.Boolean, nullable=False)
    earnings = db.Column(db.String)

    # relationships & association
    reviews = db.relationship("Review", back_populates="card", cascade = "all, delete-orphan")
    users = association_proxy("reviews", "user")

    # validation
    @validates("name", "img", "url", "issuer", "welcome_bonus", "bal_trans_fee", "intro_apr", "reg_apr", "other_details", "cashback", "travel")
    def validate_string(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        return value
    
    @validates("annual_fee")
    def validate_fee(self, key, value):
        if value < 0:
            raise ValueError(f"{key} must be non-negative.")
        return value

    @validates("credit_score")
    def validate_credit_score(self, key, value):
        allowed_types = {"excellent", "good", "fair", "bad", "no credit"}
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        elif value not in allowed_types:
            raise ValueError(f"Credit score must be one of {', '.join(allowed_types)}.")
        return value  

    @validates("user_type")
    def validate_user_type(self, key, value):
        allowed_types = {"student", "personal", "business"}
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        elif value not in allowed_types:
            raise ValueError(f"User type must be one of {', '.join(allowed_types)}.")
        return value
    
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    # serialize_rules
    serialize_rules = ("-reviews.user",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(40), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    favorites = db.Column(db.String)

    # relationships & association
    reviews = db.relationship("Review", back_populates="user", cascade = "all, delete-orphan")
    cards = association_proxy("reviews", "card")

    # validation
    @validates("name", "username", "password", "favorites")
    def validate_string(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        return value

    @validates("email")
    def validate_email(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise ValueError(f"{key} is not a valid email address.")
        return value

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    # serialize_rules
    serialize_rules = ("-user.reviews", "-card.reviews")

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    card_id = db.Column(db.Integer, db.ForeignKey("cards.id"))

    # relationships & association
    user = db.relationship("User", back_populates="reviews")
    card = db.relationship("Card", back_populates="reviews")

    # validation
    @validates("review")
    def validate_review(self, key, value):
        max_length = 1000
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        elif len(value) > max_length:
            raise ValueError(f"{key} must not exceed {max_length} characters.")
        return value
    
class Glossary(db.Model, SerializerMixin):
    __tablename__ = "glossary"

    id = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String, nullable=False)
    definition = db.Column(db.String, nullable=False)
    more_info = db.Column(db.String)

    # validation
    @validates("term", "definition", "more_info")
    def validate_string(self, key, value):
        if not isinstance(value, str):
            raise TypeError(f"{key} must be a string not a {type(value)}.")
        return value
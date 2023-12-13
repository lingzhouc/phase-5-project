from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Card(db.Model, SerializerMixin):
    __tablename__ = "cards"

    # serialize_rules

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    img = db.Column(db.String)
    url = db.Column(db.String)
    issuer = db.Column(db.String)
    
    welcome_bonus = db.Column(db.String)
    annual_fee = db.Column(db.Integer)
    bal_trans_fee = db.Column(db.String)
    intro_apr = db.Column(db.String)
    reg_apr = db.Column(db.String)
    other_details = db.Column(db.Text)

    credit_score = db.Column(db.String)
    user_type = db.Column(db.String)
    secured = db.Column(db.Boolean)
    cashback = db.Column(db.String)
    travel = db.Column(db.String)

    # relationships & association

    # validation
    @validates("name", "img", "url", "issuer", "welcome_bonus", "bal_trans_fee", "intro_apr", "reg_apr", "other_details", "credit_score", "user_type", "cashback", "travel")
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
        if value not in allowed_types:
            raise ValueError(f"User type must be one of {', '.join(allowed_types)}.")
        return value  

    @validates("user_type")
    def validate_user_type(self, key, value):
        allowed_types = {"student", "personal", "business"}
        if value not in allowed_types:
            raise ValueError(f"User type must be one of {', '.join(allowed_types)}.")
        return value
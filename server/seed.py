#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Card, User, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        print("Deleting data...")
        Card.query.delete()
        User.query.delete()
        Review.query.delete()

        print("Creating and adding Cards")
        card1 = Card(
            name = "Chase Freedom Unlimited",
            img = "https://creditcards.chase.com/K-Marketplace/images/cardart/freedom_unlimited_card.png",
            url = "https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited",
            issuer = "JPMorgan Chase Bank",
    
            welcome_bonus = "$200 bonus after $500 in purchases for the first 3 months. Plus, for a limited time, \
5% cash back on gas station and grocery store purchases (excluding Target and Walmart) on up to $12,000 spent in the first year.",
            annual_fee = 0,
            bal_trans_fee = "0% APR for 15 months",
            intro_apr = "0% APR for 15 months",
            reg_apr = "20.49% to 29.24%* Variable",
            other_details = "",

            user_type = "personal",
            secured = False,
            earnings = "Earn unlimited 1.5% cash back or more, like 3% on dining and drugstores, 5% on travel purchased through Chase, and 1.5% on all other purchases."
        )

        card2 = Card(
            name = "Discover It Secured Credit Card",
            img = "https://cdn.wallethub.com/common/product/images/creditcards/500/discover-it-secured-credit-card-22062289c.png",
            url = "https://www.discover.com/credit-cards/secured/",
            issuer = "Discover Bank",
    
            welcome_bonus = "Cashback Match doubles cash back rewards earning at the end of the first year.",
            annual_fee = 0,
            bal_trans_fee = "See bank details",
            intro_apr = "",
            reg_apr = "28.24%* Variable",
            other_details = "",

            user_type = "personal",
            secured = True,
            earnings = "Earn 2% cash back at Gas Stations and Restaurants on up to $1,000 in combined purchases each quarter, automatically. Plus earn unlimited 1% cash back on all other purchases."
        )

        card3 = Card(
            name = "Amex Blue Business Cash Card",
            img = "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/open/category/cardarts/blue-business-cash.png",
            url = "https://www.americanexpress.com/en-us/business/credit-cards/blue-business-cash/",
            issuer = "American Express",
    
            welcome_bonus = "Earn a $250 statement credit after you make $3,000 in purchases on your Card in your first 3 months",
            annual_fee = 0,
            bal_trans_fee = "See issuer bank details*",
            intro_apr = "0% APR for 12 months",
            reg_apr = "18.49% to 26.49%* Variable",
            other_details = "",

            user_type = "business",
            secured = True,
            earnings = "Earn 2% cash back on everyday eligible business purchases (up to $50,000 per calendar year), then 1%. Cash back earned is automatically credited to your statement."
        )

        db.session.add_all([card1, card2, card3])
        db.session.commit()
        print("Finished seeding")

    



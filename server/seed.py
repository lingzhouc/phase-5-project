#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Card, User, Review, Glossary

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
    
            welcome_bonus = "$200 bonus after $500 in purchases within the first 3 months. Plus, for a limited time, \
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
            bal_trans_fee = "See issuing bank for details*",
            intro_apr = "0% APR for 12 months",
            reg_apr = "18.49% to 26.49%* Variable",
            other_details = "",

            user_type = "business",
            secured = True,
            earnings = "Earn 2% cash back on everyday eligible business purchases (up to $50,000 per calendar year), then 1%. Cash back earned is automatically credited to your statement."
        )

        card4 = Card(
            name = "Amex Gold Card",
            img = "https://icm.aexp-static.com/acquisition/card-art/NUS000000174_480x304_straight_withname.png",
            url = "https://www.americanexpress.com/us/credit-cards/card/gold-card/",
            issuer = "American Express",

            welcome_bonus = "60,000 MR points after $6,000 of spend within 6 months.",
            annual_fee = 250,
            bal_trans_fee = "",
            intro_apr = "",
            reg_apr = "",
            other_details = "$120/year dining credit, $120/year Uber Cash credit, $100 Hotel experience credit (with 2 nights minimum stay)",
            
            user_type = "personal",
            secured = False,
            earnings = "Earn 4x points at restaurants worldwide, 4x points on grocery stores, 3x points on flights and 1x points on everything else."
        )

        card5 = Card(
            name = "Capital One Quicksilver Student Cash Rewards",
            img = "https://ecm.capitalone.com/WCM/card/products/quicksilver-card-art.png",
            url = "https://www.capitalone.com/credit-cards/quicksilver-student/",
            issuer = "Capital One Bank",

            welcome_bonus = "$50 cash bonus once you spend $100 on purchases within 3 months from account opening",
            annual_fee = 0,
            bal_trans_fee = "19.99% - 29.99% variable",
            intro_apr = "",
            reg_apr = "19.99% - 29.99% variable",
            other_details = "",
            
            user_type = "student",
            secured = True,
            earnings = "Earn unlimited 1.5% cash back on every purchase. Earn 10% cash back on purchases on Uber and Uber Eats."
        )

        db.session.add_all([card1, card2, card3, card4, card5])
        db.session.commit()

        print("Creating and adding Users")
        user1 = User(
            name = "Robert Banks",
            username = "therealrob",
            email = "therealrob@gmail.com",
            password = "1234567",
            favorites = ""
        )

        user2 = User(
            name = "test",
            username = "test",
            email = "test@gmail.com",
            password = "1234567",
            favorites = ""
        )

        db.session.add_all([user1, user2])
        db.session.commit()

        print("Creating and adding Reviews")
        review1 = Review(
            review = "Lots of freedom. Decently limitless.",
            user_id = 1,
            card_id = 1
        )

        review2 = Review(
            review = "Discovered it",
            user_id = 1,
            card_id = 2
        )

        review3 = Review(
            review = "Card means business",
            user_id = 1,
            card_id = 3
        )

        review4 = Review(
            review = "test",
            user_id = 2,
            card_id = 1
        )

        db.session.add_all([review1, review2, review3, review4])
        db.session.commit()

        print("Creating and adding Glossary items")
        term1 = Glossary(
            term = "APR",
            definition = "Annual Percentage Rate (APR) is the total amount of interest that is to be accrued over the course \
of a year on a given loan. It is expressed as a percentage and represents any extra costs or fees on the loan.",
            more_info = "Financial insitutions and lenders are required to disclose the APR before an agreement is made."
        )

        term2 = Glossary(
            term = "APY",
            definition = "Annual Percentage Yield (APY), often confused with APR, refers to the actual amount of interest \
that is to be earned on an investment over the course of a year taking into account the effects of compound interest.",
            more_info = "APY works similarly to APR except APR is used for loans whereas APY is used for investments."
        )

        term3 = Glossary(
            term = "Balance Transfer",
            definition = "A balance transfer refers to the process of moving over debt from one place to another. \
This is often used to move over debt from one or more high interest credit cards to a low or 0% interest rate card.",
            more_info = ""
        )

        term4 = Glossary(
            term = "Product Change",
            definition = "A product change refers to the process of changing from one credit card to another \
within the same issuer without having to submit a new application.",
            more_info = ""
        )

        db.session.add_all([term1, term2, term3, term4])
        db.session.commit()
        print("Finished seeding")

    



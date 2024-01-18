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
        Glossary.query.delete()

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
            bal_trans_fee = "See issuing bank for details*",
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
            bal_trans_fee = "19.99% - 29.99%* Variable",
            intro_apr = "",
            reg_apr = "19.99% - 29.99%* Variable",
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

        term5 = Glossary(
            term = "Capital",
            definition = "Capital refers to the financial assets or resources that are used for the production of goods and services. It can include physical capital, such as machinery and equipment, as well as financial capital, like money and investments.",
            more_info = "Capital is a key component in determining the creditworthiness of an individual or a business, representing the owner's equity and their ability to cover debts. Having sufficient capital is important for financial stability and successful economic activities.",
        )

        term6 = Glossary(
            term = "Line of Credit (LOC)",
            definition = "A line of credit (LOC) is an arrangement between a bank and a customer that establishes a preset borrowing limit that can be drawn on repeatedly.",
            more_info = "A line of credit (LOC) is a preset borrowing limit that a borrower can draw on at any time that the line of credit is open. Types of credit lines include personal, business, and home equity, among others. An LOC has built-in flexibility, which is its main advantage. Potential downsides include high interest rates, penalties for late payments, and the potential to overspend."
        )

        term7 = Glossary(
            term = "Compound Interest",
            definition = "Compound interest is the interest on savings calculated on both the initial principal and the accumulated interest from previous periods.",
            more_info = 'Compounding multiplies money at an accelerated rate. Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods. Generating "interest on interest" is known as the power of compound interest. Interest can be compounded on any given frequency schedule, such as continuous, daily, or annually.'
        )

        term8 = Glossary(
            term = "Credit Limit",
            definition = "A credit limit is the maximum amount of credit a financial institution extends to a borrower, such as on a credit card or a line of credit.",
            more_info = "Products like credit cards and lines of credit have credit limits. Lenders usually set credit limits based on the information in a consumer's credit report, among other factors. High-risk borrowers generally have lower credit limits, while lower-risk borrowers typically receive higher credit limits. It is usually not ideal to use your maximum credit limit."
        )

        term9 = Glossary(
            term = "Investment",
            definition = "An investment is an asset or item that is purchased with the hope that it will generate income or appreciate in value at some point in the future.",
            more_info = "An investment can refer to any medium or mechanism used for generating future income, including bonds, stocks, real estate property, or alternative investments. Investments usually do not come with guarantees of appreciation; it is possible to end up with less money than with what you started. Investments can be diversified to reduce risk, though this may reduce the amount of earning potential. "
        )

        term10 = Glossary(
            term = "Authorized User",
            definition = "An authorized user is an individual who is granted permission by the primary cardholder to use their credit card account.",
            more_info = "While authorized users have the privilege of making purchases with the card, they are not legally responsible for repaying the credit card debt. The primary cardholder retains full responsibility for managing the account, including making payments and overseeing the credit limit. Authorized users can benefit from building their credit history based on the account's positive activity, but they do not have the same financial obligations as the primary cardholder."
        )

        term11 = Glossary(
            term = "Cash Advance",
            definition = "A cash advance is a service provided by credit card issuers that allows cardholders to immediately withdraw a sum of cash, often at a high interest rate.",
            more_info = "Unlike regular card transactions, interest on cash advances usually starts accruing immediately, and there may be additional transaction fees. It's important for credit card users to be aware of the terms and costs associated with cash advances and consider them carefully due to the potential for higher expenses."
        )

        term12 = Glossary(
            term = "Billing Cycle",
            definition = "A billing cycle is the interval of time from the end of one billing, or invoice, statement date to the next billing statement date.",
            more_info = "A billing cycle is traditionally set on a monthly basis but may vary depending on the product or service rendered."
        )

        term13 = Glossary(
            term = "Credit Score",
            definition = "A credit score is a number from 300 to 850 that rates a consumer’s creditworthiness. The higher the score, the better a borrower looks to potential lenders.",
            more_info = "Factors used to calculate your credit score include repayment history, types of loans, length of credit history, debt utilization, and whether you've applied for new accounts. The three main U.S. credit bureaus (Equifax, Experian, and TransUnion) may each calculate your FICO score differently."
        )

        term14 = Glossary(
            term = "Grace Period",
            definition = "A grace period is a set amount of time a payment can be delayed without a penalty being imposed.",
            more_info = "Borrowers can use a grace period to pay a late bill without negative impact. If a loan or other agreement has a grace period, its length of time will be noted in the contract. A grace period is not the same as a deferment, in which a borrower may forgo payments due to financial hardship or other reasons."
        )

        term15 = Glossary(
            term = "Foreign Transaction Fee",
            definition = "A foreign transaction fee is a 1%-3% charge for transactions made using a domestic payment card in a foreign country.",
            more_info = "A foreign transaction fee is imposed by a credit card issuer on a transaction that takes place overseas or with a foreign merchant. Online purchases that take place with overseas vendors may also be subject to such a fee. Several banks or credit card issuers now offer certain customers waivers on these fees, or fee-free cards. Foreign transaction fees are not always the same as currency conversion fees and may be tacked on to foreign transaction charges."
        )

        db.session.add_all([
            term1, 
            term2, 
            term3, 
            term4,
            term5,
            term6,
            term7,
            term8,
            term9,
            term10,
            term11,
            term12,
            term13,
            term14,
            term15
        ])
        db.session.commit()
        print("Finished seeding")

    



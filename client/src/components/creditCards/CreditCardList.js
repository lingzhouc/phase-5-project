import CreditCardItem from "./CreditCardItem"
import { useOutletContext } from "react-router-dom"

function CreditCardList() {

    const { 
        allCardItems,
    } = useOutletContext();

    const renderCardItems = allCardItems.map((card) => (
        <CreditCardItem 
            key = {card.id}
            id = {card.id}
            name = {card.name}
            img = {card.img}
            url = {card.url}
            issuer = {card.issuer}
            welBonus = {card.welcome_bonus}
            annualFee = {card.annual_fee}
            balTransFee = {card.bal_trans_fee}
            introApr = {card.intro_apr}
            regApr = {card.reg_apr}
            other = {card.other_details}
            userType = {card.user_type}
            secured = {card.secured}
            earnings = {card.earnings}
        />
    ))

    return (
        <div className="card-box">
            {renderCardItems}
        </div>
    )
}

export default CreditCardList;
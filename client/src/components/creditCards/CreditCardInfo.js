import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Link as MuiLink, Button, Grid, Divider } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../../styling/cards.css"

function CreditCardInfo() {

    const { id } = useParams();

    const { 
        allCardItems
    } = useOutletContext();

    const [currentCard, setCurrentCard] = useState([]);

    const getCardById = (id) => {
        const cardItem = allCardItems.find((item) => String(item.id) === id);
        return cardItem || null;
    };

    useEffect(() => {
        if(allCardItems) {
            setCurrentCard(getCardById(id))
        }
    }, [allCardItems, id]);

    console.log(currentCard)

    const displayProperties = () => {

        const displayKeys = [
            "issuer",
            "welcome_bonus",
            "annual_fee",
            "bal_trans_fee",
            "intro_apr",
            "reg_apr",
            "other_details",
            "user_type",
            "secured",
            "earnings"
        ];
        
        const nonEmptyProperties = displayKeys.filter(key => currentCard[key] !== undefined && currentCard[key] !== "");

        
        return nonEmptyProperties.map(propertyKey => {
            const customTextMap = {
                issuer: "Issuer: ",
                welcome_bonus: "Welcome Bonus: ",
                annual_fee: "Annual Fee: ",
                bal_trans_fee: "Balance Transfer Fee: ",
                intro_apr: "Intro APR: ",
                reg_apr: "Regular APR: ",
                other_details: "Other: ",
                user_type: "For: ",
                secured: "Card Type: ",
                earnings: "Earning Rate: "
            }

            const customText = customTextMap[propertyKey] || "";

            return (
                <Typography key={propertyKey} variant="body2" color="textSecondary">
                    {customText === "Annual Fee: " ? (
                        <span><strong>{customText}</strong>{'$' + currentCard[propertyKey]}</span>
                    ) : (
                        <span><strong>{customText}</strong>{currentCard[propertyKey]}</span>
                    )}
                </Typography>
            )   
        });
    };

    return (
        <div className="cc-info-box">
            {currentCard && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {currentCard.name}
                        </Typography>
                        <Divider />
                        {displayProperties()}
                    </CardContent>
                </Card>
            )}
      </div>
    )
}

export default CreditCardInfo;
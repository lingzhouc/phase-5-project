import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Link as MuiLink, Button, Grid, Divider } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../../styling/cards.css"

function CreditCardInfo() {

    const { id } = useParams();
    const { allCardItems } = useOutletContext();

    const cardReviewsUrl = `/cards/${id}/reviews`;
    const [currentCard, setCurrentCard] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (allCardItems.length === 0) {
                    const response = await fetch(`/cards/${id}`);
                    const data = await response.json();
                    setCurrentCard(data);
                } else {
                    const cardItem = allCardItems.find((item) => String(item.id) === id);
                    setCurrentCard(cardItem);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [allCardItems, id]);

    console.log(allCardItems)
    console.log(currentCard)

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite)
    }

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
                <Typography key={propertyKey} className="card-info" variant="body2" color="textSecondary">
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
        <div className="card-info-box">
            { loading ? (
                <p>Loading...</p>
            ) : currentCard ? (
                <Card className="cc-card-info">
                    <div className="card-header">
                        <div className="column card-name">
                            <Typography variant="h6" fontWeight="bold">
                                {currentCard.name}
                            </Typography>
                        </div>
                        <div className="column favorite-btn">
                            <IconButton className={`favorite-btn ${isFavorite ? 'favorited' : ''}`} onClick={handleFavoriteToggle}>
                                {isFavorite ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon />}
                            </IconButton>
                        </div>
                    </div>
                    
                    <div className="content-box">
                        <div className="card-img-box">
                            <CardMedia
                                component="img"
                                className="card-image"
                                alt={currentCard.name}
                                image={currentCard.img}
                            />
                        </div>
                        <Divider />
                        <div className="column-box">
                            <div className="column-review">
                                <MuiLink className="reviews-link-info" component={Link} to={cardReviewsUrl} color="inherit" underline="hover">
                                    {currentCard.reviews.length > 1 ?  (`${currentCard.reviews.length} reviews`) : (`${currentCard.reviews.length} review`)}
                                </MuiLink>
                            </div>
                            <div className="column-link">
                                <Button 
                                    className="apply-now-btn" 
                                    href={currentCard.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    color="inherit"
                                >
                                    Apply Now
                                </Button>
                            </div>
                        </div>
                        <Divider />
                        <div className="properties-box">
                            {displayProperties()}
                        </div>
                    </div>
                </Card>
            ) : (
                <p>No card found</p>
            )}
      </div>
    )
}

export default CreditCardInfo;
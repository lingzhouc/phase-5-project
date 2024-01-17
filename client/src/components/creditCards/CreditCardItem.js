import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { Card, CardMedia, Typography, Link as MuiLink, Button, Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../../styling/cards.css"

function CreditCardItem({
    id, 
    name, 
    img, 
    url, 
    welBonus,
    annualFee,
    balTransFee,
    introApr,
    regApr,
    other,
    earnings,
    reviewLength
}) {

    const navigate = useNavigate();
    const cardUrl = `/cards/${id}/reviews`

    const [isFavorite, setIsFavorite] = useState(false)

    const handleClick = () => {
        navigate(`/cards/${id}`)
    }

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite)
        console.log("favorite clicked")
        console.log(isFavorite)
    }
    
    const displayProperties = () => {
        const properties = {
          welBonus,
          annualFee,
          balTransFee,
          introApr,
          regApr,
          other,
          earnings
        };
    
        const nonEmptyProperties = Object.entries(properties)
            .filter(([_, value]) => value !== undefined && value !== "")
            .slice(0, 4);
    
        return nonEmptyProperties.map(([propertyKey, propertyValue], index) => {
            const customTextMap = {
                welBonus: "Welcome Bonus: ",
                annualFee: "Annual Fee: ",
                balTransFee: "Balance Transfer Fee: ",
                introApr: "Intro APR: ",
                regApr: "Regular APR: ",
                other: "Other: ",
                earnings: "Earnings Rate: "
            };
        
            const customText = customTextMap[propertyKey] || "";
        
            return (
                <Typography key={index} className="card-info" variant="body2" color="textSecondary">
                    {customText === "Annual Fee: " ? (
                    <span><strong>{customText}</strong>{'$' + propertyValue}</span>
                    ) : (
                        <span><strong>{customText}</strong>{propertyValue}</span>
                    )}
                </Typography>
            );
        });
    };

    return (
        <Card className="cc-card">
             <div className="card-header">
                <div className="column card-name">
                    <Typography variant="h6" fontWeight="bold">
                        {name}
                    </Typography>
                </div>
                <div className="column favorite-btn">
                    <IconButton className={`favorite-btn ${isFavorite ? 'favorited' : ''}`} onClick={handleFavoriteToggle}>
                        {isFavorite ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
            </div>
            
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                <CardMedia
                    component="img"
                    className="card-image"
                    alt={name}
                    image={img}
                    onClick={handleClick}
                />
                <Button 
                    className="continue-btn" 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="inherit"
                >
                    Continue
                </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                <MuiLink className="reviews-link" component={Link} to={cardUrl} color="inherit" underline="hover">
                    {reviewLength > 1 ?  (`${reviewLength} reviews`) : (`${reviewLength} review`)}
                </MuiLink>
                    {displayProperties()}
                </Grid>
            </Grid>
        </Card>
    );
}

export default CreditCardItem;
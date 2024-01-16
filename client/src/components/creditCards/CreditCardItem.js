import {Link, useNavigate } from 'react-router-dom';
import { Card, CardMedia, Typography, Link as MuiLink, Button, Grid } from "@mui/material";
import "../../styling/cards.css"

function CreditCardItem({id, name, img, url, reviewLength}) {

    const navigate = useNavigate();
    const cardUrl = `/cards/${id}/reviews`

    const handleClick = () => {
        navigate(`/cards/${id}`)
    }
    
    return (
        <Card className="cc-card">
            <Typography variant="h6" fontWeight="bold">{name}</Typography>
            <Grid container spacing={2}>
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


                </Grid>
            </Grid>
        </Card>
    );
}

export default CreditCardItem;
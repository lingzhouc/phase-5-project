import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { useParams, useOutletContext} from "react-router-dom";
import { Box, Button, Paper, TextField, Typography} from "@mui/material";

function ReviewList() {

    const { id } = useParams();

    const { 
        allCardItems,
        onAddReviewCard
    } = useOutletContext();

    const [currentCard, setCurrentCard] = useState([]);
    const [allReviewItems, setReviewItems] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [error, setError] = useState("");

    const getCardById = (id) => {
        const cardItem = allCardItems.find((item) => String(item.id) === id);
        return cardItem ? cardItem : "Error: No card found by id";
    };

    useEffect(() => {
        setCurrentCard(getCardById(id))
    }, [allCardItems]);

    useEffect(() => {
        fetch(`/cards/${id}/reviews`)
            .then((resp) => resp.json())
            .then(setReviewItems)
    }, []);

    const renderReviewItems = allReviewItems.map((review) => (
        <ReviewItem
            key = {review.id}
            id = {review.id}
            review = {review.review}
            created = {review.created_at}
            updated = {review.updated_at}
            username = {review.user.username}
            cardName = {review.card.name}
            cardImg = {review.card.img}
            cardUrl = {review.card.url}
            cardId = {review.card.id}
            onUpdateReview = {onUpdateReview}
            onDeleteReview = {onDeleteReview}
            setError = {setError}
            error = {error}
        />
    ))

    function onUpdateReview(updatedReview) {
        setReviewItems((allReviewItems) => allReviewItems.map((review) => {
            if (review.id === updatedReview.id) {
                return updatedReview;
            } return review;
        }))
    }

    function onDeleteReview(reviewId) {
        setReviewItems((allReviewItems) => 
            allReviewItems.filter((review) => review.id !== reviewId)
        );
    }

    function onAddReview(newReview) {
        setReviewItems(allReviewItems => [...allReviewItems, newReview])
    }

    const handleChange = e => {
        setNewReview(e.target.value);
        setError("");
    }

    const handleAddReview = () => {
        console.log("Submit Review Clicked");
        if (!newReview.trim()) {
            setError("Oops! It looks like you forgot to write a review.")
            console.error("Error: Review cannot be empty.")
            return;
        }
        setError("");

        fetch(`/cards/${id}/reviews`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cardId: id,
                review: newReview,
                userId: 1
            }),
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } throw new Error(`Error adding review - ${resp.status}`);
            }) 
            .then(data => {
                onAddReview(data)
                onAddReviewCard(data)
                setNewReview("");
                setError("")
            })
            .catch(error => {
                setError("Error adding review. Please try again.");
                console.error("Error:", error.message);
            })
    }

    return (
        <Box className="review-box" sx={{ padding: 2 }}>
            <Typography variant="h4">{currentCard.name}</Typography>
            <img src={currentCard.img} alt={currentCard.name} style={{ maxWidth: "100%", marginBottom: 2 }} />
            {renderReviewItems}

            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h6">Leave a Review</Typography>
                <TextField
                    multiline
                    rows={3}
                    value={newReview}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your review..."
                />
                {error && <Typography variant="body2" color="error"> {error}</Typography>}
                <Button 
                    variant="contained" 
                    onClick={handleAddReview}
                    sx={{ "&:hover": { backgroundColor: '#2196f3' }}}
                >
                
                    Submit Review
                </Button>
                
            </Paper>
        </Box>
    );
}

export default ReviewList
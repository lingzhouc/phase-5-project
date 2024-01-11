import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { useParams, useOutletContext} from "react-router-dom";

function ReviewList() {

    const { id } = useParams();

    const { 
        allCardItems
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

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside);
    //     return () => { document.removeEventListener('click', handleClickOutside); };
    // }, []);

    // const handleClickOutside = () => {
    //     setError("");
    // };

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
                // add the review
                onAddReview(data)
                setNewReview("");
            })
            .catch(error => {
                setError("Error adding review. Please try again.");
                console.error("Error:", error.message);
            })
    }

    return (
        <div className="review-box">
            <p>Card Name: {currentCard.name}</p>
            <img src={currentCard.img} alt={currentCard.name} />
            {renderReviewItems}

            <div>
                <textarea 
                    value={newReview}
                    onChange={handleChange}
                    placeholder="Enter your review..."
                />
                <button onClick={handleAddReview}>Submit Review</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
        
    )
}

export default ReviewList
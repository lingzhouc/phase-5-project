import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function ReviewList() {

    const { id } = useParams();
    const { allCardItems } = useOutletContext();

    const [currentCard, setCurrentCard] = useState([])
    const [allReviewItems, setReviewItems] = useState([])

    const getCardById = (id) => {
        const cardItem = allCardItems.find((item) => String(item.id) === id);
        return cardItem ? cardItem : "ERROR: No card found by id";
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
        />
    ))

    return (
        <div className="review-box">
            <p>Card Name: {currentCard.name}</p>
            <img src={currentCard.img} alt={currentCard.name} />
            {renderReviewItems}
        </div>
    )
}

export default ReviewList
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ReviewList() {

    const { id } = useParams();
    const [allReviewItems, setReviewItems] = useState([])

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
        />
    ))

    return (
        <div className="review-box">
            {renderReviewItems}
        </div>
    )
}

export default ReviewList
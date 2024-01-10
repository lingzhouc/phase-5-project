import { useState } from "react";

function ReviewItem({review, username, created, updated}) {

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible)
    }
    const closeDropdown = () => {
        setDropdownVisible(false)
    }

    const handleEditReview = () => {
        console.log("Edit Review Clicked")
    }

    const handleDeleteReview = () => {
        console.log("Delete Review Clicked")
    }

    const time = created === updated 
        ? `Created: ${created}`
        : `Updated: ${updated}`

    return (
        <div className="review">
            <button class="review-btn" onClick={toggleDropdown}> ... </button>
            {isDropdownVisible && (
                <div class="review-btn-dropdown">
                    <button onClick={handleEditReview}> Edit Review </button>
                    <button onClick={handleDeleteReview}> Delete Review </button>
                </div>
            )}
            <p>Username: {username} </p>
            <p>Review Content: "{review}" </p>
            <p>{time}</p>
        </div>
    )
}

export default ReviewItem;
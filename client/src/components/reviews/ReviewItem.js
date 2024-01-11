import { useState, useEffect, useRef } from "react";

function ReviewItem({ id, review, username, created, updated, cardId, onUpdateReview, onDeleteReview, setError }) {

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editedReview, setEditedReview] = useState(review);
    const dropdownRef = useRef(null);

    const time = created === updated  ? `Created: ${created}` : `Updated: ${updated}`;
    
    const toggleDropdown = () => { 
        setDropdownVisible(!isDropdownVisible);
        setError("");
    }
    const closeDropdown = () => { setDropdownVisible(false) }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { closeDropdown(); }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside); };
    }, []);
    
    const handleEditReview = () => { setEditing(true); console.log("Edit Review Clicked"); }
    const handleCancelEdit = () => {
        console.log("Cancel Clicked");
        setEditing(false);
        setEditedReview(review);
    }

    // patch request
    const handleSaveReview = () => {
        console.log("Save Changes Clicked");
        setEditing(false);

        fetch(`/cards/${cardId}/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                review: editedReview
            }),
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } throw new Error(`Error updating review - ${resp.status}`);
            })
            .then(data => {
                // update the review
                onUpdateReview(data);
                console.log("Review updated:", data);
            })
            .catch(error => {
                console.error("Error:", error.message);
            })
    }

    // delete request
    const handleDeleteReview = () => {
        console.log("Delete Review Clicked")

        fetch(`/cards/${cardId}/reviews/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } throw new Error(`Error deleting review - ${resp.status}`);
        })
        .then(data => {
            // delete the review
            onDeleteReview(id);
            console.log("Review deleted successfully:", data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        })
    }

    const handleChange = (e) => { setEditedReview(e.target.value); };

    return (
        <div className="review">
            <div className="review-dropdown" ref={dropdownRef}>
                {isEditing ? (
                    <button className="review-btn" onClick={handleCancelEdit}> Cancel </button>
                ) : (
                    <>
                        <button className="review-btn" onClick={toggleDropdown}> ... </button>
                        {isDropdownVisible && (
                            <div className="review-btn-dropdown">
                                <button onClick={handleEditReview}> Edit Review </button>
                                <button onClick={handleDeleteReview}> Delete Review </button>
                            </div>
                        )}
                    </>
                )}
            </div>       

            <p>Username: {username} </p>       
            {isEditing ? (
                <>
                    <textarea value={editedReview} onChange={handleChange} />
                    <button onClick={handleSaveReview}>Save Changes</button>
                </>
            ) : (
                <p>Review Content: "{review}" </p>
            )}      
            <p>{time}</p>
        </div>
    )
}

export default ReviewItem;
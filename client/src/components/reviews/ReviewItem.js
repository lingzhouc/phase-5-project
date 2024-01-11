import { useState, useEffect, useRef } from "react";

function ReviewItem({id, review, username, created, updated, cardId, onUpdateReview}) {

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editedReview, setEditedReview] = useState(review);
    const dropdownRef = useRef(null);

    const time = created === updated  ? `Created: ${created}` : `Updated: ${updated}`;
    
    const toggleDropdown = () => { setDropdownVisible(!isDropdownVisible) }
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

        fetch(`/cards/${cardId}/reviews`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                review: editedReview,
            }),
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } throw new Error("Error updating review");
            })
            .then(data => {
                // update the review
                onUpdateReview(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error.message);
            })
    }

    // delete request
    const handleDeleteReview = () => {
        console.log("Delete Review Clicked")
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
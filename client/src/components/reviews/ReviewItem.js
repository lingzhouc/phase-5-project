import { useState } from "react";
import { useOutletContext} from "react-router-dom";
import { Button, Fade, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../styling/reviews.css"

function ReviewItem({ 
    id, 
    review, 
    username, 
    created, 
    updated, 
    cardId, 
    onUpdateReview, 
    onDeleteReview
}) {

    const { 
        onUpdateReviewCard,
        onDelReviewCard
    } = useOutletContext();
 
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [editedReview, setEditedReview] = useState(review);
    const [error, setError] = useState("")

    const time = created === updated  ? `Created: ${created}` : `Created: ${created} | Updated: ${updated}`
    
    const handleClick = (e) => { setAnchorEl(e.currentTarget) };
    const handleClose = () => { setAnchorEl(null); };
    const handleChange = (e) => { setEditedReview(e.target.value); };
    
    const handleEditReview = () => { 
        console.log("Edit Review Clicked"); 
        handleClose()
        setEditing(true); 
        setError("")
        
    }
    const handleCancelEdit = () => {
        console.log("Cancel Clicked");
        setEditing(false);
        setEditedReview(review);
        
    }

    const onEscPress = (e) => {
        if (e.key === "Escape") {
            handleCancelEdit();
        }
    }

    // patch request
    const handleSaveReview = () => {
        console.log("Save Changes Clicked");

        if (!editedReview.trim()) {
            setError("Oops! It looks like you forgot to write a review.")
            console.error("Error: Review cannot be empty.")
            return;
        } 

        setEditing(false);
        setError("");
        

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
                onUpdateReview(data);
                onUpdateReviewCard(data);
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
            onDeleteReview(id);
            onDelReviewCard(id);
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error.message);
        })
    }

    return (
        <Paper elevation={3} className="review" sx={{ padding: 2, marginBottom: 2 }}>
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="review-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{ float: "right" }}
                    disabled={isEditing} 
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="review-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    TransitionComponent={Fade}  // transition for quicker disappearance
                    transitionDuration={5}    //  (in milliseconds) 
                >    
                     {!isEditing && [
                        <MenuItem key="edit"onClick={handleEditReview}>Edit Review</MenuItem>,
                        <MenuItem key="delete" onClick={handleDeleteReview}>Delete Review</MenuItem>
                    ]}
                </Menu>
            </div>

        <Typography variant="h6" sx={{ fontSize: '.95rem', marginBottom: 1 }}>{username}</Typography> 
            {isEditing ? (
                <>
                    <TextField
                        multiline
                        rows={2}
                        value={editedReview}
                        onChange={handleChange}
                        onKeyDown={onEscPress}
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your review..."
                    />
                    {error && <Typography variant="body2" color="error"> {error}</Typography>}
                    <Button 
                        variant="contained" 
                        onClick={handleSaveReview} 
                        sx={{ "&:hover": { backgroundColor: '#4caf50' } }}
                    >
                        Save Changes
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={handleCancelEdit} 
                        sx={{   marginLeft: "6px",
                                "&:hover": { borderColor: '#ff5722', color: '#ff5722' } 
                            }}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '.95rem' }}>
                        {review}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '0.7rem' }}>
                        {time}
                    </Typography>
                </>
                
            )}      
            
        </Paper>
    )
}

export default ReviewItem;
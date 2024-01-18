import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { CssBaseline } from "@mui/material";

function Layout() {

    const [allCardItems, setAllCardItems] = useState([])

    useEffect(() => {
        fetch("/cards")
            .then((resp) => resp.json())
            .then(setAllCardItems)
    }, []);

    function onAddReviewCard(newReview) {
        setAllCardItems(allCardItems => allCardItems.map(card => {
            if (card.id === newReview.card_id) {
                const newCard = {
                    ...card,
                    reviews: [...card.reviews, newReview]
                };
                return newCard;
            }
            return card;
        }));
    }
    
    function onUpdateReviewCard(updatedReview) {
        setAllCardItems(allCardItems => allCardItems.map(card => {
            if (card.reviews.some(review => review.id === updatedReview.id)) {
                const newCard = {
                    ...card,
                    reviews: card.reviews.map(review =>
                        review.id === updatedReview.id ? updatedReview : review
                    )
                };
                return newCard;
            } return card;
        }));
    }

    function onDelReviewCard(reviewId) {
        setAllCardItems(allCardItems => allCardItems.map(card => {
            if (card.reviews.some(review => review.id === reviewId)) {
                const newCard = {
                    ...card,
                    reviews: card.reviews.filter(review => review.id !== reviewId)
                };
                return newCard;
            }
            return card;
        }));
    }

    const context = {
        allCardItems,
        onAddReviewCard,
        onUpdateReviewCard,
        onDelReviewCard
    }

    return (
        <div> 
            <CssBaseline />
            <Header />
            <Navbar />
            <Outlet context={context} />
            <Footer />
        </div>
    )
}

export default Layout
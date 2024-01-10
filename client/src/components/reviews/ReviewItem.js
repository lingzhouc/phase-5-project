function ReviewItem({cardName, cardImg, cardUrl, review, username, created, updated}) {

    const time = created === updated 
        ? `Created: ${created}`
        : `Updated: ${updated}`

    return (
        <div className="review">
            <p>Card Name: {cardName}</p>
            <img src={cardImg} alt={cardName} />
            <p>Username: {username} </p>
            <p>Review Content: "{review}" </p>
            <p>{time}</p>
        </div>
    )
}

export default ReviewItem;
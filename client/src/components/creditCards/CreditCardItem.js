import {Link } from 'react-router-dom';

function CreditCardItem({id, name, img, url}) {

    const cardUrl = `/cards/${id}/reviews`
    
    return (
        <div className="cc-card">
            <h2>{name}</h2>
            <img className="cc-card-img" src={img} alt={name}/>
            <a href={url} target="_blank" rel="noopener noreferrer">
                Link
            </a>
            <Link to={cardUrl}> Reviews </Link>
        </div>
    )
}

export default CreditCardItem;
function CreditCardItem({name, img, url}) {
    
    return (
        <div className="cc-card">
            <h2>{name}</h2>
            <img className="cc-card-img" src={img} alt={name}/>
            <a href={url} target="_blank" rel="noopener noreferrer">
                Link
            </a>


        </div>
    )
}

export default CreditCardItem;
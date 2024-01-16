function GlossaryItem({ term, definition, moreInfo }) {
    return (
        <div className="glossary-item">
            <p>Term: {term}</p>
            <p>Definition: {definition}</p>
            <p>More Info: {moreInfo}</p>
        </div>
        
    )
}

export default GlossaryItem;
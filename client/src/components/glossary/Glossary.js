import GlossaryItem from "./GlossaryItem"
import { useEffect, useState } from "react";

function Glossary() {

    const [allGlossaryItems, setGlossaryItems] = useState([])

    useEffect(() => {
        fetch(`/glossary`)
            .then(resp => resp.json())
            .then(setGlossaryItems)
    }, [])

    console.log(allGlossaryItems)

    const renderGlossaryItems = allGlossaryItems.map((item) => (
        <GlossaryItem
            key = {item.id}
            id = {item.id}
            term = {item.term}
            definition = {item.definition}
            moreInfo = {item.moreInfo}
        />
    ))

    return (
        <div>
            {renderGlossaryItems}
        </div>
    )
}

export default Glossary;
import GlossaryItem from "./GlossaryItem"
import { useEffect, useState } from "react";
import { Container, List, ListItem, Typography, Divider } from "@mui/material";
import "../../styling/glossary.css"

function Glossary() {

    const [allGlossaryItems, setGlossaryItems] = useState([])

    console.log(allGlossaryItems)

    useEffect(() => {
        fetch(`/glossary`)
            .then(resp => resp.json())
            .then(setGlossaryItems)
    }, [])

    const glossaryMap = allGlossaryItems.reduce((acc, item) => {
        const firstLetter = item.term[0].toUpperCase();
        acc[firstLetter] = [...(acc[firstLetter] || []), item];
        return acc;
    }, {});

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const renderGlossary = () => {
        const sortedGlossary = Object.entries(glossaryMap).sort((a, b) => a[0].localeCompare(b[0]));
      
        return sortedGlossary.map(([letter, items]) => (
            <div key={letter} id={letter}>
                <Typography className="letter-header" variant="h4" gutterBottom>
                    {letter}
                </Typography>
                <Divider />
                <List>
                {items
                    .sort((a, b) => a.term.localeCompare(b.term))
                    .map((item) => (
                    <GlossaryItem
                        key={item.id}
                        id={item.id}
                        term={item.term}
                        definition={item.definition}
                        moreInfo={item.more_info}
                    />
                    ))}
                </List>
            </div>
        ));
    };
    
    return (
        <Container id="glossary-container">
            <div id="alphabet-list">
                <List>
                    {alphabet.map((letter) => (
                        <ListItem 
                            key={letter} 
                            component="a" 
                            href={`#${letter}`}
                            className="alphabet-link">
                            {letter}
                        </ListItem>
                    ))}
                </List>
            </div>
            <div>{renderGlossary()}</div>
        </Container>
    )
}

export default Glossary;
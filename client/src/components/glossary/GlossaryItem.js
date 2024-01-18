import { useState } from "react";
import { Card, CardContent, Typography, Collapse } from "@mui/material";
import "../../styling/glossary.css"

function GlossaryItem({ term, definition, moreInfo }) {

    const hasMoreInfo = Boolean(moreInfo);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        console.log("clicked on more info")
    };

    return (
        <Card className="glossary-card">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {term}
                </Typography>
                <Typography variant="body1">
                    {definition}
                </Typography>
                {hasMoreInfo && (
                    <div className="more-info-container">
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            onClick={handleExpandClick}
                            className="more-info"
                        >
                            More Info
                        </Typography>
                    </div>
               )}
                {hasMoreInfo && expanded && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <div className="expanded-content">
                            <Typography variant="body1" className="more-info-content" fontStyle="italic" sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '.95rem' }}>
                                {moreInfo}
                            </Typography>
                        </div>
                    </Collapse>
                )}
            </CardContent>
        </Card>
    );
}

export default GlossaryItem;
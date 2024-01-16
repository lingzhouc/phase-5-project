import { useState } from "react";
import { Card, CardContent, Typography, Collapse } from "@mui/material";
import "../../styling/glossary.css"

function GlossaryItem({ term, definition, moreInfo }) {

    const hasMoreInfo = Boolean(true);
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
                            <Typography variant="body1" className="more-info-content" fontStyle="italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </div>
                    </Collapse>
                )}
            </CardContent>
        </Card>
    );
}

export default GlossaryItem;
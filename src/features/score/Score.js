// Child of the App component, Score will display the number of matched cards.

import { useSelector } from "react-redux";
import { selectMatchedIDs } from "../board/boardSlice";

export const Score = () => {
    const cardsMatched = useSelector(selectMatchedIDs);  // retrieves the number of matched cards/values in the array of IDs

    return (  // returns the score
        <div className="score-container">Matched: {cardsMatched.length}</div>
    );
}
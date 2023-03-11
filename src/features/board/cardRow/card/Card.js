// Child of the CardRow component, Card displays the card content when flipped over.

import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleIDs, flipCard, selectMatchedIDs, resetCards } from '../../boardSlice';

let cardLogo = 'https://www.cheatsheet.com/wp-content/uploads/2020/02/friends-cast-photo.jpg?w=1024&h=760';

// each Card component renders a single card object using the id and content values
// uses the visible and matched boolean values from the state to determine how to render
export const Card = ({ id, contents }) => {
  const visibleIDs = useSelector(selectVisibleIDs);  //retrieves visible card data to know which card to display on the board
  const dispatch = useDispatch();
  const matchedIDs = useSelector(selectMatchedIDs);  //identify matched cards on the board

  // flip card action
  const flipHandler = (id) => {
    dispatch(flipCard(id));
  };

  // Should dispatch the action created by resetCards() when clicked
  const tryAgainHandler = () => {
    dispatch(resetCards());
  };

  // When each card is clicked, it becomes ‘flipped’ because it’s visible property is set to true

  let cardStyle = 'resting';
  let click = () => flipHandler(id);

  let cardText = (
    <img src={cardLogo} className="logo-placeholder" alt="card background" />
  );

  // each card will show its contents if it's one of the visible cards, otherwise remain hidden (both visible and matched cards should show)
  if (visibleIDs.includes(id) || matchedIDs.includes(id)) {
    cardText = contents;
    click = () => { };
  }

  // reveal the matched cards by changing their cardStyle to 'matched'
  if (matchedIDs.includes(id)) {
    cardStyle = 'matched';
  }

  // limit the number of visible cards at a time to 2
  // stops the action from dispatching when cards are clicked so there can never be more than 2 cards visible at a time
  if (visibleIDs.length === 2) {
    click = tryAgainHandler;
  }

  // turns the text red when two cards are flipped and not a match
  if (!matchedIDs.includes(id) && visibleIDs.length === 2) {
    cardStyle = 'no-match';
  }

  return (
    <button onClick={click} className={`card ${cardStyle}`}>
      {cardText}
    </button>
  );
};

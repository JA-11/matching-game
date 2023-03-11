// Child of the Board component, CardRow renders a row of Card components.

import { Card } from './card/Card.js';

export const CardRow = ({ cards }) => {
  const content = cards.map(card =>
    <Card
      key={card.id}
      id={card.id}
      contents={card.contents}
    />)

  return <>{content}</>;
};
import DraggableCard, { Card, SetCards } from './DraggableCard';

type Props = {
  cards: Card[];
  setCards: SetCards;
};

const CardList = ({ cards, setCards }: Props) => {
  return (
    <div className="center">
      {cards.map(card => (
        <DraggableCard card={card} cards={cards} setCards={setCards} />
      ))}
    </div>
  );
};

export default CardList;

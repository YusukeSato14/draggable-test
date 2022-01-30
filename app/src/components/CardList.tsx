import { useState } from 'react';

import DeleteCardModal from './DeleteCardModal';
import DraggableCard, { Card, SetCards } from './DraggableCard';

type Props = {
  cards: Card[],
  setCards: SetCards,
  zIndex: number,
  setZIndex: React.Dispatch<React.SetStateAction<number>>,
};

const CardList = ({ cards, setCards, zIndex, setZIndex }: Props) => {
  const [deleteCardId, setDeleteCardId] = useState(-1);

  const deleteCard = () => {
    const deleteCardIndex = getCardsIndex(deleteCardId);

    setCards([
      ...cards.slice(0, deleteCardIndex),
      ...cards.slice(deleteCardIndex + 1)
    ]);
    setDeleteCardId(-1);
  };

  const getCardsIndex = (id: number) => {
    const cardElement = cards.find(element => element.id === id)!;
    const cardsIndex = cards.indexOf(cardElement);

    return cardsIndex;
  }

  return (
    <div className="center">
      {cards.map(card => (
        <DraggableCard key={card.id} card={card} cards={cards} setCards={setCards} setDeleteCardId={setDeleteCardId} getCardsIndex={getCardsIndex} zIndex={zIndex} setZIndex={setZIndex} />
      ))}
      <DeleteCardModal cards={cards} deleteCardId={deleteCardId} setDeleteCardId={setDeleteCardId} deleteCard={deleteCard} />
    </div>
  );
};

export default CardList;

import { useState } from 'react';

import { Card } from './CardContent';
import DeleteCardModal from './DeleteCardModal';
import DraggableCard, { SetCards } from './DraggableCard';

type Props = {
  cards: Card[],
  deleteCardId: number,
  setDeleteCardId: React.Dispatch<React.SetStateAction<number>>,
  onStart: Function,
  onDrag: Function,
  toggleFixedColor: Function,
  changeTextValue: Function,
  deleteCard: VoidFunction,
};

const CardList = ({ cards, deleteCardId, setDeleteCardId, onStart, onDrag, toggleFixedColor, changeTextValue, deleteCard }: Props) => {
  return (
    <div className="center">
      {cards.map(card => (
        <DraggableCard key={card.id} card={card} setDeleteCardId={setDeleteCardId} onStart={onStart} onDrag={onDrag} toggleFixedColor={toggleFixedColor} changeTextValue={changeTextValue} />
      ))}
      <DeleteCardModal cards={cards} deleteCardId={deleteCardId} setDeleteCardId={setDeleteCardId} deleteCard={deleteCard} />
    </div>
  );
};

export default CardList;

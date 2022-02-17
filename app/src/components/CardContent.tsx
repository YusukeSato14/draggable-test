import { MouseEventHandler, useCallback, useState } from 'react';

import CardList from './CardList';
import DeleteCardModal from './DeleteCardModal';
import Menu from './Menu';

export type Card = {
  id: number,
  style: {
    backgroundColor: string,
    zIndex: number,
  },
  isFixedColor: boolean,
  value: string,
};

export const colorList = [
  '#90A4AE',
  '#E0E0E0',
  '#A1887F',
  '#FF8A65',
  '#FFB74D',
  '#FFD54F',
  '#FFF176',
  '#DCE775',
  '#AED581',
  '#81C784',
  '#4DB6AC',
  '#4DD0E1',
  '#4FC3F7',
  '#64B5F6',
  '#7986CB',
  '#9575CD',
  '#BA68C8',
  '#F06292',
  '#E57373',
];

// Organismコンポーネント
export const CardContent = () => {
  // 追加・削除するにあたりidは別管理
  const [cardId, setCardId] = useState<number>(0);

  const [zIndex, setZIndex] = useState<number>(0);

  const initialCardState = {
    id: cardId,
    style: {
      backgroundColor: colorList[0],
      zIndex: zIndex,
    },
    isFixedColor: false,
    value: '',
  };
  const [cards, setCards] = useState<Card[]>([initialCardState]);

  const [deleteCardId, setDeleteCardId] = useState(-1);

  const addCard: MouseEventHandler = () => {
    const newCardId = cardId + 1;
    setCardId(newCardId);

    const newZIndex = zIndex + 1;
    setZIndex(newZIndex);

    setCards([
      ...cards,
      {
        id: newCardId,
        style: {
          backgroundColor: colorList[newCardId % 18],
          zIndex: newZIndex,
        },
        isFixedColor: false,
        value: '',
      }
    ]);
  };

  const deleteCard = useCallback(() => {
    const deleteCardIndex = getCardsIndex(deleteCardId);

    setCards([
      ...cards.slice(0, deleteCardIndex),
      ...cards.slice(deleteCardIndex + 1)
    ]);
    setDeleteCardId(-1);
  }, [deleteCardId]);

  const getDeleteCardElement = useCallback(() => {
    const deleteCardElement = cards.find(element => element.id === deleteCardId)!;
    return deleteCardElement;
  }, [deleteCardId]);

  const getCardsIndex = (id: number) => {
    const cardElement = cards.find(element => element.id === id)!;
    const cardsIndex = cards.indexOf(cardElement);

    return cardsIndex;
  };

  return (
    <>
      <Menu addCard={addCard} />
      <CardList
        cards={cards}
        setCards={setCards}
        zIndex={zIndex}
        setZIndex={setZIndex}
        setDeleteCardId={setDeleteCardId}
        getCardsIndex={getCardsIndex}
      />
      <DeleteCardModal
        getDeleteCardElement={getDeleteCardElement}
        deleteCardId={deleteCardId}
        setDeleteCardId={setDeleteCardId}
        deleteCard={deleteCard}
      />
    </>
  );
};

export default CardContent;

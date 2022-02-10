import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

import CardList from '../components/CardList';
import { colorList } from '../components/DraggableCard';
import Menu from '../components/Menu';
import DeleteCardModal from './DeleteCardModal';

export type Card = {
  id: number,
  style: {
    backgroundColor: string,
    zIndex: number,
  },
  isFixedColor: boolean,
  value: string,
};

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

  const deleteCard = () => {
    const deleteCardIndex = getCardsIndex(deleteCardId);

    setCards([
      ...cards.slice(0, deleteCardIndex),
      ...cards.slice(deleteCardIndex + 1)
    ]);
    setDeleteCardId(-1);
  };

  // カードに触れた際に要素を最前面に出す。
  const onStart = (card: Card) => (event: DraggableEvent) => {
    if (zIndex === card.style.zIndex) return;
    const newZIndex = zIndex + 1;
    setZIndex(newZIndex);

    const cardsIndex = getCardsIndex(card.id);

    setCards([
      ...cards.slice(0, cardsIndex),
      {
        ...card,
        style: {
          backgroundColor: card.style.backgroundColor,
          zIndex: newZIndex,
        },
        value: card.value,
      },
      ...cards.slice(cardsIndex + 1)
    ]);
  };

  // カードドラッグ中の変更
  const onDrag = (card: Card) => (e: DraggableEvent, data: DraggableData) => {
    const color = card.isFixedColor ? card.style.backgroundColor : transformColor(data);
    // 処理軽減のため色変更なしならstateいじらない
    if (color === card.style.backgroundColor) return;
    const cardsIndex = getCardsIndex(card.id);

    setCards([
      ...cards.slice(0, cardsIndex),
      {
        ...card,
        style: {
          backgroundColor: color,
          zIndex: zIndex,
        },
        value: card.value,
      },
      ...cards.slice(cardsIndex + 1)
    ]);
  };

  const toggleFixedColor = (card: Card) => (event: ChangeEvent<HTMLInputElement>) => {
    const cardsIndex = getCardsIndex(card.id);

    setCards([
      ...cards.slice(0, cardsIndex),
      {
        ...card,
        style: card.style,
        isFixedColor: !card.isFixedColor,
        value: card.value,
      },
      ...cards.slice(cardsIndex + 1)
    ]);
  };

  const changeTextValue = (card: Card) => (event: ChangeEvent<HTMLInputElement>) => {
    const cardsIndex = getCardsIndex(card.id);

    setCards([
      ...cards.slice(0, cardsIndex),
      {
        ...card,
        style: card.style,
        value: event.target.value,
      },
      ...cards.slice(cardsIndex + 1)
    ]);
  };
  
  const getCardsIndex = (id: number) => {
    const cardElement = cards.find(element => element.id === id)!;
    const cardsIndex = cards.indexOf(cardElement);

    return cardsIndex;
  }

  const transformColor = (data: DraggableData) => {
    const colorKey = Math.floor((Math.atan2(data.y, data.x) * (180 / Math.PI) + 180) * 19 / 361);
    const color = colorList[colorKey];
    return color;
  };

  return (
    <>
      <Menu addCard={addCard} />
      <CardList
        cards={cards}
        setDeleteCardId={setDeleteCardId}
        onStart={onStart}
        onDrag={onDrag}
        toggleFixedColor={toggleFixedColor}
        changeTextValue={changeTextValue}
      />
      <DeleteCardModal cards={cards} deleteCardId={deleteCardId} setDeleteCardId={setDeleteCardId} deleteCard={deleteCard} />
    </>
  );
};

export default CardContent;
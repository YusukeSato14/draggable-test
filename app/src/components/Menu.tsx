import { MouseEventHandler } from "react";

import { Card } from "./CardContent";
import { colorList } from "./DraggableCard";

type Props = {
  cardId: number,
  setCardId: React.Dispatch<React.SetStateAction<number>>,
  cards: Card[],
  setCards: React.Dispatch<React.SetStateAction<Card[]>>,
  zIndex: number,
  setZIndex: React.Dispatch<React.SetStateAction<number>>,
}

const Menu = ({ cardId, setCardId, cards, setCards, zIndex, setZIndex }: Props) => {
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

  return (
    <button className="add-button" onClick={addCard}>add</button>
  );
};

export default Menu;

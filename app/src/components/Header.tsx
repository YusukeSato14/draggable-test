import { MouseEventHandler } from "react";
import { Card, colorList } from "./DraggableCard";

type Props = {
  cardId: number,
  setCardId: React.Dispatch<React.SetStateAction<number>>,
  cards: Card[],
  setCards: React.Dispatch<React.SetStateAction<Card[]>>,
}

const Header = ({ cardId, setCardId, cards, setCards }: Props) => {
  const addCard: MouseEventHandler = () => {
    const newCardId = cardId + 1;
    setCardId(newCardId);

    setCards([
      ...cards,
      {
        id: newCardId,
        style: { backgroundColor: colorList[newCardId % 18] },
        isFixedColor: false,
        value: '',
      }
    ]);
  };

  return (
    <button className="add-button" onClick={addCard}>add</button>
  )
}

export default Header;

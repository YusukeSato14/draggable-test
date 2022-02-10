import { useState } from 'react';

import CardList from '../components/CardList';
import { colorList } from '../components/DraggableCard';
import Menu from '../components/Menu';

// Organismコンポーネント
export const CardContent = () => {
  // 追加・削除するにあたりidは別管理
  const [cardId, setCardId] = useState(0);

  const [zIndex, setZIndex] = useState(0);

  const initialCardState = {
    id: cardId,
    style: {
      backgroundColor: colorList[0],
      zIndex: zIndex,
    },
    isFixedColor: false,
    value: '',
  };
  const [cards, setCards] = useState([initialCardState]);

  return (
    <>
      <Menu cardId={cardId} setCardId={setCardId} cards={cards} setCards={setCards} zIndex={zIndex} setZIndex={setZIndex} />
      <CardList cards={cards} setCards={setCards} zIndex={zIndex} setZIndex={setZIndex} />
    </>
  );
};

export default CardContent;
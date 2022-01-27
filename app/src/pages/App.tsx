import { useState } from 'react';

import '../assets/App.css';
import CardList from '../components/CardList';
import { colorList } from '../components/DraggableCard';
import Header from '../components/Header';

function App() {
  // 追加・削除するにあたりidは別管理
  const [cardId, setCardId] = useState(0);

  const initialCardState = {
    id: cardId,
    style: { backgroundColor: colorList[0] },
    isFixedColor: false,
    value: '',
  };
  const [cards, setCards] = useState([initialCardState]);

  return (
    <div className="App">
      <Header cardId={cardId} setCardId={setCardId} cards={cards} setCards={setCards} />
      <CardList cards={cards} setCards={setCards} />
    </div>
  );
};

export default App;

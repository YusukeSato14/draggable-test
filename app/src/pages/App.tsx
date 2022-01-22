import { MouseEventHandler, useState } from 'react';

import '../assets/App.css';
import CardList, { colorList } from '../components/CardList';

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

  const addCard: MouseEventHandler = () => {
    const newCardId = cardId + 1;
    setCardId(newCardId);
    console.log(newCardId);
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
    <div className="App">
      <button className="add-button" onClick={addCard}>add</button>
      <CardList cards={cards} setCards={setCards} />
    </div>
  );
};

export default App;

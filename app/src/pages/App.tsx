import { MouseEventHandler, useState } from 'react';

import '../assets/App.css';
import CardList, { colorList } from '../components/CardList';

function App() {
  const initialCardState = {
    id: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    style: { backgroundColor: colorList[0] },
    fixedColor: false,
    value: '',
  };
  const [cards, setCards] = useState([initialCardState]);
  const addCard: MouseEventHandler = () => {
    setCards([
      ...cards,
      {
        id: cards.length,
        deltaPosition: {
          x: 0,
          y: 0,
        },
        style: { backgroundColor: colorList[cards.length % 18] },
        fixedColor: false,
        value: '',
      }
    ]);
  };
  return (
    <div className="App">
      <button className="button" onClick={addCard}>add</button>
      <CardList cards={cards} setCards={setCards} />
    </div>
  );
};

export default App;

import { MouseEventHandler, useState } from 'react';

import '../assets/App.css';
import CardList from '../components/CardList';

function App() {
  const initialCardState = {
    id: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    style: { backgroundColor: '#000000' }
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
        style: { backgroundColor: '#000000' },
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

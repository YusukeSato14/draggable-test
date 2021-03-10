import { MouseEventHandler, useState } from 'react';

import '../assets/App.css';
import CardList from '../components/CardList';

function App() {
  const [cards, setCards] = useState([{ id: 0 }]);
  const addCard: MouseEventHandler = () => {
    setCards([
      ...cards,
      {
        id: cards.length,
      }
    ]);
  };
  return (
    <div className="App">
      <button className="button" onClick={addCard}>add</button>
      <CardList cards={cards} />
    </div>
  );
}

export default App;

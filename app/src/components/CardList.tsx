import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type Props = {
  cards: Card[];
  setCards: SetCards;
};

type Card = {
  id: number;
  deltaPosition: {
    x: number,
    y: number,
  }
  style: {
    backgroundColor: string;
  };
}

type SetCards = React.Dispatch<React.SetStateAction<Card[]>>

const CardList = ({ cards, setCards }: Props) => {
  const handleDrag = (id: number) => (e: DraggableEvent, ui: DraggableData) => {
    const styles = transformColor(id, cards[id].deltaPosition.x, cards[id].deltaPosition.y);

    let { x, y } = cards[id].deltaPosition;
    setCards([
      ...cards.slice(0, id),
      {
        ...cards[id],
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        },
        style: styles,
      },
      ...cards.slice(id + 1)
    ])
  };

  const transformColor = (id: number, x: number, y: number) => {
    // 16進数変換 + 0埋め6桁取得
    const hex = Math.ceil(Math.sqrt(x ** 2 + y ** 2) * 1000) + x + y;
    const color = ('000000' + (hex).toString(16)).substr(-6);
    const styles = {
      backgroundColor: '#' + color,
    };
    console.log(hex);
    console.log(color);
    return styles;
  };

  return (
    <div>
      {cards.map(card => (
        <Draggable bounds="body" onDrag={handleDrag(card.id)} key={card.id}>
          <div key={card.id} className="paper" style={card.style}>dog</div>
        </Draggable>
      ))}
    </div>
  );
};

export default CardList;

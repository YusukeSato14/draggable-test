import { InputBase } from '@material-ui/core';
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
  value: string;
}

type SetCards = React.Dispatch<React.SetStateAction<Card[]>>

export const colorList = [
  '#90A4AE',
  '#E0E0E0',
  '#A1887F',
  '#FF8A65',
  '#FFB74D',
  '#FFD54F',
  '#FFF176',
  '#DCE775',
  '#AED581',
  '#81C784',
  '#4DB6AC',
  '#4DD0E1',
  '#4FC3F7',
  '#64B5F6',
  '#7986CB',
  '#9575CD',
  '#BA68C8',
  '#F06292',
  '#E57373',
]

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
        value: cards[id].value,
      },
      ...cards.slice(id + 1)
    ])
  };

  const transformColor = (id: number, x: number, y: number) => {
    const colorKey = Math.abs(Math.ceil((x + y) / 50 % 18));
    const color = colorList[colorKey];
    const styles = {
      backgroundColor: color,
    };
    return styles;
  };

  const handleChange = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCards([
      ...cards.slice(0, id),
      {
        ...cards[id],
        deltaPosition: cards[id].deltaPosition,
        style: cards[id].style,
        value: event.target.value,
      },
      ...cards.slice(id + 1)
    ])
  }

  return (
    <div className="center">
      {cards.map(card => (
        <Draggable bounds="body" onDrag={handleDrag(card.id)} key={card.id}>
          <div key={card.id} className="paper" style={card.style}>
            <InputBase
              key={card.id}
              className="paper"
              style={card.style}
              multiline
              rows={4}
              placeholder="input idea"
              value={card.value}
              onChange={handleChange(card.id)}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default CardList;

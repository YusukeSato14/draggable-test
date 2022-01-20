import { createStyles, InputBase, Switch, Theme, withStyles } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type Props = {
  cards: Card[];
  setCards: SetCards;
};

type Card = {
  id: number;
  style: {
    backgroundColor: string;
  };
  fixedColor: boolean;
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
];

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 2,
      display: 'flex',
      float: 'right',
    },
    switchBase: {
      padding: 4,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(10px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#80DEEA',
          borderColor: '#E0E0E0',
        },
      },
    },
    thumb: {
      width: 10,
      height: 10,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid #E0E0E0`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }),
)(Switch);

const CardList = ({ cards, setCards }: Props) => {
  const handleColor = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setCards([
      ...cards.slice(0, id),
      {
        ...cards[id],
        style: cards[id].style,
        fixedColor: !cards[id].fixedColor,
        value: cards[id].value,
      },
      ...cards.slice(id + 1)
    ]);
  };

  const handleDrag = (id: number) => (e: DraggableEvent, data: DraggableData) => {
    const styles = cards[id].fixedColor ? cards[id].style : transformColor(id, data);

    setCards([
      ...cards.slice(0, id),
      {
        ...cards[id],
        style: styles,
        value: cards[id].value,
      },
      ...cards.slice(id + 1)
    ]);
  };

  const transformColor = (id: number, data: DraggableData) => {
    const colorKey = Math.abs(Math.ceil((data.x + data.y) / 50 % 18));
    const color = colorList[colorKey];
    const styles = {
      backgroundColor: color,
    };
    return styles;
  };

  const handleChange = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setCards([
      ...cards.slice(0, id),
      {
        ...cards[id],
        style: cards[id].style,
        value: event.target.value,
      },
      ...cards.slice(id + 1)
    ]);
  };

  return (
    <div className="center">
      {cards.map(card => (
        <Draggable bounds="body" onDrag={handleDrag(card.id)} key={card.id}>
          <div key={card.id} className="paper" style={card.style}>
            <AntSwitch
              checked={card.fixedColor}
              onChange={handleColor(card.id)}
              name="colorSwitch"
            />
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

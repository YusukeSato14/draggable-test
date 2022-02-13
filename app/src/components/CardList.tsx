import { createStyles, IconButton, InputBase, Switch, Theme, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Draggable from 'react-draggable';

import { Card } from './CardContent';

type Props = {
  cards: Card[],
  setDeleteCardId: React.Dispatch<React.SetStateAction<number>>,
  onStart: Function,
  onDrag: Function,
  toggleFixedColor: Function,
  changeTextValue: Function,
};

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

const CardList = ({ cards, setDeleteCardId, onStart, onDrag, toggleFixedColor, changeTextValue }: Props) => {
  return (
    <div className="center">
      {cards.map(card => (
        <>
          <Draggable bounds="body" onStart={onStart(card)} onDrag={onDrag(card)}>
            <div className="card" style={card.style}>
              <IconButton aria-label="delete" className="delete-button" onClick={() => setDeleteCardId(card.id)} name="deleteButton">
                <DeleteIcon fontSize="small" />
              </IconButton>
              <AntSwitch
                checked={card.isFixedColor}
                onChange={toggleFixedColor(card)}
                name="colorSwitch"
              />
              <InputBase
                className="card-textarea"
                autoFocus={true}
                style={card.style}
                multiline
                rows={4}
                placeholder="input idea"
                value={card.value}
                onChange={changeTextValue(card)}
              />
            </div>
          </Draggable>
        </>
      ))}
    </div>
  );
};

export default CardList;

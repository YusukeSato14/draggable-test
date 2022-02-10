import { Card } from './CardContent';
import DraggableCard from './DraggableCard';

type Props = {
  cards: Card[],
  setDeleteCardId: React.Dispatch<React.SetStateAction<number>>,
  onStart: Function,
  onDrag: Function,
  toggleFixedColor: Function,
  changeTextValue: Function,
};

const CardList = ({ cards, setDeleteCardId, onStart, onDrag, toggleFixedColor, changeTextValue }: Props) => {
  return (
    <div className="center">
      {cards.map(card => (
        <DraggableCard key={card.id} card={card} setDeleteCardId={setDeleteCardId} onStart={onStart} onDrag={onDrag} toggleFixedColor={toggleFixedColor} changeTextValue={changeTextValue} />
      ))}
    </div>
  );
};

export default CardList;

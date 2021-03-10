import { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';

type Props = {
  cards: {
    id: number;
  }[]
}

const CardList = (props: Props) => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState({ backgroundColor: "#000" });
  const handleDrag: DraggableEventHandler = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
    transformColor(x, y);
  }

  const transformColor = (x: number, y: number) => {
    // 16進数変換 + 0埋め6桁取得
    const hex = x * y;
    const color = ('000000' + (x * y * 1000).toString(16)).substr(-6);
    console.log(x * y);
    let styles = {
      backgroundColor: '#' + color,
    }
    setBackgroundColor(styles);
  }
  return (
    <div>
      {props.cards.map(card => (
        <Draggable bounds="body" onDrag={handleDrag}>
          <div key={card.id} className="paper" style={backgroundColor}>dog</div>
        </Draggable>
      ))}
    </div>
  )
}

export default CardList;

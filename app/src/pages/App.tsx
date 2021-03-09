import { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable'

import '../assets/App.css';

type Ui = {
  deltaX: number
  deltaY: number
}

function App() {
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
    const color = ('000000' + (x * y).toString(16)).substr(-6);
    console.log('#' + color);
    let styles = {
      backgroundColor: '#' + color,
    }
    setBackgroundColor(styles);
  }
  return (
    <div className="App">
      <Draggable bounds="body" onDrag={handleDrag}>
        <div className="paper" style={backgroundColor}>dog</div>
      </Draggable>
      <Draggable bounds="body" onDrag={handleDrag}>
        <div className="paper" style={backgroundColor}>cat</div>
      </Draggable>
    </div>
  );
}

export default App;

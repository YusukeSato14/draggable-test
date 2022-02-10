import { MouseEventHandler } from "react";

import { Card } from "./CardContent";
import { colorList } from "./DraggableCard";

type Props = {
  addCard: MouseEventHandler,
}

const Menu = ({ addCard }: Props) => {
  return (
    <button className="add-button" onClick={addCard}>add</button>
  );
};

export default Menu;

import { MouseEventHandler } from "react";

type Props = {
  addCard: MouseEventHandler,
}

const Menu = ({ addCard }: Props) => {
  return (
    <button className="add-button" onClick={addCard}>add</button>
  );
};

export default Menu;

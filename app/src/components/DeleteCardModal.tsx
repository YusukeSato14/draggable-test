import { Button } from "@material-ui/core";
import React from "react";

import { Card } from "./DraggableCard";

type Props = {
  cards: Card[],
  deleteCardId: number,
  setDeleteCardId: React.Dispatch<React.SetStateAction<number>>,
  deleteCard: Function,
};

const DeleteCardModal = ({ cards, deleteCardId, setDeleteCardId, deleteCard }: Props) => {
  if (deleteCardId === -1) return null;

  const deleteCardElement = cards.find(element => element.id === deleteCardId)!;
  const deleteCardValue = deleteCardElement.value;

  return (
    <div className="DeleteModal">
      <div className="modal-content">
        <p>{deleteCardValue}</p>
        <p>削除しますか？</p>
        <Button className="modal-button" variant="contained" color="primary" onClick={() => deleteCard()}>はい</Button>
        <Button className="modal-button" variant="outlined" color="primary" onClick={() => setDeleteCardId(-1)}>いいえ</Button>
      </div>
    </div>
  );
};

export default DeleteCardModal;

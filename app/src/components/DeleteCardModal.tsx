import { Button } from "@mui/material";
import React, { memo } from "react";
import { Card } from "./CardContent";

type Props = {
  getDeleteCardElement: () => Card;
  deleteCardId: number;
  setDeleteCardId: React.Dispatch<React.SetStateAction<number>>;
  deleteCard: VoidFunction;
};

const DeleteCardModal = memo(
  ({
    getDeleteCardElement,
    deleteCardId,
    setDeleteCardId,
    deleteCard,
  }: Props) => {
    if (deleteCardId === -1) return null;

    const deleteCardElement = getDeleteCardElement();

    return (
      <div className="DeleteModal">
        <div className="modal-content">
          <p>{deleteCardElement.value}</p>
          <p>削除しますか？</p>
          <Button
            className="modal-button"
            variant="contained"
            color="primary"
            onClick={() => deleteCard()}
          >
            はい
          </Button>
          <Button
            className="modal-button"
            variant="outlined"
            color="primary"
            onClick={() => setDeleteCardId(-1)}
          >
            いいえ
          </Button>
        </div>
      </div>
    );
  },
);

export default DeleteCardModal;

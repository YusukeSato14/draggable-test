import { Delete } from "@mui/icons-material";
import { IconButton, InputBase, Switch, styled } from "@mui/material";
import React, { ChangeEvent } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

import { Card, colorList } from "./CardContent";

type Props = {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  zIndex: number;
  setZIndex: React.Dispatch<React.SetStateAction<number>>;
  setDeleteCardId: React.Dispatch<React.SetStateAction<number>>;
  getCardsIndex: (id: number) => number;
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  float: "right",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    color: theme.palette.grey[500],
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#80DEEA",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 12,
    height: 12,
    boxShadow: "none",
    borderRadius: 6,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
    boxXizing: "border-box",
  },
  checked: {},
}));

const CardList = ({
  cards,
  setCards,
  zIndex,
  setZIndex,
  setDeleteCardId,
  getCardsIndex,
}: Props) => {
  // カードに触れた際に要素を最前面に出す。
  const onStart = (card: Card) => (event: DraggableEvent) => {
    if (zIndex === card.style.zIndex) return;
    const newZIndex = zIndex + 1;
    setZIndex(newZIndex);

    const cardsIndex = getCardsIndex(card.id);

    setCards([
      ...cards.slice(0, cardsIndex),
      {
        ...card,
        style: {
          backgroundColor: card.style.backgroundColor,
          zIndex: newZIndex,
        },
        value: card.value,
      },
      ...cards.slice(cardsIndex + 1),
    ]);
  };

  // カードドラッグ中の変更
  const onDrag = (card: Card) => (e: DraggableEvent, data: DraggableData) => {
    const color = card.isFixedColor
      ? card.style.backgroundColor
      : transformColor(data);
    // 処理軽減のため色変更なしならstateいじらない
    if (color === card.style.backgroundColor) return;
    const cardsIndex = getCardsIndex(card.id);

    setCards([
      ...cards.slice(0, cardsIndex),
      {
        ...card,
        style: {
          backgroundColor: color,
          zIndex: zIndex,
        },
        value: card.value,
      },
      ...cards.slice(cardsIndex + 1),
    ]);
  };

  const toggleFixedColor =
    (card: Card) => (event: ChangeEvent<HTMLInputElement>) => {
      const cardsIndex = getCardsIndex(card.id);

      setCards([
        ...cards.slice(0, cardsIndex),
        {
          ...card,
          style: card.style,
          isFixedColor: !card.isFixedColor,
          value: card.value,
        },
        ...cards.slice(cardsIndex + 1),
      ]);
    };

  const changeTextValue =
    (card: Card) => (event: ChangeEvent<HTMLInputElement>) => {
      const cardsIndex = getCardsIndex(card.id);

      setCards([
        ...cards.slice(0, cardsIndex),
        {
          ...card,
          style: card.style,
          value: event.target.value,
        },
        ...cards.slice(cardsIndex + 1),
      ]);
    };

  const transformColor = (data: DraggableData) => {
    const colorKey = Math.floor(
      ((Math.atan2(data.y, data.x) * (180 / Math.PI) + 180) * 19) / 361,
    );
    const color = colorList[colorKey];
    return color;
  };

  return (
    <div className="center">
      {cards.map((card) => (
        <React.Fragment key={card.id}>
          <Draggable
            bounds="parent"
            onStart={onStart(card)}
            onDrag={onDrag(card)}
          >
            <div className="card" style={card.style}>
              <IconButton
                aria-label="delete"
                className="delete-button"
                onClick={() => setDeleteCardId(card.id)}
                name="deleteButton"
              >
                <Delete fontSize="small" />
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardList;

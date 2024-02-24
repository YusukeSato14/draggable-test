import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

type Props = {
  addCard: MouseEventHandler,
};

const AddButton = styled(Button)({
  margin: '15px',
  color: '#f0f0f0',
  border: '2px dashed #FFD54F',
  backgroundColor: '#4DB6AC',
  borderRadius: '7px',
  height: '30px',
  width: '70px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#4DB6AC',
    borderColor: '#FFB74D',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#4DB6AC',
    borderColor: '#4FC3F7',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const Menu = ({ addCard }: Props) => {
  return (
    <div className="menu">
      <LoginButton />
      <LogoutButton />
      <AddButton variant="contained" onClick={addCard}>add</AddButton>
    </div>
  );
};

export default Menu;

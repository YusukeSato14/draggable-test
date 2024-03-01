import { Button, styled } from "@mui/material";

const StyledLogoutButton = styled(Button)({
  margin: "15px",
  color: "#f0f0f0",
  border: "2px dashed #FFD54F",
  backgroundColor: "#64B5F6",
  borderRadius: "7px",
  height: "30px",
  width: "120px",
  "&:hover": {
    backgroundColor: "#64B5F6",
    borderColor: "#FFB74D",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#64B5F6",
    borderColor: "#4FC3F7",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const LogoutButton = () => (
  <StyledLogoutButton variant="outlined" href="/api/auth/logout">
    ログアウト
  </StyledLogoutButton>
);

export default LogoutButton;

import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";
interface ButtonProps {
  title: string;
  backgroundColor: string;
  callback: () => void;
}

const StyledButton: FunctionComponent<ButtonProps> = ({
  title,
  backgroundColor = "#0f748f",
  callback,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ whiteSpace: "nowrap", backgroundColor: "#0f748f" }}
      onClick={callback}
    >
      {title}
    </Button>
  );
};

export default StyledButton;

import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";
interface ButtonProps {
  title: string;
  backgroundColor: string;
}

const StyledButton: FunctionComponent<ButtonProps> = ({
  title,
  backgroundColor = "#0f748f",
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ whiteSpace: "nowrap", backgroundColor: "#0f748f" }}
    >
      {title}
    </Button>
  );
};

export default StyledButton;

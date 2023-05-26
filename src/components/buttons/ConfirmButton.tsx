import React from "react";
import Button from "./Button";
import "../styles/ConfirmButton.css";

interface ConfirmButtonProps {
  onClick: () => void;
  linkTo?: string;
  disabled?: boolean;
}

const ConfirmButton = ({ onClick, linkTo, disabled }: ConfirmButtonProps) => {
  return (
    <Button
      className="confirmButton"
      value="Confirm"
      onClick={onClick}
      linkTo={linkTo}
      disabled={disabled}
    ></Button>
  );
};

export default ConfirmButton;

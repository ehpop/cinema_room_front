import React from "react";
import "../styles/CancelButton.css";
import { Link } from "react-router-dom";
import Button from "./Button";

interface CancelButtonProps {
  onClick: () => void;
  linkTo?: string;
}

const CancelButton = ({ onClick, linkTo }: CancelButtonProps) => {
  return (
    <Button
      className="cancelButton"
      value="Cancel"
      onClick={onClick}
      linkTo={linkTo}
    ></Button>
  );
};

export default CancelButton;

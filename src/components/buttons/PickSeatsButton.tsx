import React from "react";
import Button from "./Button";
import "../styles/PickSeatsButton.css";

interface IPickSeatsButtonProps {
  disabled?: boolean;
}

const PickSeatsButton = ({ disabled }: IPickSeatsButtonProps) => {
  return (
    <Button
      linkTo="/seats"
      value="Pick Seats"
      disabled={disabled}
      className={disabled ? "PickSeatsButtonDisabled" : "PickSeatsButton"}
    />
  );
};

export default PickSeatsButton;

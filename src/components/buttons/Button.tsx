import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css";
interface ButtonProps {
  onClick?: () => void;
  linkTo?: string;
  value: string;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  value,
  linkTo,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <Link to={linkTo ? linkTo : "/"}>
      <button className={className} onClick={onClick} disabled={disabled}>
        {value}
      </button>
    </Link>
  );
};

export default Button;

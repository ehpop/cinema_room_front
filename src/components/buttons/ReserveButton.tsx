import React from "react";
import { Link } from "react-router-dom";
interface ReserveButtonProps {}

const ReserveButton: React.FC<ReserveButtonProps> = () => {
  return (
    <Link to={`/reservations`}>
      <button>Reserve Now</button>
    </Link>
  );
};

export default ReserveButton;

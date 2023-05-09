import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../components/Movie";

interface ReserveButtonProps {
  movie: IMovie;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({ movie }) => {
  return (
    <Link to={`/reservations`}>
      <button>Reserve Now</button>
    </Link>
  );
};

export default ReserveButton;

import React from "react";
import "./styles/Movie.css";
import { Link } from "react-router-dom";

export interface IMovie {
  id: number;
  title: string;
  ageCategory: number;
  director: string;
  duration: number;
}

interface MovieProps {
  movie: IMovie;
  onClick?: () => void;
}

const Movie: React.FC<MovieProps> = ({ movie, onClick }) => {
  return (
    <Link to={`/movies/details`} className="MovieLink" onClick={onClick}>
      <div className="Movie">
        <h2>{movie.title}</h2>
        <p>Age category: {movie.ageCategory}</p>
        <p>Director: {movie.director}</p>
        <p>Duration: {movie.duration} min</p>
      </div>
    </Link>
  );
};

export default Movie;

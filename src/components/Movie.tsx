import React from "react";
import "./styles/Movie.css";
import { Link } from "react-router-dom";

export interface IMovie {
  id: number;
  title: string;
  ageCategory: number;
  director: string;
  duration: number;
  description: string;
  posterUrl: string;
  category: string;
}

interface MovieProps {
  movie: IMovie;
  onClick?: () => void;
  className?: string;
}

const Movie: React.FC<MovieProps> = ({ movie, onClick, className }) => {
  return (
    <Link to={`/movies/details`} className="MovieLink" onClick={onClick}>
      <div className={className ? className : "Movie"}>
        <h2>{movie?.title}</h2>
        <img src={movie?.posterUrl} alt={movie?.title} />
        <div>
          <p>Age category: {movie?.ageCategory}</p>
          <p>Director: {movie?.director}</p>
          <p>Duration: {movie?.duration} min</p>
          <p>Category: {movie?.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default Movie;

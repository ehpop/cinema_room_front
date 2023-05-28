import React, { useState, useEffect, useContext } from "react";
import Movie, { IMovie } from "./Movie";

import "./styles/MovieCarousel.css";
import { AppContext } from "../App";

interface IMovieCarouselProps {
  movies: IMovie[];
}

const MovieCarousel = ({ movies }: IMovieCarouselProps) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { selectedMovie, setSelectedMovie } = useContext(AppContext);

  const handlePrevClick = () => {
    if (!isTransitioning) {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === 0 ? movies.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextClick = () => {
    if (!isTransitioning) {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const getPreviousIndex = (currentIndex: number) => {
    return currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  };

  const getNextIndex = (currentIndex: number) => {
    return currentIndex === movies.length - 1 ? 0 : currentIndex + 1;
  };

  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    setIsTransitioning(true);
    const transitionTimeMs = 400;

    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionTimeMs);

    return () => clearTimeout(transitionTimeout);
  }, [currentMovieIndex]);

  return (
    <div className="movie-carousel">
      <button onClick={handlePrevClick}>Previous</button>
      <div className="movie-container">
        <Movie
          movie={movies[getPreviousIndex(currentMovieIndex)]}
          className={`movie-adjacent ${isTransitioning ? "transitioning" : ""}`}
          onClick={() =>
            handleMovieClick(movies[getPreviousIndex(currentMovieIndex)])
          }
        />
        <Movie
          movie={movies[currentMovieIndex]}
          className={`movie-main ${isTransitioning ? "transitioning" : ""}`}
          onClick={() => handleMovieClick(movies[currentMovieIndex])}
        />
        <Movie
          movie={movies[getNextIndex(currentMovieIndex)]}
          className={`movie-adjacent ${isTransitioning ? "transitioning" : ""}`}
          onClick={() =>
            handleMovieClick(movies[getNextIndex(currentMovieIndex)])
          }
        />
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default MovieCarousel;

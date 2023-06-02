import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import SeeScreeningsButton from "../components/buttons/SeeScreeningsButton";
import "./styles/MovieDetails.css";
import CancelButton from "../components/buttons/CancelButton";

const MovieDetails = () => {
  const {
    selectedMovie,
    setSelectedMovie,
    selectedSeats,
    setSelectedSeats,
    selectedScreening,
    setSelectedScreening,
  } = useContext(AppContext);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  const { title, ageCategory, director, duration, posterUrl } = selectedMovie;

  const handleCancelClick = () => {
    setSelectedMovie(null);
    setSelectedSeats([]);
    setSelectedScreening(null);
  };

  return (
    <div className="movie-details-container">
      <img src={posterUrl} alt={title + "'s image"} className="movie-img"></img>
      <h2 className="title">{title}</h2>
      <p>Age category: {ageCategory}</p>
      <p>Director: {director}</p>
      <p>Duration: {duration} min</p>
      <p className="description">Description: {selectedMovie.description}</p>
      <div className="button-container">
        <SeeScreeningsButton></SeeScreeningsButton>
        <CancelButton onClick={handleCancelClick}></CancelButton>
      </div>
    </div>
  );
};

export default MovieDetails;

import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import SeeScreeningsButton from "../components/buttons/SeeScreeningsButton";
import "./styles/MovieDetails.css";

const MovieDetails = () => {
  const { selectedMovie } = useContext(AppContext);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  const { title, ageCategory, director, duration, posterUrl } = selectedMovie;

  return (
    <div>
      <img src={posterUrl} alt={title + "'s image"}></img>
      <h2>{title}</h2>
      <p>Age category: {ageCategory}</p>
      <p>Director: {director}</p>
      <p>Duration: {duration} min</p>
      <SeeScreeningsButton></SeeScreeningsButton>
    </div>
  );
};

export default MovieDetails;

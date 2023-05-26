import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import SeeScreeningsButton from "../components/buttons/SeeScreeningsButton";

const MovieDetails = () => {
  const { selectedMovie } = useContext(AppContext);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  const { title, ageCategory, director, duration } = selectedMovie;

  return (
    <div>
      <h2>{title}</h2>
      <p>Age category: {ageCategory}</p>
      <p>Director: {director}</p>
      <p>Duration: {duration} min</p>
      {/* TODO: Implement picture and description for a movie */}
      {/* <img src={picture ? picture : null} alt={title} />
      <p>{description}</p> */}
      <SeeScreeningsButton></SeeScreeningsButton>
    </div>
  );
};

export default MovieDetails;

import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { IMovie } from "../components/Movie";
import ReserveButton from "../components/ReserveButton";
import SeeScreeningsButton from "../components/SeeScreeningsButton";

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
      <ReserveButton movie={selectedMovie}></ReserveButton>
      <SeeScreeningsButton movie={selectedMovie}></SeeScreeningsButton>
    </div>
  );
};

export default MovieDetails;

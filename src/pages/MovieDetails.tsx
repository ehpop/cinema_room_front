import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import SeeScreeningsButton from "../components/buttons/SeeScreeningsButton";
import "./styles/MovieDetails.css";
import CancelButton from "../components/buttons/CancelButton";
import ScreeningsGrid from "../components/ScreeningsGrid";
import Button from "../components/buttons/Button";
import PickSeatsButton from "../components/buttons/PickSeatsButton";

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
      <table>
        <tbody>
          <tr>
            <td>
              <img
                src={posterUrl}
                alt={title + "'s image"}
                className="movie-img"
              />
            </td>
            <td>
              <h2 className="title">{title}</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Age category:</td>
                    <td className="data">{ageCategory}</td>
                  </tr>
                  <tr>
                    <td>Director:</td>
                    <td className="data">{director}</td>
                  </tr>
                  <tr>
                    <td>Category:</td>
                    <td className="data">{selectedMovie.category}</td>
                  </tr>
                  <tr>
                    <td>Duration:</td>
                    <td className="data">{duration} min</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td className="data">{selectedMovie.description}</td>
                  </tr>
                </tbody>
              </table>
              <div className="button-container">
                <SeeScreeningsButton />
                <CancelButton onClick={handleCancelClick} />
                <PickSeatsButton disabled={selectedScreening ? false : true} />
              </div>
              <ScreeningsGrid />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieDetails;

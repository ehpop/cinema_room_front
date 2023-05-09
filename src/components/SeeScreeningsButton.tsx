import React, { useContext, useState } from "react";
import { IMovie } from "./Movie";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../App";
import "./styles/SeeScreeningsButton.css";

interface ReserveButtonProps {
  movie: IMovie;
}

interface IScreening {
  id: number;
  movie: number;
  room: number;
  startTime: Date;
  endTime: Date;
}

const SeeScreeningsButton: React.FC<ReserveButtonProps> = ({ movie }) => {
  const {
    data: reservationsList,
    isLoading,
    isError,
  } = useQuery<[IScreening]>(["screenings"], () => {
    return Axios.get("http://localhost:8080/screenings").then(
      (res) => res.data
    );
  });

  const { selectedMovie } = useContext(AppContext);
  const [isListVisible, setListVisibility] = useState<boolean>(false);

  const selectScreeningsForMovie = () => {
    return reservationsList?.filter((res) => res.movie === movie.id);
  };

  const handleClick = () => {
    setListVisibility(!isListVisible);
  };

  const renderList = () => {
    const selectedList = selectScreeningsForMovie();

    return (
      <div>
        {selectedList?.length &&
          selectedList.length > 0 &&
          selectedList.map((screening) => (
            <div className="screeningEntry">
              <p>ID: {screening.id}</p>
              <p>Movie ID: {screening.movie}</p>
              <p>Room: {screening.room}</p>
              <p>Start Time: {screening.startTime.toLocaleString()}</p>
              <p>End Time: {screening.endTime.toLocaleString()}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <button onClick={handleClick}>See Screenings</button>
      {isListVisible && renderList()}
    </div>
  );
};

export default SeeScreeningsButton;

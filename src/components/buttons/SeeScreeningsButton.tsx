import React, { useContext, useState } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../../App";
import "../styles/SeeScreeningsButton.css";
import PickSeatsButton from "./PickSeatsButton";
import { ScreeningInfo, IScreening } from "../ScreeningInfo";

const SeeScreeningsButton = () => {
  const {
    data: reservationsList,
    isLoading,
    isError,
  } = useQuery<[IScreening]>(["screenings"], () => {
    return Axios.get("http://localhost:8080/screenings").then(
      (res) => res.data
    );
  });

  const { selectedMovie, selectedScreening, setSelectedScreening } =
    useContext(AppContext);
  const [isListVisible, setListVisibility] = useState<boolean>(false);

  const selectScreeningsForMovie = () => {
    return reservationsList?.filter((res) => res.movie === selectedMovie?.id);
  };

  const handleClick = () => {
    setListVisibility(!isListVisible);
    if (selectedScreening) {
      setSelectedScreening(null);
    }
  };

  const isListEmpty = () => {
    const selectedList = selectScreeningsForMovie();

    return (
      !isLoading && !isError && (!selectedList || selectedList.length === 0)
    );
  };

  const renderList = () => {
    const selectedList = selectScreeningsForMovie();

    return isListEmpty() ? (
      <div className="screeningInfo">No screenings avaliable at this time</div>
    ) : (
      <div className="screeningsGreed">
        {selectedList?.length &&
          selectedList.length > 0 &&
          selectedList.map((screening) => (
            <ScreeningInfo
              screening={screening}
              selectedScreening={selectedScreening}
              onClick={setSelectedScreening}
            ></ScreeningInfo>
          ))}
      </div>
    );
  };

  return (
    <div>
      <button onClick={handleClick}>See Screenings</button>
      {isListVisible && renderList()}
      {selectedScreening && <PickSeatsButton />}
    </div>
  );
};

export default SeeScreeningsButton;

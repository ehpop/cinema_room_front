import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { IScreening, ScreeningInfo } from "./ScreeningDetails";
import Axios from "axios";
import { AppContext } from "../App";

const ScreeningsGrid = () => {
  const {
    data: screeningsList,
    isLoading,
    isError,
  } = useQuery<[IScreening]>(["screenings"], () => {
    return Axios.get("http://localhost:8080/screenings").then(
      (res) => res.data
    );
  });

  const {
    selectedMovie,
    selectedScreening,
    setSelectedScreening,
    isListVisible,
  } = useContext(AppContext);

  const selectScreeningsForMovie = () => {
    return screeningsList?.filter((res) => res.movie === selectedMovie?.id);
  };

  const isListEmpty = () => {
    const selectedList = selectScreeningsForMovie();

    return (
      !isLoading && !isError && (!selectedList || selectedList.length === 0)
    );
  };

  const renderList = () => {
    const selectedList = selectScreeningsForMovie();

    const screeningsGrid = isListEmpty() ? (
      <div className="screeningInfo">No screenings avaliable at this time</div>
    ) : (
      <div className="screeningsGreed">
        {selectedList?.length &&
          selectedList.length > 0 &&
          selectedList.map((screening) => (
            <ScreeningInfo
              key={screening.id}
              screening={screening}
              selectedScreening={selectedScreening}
              onClick={setSelectedScreening}
            ></ScreeningInfo>
          ))}
      </div>
    );

    const emptyScreeningsGrid = <div></div>;

    return isListVisible ? screeningsGrid : emptyScreeningsGrid;
  };

  return renderList();
};

export default ScreeningsGrid;

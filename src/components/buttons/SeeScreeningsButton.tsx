import React, { useContext, useState } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../../App";
import "../styles/SeeScreeningsButton.css";
import PickSeatsButton from "./PickSeatsButton";
import { ScreeningInfo, IScreening } from "../ScreeningDetails";

const SeeScreeningsButton = () => {
  const {
    selectedScreening,
    setSelectedScreening,
    isListVisible,
    setListVisibility,
  } = useContext(AppContext);

  const handleClick = () => {
    setListVisibility(!isListVisible);
    if (selectedScreening) {
      setSelectedScreening(null);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>See Screenings</button>
    </div>
  );
};

export default SeeScreeningsButton;

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import "./styles/Seats.css";
import { IReservation } from "../pages/Reservations";
import { useContext } from "react";
import { AppContext } from "../App";
import { IScreening } from "../components/ScreeningInfo";
import ConfirmButton from "../components/buttons/ConfirmButton";
import CancelButton from "../components/buttons/CancelButton";
import { ref } from "yup";

export interface ISeat {
  seatNumber: number;
  isTaken: boolean;
}

const Seats = () => {
  const {
    selectedScreening,
    setSelectedScreening,
    selectedSeat,
    setSelectedSeat,
  } = useContext(AppContext);

  const {
    data: reservationsList,
    isLoading,
    refetch,
    isError,
  } = useQuery<IReservation[]>(["reservations"], () =>
    Axios.get("http://localhost:8080/reservations").then((res) => res.data)
  );

  const filteredReservationsList = React.useMemo(() => {
    if (!selectedScreening) {
      return reservationsList;
    }

    return reservationsList
      ? reservationsList.filter(
          (res) => res.screeningInfo === selectedScreening.id
        )
      : [];
  }, [selectedScreening, reservationsList]);

  const availableSeats = React.useMemo(() => {
    if (!filteredReservationsList) {
      return [];
    }

    const seats: number[] = Array.from(
      { length: 100 },
      (_, index) => index + 1
    );
    const reservedSeats = filteredReservationsList.map((res) => res.seat);

    return seats.map((seatNumber) => ({
      seatNumber,
      isTaken: reservedSeats.includes(seatNumber),
    }));
  }, [filteredReservationsList]);

  useEffect(() => {
    refetch();
  }, []);

  const handleOnClick = (seat: ISeat) => {
    if (seat.isTaken) {
      return;
    }

    setSelectedSeat(seat);
  };

  const handleConfirm = () => {
    alert("Reservation confirmed!");
  };

  const handleCancel = () => {
    setSelectedSeat(null);
    setSelectedScreening(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderSeatsBySection = (columnNumbers: number[]) =>
    availableSeats
      .filter((seat) => columnNumbers.includes(seat.seatNumber % 10))
      .map((seat) => (
        <div
          key={seat.seatNumber}
          className={
            seat.isTaken
              ? "taken-seat"
              : selectedSeat?.seatNumber === seat.seatNumber
              ? "picked-seat"
              : "available-seat"
          }
          onClick={() => handleOnClick(seat)}
        >
          <div className="seatNumber">{seat.seatNumber}</div>
        </div>
      ));

  const renderRows = () =>
    Array.from({ length: 10 }, (_, index) => index + 1).map((rowNumber) => (
      <div key={rowNumber} className="Row">
        <div className="rowNumber">{rowNumber}</div>
      </div>
    ));

  return (
    <div className="seats">
      <h1>Pick your seat for screening</h1>
      <div className="description">
        <div className="RowsDescription">Rows</div>
        <div className="Screen">Screen</div>
      </div>
      <div className="seatsContainer">
        <div className="Rows">{renderRows()}</div>
        <div className="Section-1">{renderSeatsBySection([1, 2, 3, 4, 5])}</div>
        <div className="Section-2">{renderSeatsBySection([6, 7, 8, 9, 0])}</div>
      </div>
      <div className="ButtonsContainer">
        <CancelButton
          linkTo="/movies/details"
          onClick={handleCancel}
        ></CancelButton>
        <ConfirmButton
          linkTo="/reservations"
          onClick={handleConfirm}
          disabled={!selectedSeat}
        ></ConfirmButton>
        <button
          className="backButton"
          onClick={() => {
            console.log(
              selectedScreening?.id,
              filteredReservationsList,
              reservationsList
            );
            refetch();
          }}
        ></button>
      </div>
    </div>
  );
};

export default Seats;

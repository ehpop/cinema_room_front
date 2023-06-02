import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import {
  formatDateTimeInfo,
  extractDateTimeInfo,
  extractTimeOnlyInfo,
  extractDateOnlyInfo,
} from "../utils/dateUtils";
import "./styles/Reservations.css";
import ConfirmButton from "../components/buttons/ConfirmButton";
import CancelButton from "../components/buttons/CancelButton";
import PageNotFound from "./PageNotFound";
import ErrorPage from "./ErrorPage";
import Axios from "axios";

export interface IReservation {
  id: number;
  customerEmail: string;
  screeningId: number;
  seat: number;
  date: string;
}

const Reservations = () => {
  const { user } = useAuth0();
  const {
    selectedMovie,
    setSelectedMovie,
    selectedScreening,
    setSelectedScreening,
    selectedSeats,
    setSelectedSeats,
    setLastReservation,
  } = useContext(AppContext);

  const handleCancel = () => {
    setSelectedMovie(null);
    setSelectedScreening(null);
    setSelectedSeats(null);
    setLastReservation(null);
  };

  const handleConfirm = async () => {
    const reservation: IReservation = {
      id: 0,
      customerEmail: user?.email || "",
      screeningId: selectedScreening?.id || 0,
      seat: 0,
      date: new Date().toISOString(),
    };

    try {
      selectedSeats?.forEach((seat) => {
        reservation.seat = seat.seatNumber;
        postReservation(reservation);
      });
      setLastReservation(reservation);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const postReservation = async (reservation: IReservation) => {
    try {
      const response = await Axios.post(
        `http://localhost:8080/movies/${selectedMovie?.id}/reserve`,
        reservation
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const reservationContent = (
    <div className="reservationContainer">
      <h1>Reservation confirmation</h1>
      <div className="tableContainer">
        <table className="table">
          <tbody>
            <tr>
              <th>User Name:</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th>Movie Title:</th>
              <td>{selectedMovie?.title}</td>
            </tr>
            <tr>
              <th>Age Category:</th>
              <td>{selectedMovie?.ageCategory}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{selectedMovie?.duration}</td>
            </tr>
            <tr>
              <th>Director:</th>
              <td>{selectedMovie?.director}</td>
            </tr>
            <tr>
              <th>Room ID:</th>
              <td>{selectedScreening?.room}</td>
            </tr>
            <tr>
              <th>Seat Number(s):</th>
              <td>
                {selectedSeats
                  ? selectedSeats.map((seat) => seat.seatNumber).join(", ")
                  : "null"}
              </td>
            </tr>
            <tr className="price">
              <th>Price:</th>
              <td>
                {selectedSeats ? selectedSeats.length * 20 + " PLN" : "null"}
              </td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>
                {selectedScreening
                  ? extractDateOnlyInfo(selectedScreening.startTime.toString())
                  : ""}
              </td>
            </tr>
            <tr>
              <th>Start Time:</th>
              <td>
                {selectedScreening
                  ? extractTimeOnlyInfo(selectedScreening.startTime.toString())
                  : ""}
              </td>
            </tr>
            <tr>
              <th>End Time:</th>
              <td>
                {selectedScreening
                  ? extractTimeOnlyInfo(selectedScreening.endTime.toString())
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttonsContainer">
        <CancelButton onClick={handleCancel} linkTo="/movies" />
        <ConfirmButton onClick={handleConfirm} linkTo="/reservationSuccess" />
      </div>
    </div>
  );

  return selectedMovie && selectedScreening && selectedSeats ? (
    reservationContent
  ) : (
    <div className="container">
      <ErrorPage />
    </div>
  );
};

export default Reservations;

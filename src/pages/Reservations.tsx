import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDateTimeInfo, extractDateTimeInfo } from "../utils/dateUtils";
import "./styles/Reservations.css";
import ConfirmButton from "../components/buttons/ConfirmButton";
import CancelButton from "../components/buttons/CancelButton";
import PageNotFound from "./PageNotFound";
import ErrorPage from "./ErrorPage";
import Axios from "axios";

export interface IReservation {
  id: number;
  customerName: string;
  screeningInfo: number;
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
  } = useContext(AppContext);

  const handleCancel = () => {
    setSelectedMovie(null);
    setSelectedScreening(null);
    setSelectedSeats(null);
  };

  const handleConfirm = async () => {
    console.log(selectedMovie, selectedScreening, selectedSeats);
    const reservation: IReservation = {
      id: 0,
      customerName: user?.email || "",
      screeningInfo: selectedScreening?.id || 0,
      seat: -1 || 0,
      date: new Date().toISOString(),
    };

    try {
      console.log(reservation);
      const response = await Axios.post(
        `http://localhost:8080/movies/${selectedMovie?.id}/reserve`,
        reservation
      );
      handleCancel();
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
              <th>Seat Number:</th>
              <td>{selectedSeats ? selectedSeats?.toString() : "null"}</td>
            </tr>
            <tr>
              <th>Start Time:</th>
              <td>
                {selectedScreening
                  ? formatDateTimeInfo(
                      extractDateTimeInfo(
                        selectedScreening.startTime.toString()
                      )
                    )
                  : ""}
              </td>
            </tr>
            <tr>
              <th>End Time:</th>
              <td>
                {selectedScreening
                  ? formatDateTimeInfo(
                      extractDateTimeInfo(selectedScreening.endTime.toString())
                    )
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttonsContainer">
        <CancelButton onClick={handleCancel} linkTo={"/movies"} />
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

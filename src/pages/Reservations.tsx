import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDateTimeInfo, extractDateTimeInfo } from "../utils/dateUtils";
import "./styles/Reservations.css";
import ConfirmButton from "../components/buttons/ConfirmButton";
import CancelButton from "../components/buttons/CancelButton";

export interface IReservation {
  id: number;
  movieId: number;
  screeningInfo: number;
  userEmail: string;
  seat: number;
  reservationDate: string;
}

const Reservations = () => {
  const { user } = useAuth0();
  const {
    selectedMovie,
    setSelectedMovie,
    selectedScreening,
    setSelectedScreening,
    selectedSeat,
    setSelectedSeat,
  } = useContext(AppContext);

  const handleCancel = () => {
    setSelectedMovie(null);
    setSelectedScreening(null);
    setSelectedSeat(null);
  };

  const handleConfirm = () => {
    alert("Reservation confirmed!");
    //! TODO: add reservation to database
    handleCancel();
  };

  return (
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
              <td>{selectedSeat?.seatNumber}</td>
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
        <ConfirmButton onClick={handleConfirm} />
      </div>
    </div>
  );
};

export default Reservations;

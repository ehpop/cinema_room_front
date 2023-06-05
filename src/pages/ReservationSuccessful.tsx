import React, { useContext } from "react";
import "./styles/ReservationSuccessful.css";
import { IReservation } from "./Reservations";
import { IScreening } from "../components/ScreeningDetails";
import { IMovie } from "../components/Movie";
import {
  extractDateOnlyInfo,
  extractTimeOnlyInfo,
  formatDateTimeInfo,
} from "../utils/dateUtils";
import { AppContext } from "../App";
import Button from "../components/buttons/Button";
interface IReservationSuccessfulProps {
  reservation: IReservation | null;
  screening: IScreening | null;
  movie: IMovie | null;
}

const ReservationSuccessful = ({
  reservation,
  screening,
  movie,
}: IReservationSuccessfulProps) => {
  const {
    selectedMovie,
    setSelectedMovie,
    selectedScreening,
    setSelectedScreening,
    selectedSeats,
    setSelectedSeats,
    lastReservation,
    setLastReservation,
  } = useContext(AppContext);

  if (reservation === null) {
    return <div>Reservation not found</div>;
  }

  const cleanUp = () => {
    setSelectedMovie(null);
    setSelectedScreening(null);
    setSelectedSeats(null);
    setLastReservation(null);
  };

  const onClickBackToMovies = () => {
    cleanUp();
  };

  const onClickBackToHome = () => {
    cleanUp();
  };

  return (
    <div className="container">
      <h2>Reservation Successful</h2>
      <p>Your reservation has been confirmed. Please find the details below:</p>
      <div className="reservationDetails">
        <div>
          <span>Date:</span>
          <span>
            {screening
              ? extractDateOnlyInfo(screening.startTime.toString())
              : ""}
          </span>
        </div>
        <div>
          <span>Time:</span>
          <span>{extractTimeOnlyInfo(reservation.date.toString())}</span>
        </div>
        <div>
          <span>Seat:</span>
          <span>{reservation.seat}</span>
        </div>
        <div>
          <span>Movie:</span>
          <span>{movie?.title}</span>
        </div>
        <div>
          <span>Cinema Room:</span>
          <span>{screening?.room}</span>
        </div>
      </div>
      <p>Thank you for choosing our services. Enjoy the movie!</p>
      <div className="buttons">
        <Button
          linkTo="/"
          value="Back to Home"
          onClick={onClickBackToHome}
        ></Button>
        <Button
          linkTo="/movies"
          value="Back to Movies"
          onClick={onClickBackToMovies}
        ></Button>
      </div>
    </div>
  );
};

export default ReservationSuccessful;

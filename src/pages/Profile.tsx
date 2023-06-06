import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/buttons/LogoutButton";
import { useState, useEffect } from "react";
import Axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { IReservation } from "./Reservations";
import { IScreening } from "../components/ScreeningDetails";
import { IMovie } from "../components/Movie";
import { IContactJSON } from "../components/ContactForm";
import { extractDateTimeInfo, formatDateTimeInfo } from "../utils/dateUtils";
import "./styles/Profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const {
    data: reservations,
    isLoading: isLoadingReservations,
    isError,
  } = useQuery<IReservation[]>(["reservations"], () => {
    return Axios.get("http://localhost:8080/reservations").then(
      (res) => res.data
    );
  });

  const {
    data: screenings,
    isLoading: isLoadingScreenings,
    isError: isErrorScreenings,
  } = useQuery<IScreening[]>(["screenings"], () => {
    return Axios.get("http://localhost:8080/screenings").then(
      (res) => res.data
    );
  });

  const {
    data: movies,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
  } = useQuery<IMovie[]>(["movies"], () => {
    return Axios.get("http://localhost:8080/movies").then((res) => res.data);
  });

  const {
    data: complaints,
    isLoading: isLoadingComplaints,
    isError: isErrorComplaints,
  } = useQuery<IContactJSON[]>(["complaints"], () => {
    return Axios.get("http://localhost:8080/complaints").then(
      (res) => res.data
    );
  });

  const getMovie = (reservation: IReservation) => {
    if (isLoadingScreenings || isLoadingMovies) {
      return "Loading";
    }

    if (isErrorScreenings || isErrorMovies) {
      return "Error";
    }

    const screening = screenings?.find(
      (screening) => screening.id === reservation.screeningId
    );

    const movie = movies?.find((movie) => movie.id === screening?.movie);

    return movie;
  };

  const getMovieTitle = (reservation: IReservation) => {
    const movie = getMovie(reservation);

    if (typeof movie === "string") {
      return movie;
    } else if (typeof movie === "object") {
      return movie.title;
    } else {
      return "Error";
    }
  };

  const mapReservations = () => {
    return (
      <div className="reservationsContainer">
        <div className="reservationHeader">
          <div className="reservationDateTime">Date</div>
          <div className="reservationSeat">Seat</div>
          <div className="reservationMovieTitle">Movie</div>
        </div>
        {reservations
          ?.filter((reservation) => reservation.customerEmail === user?.email)
          .map((reservation) => (
            <div key={reservation.id} className="reservationEntry">
              <div className="reservationDateTime">
                {formatDateTimeInfo(extractDateTimeInfo(reservation.date))}
              </div>
              <div className="reservationSeat">{reservation.seat}</div>
              <div className="reservationMovieTitle">
                {getMovieTitle(reservation)}
              </div>
            </div>
          ))}
      </div>
    );
  };

  const mapComplaints = () => {
    const filteredComplaints = complaints?.filter(
      (complaint) => complaint.userId === user?.email
    );

    return (
      <div className="complaintsContainer">
        <div className="complaintHeader">
          <div className="complaintDateTime">Date</div>
          <div className="complaintContent">Content</div>
          <div className="complaintStatus">Status</div>
        </div>
        {filteredComplaints?.map((complaint, index) => (
          <div className="complaintEntry" key={index}>
            <div className="complaintDateTime">
              {formatDateTimeInfo(extractDateTimeInfo(complaint.issueDate))}
            </div>
            <div className="complaintContent">{complaint.complaintMsg}</div>
            <div className="complaintStatus">{complaint.status}</div>
            <div className="complaintResponse">{complaint.responseContact}</div>
          </div>
        ))}
      </div>
    );
  };

  const updateUserAfterLogin = async () => {
    try {
      await Axios.get(`http://localhost:8080/users/${user?.email}`);
    } catch (userDoesNotExistError: any) {
      if (
        userDoesNotExistError?.response &&
        userDoesNotExistError?.response.status === 404
      ) {
        try {
          const newUser = {
            email: user?.email,
            joinDate: new Date().toISOString(),
          };

          await Axios.post("http://localhost:8080/users", newUser);
        } catch (createUserError) {
          console.log("Error creating user:", createUserError);
        }
      }
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isAuthenticated) {
    updateUserAfterLogin();

    return (
      <div className="ProfileContainer">
        <img className="userImg" alt="user-profile" src={user?.picture} />
        <div className="userInfo">
          <p className="userName">{user?.name}</p>
          <p className="userNickname">{user?.nickname}</p>
          <p className="userEmail">{user?.email}</p>
        </div>
        <p className="reservationsLabel">Reservations:</p>
        {mapReservations()}
        <p className="complaintsLabel">Complaints:</p>
        {mapComplaints()}
        <LogoutButton />
      </div>
    );
  }

  return <div>You need to be logged in to see this page</div>;
};

export default Profile;

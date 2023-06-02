import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IReservation } from "./Reservations";
import { IScreening } from "../components/ScreeningInfo";
import { IMovie } from "../components/Movie";
import { type } from "os";
import { extractDateTimeInfo, formatDateTimeInfo } from "../utils/dateUtils";
import "./styles/Profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-6r44a0lgnhjg57sr.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e: any) {
        console.log(e?.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

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
      <table className="reservationsTable">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Seat</th>
            <th>Movie Title</th>
          </tr>
        </thead>
        <tbody>
          {reservations
            ?.filter((reservation) => reservation.customerEmail === user?.email)
            .map((reservation) => (
              <tr key={reservation.id} className="reservationEntry">
                <td className="reservationDateTime">
                  {formatDateTimeInfo(extractDateTimeInfo(reservation.date))}
                </td>
                <td className="reservationSeat">{reservation.seat}</td>
                <td className="reservationMovieTitle">
                  {getMovieTitle(reservation)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="ProfileContainer">
        <img alt="user-profile" src={user?.picture} />
        <div className="userInfo">
          <p className="userName">{user?.name}</p>
          <p className="userNickname">{user?.nickname}</p>
          <p className="userEmail">{user?.email}</p>
          <p className="userU">{user?.u}</p>
        </div>
        <p className="reservationsLabel">Reservations:</p>
        <div className="reservationsContainer">{mapReservations()}</div>
        <LogoutButton />
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          <p>No user metadata defined</p>
        )}
      </div>
    );
  }

  return <div>You need to be logged in to see this page</div>;
};

export default Profile;

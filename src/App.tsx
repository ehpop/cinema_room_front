import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";
import { IMovie } from "./components/Movie";
import { IScreening } from "./components/ScreeningInfo";
import { ISeat } from "./pages/Seats";
import Rooms from "./pages/Rooms";
import Reservations, { IReservation } from "./pages/Reservations";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Seats from "./pages/Seats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer";
import ReservationSuccessful from "./pages/ReservationSuccessful";

interface IAppContext {
  selectedMovie: IMovie | null;
  setSelectedMovie: React.Dispatch<React.SetStateAction<IMovie | null>>;
  selectedScreening: IScreening | null;
  setSelectedScreening: React.Dispatch<React.SetStateAction<IScreening | null>>;
  selectedSeats: ISeat[] | null;
  setSelectedSeats: React.Dispatch<React.SetStateAction<ISeat[] | null>>;
  lastReservation: IReservation | null;
  setLastReservation: React.Dispatch<React.SetStateAction<IReservation | null>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext>({
  selectedMovie: null,
  setSelectedMovie: () => {},
  selectedScreening: null,
  setSelectedScreening: () => {},
  selectedSeats: null,
  setSelectedSeats: () => {},
  lastReservation: null,
  setLastReservation: () => {},
  currentPage: "",
  setCurrentPage: () => {},
});

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [selectedScreening, setSelectedScreening] = useState<IScreening | null>(
    null
  );
  const [selectedSeats, setSelectedSeats] = useState<ISeat[] | null>(null);
  const [lastReservation, setLastReservation] = useState<IReservation | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState<string>("");

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            selectedMovie,
            setSelectedMovie,
            selectedScreening,
            setSelectedScreening,
            selectedSeats,
            setSelectedSeats,
            lastReservation,
            setLastReservation,
            currentPage,
            setCurrentPage,
          }}
        >
          <Router>
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp></SignUp>} />
              <Route path="/movies" element={<Movies></Movies>} />
              <Route
                path="/movies/details"
                element={<MovieDetails></MovieDetails>}
              />
              <Route path="/rooms" element={<Rooms></Rooms>} />
              <Route
                path="/reservations"
                element={<Reservations></Reservations>}
              />
              <Route path="/profile" element={<Profile></Profile>} />
              <Route path="/about" element={<About></About>} />
              <Route path="/contact" element={<Contact></Contact>} />
              <Route path="/seats" element={<Seats></Seats>} />
              <Route
                path="/reservationSuccess"
                element={
                  <ReservationSuccessful
                    reservation={lastReservation}
                    screening={selectedScreening}
                    movie={selectedMovie}
                  ></ReservationSuccessful>
                }
              />
              <Route path="/*" element={<PageNotFound></PageNotFound>} />
            </Routes>
            <Footer></Footer>
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

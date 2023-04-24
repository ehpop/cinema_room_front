import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";
import Rooms from "./pages/Rooms";
import Reservations from "./pages/Reservations";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn></LogIn>} />
          <Route path="/signup" element={<SignUp></SignUp>} />
          <Route path="/movies" element={<Movies></Movies>} />
          <Route path="/rooms" element={<Rooms></Rooms>} />
          <Route path="/reservations" element={<Reservations></Reservations>} />
          <Route path="/*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

import "./styles/Navbar.css";

//! TODO: Make Navbar dynamic by using a list of links and mapping them to <Link> components
const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Navbar;

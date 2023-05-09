import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarElement from "./NavbarElement";
import HomeIcon from "../img/icons/home.png";
import MoviesIcon from "../img/icons/movie.png";
import AboutIcon from "../img/icons/about.png";
import SignUpIcon from "../img/icons/signUp.png";

import "./styles/Navbar.css";

//! TODO: Make Navbar dynamic by using a list of links and mapping them to <Link> components
const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();

  const userElem: JSX.Element = isAuthenticated ? (
    <NavbarElement>
      <img src={user?.picture} alt={user?.nickname} className="miniUser"></img>
      <Link to="/profile">{user?.nickname}</Link>
    </NavbarElement>
  ) : (
    <NavbarElement>
      <img src={SignUpIcon} alt="about"></img>
      <Link to="/signup">Sign Up</Link>
    </NavbarElement>
  );

  return (
    <div className="Navbar">
      <NavbarElement>
        <img src={HomeIcon} alt="home"></img>
        <Link to="/">Home</Link>
      </NavbarElement>
      <NavbarElement>
        <img src={MoviesIcon} alt="movies"></img>
        <Link to="/movies">Movies</Link>
      </NavbarElement>
      <NavbarElement>
        <img src={AboutIcon} alt="about"></img>
        <Link to="/about">About us</Link>
      </NavbarElement>
      {userElem}
    </div>
  );
};

export default Navbar;

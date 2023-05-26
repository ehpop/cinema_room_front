import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarElement from "./NavbarElement";
import HomeIcon from "../img/icons/home.png";
import MoviesIcon from "../img/icons/movie.png";
import AboutIcon from "../img/icons/about.png";
import SignUpIcon from "../img/icons/signUp.png";
import ContactIcon from "../img/icons/contact.png";
import Logo from "../img/logo.png";

import "./styles/Navbar.css";

//! TODO: Make Navbar dynamic by using a list of links and mapping them to <Link> components
const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();

  const userContent: JSX.Element = isAuthenticated ? (
    <div className="userContent">
      <Link to="/profile">{user?.name}</Link>
      <img src={user?.picture} alt={user?.nickname} className="miniUser"></img>
    </div>
  ) : (
    <div className="userContent">
      <Link to="/signup">Sign Up</Link>
      <img src={SignUpIcon} alt="about"></img>
    </div>
  );

  return (
    <div className="Navbar">
      <NavbarElement>
        <Link to="/">
          <img src={Logo} alt="logo" id="logo"></img>
        </Link>
      </NavbarElement>
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
      <NavbarElement>
        <img src={ContactIcon} alt="contact"></img>
        <Link to="/contact">Contact us</Link>
      </NavbarElement>
      <NavbarElement>{userContent}</NavbarElement>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";
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
import { AppContext } from "../App";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const { currentPage, setCurrentPage } = useContext(AppContext);

  const userContent: JSX.Element = isAuthenticated ? (
    <div className="userContent">
      <Link to="/profile" onClick={() => setCurrentPage("profile")}>
        {user?.name}
      </Link>
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
      <NavbarElement selected={currentPage === "home"}>
        <Link to="/" className="link">
          <img
            src={Logo}
            alt="logo"
            id="logo"
            onClick={() => setCurrentPage("home")}
          ></img>
        </Link>
      </NavbarElement>
      <NavbarElement selected={currentPage === "home"}>
        <img src={HomeIcon} alt="home"></img>
        <Link to="/" onClick={() => setCurrentPage("home")}>
          Home
        </Link>
      </NavbarElement>
      <NavbarElement selected={currentPage === "movies"}>
        <img src={MoviesIcon} alt="movies"></img>
        <Link to="/movies" onClick={() => setCurrentPage("movies")}>
          Movies
        </Link>
      </NavbarElement>
      <NavbarElement selected={currentPage === "about"}>
        <img src={AboutIcon} alt="about"></img>
        <Link to="/about" onClick={() => setCurrentPage("about")}>
          About us
        </Link>
      </NavbarElement>
      <NavbarElement selected={currentPage === "contact"}>
        <img src={ContactIcon} alt="contact"></img>
        <Link to="/contact" onClick={() => setCurrentPage("contact")}>
          Contact us
        </Link>
      </NavbarElement>
      <NavbarElement selected={currentPage === "profile"}>
        {userContent}
      </NavbarElement>
    </div>
  );
};

export default Navbar;

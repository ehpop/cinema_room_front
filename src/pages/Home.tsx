import React, { useContext } from "react";
import "./styles/Home.css";
import MovieCarousel from "../components/MovieCarousel";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IMovie } from "../components/Movie";
import MovieCategories from "../components/MovieCategories";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Home = () => {
  const {
    data: movieList,
    isLoading,
    isError,
  } = useQuery<IMovie[]>(["movie"], () => {
    return Axios.get("http://localhost:8080/movies").then((res) => res.data);
  });

  const { setCurrentPage } = useContext(AppContext);

  const handleClickAbout = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setCurrentPage("about");
  };

  const handleClickContact = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setCurrentPage("contact");
  };

  return (
    <div className="homeDiv">
      <h1 className="section-title">Welcome to our Cinema!</h1>

      <section className="now-showing-section">
        <h2 className="section-title">Now Showing</h2>
        <MovieCarousel movies={movieList ? movieList : []} />
      </section>

      <section>
        <h2 className="section-title">Explore Movie Categories</h2>
        <MovieCategories movies={movieList} />
      </section>

      <section>
        <h2 className="section-title">More Info</h2>
        <div className="info-section">
          <Link
            to={"/contact"}
            onClick={handleClickContact}
            className="section-link"
          >
            <section className="contact-us-section">
              <h2 className="section-title">Contact Us</h2>
            </section>
          </Link>

          <Link
            to={"/about"}
            onClick={handleClickAbout}
            className="section-link"
          >
            <section className="about-us-section">
              <h2 className="section-title">About Us</h2>
            </section>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

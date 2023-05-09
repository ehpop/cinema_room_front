import React from "react";
import "./styles/About.css";
import cinemaImg from "../img/kino.png";
import companyImg from "../img/company.png";

const About = () => {
  return (
    <div className="About">
      <div className="AboutContent">
        <h1>About Our Fake Cinema</h1>
        <p>
          Welcome to our fake cinema! We are a virtual movie theater that aims
          to provide you with an immersive cinematic experience from the comfort
          of your own home.
        </p>
        <p>
          At our cinema, we showcase a wide range of movies across various
          genres, including action, romance, comedy, sci-fi, and more. Whether
          you're a film enthusiast or simply looking for some entertainment, we
          have something for everyone.
        </p>
        <p>
          Our team is dedicated to curating a diverse selection of movies to
          cater to different tastes and preferences. We strive to bring you the
          latest releases as well as timeless classics, ensuring there's always
          something exciting for you to watch.
        </p>
        <p>
          Sit back, relax, and enjoy the magic of the movies with our fake
          cinema. Grab your favorite snacks, get comfortable, and let us
          transport you to captivating worlds filled with thrilling stories,
          memorable characters, and unforgettable moments.
        </p>
        <p>We hope you have a wonderful time at our virtual cinema!</p>
      </div>
      <div className="AboutImages">
        <img src={cinemaImg} alt=""></img>
        <img src={companyImg} alt=""></img>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import "./styles/Home.css";
import MovieCarousel from "../components/MovieCarousel";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { IMovie } from "../components/Movie";
//import ContactForm from "../components/ContactForm";
//import MovieCategories from "../components/MovieCategories";

const Home = () => {
  const {
    data: movieList,
    isLoading,
    isError,
  } = useQuery<IMovie[]>(["movie"], () => {
    return Axios.get("http://localhost:8080/movies").then((res) => res.data);
  });

  return (
    <div className="homeDiv">
      <h1>Welcome to our Cinema!</h1>

      <section>
        <h2>Now Showing</h2>
        <MovieCarousel movies={movieList ? movieList : []} />
      </section>

      <section>
        <h2>Explore Movie Categories</h2>
        {/* <MovieCategories /> */}
      </section>

      <section>
        <h2>Contact Us</h2>
        {/* <ContactForm /> */}
      </section>

      <section>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae
          mollis ipsum, ut blandit lectus. Integer at lacus id lectus consequat
          accumsan a eget turpis. Fusce gravida enim eget mauris sollicitudin,
          at consequat libero posuere. In et mi justo. Sed feugiat vehicula
          lorem a fermentum. Curabitur a libero vitae mi viverra gravida.
        </p>
      </section>
    </div>
  );
};

export default Home;

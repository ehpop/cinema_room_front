import React from "react";
import "./styles/Home.css";
//import ContactForm from "../components/ContactForm";
//import MovieCarousel from "../components/MovieCarousel";
//import MovieCategories from "../components/MovieCategories";

const Home = () => {
  return (
    <div className="homeDiv">
      <h1>Welcome to our Cinema!</h1>

      <section>
        <h2>Now Showing</h2>
        {/* <MovieCarousel /> */}
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

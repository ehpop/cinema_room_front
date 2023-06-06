import React, { useContext } from "react";
import { IMovie } from "./Movie";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import "./styles/MovieCategories.css";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

interface IMovieCategoriesProps {
  movies: IMovie[] | undefined;
}

const MovieCategories = ({ movies }: IMovieCategoriesProps) => {
  const { data: movieList } = useQuery<IMovie[]>(["movie"], () => {
    return Axios.get("http://localhost:8080/movies").then((res) => res.data);
  });

  const { setCurrentPage } = useContext(AppContext);

  const categoryList = movieList
    ?.map(({ id: movieId, category }) => ({
      movieId,
      category,
    }))
    .filter(
      (category, index, self) =>
        index === self.findIndex((t) => t.category === category.category)
    );

  return (
    <div className="movie-categories-container">
      {categoryList?.map(({ category, movieId }) => (
        <Link
          key={movieId}
          to={`/movies/category/${category}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "auto" });
            setCurrentPage("movies");
          }}
          className="category-link"
        >
          <div className="movie-category">
            <p className="category-name">{category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieCategories;

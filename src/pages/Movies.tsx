import React from "react";
import Movie from "../components/Movie";
import { IMovie } from "../components/Movie";
import "./styles/Movies.css";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { useState, useContext } from "react";
import { AppContext } from "../App";

const Movies = () => {
  const {
    data: movieList,
    isLoading,
    isError,
  } = useQuery<[IMovie]>(["movie"], () => {
    return Axios.get("http://localhost:8080/movies").then((res) => res.data);
  });

  const { selectedMovie, setSelectedMovie } = useContext(AppContext);

  return (
    <div className="movies">
      <h1>Movies currently playing in our cinema</h1>
      <button
        onClick={() => {
          setSelectedMovie(movieList ? movieList[0] : null);
          console.log(selectedMovie);
        }}
      >
        mmm
      </button>
      <div className="movieList">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>There was an error while loading movies</p>
        ) : (
          movieList?.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              onClick={() => {
                setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;

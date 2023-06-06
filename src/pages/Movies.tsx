import React, { useMemo } from "react";
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
  } = useQuery<IMovie[]>(["movie"], () => {
    return Axios.get("http://localhost:8080/movies").then((res) => res.data);
  });

  const { setSelectedMovie } = useContext(AppContext);
  const [searchCryteria, setSearchCryteria] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDirector, setSelectedDirector] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [filteredMovieList, setFilteredMovieList] = useState<
    IMovie[] | undefined
  >(movieList);

  useMemo(() => {
    let filteredMovies = movieList;

    if (searchCryteria) {
      filteredMovies = filteredMovies?.filter((movie) =>
        movie.title.toLowerCase().includes(searchCryteria.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filteredMovies = filteredMovies?.filter(
        (movie) => movie.category === selectedCategory
      );
    }

    if (selectedDirector !== "All") {
      filteredMovies = filteredMovies?.filter(
        (movie) => movie.director === selectedDirector
      );
    }

    if (selectedDuration !== "All") {
      if (selectedDuration === "Less than 1h") {
        filteredMovies = filteredMovies?.filter(
          (movie) => movie.duration <= 60
        );
      } else if (selectedDuration === "1h - 2h") {
        filteredMovies = filteredMovies?.filter(
          (movie) => movie.duration > 60 && movie.duration <= 120
        );
      } else if (selectedDuration === "More than 2h") {
        filteredMovies = filteredMovies?.filter(
          (movie) => movie.duration > 120
        );
      }
    }

    setFilteredMovieList(filteredMovies);
  }, [
    movieList,
    searchCryteria,
    selectedCategory,
    selectedDirector,
    selectedDuration,
  ]);

  const movieListElement = (movieList: IMovie[] | undefined) => {
    const movieElementList =
      movieList && movieList.length === 0 ? (
        <p>Sorry, no movies found :(</p>
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
      );

    return (
      <div className="movieList">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>There was an error while loading movies</p>
        ) : (
          movieElementList
        )}
      </div>
    );
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeDirector = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDirector(event.target.value);
  };

  const handleChangeDuration = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDuration(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedDirector("All");
    setSelectedDuration("All");
    setSearchCryteria("");
  };

  const directorList = movieList
    ?.map(({ id: movieId, director }) => ({
      movieId,
      director,
    }))
    .filter(
      (director, index, self) =>
        index === self.findIndex((t) => t.director === director.director)
    );

  const categoryList = movieList
    ?.map(({ id: movieId, category }) => ({
      movieId,
      category,
    }))
    .filter(
      (category, index, self) =>
        index === self.findIndex((t) => t.category === category.category)
    );

  const categoryFilerElement = (
    <div className="Filter">
      <p>Select category: </p>
      <select value={selectedCategory} onChange={handleChangeCategory}>
        <option value="All">All</option>
        {categoryList &&
          categoryList.map(({ category, movieId }) => (
            <option key={movieId} value={category}>
              {category}
            </option>
          ))}
      </select>
    </div>
  );

  const directorFilterElement = (
    <div className="Filter">
      <p>Select director: </p>
      <select value={selectedDirector} onChange={handleChangeDirector}>
        <option value="All">All</option>
        {directorList &&
          directorList.map(({ director, movieId }) => (
            <option key={movieId} value={director}>
              {director}
            </option>
          ))}
      </select>
    </div>
  );

  const durationFilterElement = (
    <div className="Filter">
      <p>Select duration: </p>
      <select value={selectedDuration} onChange={handleChangeDuration}>
        <option value="All">All</option>
        <option value="Less than 1h">Less than 1h</option>
        <option value="1h - 2h">1h - 2h</option>
        <option value="More than 2h">More than 2h</option>
      </select>
    </div>
  );

  const searchBarElement = (
    <div className="searchBar">
      <input
        type="text"
        onChange={(event) => setSearchCryteria(event.target.value)}
        placeholder="Search for a movie..."
      ></input>
    </div>
  );

  return (
    <div className="movies">
      <h1>Movies currently playing in our cinema</h1>
      <div className="moviesSearchBar">
        {searchBarElement}
        {categoryFilerElement}
        {directorFilterElement}
        {durationFilterElement}
        <button className="clear-search" onClick={handleClearFilters}>
          Clear Search Criteria
        </button>
      </div>
      {movieListElement(filteredMovieList)}
    </div>
  );
};

export default Movies;

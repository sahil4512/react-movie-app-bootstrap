import React, { useEffect, useState } from "react";
// Importing necessary components and styles
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBar from "./components/SearchBar";
import AddFav from "./components/AddFav";
import RemoveFav from "./components/RemoveFav";
import AlertMsg from "./components/AlertMsg";

const App = () => {
  // State for storing the list of movies fetched from the API
  const [movies, setMovies] = useState([]);
  // State for storing user's favourite movies
  const [favourites, setFavourites] = useState([]);
  // State for storing the current value of the search bar
  const [searchBarValue, setSearchBarValue] = useState("");
  // State for managing the display of alert messages
  const [alert, setAlert] = useState({ show: false, message: "" });

  // Function to fetch movies based on a search query
  const getMovieRequest = async (searchBarValue) => {
    // Constructing the API URL with the search query
    const APIURL = `https://www.omdbapi.com/?s=${searchBarValue}&apikey=a32a6444`;
    // Making the API request
    const response = await fetch(APIURL);
    const responseJson = await response.json();

    // Updating the movies state with the fetched data, if available
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // Function to save the current list of favourites to localStorage
  const savetoLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-fav", JSON.stringify(items));
  };

  // Effect hook to load favourites from localStorage on component mount
  useEffect(() => {
    const movieFav =
      JSON.parse(localStorage.getItem("react-movie-app-fav")) || [];
    setFavourites(movieFav);
  }, []);

  // Effect hook to perform a default or user-triggered search
  useEffect(() => {
    // Default search query
    const defaultSearch = "Batman";
    getMovieRequest(searchBarValue || defaultSearch);
  }, [searchBarValue]);

  // Function to handle adding a movie to favourites
  const addfavmovie = (movie) => {
    const movieExists = favourites.some((fav) => fav.imdbID === movie.imdbID);

    if (!movieExists) {
      const newMovieList = [...favourites, movie];
      setFavourites(newMovieList);
      savetoLocalStorage(newMovieList);
    } else {
      // Show an alert if the movie is already in favourites
      setAlert({
        show: true,
        message: "This movie is already in your favorites!",
      });
      setTimeout(() => setAlert({ show: false, message: "" }), 3000);
    }
  };

  // Function to handle removing a movie from favourites
  const removefavmovie = (movie) => {
    const newfavlist = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newfavlist);
    savetoLocalStorage(newfavlist);
  };

  // The main render method of the app component
  return (
    <>
      <div className="container-fluid movie-app">
        <AlertMsg alert={alert} />
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="React Movie App" />
          <SearchBar
            searchbar={searchBarValue}
            setSearchBarValue={setSearchBarValue}
          />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            addtofav={AddFav}
            favMovieClick={addfavmovie}
          />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4 favorites-section">
          <MovieListHeading heading="Favourites Movies" />
        </div>
        {favourites.length > 0 ? (
          <div className="row favorites-section">
            <MovieList
              movies={favourites}
              addtofav={RemoveFav}
              favMovieClick={removefavmovie}
            />
          </div>
        ) : (
          // Display a message when there are no favourites
          <div className="no-favourites-text">No favourites yet...</div>
        )}
      </div>
    </>
  );
};

export default App;

import React from "react";

const MovieList = (props) => {
  const AddtoFav = props.addtofav;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={index}
          id={`movie-${index}`}
        >
          <img src={movie.Poster} alt="movie" />
          <div
            className="overlay d-flex align-items-center justify-content-center"
            onClick={() => props.favMovieClick(movie)}
          >
            <AddtoFav />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;

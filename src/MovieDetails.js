import { useState, useEffect } from "react";
import { URL } from "./App";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import StarRating from "./StarRating";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  watched,
  onAddWatched,
}) {
  const [movieError, setMovieError] = useState("");
  const [movieLoading, setMovieLoading] = useState("");
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setMovieError("");
          setMovieLoading(true);
          const res = await fetch(`${URL}&i=${selectedId}`);
          if (!res.ok)
            throw new Error("Something went wrong fetching the movie.");

          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (error) {
          setMovieError("Movie not found.");
        } finally {
          setMovieLoading(false);
        }
      }

      getMovieDetails();
    },
    [selectedId]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: watchedUserRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  return (
    <div className="details">
      {movieLoading && !movieError && <Loader />}
      {!movieLoading && !movieError && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {movieError && <ErrorMessage message={movieError} />}
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import { WatchedMovieList } from "./WatchedMovieList";
import { WatchedSummary } from "./WatchedSummary";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { Box } from "./Box";
import { Main } from "./Main";
import { NumResults } from "./NumResults";
import { Search } from "./Search";
import { NavBar } from "./NavBar";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
const API_KEY = "973f7dfb";
export const URL = `https://www.omdbapi.com/?&apikey=${API_KEY}`;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// structural component
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("tt0816692");
  // useEffect(function () {
  //   console.log("After initial render");
  // }, []);

  // useEffect(function () {
  //   console.log("after every render");
  // });

  // useEffect(
  //   function () {
  //     console.log("D");
  //   },
  //   [query] // when the Query state changes
  // );

  // console.log("During render");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  /// Implement as callback so we can prevent it from doing constant searches as you are typing and instead only search when enter is pressed
  const handleMovieSearch = useCallback(() => {
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(`${URL}&s=${query}`);
        if (!res.ok)
          throw new Error("Something went wrong fetching the movies.");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  useEffect(
    function () {
      const onKeyDown = (e) => {
        if (e.code === "Enter") handleMovieSearch();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    },
    [handleMovieSearch]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* passing element as prop implicitly 
        <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        />*/}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              watched={watched}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

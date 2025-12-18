import { Movie } from "./Movie";

export function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies hide-scrollbar">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

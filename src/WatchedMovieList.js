import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list hide-scrollbar">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

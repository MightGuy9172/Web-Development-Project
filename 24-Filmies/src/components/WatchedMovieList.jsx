import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({ watched, handleDeleteWatch, handleSelectMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          handleDeleteWatch={handleDeleteWatch}
          handleSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;

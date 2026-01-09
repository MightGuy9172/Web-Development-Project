import { useState } from "react";

import Header from "./components/Header";
import MainBox from "./components/MainBox";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import Error from "./components/Error";
import { useMovies } from "./utils/useMovies";
import { useLocalStorage } from "./utils/useLocalStorage";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage([], "watched");
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selected) => (id === selected ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function onAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <Header>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Header>
      <MainBox>
        <Box>
          {isLoading && <Loader />}
          {error && <Error error={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={onAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteWatch={handleDeleteWatch}
                handleSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </MainBox>
    </>
  );
}

import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((results) => {
      setPopularMovies(results);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="wrapper-movie" key={i}>
          <div className="title-movie">{movie.title}</div>
          <img
            className="image-movie"
            alt=""
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="date-movie">Release: {movie.release_date}</div>
          <div className="rate-movie">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = (q) => {
    if (q.length > 3) {
      searchMovie(q).then((results) => {
        setPopularMovies(results);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE MANIA</h1>
        <input
          className="search-movie"
          placeholder="Enter Movie Name..."
          onChange={({ target }) => search(target.value)}
        />
        <div className="container-movie">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;

import MovieCard from "../components/MovieCard";
import { FormEvent, useState } from "react";

const Home = () => {
  const movies = [
    {
      id: 1,
      title: "John Wick",
      release_date: "2014",
      url: "https://www.imdb.com/title/tt2911666/",
    },
    {
      id: 2,
      title: "Venom",
      release_date: "2018",
      url: "https://www.imdb.com/title/tt1270797/",
    },
    {
      id: 3,
      title: "The Matrix",
      release_date: "1999",
      url: "https://www.imdb.com/title/tt0133093/",
    },
    {
      id: 4,
      title: "Inception",
      release_date: "2010",
      url: "https://www.imdb.com/title/tt1375666/",
    },
    {
      id: 5,
      title: "Interstellar",
      release_date: "2014",
      url: "https://www.imdb.com/title/tt0816692/",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery("");
  };
  return (
    <div className="home">
      <form className="search-form" onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
            url={movie.url}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default Home;

import MovieCard from "../components/MovieCard";
import { MovieCardProps } from "../components/MovieCard";
import { FormEvent, useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
const Home = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(error);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      console.log(searchResults);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(error);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
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
      {error && <div className="error-message">{error.message}</div>}
      {loading ? (
        <div className="Loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              url={movie.url}
              poster_path={movie.poster_path}
            ></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

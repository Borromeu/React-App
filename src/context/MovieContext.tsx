import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactElement,
  ReactNode,
} from "react";

import { MovieCardProps } from "../components/MovieCard";
interface MovieContextType {
  favorites: MovieCardProps[];
  addFavorite: (movie: MovieCardProps) => void;
  removeFromFavorites: (movieID: number) => void;
  isFavorite: (movieID: number) => boolean;
}
const MovieContext = createContext<MovieContextType | null>(null);

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = (children: ReactNode) => {
  const [favorites, setFavorites] = useState<MovieCardProps[]>([]);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: MovieCardProps) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };
  const removeFromFavorites = (movieID: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieID));
  };
  const isFavorite = (movieID: number) => {
    return favorites.some((movie) => movie.id === movieID);
  };

  const value = {
    favorites,
    addFavorite,
    removeFromFavorites,
    isFavorite,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

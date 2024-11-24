import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

interface MovieCardTypes {
  id: number;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
}

const usePlayingMovies = () => {
  const [playingMovies, setPlayingMovies] = useState<MovieCardTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getPlayingMovies();
  }, []);

  const getPlayingMovies = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );

      const data = await res.json();
      setPlayingMovies(data?.results);
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, playingMovies };
};

export default usePlayingMovies;

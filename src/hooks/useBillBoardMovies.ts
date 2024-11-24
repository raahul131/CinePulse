import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  description: string;
};

const useBillBoardMovies = () => {
  const dispatch = useDispatch();

  const [billBoardMovies, setBillBoardMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getNowBillBoardMovies();
  }, []);

  const getNowBillBoardMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );

      const json = await response.json();
      setBillBoardMovies(json?.results);
      dispatch(addNowPlayingMovies(json?.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, billBoardMovies };
};

export default useBillBoardMovies;

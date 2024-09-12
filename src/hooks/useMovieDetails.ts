import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

interface MovieDetails {}

interface useMovieDetailsProps {
  id: number;
}

const useMovieDetails = ({ id }: useMovieDetailsProps) => {
  const [details, setDetails] = useState<MovieDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        API_OPTIONS
      );

      const data = await res.json();
      console.log("movie details", data);
      setDetails(data);
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { details, errorMessage, isLoading };
};

export default useMovieDetails;

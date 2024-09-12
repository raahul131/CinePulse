import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utils/api";
import { FetchResponse } from "../utils/types";

const useFetch = (url: string) => {
  const [data, setData] = useState<FetchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDataFromAPI({ url });
      setData(res);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, data };
};

export default useFetch;

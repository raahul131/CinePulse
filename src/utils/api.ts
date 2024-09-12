import { API_OPTIONS } from "../utils/constants";

const BASE_URL = "https://api.themoviedb.org/3";

interface fetchDataFromAPIProps {
  url?: string;
  params?: string;
}

export const fetchDataFromAPI = async ({ url }: fetchDataFromAPIProps) => {
  try {
    const response = await fetch(BASE_URL + url, API_OPTIONS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in fetching data", error);
    return error;
  }
};

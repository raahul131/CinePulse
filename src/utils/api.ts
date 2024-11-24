// import { API_OPTIONS } from "../utils/constants";
//
// const BASE_URL = "https://api.themoviedb.org/3";
//
// interface fetchDataFromAPIProps {
//   url?: string;
//   params?: string;
// }
//
// export const fetchDataFromAPI = async ({ url }: fetchDataFromAPIProps) => {
//   try {
//     const response = await fetch(BASE_URL + url, API_OPTIONS);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("Error in fetching data", error);
//     return error;
//   }
// };


// import { API_OPTIONS } from "../utils/constants";
//
// const BASE_URL = "https://api.themoviedb.org/3";
//
// interface fetchDataFromAPIProps {
//   url?: string;
//   params?: Record<string, string | number | boolean>;  // Use a Record for key-value params
// }
//
// export const fetchDataFromAPI = async ({ url, params }: fetchDataFromAPIProps) => {
//   try {
//     // Convert params object to query string if params exist
//     const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : "";
//
//     // Make the fetch request, including the query string in the URL
//     const response = await fetch(`${BASE_URL}${url}${queryParams}`, API_OPTIONS);
//
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("Error in fetching data", error);
//     return error;
//   }
// };


import { API_OPTIONS } from "../utils/constants";

const BASE_URL = "https://api.themoviedb.org/3";

interface fetchDataFromAPIProps {
  url?: string;
  params?: Record<string, string | number | boolean>;  // Use a Record for key-value params
}

export const fetchDataFromAPI = async ({ url, params }: fetchDataFromAPIProps) => {
  try {
    // Convert params object to query string, ensuring all values are strings
    const queryParams = params
      ? `?${new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
          acc[key] = String(value); // Convert all values to strings
          return acc;
        }, {})
      ).toString()}`
      : "";

    // Make the fetch request, including the query string in the URL
    const response = await fetch(`${BASE_URL}${url}${queryParams}`, API_OPTIONS);
    return await response.json();
  } catch (error) {
    console.log("Error in fetching data", error);
    return error;
  }
};

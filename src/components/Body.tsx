import { useEffect } from "react";
import Auth from "./Auth";
import Browse from "./Browse";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";
import { fetchDataFromAPI } from "../utils/api";
import { getApiConfiguration, getGenres } from "../store/homeSlice";
import Details from "../pages/Details";
import { ApiConfigResponse, Genre, GenreApiResponse } from "../utils/types";
import SearchResults from "../pages/SearchResults";
import Explore from "../pages/Explore.tsx";
import PageNotFound from "../pages/PageNotFound.tsx";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    const res: ApiConfigResponse | undefined = await fetchDataFromAPI({
      url: "/configuration",
    });
    if (res?.images?.secure_base_url) {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    }
  };

  const genresCall = async () => {
    const promises: Promise<GenreApiResponse>[] = [];
    const endPoints: string[] = ["tv", "movie"];
    const allGenres: { [key: number]: Genre } = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI({ url: `/genre/${url}/list` }));
    });

    try {
      const data = await Promise.all(promises);
      data.forEach((response) => {
        response.genres.forEach((item) => {
          allGenres[item.id] = item;
        });
      });
    } catch (error) {
      console.error("Error fetching genres:", error);
    }

    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (location.pathname === "/" || location.pathname === "/login") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path={"/explore/:mediaType"} element={<Explore />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Body;

import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import dayjs from "dayjs";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
}

const HeroBanner = () => {
  const url = useSelector((store: RootState) => store.home.url);
  const { genres } = useSelector((state: RootState) => state.home);
  const { data, isLoading } = useFetch("/movie/upcoming");

  const [backgroundVideo, setBackgroundVideo] = useState<string | undefined>(
    ""
  );
  const [mobileBackgroundImage, setMobileBackgroundImage] = useState<
    string | undefined
  >("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (data?.results && data?.results?.length > 0) {
      const randomIndex = Math?.floor(Math?.random() * 20);
      const movie = data?.results[randomIndex];
      const bg = url?.backdrop && url?.backdrop + (movie?.backdrop_path || "");
      const mobileBg =
        url?.backdrop && url?.backdrop + (movie?.poster_path || "");

      setBackgroundVideo(bg);
      setMobileBackgroundImage(mobileBg);
      setSelectedMovie(movie);
    }
  }, [data, url]);

  return (
    <>
      <div className="w-full h-[450px] md:flex items-center relative md:h-[700px] hidden">
        <div className="">
          {isLoading ? (
            <div className="w-full h-full absolute top-0 left-0 bg-gray-700 animate-pulse"></div>
          ) : backgroundVideo ? (
            <img
              src={backgroundVideo}
              alt=""
              className="w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden 
              bg-no-repeat object-cover object-center"
            />
          ) : null}
          <div className="bg-gradient-to-t from-[#01061d] w-full h-64 absolute bottom-0 left-0" />
          {isLoading ? (
            <div className="absolute flex flex-col gap-y-3 px-4 md:px-16 animate-pulse">
              <div className="w-[80%] h-10 bg-gray-700 rounded-md mb-4"></div>
              <div className="w-[65%] h-6 bg-gray-700 rounded-md mb-4"></div>
              <div className="flex gap-4 mt-4">
                <div className="w-20 h-8 bg-gray-700 rounded-md"></div>
                <div className="w-20 h-8 bg-gray-700 rounded-md"></div>
              </div>
            </div>
          ) : (
            selectedMovie && (
              <div className="absolute flex flex-col gap-y-3 px-4 md:px-16 mb-5">
                <h1 className="text-white text-2xl md:text-5xl font-medium w-[80%] md:w-[80%]">
                  {selectedMovie?.title}
                </h1>

                <div className="flex items-center gap-x-3 text-white text-lg my-2">
                  <span className="flex items-center gap-x-3">
                    {selectedMovie?.genre_ids?.map((g: number) => {
                      return <div key={g}>{genres[g]?.name}</div>;
                    })}
                  </span>
                  <span>.</span>
                  <span>
                    {dayjs(selectedMovie?.release_date).format("YYYY")}
                  </span>
                </div>
                <p className="text-white text-lg w-[65%] hidden md:block">
                  {selectedMovie?.overview}
                </p>
                <div className="flex gap-4 mt-4">
                  <button className="bg-white/20 hover:bg-white/30  text-white px-10 py-2 rounded flex gap-x-4 items-center">
                    <FaPlay size={15} />
                    <p className="text-lg">Watch Now</p>
                  </button>
                  <button className="text-white px-10 py-2 rounded flex gap-x-4 items-center hover:bg-white/20 transition duration-200 border ">
                    <p className="text-lg">More Info</p>
                    <IoMdInformationCircleOutline size={25} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="w-full h-[600px] md:hidden relative">
        {isLoading ? (
          <div className="w-full h-full absolute top-0 left-0 bg-gray-700 animate-pulse"></div>
        ) : (
          <>
            <img
              src={mobileBackgroundImage}
              alt=""
              className="w-full h-full opacity-15 overflow-hidden relative -top-10 left-0 bg-no-repeat object-cover object-center"
            />
            <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
              <img
                src={mobileBackgroundImage}
                alt=""
                className="w-full h-[500px] mx-10 opacity-70 overflow-hidden bg-no-repeat object-cover object-center rounded-md"
              />
              <div className="absolute top-[85%] w-full flex justify-center px-10 z-50">
                <button className="bg-white text-black px-5 py-2 rounded flex gap-x-3 items-center">
                  <FaPlay size={20} />
                  <p className="text-lg text-center">Watch Now</p>
                </button>
              </div>
            </div>
          </>
        )}
        <div className="bg-gradient-to-t from-[#01061d] w-full h-64 absolute bottom-0 left-0" />
      </div>
    </>
  );
};

export default HeroBanner;

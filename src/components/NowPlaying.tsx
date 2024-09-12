import React from "react";
import usePlayingMovies from "../hooks/usePlayingMovies";
import MovieCard from "./MovieCard";
import CateTitle from "../common/CateTitle";

const NowPlaying: React.FC = () => {
  const { isLoading, playingMovies } = usePlayingMovies();

  console.log("playingMovies", playingMovies);

  // useEffect(() => {
  //   apiTesting();
  // }, []);

  // const apiTesting = () => {
  //   fetchDataFromAPI({ url: "/movie/popular" }).then((res) => {
  //     console.log("response", res);
  //   });
  // };

  if (isLoading) {
    return <div className="text-4xl text-white">loading....</div>;
  }

  return (
    <div className="relative">
      <CateTitle title="Now Playing" />

      <div className="flex overflow-x-scroll scroll-hide">
        <div className="flex gap-2">
          {playingMovies.map((data) => (
            <MovieCard
              key={data?.id}
              id={data?.id}
              poster={data?.backdrop_path}
              poster2={data?.poster_path}
              title={data?.original_title}
              release_date={data?.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;

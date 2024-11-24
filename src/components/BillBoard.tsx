import React from "react";
import useBillBoardMovies from "../hooks/useBillBoardMovies";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const BillBoard: React.FC = () => {
  const movies = useSelector(
    (store: RootState) => store.movies?.nowPlayingMovies
  );

  const { isLoading } = useBillBoardMovies();

  if (!movies) return null;

  const randomIndex = Math.floor(Math.random() * 20);
  const playingMovie = movies[randomIndex];
  const { original_title, overview, id } = playingMovie;

  if (isLoading) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="relative h-[56.25vw]">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} movieId={id} />
    </div>
  );
};

export default BillBoard;

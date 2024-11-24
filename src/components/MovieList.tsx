import React from "react";
import NowPlaying from "./NowPlaying";

const MovieList: React.FC = () => {
  return (
    <div className="mt-[30%] md:-mt-[15%] px-4 md:px-16">
      <NowPlaying />
    </div>
  );
};

export default MovieList;

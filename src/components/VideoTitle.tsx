import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface VideoTitleProps {
  title: string;
  overview: string;
  movieId: number;
}

const VideoTitle: React.FC<VideoTitleProps> = ({
  title,
  overview,
  movieId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-[30%] md:top[40%] ml-4 md:ml-16">
      <h1 className="text-white text-xl md:text-5xl h-full w-1/2 lg:text-5xl font-bold drop-shadow-xl">
        {title}
      </h1>
      <p className="text-white md:text-lg mt-3 md:mt-8 w-[90%] md:w-[65%] drop-shadow-xl">
        {overview}
      </p>

      <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
        <button
          onClick={() => navigate(`/watch/${movieId}`)}
          className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs 
        lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-60 transition"
        >
          <FaPlay className="mr-2" />
          Play
        </button>

        <button
          className="bg-white text-white rounded-md bg-opacity-30 py-1 md:py-2 px-2 md:px-4 w-auto text-xs 
        lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
        >
          <AiOutlineInfoCircle className="mr-2" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { LuPlusCircle } from "react-icons/lu";
import { BiDislike } from "react-icons/bi";

import { IMG_CDN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  poster2: string;
  release_date: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  release_date,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-28 md:w-48 group bg-[#01061d] h-[14vw] flex items-baseline">
      <img
        src={IMG_CDN_URL + poster}
        alt={title}
        className="cursor-pointer object-cover transition duration shadow-xl 
        rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 
        w-full h-[12vw] md:h-[8vw]"
      />

      <div
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible 
        sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[2vw] 
        group-hover:translate-x-[2vw] group-hover:opacity-100"
      >
        <img
          src={IMG_CDN_URL + poster}
          alt=""
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md 
          w-full h-[8vw]"
        />
        <div className="z-10 bg-[#030f47] p-2 lg    :p-4  absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3 text-white cursor-pointer">
            <FaCirclePlay size={25} onClick={() => navigate(`/watch/${id}`)} />
            <RxCrossCircled size={25} />
            <LuPlusCircle size={25} />
            <BiDislike size={25} />
          </div>
          <p className="font-medium mt-2 text-orange-200 text-xs w-full">
            {title}
          </p>
          <p className="font-medium text-gray-400 text-xs">{release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

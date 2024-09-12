import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import PosterFallback from "../assets/no-poster.png";
import { FC } from "react";

interface MovieCardProps {
  data: {
    id: number;
    media_type: string;
    poster_path?: string;
    genre_ids: number[];
    title?: string;
    name?: string;
    original_name?: string;
    overview?: string;
    vote_count?: number;
    popularity?: number;
    first_air_date?: string;
    origin_country?: string[];
    backdrop_path?: string;
    release_date?: string; 
  };
  fromSearch: boolean;
  mediaType: string;
}

const MovieCard: FC<MovieCardProps> = ({ data, mediaType }) => {
  const { url } = useSelector((state: RootState) => state?.home);
  const navigate = useNavigate();
  const posterUrl = data?.poster_path
    ? url?.poster + data?.poster_path
    : PosterFallback;

  return (
    <div
      className="w-[calc(50%-20px)] mb-[25px] cursor-pointer flex-shrink-0 transition-all ease-in-out duration-500 hover:opacity-50 md:w-[18%]"
      onClick={() => navigate(`/${data?.media_type || mediaType}/${data?.id}`)}
    >
      <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-2 flex items-end justify-between p-[10px]">
        <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={posterUrl}
            alt={data?.title || data?.name}
          />
        </div>
      </div>
      <div className="text-white flex flex-col">
        <span className="text-base mb-1 leading-[24px] truncate md:text-xl">
          {data?.title || data?.name}
        </span>
        <span className="text-[14px] opacity-50">
          {data?.release_date
            ? dayjs(data?.release_date).format("MMM D, YYYY")
            : "Release date not available"}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;

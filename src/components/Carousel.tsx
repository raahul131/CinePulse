import { FC, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import FallBackPoster from "../assets/no-poster.png";
import dayjs from "dayjs";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import { CarouselItem } from "../utils/types";

interface CarouselProps {
  title?: string;
  data: CarouselItem[];
  loading: boolean;
  endPoint: string;
}

const Carousel: FC<CarouselProps> = ({ data, loading, endPoint, title }) => {
  const carouselContainer = useRef<HTMLDivElement | null>(null);
  const url = useSelector((state: RootState) => state?.home?.url);
  const navigate = useNavigate();

  const navigation = (direction: string) => {
    const container = carouselContainer.current;

    if (container) {
      const scrollAmount =
        direction === "left"
          ? container.scrollLeft - (container.offsetWidth + 20)
          : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-[50px] px-3">
      <div className="relative">
        {title && <div className="text-white -mx-3 text-lg">{title}</div>}
        <BsFillArrowLeftCircleFill
          size={25}
          onClick={() => navigation("left")}
          className="absolute transform -translate-y-1/2 text-white hover:text-white/80 cursor-pointer opacity-80 z-10 hidden md:block top-[44%] left-[0px]"
        />
        <BsFillArrowRightCircleFill
          size={25}
          onClick={() => navigation("right")}
          className="absolute transform -translate-y-1/2 text-white hover:text-white/80 cursor-pointer opacity-80 z-10 hidden md:block top-[44%] right-[0px]"
        />

        {!loading ? (
          <div
            ref={carouselContainer}
            className="flex gap-2.5 overflow-y-hidden overflow-x-auto -mx-5 scroll-hide"
          >
            {data?.map((item) => {
              const posterUrl = item?.poster_path
                ? url?.poster + item?.poster_path
                : FallBackPoster;
              return (
                <div
                  key={item.id}
                  className="w-[125px] md:w-[13%] shrink-0 cursor-pointer"
                  onClick={() =>
                    navigate(`/${item?.media_type || endPoint}/${item?.id}`)
                  }
                >
                  <div className="pb-9">
                    <img
                      src={posterUrl}
                      alt={item?.title || "Poster"}
                      className="rounded-xl aspect-[1/1.5] bg-cover bg-center mb-4 p-1"
                    />
                    <CircleRating
                      rating={item?.vote_average ? parseFloat(item.vote_average.toFixed(1)) : 0}
                    />
                    <Genres data={item?.genre_ids?.slice(0, 2) || []}/>
                  </div>
                  <div className="text-white flex flex-col -mt-2">
                    <span className="text-base leading-6 truncate md:text-lg">
                      {item?.title || item?.name}
                    </span>
                    <span className="text-xs opacity-50">
                      {dayjs(item?.release_date || item?.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2.5 overflow-y-hidden overflow-x-auto -mx-5 px-5 scroll-hide">
            {Array(8)
              .fill({})
              .map((_, index) => (
                <div key={index} className="w-[125px] md:w-[15%] shrink-0">
                  <div className="rounded-xl aspect-[1/1.5] bg-[#1a2138] animate-pulse mb-4 p-1"></div>
                  <div className="text-white flex flex-col">
                    <span className="h-4 bg-[#1a2138] animate-pulse rounded-md mb-2.5"></span>
                    <span className="h-3 bg-[#1a2138] animate-pulse rounded-md"></span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;

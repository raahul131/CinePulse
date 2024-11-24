import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { RootState } from "../store/store.js";
import useFetch from "../hooks/useFetch";
import fallbackImage from "../assets/no-poster.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlayCircleOutline } from "react-icons/io5";
import VideoPlayer from "../components/VideoPlayer.js";
import { CrewMember, Video } from "../utils/types.js";

interface DetailBannerProps {
  video: Video | undefined;
  crew: CrewMember[];
}

const DetailBanner: FC<DetailBannerProps> = ({ video, crew }) => {
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);

  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state: RootState) => state?.home);

  const director = crew.filter((f) => f.job === "Director");
  const writer = crew.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  console.log("data", data);

  const genres = data?.genres?.map((g) => g?.name);
  console.log("genres", genres);

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="w-full bg-[#01061d] min-h-[700px] md:mb-[50px] mb-0 pt-[100px] md:pt-[120px] px-4 md:px-16">
      {!isLoading ? (
        <>
          {!!data && (
            <>
              <div className="w-full h-full absolute top-0 left-0 opacity-30 overflow-hidden">
                <img
                  src={url?.backdrop && url?.backdrop + data?.backdrop_path}
                  alt=""
                />
              </div>
              <div className="w-full h-[250px] absolute bottom-0 left-0 bg-[#01061d]"></div>
              <div className="flex relative flex-col gap-6 md:gap-12 md:flex-row">
                <div className="left flex-shrink-0">
                  {data?.poster_path ? (
                    <img
                      src={url?.backdrop + data?.poster_path}
                      alt=""
                      className="w-full block rounded-xl md:w-[350px]"
                    />
                  ) : (
                    <img
                      src={fallbackImage}
                      alt=""
                      className="w-full block rounded-xl md:w-[350px]"
                    />
                  )}
                </div>
                <div className="text-white">
                  <div className="text-3xl leading-10 md:text-4xl md:leading-[44px] font-semibold">
                    {`${data?.name || data?.title} (${dayjs(
                      data?.release_date
                    ).format("YYYY")})`}
                  </div>
                  <div className="text-base leading-6 italic opacity-50 md:text-xl md:leading-7 mb-2">
                    {data?.tagline}
                  </div>
                  <div className="text-sm md:text-base opacity-70 mb-6 flex-wrap">
                    {genres?.join(". ")}
                  </div>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="p-0.5 rounded-full w-14 h-14">
                      <CircularProgressbar
                        value={parseFloat(data?.vote_average?.toFixed(1))}
                        maxValue={10}
                        text={parseFloat(
                          data?.vote_average?.toFixed(1)
                        ).toString()}
                        styles={buildStyles({
                          pathColor:
                            parseFloat(data?.vote_average?.toFixed(1)) < 5
                              ? "red"
                              : parseFloat(data?.vote_average?.toFixed(1)) < 7
                              ? "orange"
                              : "green",
                          textSize: "35px",
                          textColor: "white",
                          trailColor: "transparent",
                        })}
                      />
                    </div>

                    <div
                      onClick={() => {
                        setShow(true);
                        setVideoId(video?.key);
                      }}
                      className="flex items-center gap-2 cursor-pointer text-white hover:text-red-600 transition ease-in-out duration-500"
                    >
                      <IoPlayCircleOutline size={60} />
                      <span className="text-xl">Watch Trailer</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-2xl mb-2 font-semibold tracking-wider">
                      Overview
                    </div>
                    <div className="leading-6 md:pr-24 md:text-lg">
                      {data?.overview}
                    </div>
                  </div>

                  <div className="border-b border-white/30 py-4 space-x-4 flex">
                    {data?.status && (
                      <div className="mr-[10px] flex flex-col flex-wrap">
                        <span className="pr-2 leading-6  tracking-wide font-semibold">
                          Status:{" "}
                        </span>
                        <span className="opacity-50">{data?.status}</span>
                      </div>
                    )}

                    {data?.release_date && (
                      <div className="mr-[10px] flex flex-col flex-wrap">
                        <span className="pr-2 leading-6  tracking-wide font-semibold">
                          Release Date:{" "}
                        </span>
                        <span className="opacity-50">
                          {dayjs(data?.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}

                    {data?.runtime && (
                      <div className="mr-[10px] flex flex-col flex-wrap">
                        <span className="pr-2 leading-6 font-semibold  tracking-wide">
                          Run Time:{" "}
                        </span>
                        <span className="opacity-50">
                          {toHoursAndMinutes(data?.runtime)}
                        </span>
                      </div>
                    )}
                  </div>

                  {director?.length > 0 && (
                    <div className="border-b border-white/30 py-4 space-x-4 flex">
                      <div className="mr-[10px] flex flex-wrap">
                        <span className="pr-2 leading-6 tracking-wide font-semibold">
                          Director:{" "}
                        </span>
                        <span className="opacity-50">
                          {director?.map((dir, index) => (
                            <span key={index}>
                              {dir?.name}{" "}
                              {director?.length - 1 !== index && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="border-b border-white/30 py-4 space-x-4 flex">
                    {writer?.length > 0 && (
                      <div className="mr-[10px] flex flex-wrap">
                        <span className="pr-2 leading-6 tracking-wide font-semibold">
                          Writer:{" "}
                        </span>
                        <span className="opacity-50">
                          {writer?.map((wri, index) => (
                            <span key={index}>
                              {wri?.name} {writer?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by && data?.created_by?.length > 0 && (
                      <div className="mr-[10px] flex flex-wrap">
                        <span className="pr-2 leading-6 tracking-wide font-semibold">
                          Creator:{" "}
                        </span>
                        <span className="opacity-50">
                          {data.created_by?.map((creator, index) => (
                            <span key={index}>
                              {creator?.name}{" "}
                              {data.created_by &&
                                data.created_by.length - 1 !== index &&
                                ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPlayer
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-6 md:flex-row animate-pulse">
          <div className="w-full md:w-[350px] h-[500px] bg-gray-700 rounded-xl"></div>
          <div className="flex-1 space-y-6">
            <div className="w-3/4 h-8 bg-gray-700 rounded-lg" />
            <div className="w-1/2 h-6 bg-gray-700 rounded-lg" />
            <div className="w-1/4 h-6 bg-gray-700 rounded-lg" />
            <div className="w-full h-40 bg-gray-700 rounded-lg" />
            <div className="w-1/3 h-6 bg-gray-700 rounded-lg" />
            <div className="w-1/4 h-6 bg-gray-700 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;

import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

interface VideoBackgroundProps {
  movieId: number;
}

interface Video {
  key: string;
  type: string;
}

interface VideoResponse {
  results: Video[];
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ movieId }) => {
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    getMovieVideo();
  }, []);

  const getMovieVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const jsonData: VideoResponse = await response.json();

    const filterTrailers = jsonData.results.filter(
      (video: Video) => video.type === "Trailer"
    );

    const trailer = filterTrailers.length
      ? filterTrailers[0]
      : jsonData.results[0];

    if (trailer) {
      setVideoSrc(
        `https://www.youtube.com/embed/${trailer.key}?&controls=0&autoplay=1&start=7&mute=1&loop=1`
      );
    }
  };

  return (
    <div className="w-screen">
      <div className="-mt-[8%] absolute">
        {videoSrc && (
          <iframe
            className="w-screen aspect-video"
            src={videoSrc}
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </div>
      <div className="h-full w-full absolute bg-gradient-to-t from-[#01061d] from-25% to-transparent" />
    </div>
  );
};

export default VideoBackground;

import { FC } from "react";
import { RxCross1 } from "react-icons/rx";
import ReactPlayer from "react-player/youtube";

interface VideoPlayerProps {
  show: boolean;
  setShow: (value: boolean) => void;
  videoId: string | undefined;
  setVideoId: (value: string | undefined) => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  show,
  setShow,
  videoId,
  setVideoId,
}) => {
  const hideVideoPlayer = () => {
    setShow(false);
    setVideoId(undefined);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={hideVideoPlayer}
      ></div>

      {/* Video Player */}
      <div className="relative w-[800px] aspect-video bg-white transition-transform duration-300 transform-gpu scale-100">
        <span
          className="absolute text-white cursor-pointer -right-8 -top-8 bg-black bg-opacity-80 p-2 rounded-full"
          onClick={hideVideoPlayer}
        >
          <RxCross1
            size={20}
            className="hover:rotate-90 transform transition-transform duration-300"
          />
        </span>
        {videoId && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            playing={true}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

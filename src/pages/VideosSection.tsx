import { FC, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Video } from "../utils/types";

interface VideosSectionProps {
  data: { results?: Video[] } | undefined | null;
  loading: boolean;
}

const VideosSection: FC<VideosSectionProps> = ({ data, loading }) => {
  const [show, setShow] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);

  return (
    <div className="relative mb-12 px-4 md:px-16">
      <div>
        <div className="text-2xl text-white mb-6">Official Videos</div>
        {!loading && data && data.results ? ( // Safely check if data is not null
          <div className="flex gap-2 overflow-x-auto px-5 md:gap-5 md:px-0 scroll-hide">
            {data.results.map((video: Video) => (
              <div
                key={video.id}
                className="w-36 flex-shrink-0 cursor-pointer"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="relative mb-4">
                  <img
                    src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                    className="w-full block rounded-xl transition-all duration-700 ease-in-out hover:opacity-50"
                  />
                  <IoPlayCircleOutline
                    size={60}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="text-white text-sm leading-5 md:text-base md:leading-6">
                  {video?.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto px-5 md:gap-5 md:px-0">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-36 flex-shrink-0">
                  <div className="w-full aspect-w-16 aspect-h-9 rounded-xl mb-2 bg-gray-300"></div>
                  <div className="h-5 w-full bg-gray-300 rounded-md mb-2"></div>
                  <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
                </div>
              ))}
          </div>
        )}
      </div>
      <VideoPlayer
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;

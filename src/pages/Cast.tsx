import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Avatar from "../assets/avatar.png";
import { CastMember } from "../utils/types";

interface CastProps {
  loading: boolean;
  data: CastMember[];
}

const Cast: FC<CastProps> = ({ data, loading }) => {
  const { url } = useSelector((state: RootState) => state?.home);

  return (
    <div className="relative mb-12 px-4 md:px-16">
      <div className="contentWrapper">
        <div className="text-2xl text-white mb-6 mt-6">Top Cast</div>

        {!loading ? (
          <div className="flex gap-5 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 scroll-hide">
            {data?.map((item) => {
              const imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : Avatar;
              return (
                <div key={item.id} className="text-center text-white">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden mb-4 md:mb-6">
                    <img
                      src={imgUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-sm font-semibold leading-5 md:text-lg md:leading-6">
                    {item.name}
                  </div>
                  <div className="text-sm leading-5 opacity-50 md:text-base md:leading-6">
                    {item.character}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-5 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gray-700 mb-4 md:mb-6 animate-pulse"></div>
                <div className="w-full h-5 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                <div className="w-3/4 h-5 bg-gray-700 rounded-md mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cast;

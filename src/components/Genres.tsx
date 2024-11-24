import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface GenresProps {
  data: number[];
}

const Genres: FC<GenresProps> = ({ data }) => {
  const { genres } = useSelector((state: RootState) => state.home);

  return (
    <div className="relative flex flex-col text-[0.6rem] gap-1 items-end -mt-12 md:mr-1 mr-2">
      {data?.map((g: number) => {
        if (!genres[g]?.name) return null;
        return (
          <div
            key={g}
            className="text-white md:px-4 px-1 md:py-0.5 rounded-full bg-[#0b1b61] shadow-md hover:shadow-lg transition-all whitespace-nowrap"
          >
            {genres[g].name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;

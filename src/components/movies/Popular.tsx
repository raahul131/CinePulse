import { useState } from "react";
import SwitchTabs from "../SwitchTabs";
import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, isLoading } = useFetch(`/${endPoint}/popular`);

  const onTabChange = (tab: string) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="px-4 md:px-16 relative mb-[70px]">
      <div className="flex items-center justify-between mb-[20px] gap-x-2">
        <h1 className="text-xl text-white font-normal tracking-wide">
          What's Popular
        </h1>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </div>
      <Carousel
        endPoint={endPoint}
        data={data?.results || []}
        loading={isLoading}
      />
    </div>
  );
};

export default Popular;

import { useState } from "react";
import SwitchTabs from "../SwitchTabs";
import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");

  const { data, isLoading } = useFetch(`/trending/movie/${endPoint}`);

  const onTabChange = (tab: string) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="px-4 md:px-16 text-white relative mb-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl tracking-wide">Trending</h1>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Carousel endPoint={endPoint} data={data?.results} loading={isLoading} />
    </div>
  );
};

export default Trending;

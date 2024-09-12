import { FC } from "react";
import { useParams } from "react-router-dom";
import DetailBanner from "./DetailBanner";
import Cast from "./Cast";
import useFetch from "../hooks/useFetch";
import VideosSection from "./VideosSection";
import Similar from "../components/movies/Similar";
import Recommended from "../components/movies/Recommended";
import Navbar from "../components/Navbar";

interface DetailsProps {}

const Details: FC<DetailsProps> = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();

  const { data, isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  if (!id || !mediaType) {
    return;
  }

  return (
    <div>
      <Navbar />
      <DetailBanner
        video={data?.results ? data.results[0] : undefined}
        crew={credits?.crew || []}
      />
      <Cast data={credits?.cast || []} loading={creditsLoading} />
      <VideosSection data={data} loading={isLoading} />
      <Similar id={id} mediaType={mediaType} />
      <Recommended id={id} mediaType={mediaType} />
    </div>
  );
};

export default Details;

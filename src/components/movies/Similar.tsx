import { FC } from "react";
import Carousel from "../Carousel";
import useFetch from "../../hooks/useFetch";

interface SimilarProps {
  mediaType: string;
  id: string;
}

const Similar: FC<SimilarProps> = ({ id, mediaType }) => {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <div className="px-4 md:px-16">
      <Carousel
        title={title}
        data={data?.results || []}
        loading={isLoading}
        endPoint={mediaType}
      />
    </div>
  );
};

export default Similar;

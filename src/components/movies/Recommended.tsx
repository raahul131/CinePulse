import { FC } from "react";
import Carousel from "../Carousel";
import useFetch from "../../hooks/useFetch";

interface RecommendedProps {
  mediaType: string;
  id: string;
}

const Recommended: FC<RecommendedProps> = ({ id, mediaType }) => {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/recommendations`);

  const title =
    mediaType === "tv" ? "Recommended TV Shows" : "Recommended Movies";

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

export default Recommended;

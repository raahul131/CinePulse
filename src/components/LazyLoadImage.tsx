import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LazyLoadImageProps {
  src: string;
  className: string;
}

const Image: FC<LazyLoadImageProps> = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt="image"
      effect="blur"
      src={src}
    />
  );
};

export default Image;

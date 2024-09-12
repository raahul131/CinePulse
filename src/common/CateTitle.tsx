import React from "react";

interface CateTitleProps {
  title: string;
}

const CateTitle: React.FC<CateTitleProps> = ({ title }) => {
  return (
    <p
      className="text-white text-base md:text-xl lg:text-2xl 
    font-semibold cursor-pointer mb-4 pt-2"
    >
      {title}
    </p>
  );
};

export default CateTitle;

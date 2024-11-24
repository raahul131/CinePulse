import { FC } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircleRatingProps {
  rating: number;
}

const CircleRating: FC<CircleRatingProps> = ({ rating }) => {
  return (
    <div className="bg-white/80 p-0.5 rounded-full w-8 h-8 md:flex items-center justify-center -mt-14 ml-1 relative">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating.toString()}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          textSize: "35px",
          textColor: "black",
          trailColor: "transparent",
        })}
      />
    </div>
  );
};

export default CircleRating;

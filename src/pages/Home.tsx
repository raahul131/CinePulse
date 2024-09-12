import HeroBanner from "./HeroBanner";
import Trending from "../components/movies/Trending";
import Popular from "../components/movies/Popular";
import TopRated from "../components/movies/TopRated";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;

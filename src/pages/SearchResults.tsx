import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDataFromAPI } from "../utils/api";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar";
import { VscLoading } from "react-icons/vsc";

interface SearchResultsProps {}

interface Result {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  original_name?: string;
  poster_path?: string;
  genre_ids: number[];
  overview?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface DataResponse {
  results: Result[];
  total_results: number;
  total_pages: number;
}

const SearchResults: FC<SearchResultsProps> = () => {
  const [data, setData] = useState<DataResponse | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      setPageNumber(1);
      fetchInitialData();
    }
  }, [query]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchDataFromAPI({
        url: `/search/multi?query=${query}&page=${pageNumber}`,
      });
      setData(res);
      setPageNumber((prev) => prev + 1);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromAPI({
        url: `/search/multi?query=${query}&page=${pageNumber}`,
      });
      if (data) {
        setData({ ...data, results: [...data.results, ...res.results] });
      } else {
        setData(res);
      }
      setPageNumber((prev) => prev + 1);
    } catch (err) {
      setError("Failed to fetch more data");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[100px] px-4 md:px-16">
        {isLoading && (
          <div className="text-2xl mt-6 h-[50vh] w-full flex items-center justify-center text-white">
            <VscLoading size={40} className="animate-spin" />
          </div>
        )}
        {error && <div className="text-2xl mt-6">{error}</div>}
        {!isLoading && !error && (
          <div className="px-4 md:px-16  overflow-auto">
            {data?.results && data?.results?.length > 0 ? (
              <>
                <div className="text-[24px] leading-[34px] text-white mb-[25px]">
                  {`Search ${
                    data?.total_results > 1 ? "results" : "result"
                  } for '${query}'`}
                </div>
                <InfiniteScroll
                  className="scroll-hide"
                  dataLength={data?.results?.length || 0}
                  next={fetchNextPageData}
                  hasMore={pageNumber <= data?.total_pages}
                  loader={
                    <div className="mt-5 flex items-center justify-center text-white">
                      <VscLoading size={40} className="animate-spin" />
                    </div>
                  }
                >
                  <div className="flex flex-wrap gap-x-5">
                    {data?.results?.map((item) => {
                      if (item?.media_type === "person") return null;
                      return (
                        <Card
                          data={item}
                          fromSearch={true}
                          mediaType={item?.media_type}
                        />
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </>
            ) : (
              <p className="text-white/50 mt-7">
                Your search for '{query}'' did not find any matches.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;

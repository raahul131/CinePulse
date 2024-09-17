import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {fetchDataFromAPI} from "../utils/api.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card.tsx";
import {VscLoading} from "react-icons/vsc";
import Select, {ActionMeta, MultiValue, SingleValue} from "react-select";
import Navbar from "../components/Navbar.tsx";

interface ExploreProps {}

interface Genre {
  id: number;
  name: string;
}

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

interface SortByOption {
  value: string;
  label: string;
}

const sortByData: SortByOption[] = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore: FC<ExploreProps> = () => {
  let filters: Record<string, string> = {};

  const [data, setData] = useState<DataResponse | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [genre, setGenre] = useState<MultiValue<Genre> | null>(null);
  const [sortBy, setSortby] = useState<SingleValue<SortByOption> | null>(null);

  const { mediaType } = useParams();
  console.log("media type", mediaType)


  const {data:genresData } = useFetch(`/genre/${mediaType}/list`)

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchDataFromAPI({
        url: `/discover/${mediaType}`,
        params: filters,
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
        url: `/discover/${mediaType}?page=${pageNumber}`,
        params: filters
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


  useEffect(() => {
    filters={}
    setData(null)
    setPageNumber(1)
    setSortby(null)
    setGenre(null)
    fetchInitialData()
  },[mediaType])

  // const onChange = (selectedItems, action) => {
  //   if (action.name === "sortBy") {
  //     setSortby(selectedItems);
  //     if (action.action !== "clear") {
  //       filters.sort_by = selectedItems.value;
  //     } else {
  //       delete filters.sort_by;
  //     }
  //   }
  //
  //   if (action.name === "genres") {
  //     setGenre(selectedItems);
  //     if (action.action !== "clear") {
  //       let genreId = selectedItems.map((g) => g.id);
  //       genreId = JSON.stringify(genreId).slice(1, -1);
  //       filters.with_genres = genreId;
  //     } else {
  //       delete filters.with_genres;
  //     }
  //   }
  //   setPageNumber(1);
  //   fetchInitialData();
  // };


  const onChange = (
    selectedItems: MultiValue<Genre> | SingleValue<SortByOption>,
    action: ActionMeta<Genre | SortByOption>
  ) => {
    if (action.name === "sortby") {
      setSortby(selectedItems as SingleValue<SortByOption>);
      if (action.action !== "clear") {
        filters.sort_by = (selectedItems as SortByOption).value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems as MultiValue<Genre>);
      if (action.action !== "clear") {
        const genreId = (selectedItems as MultiValue<Genre>).map((g) => g.id).join(",");
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNumber(1);
    fetchInitialData();
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen pt-24">
        <div className={"px-4 md:px-16"}>
          <div className="pageHeader flex justify-between mb-6 flex-col md:flex-row">
            <div className="text-white text-xl md:text-2xl  leading-8 mb-5 md:mb-0">
              {mediaType === "tv"
                ? "Explore TV Shows"
                : "Explore Movies"}
            </div>
            <div className="filters flex gap-3 flex-col md:flex-row">
              <Select
                isMulti
                name="genres"
                value={genre}
                closeMenuOnSelect={false}
                options={genresData?.genres}
                getOptionLabel={(option) => option?.name}
                getOptionValue={(option) => option?.id.toString()}
                onChange={onChange}
                placeholder="Select genres"
                className="w-full md:max-w-[500px] md:min-w-[250px]"
                classNamePrefix="react-select"
              />
              <Select
                name="sortBy"
                value={sortBy}
                options={sortByData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                className="w-full flex-shrink-0 md:w-[250px]"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          {isLoading && (
            <div className="text-2xl mt-6 h-[50vh] w-full flex items-center justify-center text-white">
              <VscLoading size={40} className="animate-spin"/>
            </div>
          )}
          {error && <div className="text-2xl mt-6">{error}</div>}
          {!isLoading && (
            <>
              {data?.results && data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="scroll-hide"
                  dataLength={data?.results?.length || 0}
                  next={fetchNextPageData}
                  hasMore={pageNumber <= data?.total_pages}
                  loader={
                    <div className="mt-5 flex items-center justify-center text-white">
                      <VscLoading size={40} className="animate-spin"/>
                    </div>
                  }
                >
                  <div className={"flex flex-wrap gap-x-5"}>
                    {data?.results?.map((item) => {
                      if (item.media_type === "person") return;
                      console.log("item", item)
                      return (
                        <Card
                          data={item}
                          mediaType={mediaType}
                        />
                      );
                    })}
                  </div>
                </InfiniteScroll>
              ) : (
                <span className="text-2xl text-white/60">
              Sorry, Results not found!
            </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
};

export default Explore;

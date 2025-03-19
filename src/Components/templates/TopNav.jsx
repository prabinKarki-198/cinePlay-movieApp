import axios from "../../Utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";
const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);
  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  // console.log(searches);
  useEffect(() => {
    getSearch();
  }, [query]);
  // console.log(query);
  return (
    <div className="relative w-full flex justify-start items-center md:pl-20 lg:pl-40 sm:pl-10 h-[10vh] text-zinc-400 ">
      <span>
        {" "}
        <i className="ri-search-2-line lg:text-2xl text-lg sm:text-lg md:text-xl "></i>
      </span>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className="md:w-[70%] lg:w-[56%] sm:w-[70%] w-[100%] md:mx-8 lg:mx-10 sm:mx-4 mx-4 sm:placeholder:text-sm md:placeholder:text-md placeholder:text-sm lg:placeholder:text-lg text-zinc-400  placeholder-zinc-200/60 border-none outline-none text-lg "
        placeholder="Search Movies, Tv's and more..."
      />
      {query.length > 0 && (
        <span
          onClick={() => setQuery("")}
          className="hover:bg-zinc-400/40 text-zinc-400 rounded-full px-1"
        >
          <i className="ri-close-line text-2xl"></i>
        </span>
      )}

      <div className="absolute bg-zinc-100 md:w-[70%] lg:w-[50%] sm:w-[70%] w-[100%] max-h-[40vh] top-[90%] z-100 overflow-auto md:mx-8 lg:mx-16 sm:mx-6 mx-1 rounded-md">
        {searches &&
          searches.map((item, index) => {
            return (
              <Link to={`/${item.media_type}/details/${item.id}`}
                key={index}
                className="flex justify-start items-center h-[10vh] md:p-6 lg:p-6 sm:p-2 p-2 bg-zinc-100 border-b-2 border-white  text-zinc-700 hover:bg-zinc-200 hover:text-black"
              >
                <img
                  className="object-cover w-15 h-15 rounded-md mr-5 "
                  src={
                    item.backdrop_path || item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          item.backdrop_path ||
                          item.poster_path ||
                          item.profile_path
                        }`
                      : noimage
                  }
                  alt=""
                />
                <div>
                  <h1 className="font-semibold sm:text-xs lg;text-lg md:text-sm text-sm">
                    {(item.name ||
                      item.title ||
                      item.original_title ||
                      item.original_name).length >20? (item.name ||
                      item.title ||
                      item.original_title ||
                      item.original_name).slice(0,20)+'...': item.name ||
                      item.title ||
                      item.original_title ||
                      item.original_name}
                  </h1>
                  <span className="flex gap-2 items-end">
                    <h3 className="text-sm font-medium">
                      {" "}
                      {item.release_date || item.first_air_date}
                    </h3>
                    {item.release_date ||
                    (item.first_air_date && item.vote_average) ? (
                      <span className=" font-bold relative top-[1px]">•</span>
                    ) : (
                      ""
                    )}
                    {item.vote_average ? (
                      <h1 className="text-sm font-medium flex items-end ">
                        <i className="text-[#F0BB40] ri-star-s-fill mr-1 text-lg relative top-1"></i>
                        {item.vote_average}
                      </h1>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default TopNav;

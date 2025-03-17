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
    <div className="relative w-full flex justify-start items-center pl-40 h-[10vh] text-zinc-400 ">
      <span>
        {" "}
        <i className="ri-search-2-line text-2xl "></i>
      </span>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className="w-[56%] mx-10 text-zinc-400 placeholder-zinc-200/60 border-none outline-none text-lg "
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

      <div className="absolute bg-zinc-100 w-[50%] max-h-[40vh] top-[90%] overflow-auto mx-16 rounded-md">
        {searches &&
          searches.map((item, index) => {
            return (
              <Link to={`/${item.media_type}/details/${item.id}`}
                key={index}
                className="flex justify-start items-center h-[10vh] p-6 bg-zinc-100 border-b-2 border-white  text-zinc-700 hover:bg-zinc-200 hover:text-black"
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
                  <h1 className="font-semibold">
                    {item.name ||
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

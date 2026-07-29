import React from "react";
import noimage from "/noimage.webp";
import { Link } from "react-router-dom";
import ScrollUpButton from "./ScrollUp";
import { useAuth } from "../../Utils/AuthContext";

const Cards = ({ data ,title }) => {
  const { addToLibrary, removeFromLibrary, isInLibrary } = useAuth();

  return (
    <div className="flex flex-wrap justify-center bg-[#1f1e24] md:gap-10 lg:gap-10 sm:gap-6 gap-6">
      {data.map((item, index) => {
        const inLib = isInLibrary(item.id);
        const itemMedia = item.media_type || title || 'movie';

        return (
          <Link
            to={`/${itemMedia}/details/${item.id}`}
            key={index}
            className={`lg:w-60 md:w-55 sm:w-45 w-45 md:h-[45vh] lg:h-[45vh] sm:h-[40vh] h-[40vh] flex flex-col gap-5 mt-2 pt-0.5 rounded-md shadow-xs mb-1 shadow-[#6556cd] relative group`}
          >
            <div className="w-full h-[80%] relative rounded-md flex justify-center overflow-hidden hover:overflow-hidden">
              <img
                className={`${
                  !item.profile_path ? "object-cover" : "object-cover"
                } ${!item.profile_path ? "" : "object-top-1"} ${
                  !item.profile_path ? "w-[98%]" : "w-[100%]" 
                } w-[98%] h-[100%] rounded-md hover:scale-105 transition-transform duration-300`}
                src={
                  item.poster_path || item.backdrop_path || item.profile_path 
                    ? `https://image.tmdb.org/t/p/w500/${
                        item.poster_path ||
                        item.backdrop_path ||
                        item.profile_path 
                      }`
                    : noimage
                }
                alt={item.title}
              />
              {item.vote_average >= 0 ? (
                <div className="text-white absolute w-full px-1 rounded-md flex justify-between items-start top-1 left-1 pr-2 z-10">
                  <h1 className="bg-[#6656cd] md:w-[16%] lg:w-[16%] sm:w-[24%] w-[24%] border-1 border-zinc-400/20 hover:bg-[#6148ff] text-sm font-semibold p-1 text-center rounded-md">
                    {item.vote_average === 0
                      ? "N/A"
                      : (item.vote_average * 10).toFixed()}
                    {item.vote_average === 0 ? "" : <sup className="pl-0.5 text-xs">%</sup>}
                  </h1>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (inLib) {
                        removeFromLibrary(item.id);
                      } else {
                        addToLibrary(item, itemMedia);
                      }
                    }}
                    title={inLib ? "Remove from Library" : "Add to Library"}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
                      inLib
                        ? "bg-emerald-500 text-white"
                        : "bg-black/60 text-zinc-300 hover:text-white hover:bg-[#6556cd]"
                    }`}
                  >
                    <i className={inLib ? "ri-bookmark-fill text-base" : "ri-bookmark-line text-base"}></i>
                  </button>
                </div>
              ) : null}
            </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-white text-lg font-medium hover:text-[#6556cd]">
              {" "}
              {(
                item.title ||
                item.name ||
                item.original_name ||
                item.original_title
              ).length > 20
                ? (
                    item.title ||
                    item.name ||
                    item.original_name ||
                    item.original_title
                  ).slice(0, 22) + "..."
                : item.title ||
                  item.name ||
                  item.original_name ||
                  item.original_title}
            </h2>

            {/* <p className='text-gray-500'>{item.overview.slice(0, 100)}...</p> */}
          </div>
        </Link>
        );
      })}
      {/* <ScrollUpButton/>  */}
    </div>
  );
};

export default Cards;

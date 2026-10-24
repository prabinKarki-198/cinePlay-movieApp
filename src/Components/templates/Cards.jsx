import React from "react";
import noimage from "/noimage.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const Cards = ({ data, title }) => {
  const { addToLibrary, removeFromLibrary, isInLibrary } = useAuth();

  return (
    <div className="flex flex-wrap justify-center bg-[#1f1e24] gap-3 sm:gap-5 md:gap-7 px-2 sm:px-4 py-4">
      {data.map((item, index) => {
        const inLib = isInLibrary(item.id);
        const itemMedia = item.media_type || title || "movie";
        const itemTitle =
          item.title || item.name || item.original_name || item.original_title;

        return (
          <Link
            to={`/${itemMedia}/details/${item.id}`}
            key={index}
            className="w-[calc(50%-8px)] min-[480px]:w-44 sm:w-48 md:w-52 lg:w-60 flex flex-col mb-4 group"
          >
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-800 shadow-md group-hover:shadow-xl group-hover:shadow-[#6556cd]/20 transition-all duration-300">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={
                  item.poster_path || item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${
                        item.poster_path ||
                        item.backdrop_path ||
                        item.profile_path
                      }`
                    : noimage
                }
                alt={itemTitle || "Poster"}
                loading="lazy"
              />

              {item.vote_average !== undefined && item.vote_average !== null && item.vote_average >= 0 && (
                <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none">
                  <div className="bg-[#6556cd]/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-white text-xs font-bold border border-white/20 shadow-sm pointer-events-auto">
                    {item.vote_average === 0
                      ? "N/A"
                      : (item.vote_average * 10).toFixed()}
                    {item.vote_average !== 0 && (
                      <sup className="pl-0.5 text-[10px]">%</sup>
                    )}
                  </div>

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
                    aria-label={inLib ? "Remove from Library" : "Add to Library"}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md pointer-events-auto ${
                      inLib
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-black/60 text-zinc-300 hover:text-white hover:bg-[#6556cd]"
                    }`}
                  >
                    <i
                      className={
                        inLib
                          ? "ri-bookmark-fill text-sm"
                          : "ri-bookmark-line text-sm"
                      }
                    ></i>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center mt-2 px-1">
              <h2 className="text-zinc-200 text-xs sm:text-sm md:text-base font-semibold group-hover:text-[#6556cd] transition-colors line-clamp-1 text-center w-full">
                {itemTitle}
              </h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;

import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Recommendations = ({ data }) => {
  return (
    <div className="flex w-full relative justify-start overflow-y-hidden overflow-x-auto gap-4 py-2 pb-4">
      {data &&
        data.map((item, index) => {
          const media = item.media_type || (item.title ? "movie" : "tv");
          const title =
            item.title || item.name || item.original_name || item.original_title;
          const date = item.release_date || item.first_air_date || item.air_date;

          return (
            <Link
              to={`/${media}/details/${item.id}`}
              key={index}
              className="min-w-[145px] sm:min-w-[175px] md:min-w-[200px] max-w-[200px] flex flex-col group shrink-0 relative"
            >
              <div className="w-full aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-800 shadow-md group-hover:shadow-lg group-hover:shadow-[#6556cd]/20 transition-all duration-300 relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={
                    item.backdrop_path || item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${
                          item.backdrop_path ||
                          item.poster_path ||
                          item.profile_path
                        }`
                      : noimage
                  }
                  alt={title || "Recommendation"}
                  loading="lazy"
                />

                {item.episode_count ? (
                  <div className="absolute top-2 left-2 bg-[#6556cd] text-white text-xs px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm font-semibold">
                    <i className="ri-box-3-fill"></i>
                    <span>{item.episode_count} eps</span>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col items-start justify-center mt-2 px-1">
                <h3 className="text-zinc-200 text-xs sm:text-sm font-medium group-hover:text-[#6556cd] transition-colors line-clamp-1 w-full">
                  {title}
                </h3>
                <div className="flex justify-between w-full text-[11px] text-zinc-400 mt-0.5">
                  <span>{date ? date.split("-")[0] : ""}</span>
                  {item.vote_average ? (
                    <span className="flex items-center text-amber-400">
                      <i className="ri-star-s-fill mr-0.5"></i>
                      {item.vote_average.toFixed(1)}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Recommendations;

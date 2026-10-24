import React from "react";
import TopNav from "./TopNav";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";

const Header = ({ values }) => {
  const Headers = values;

  return Headers ? (
    <div
      className="min-h-[75vh] md:h-[85vh] w-full flex flex-col justify-between pb-8 bg-blend-multiply bg-center bg-cover relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5), rgba(0, 0, 0, 0.7)),url(https://image.tmdb.org/t/p/original/${
          Headers.backdrop_path || Headers.poster_path || Headers.profile_path
        })`,
        backgroundRepeat: "no-repeat",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="w-full">
        <TopNav />
      </div>
      <div className="lg:px-8 md:px-6 sm:px-4 px-4 flex flex-col gap-3 max-w-4xl">
        <h1 className="text-white lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-bold line-clamp-2">
          {Headers.title ||
            Headers.name ||
            Headers.original_name ||
            Headers.original_title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <p className="text-white flex items-center font-medium">
            <i className="text-[#F0BB40] ri-play-circle-fill mr-1.5 text-base"></i>{" "}
            {Headers.media_type ? Headers.media_type.toUpperCase() : "MEDIA"}
          </p>
          {Headers.release_date || Headers.first_air_date ? (
            <p className="text-zinc-300 text-sm flex items-center">
              <i className="mr-1.5 text-[#F0BB40] ri-calendar-fill"></i>
              {Headers.release_date || Headers.first_air_date}
            </p>
          ) : null}
        </div>
        <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-2xl line-clamp-3 leading-relaxed">
          {Headers.overview}
        </p>
        <div className="flex flex-wrap gap-3 mt-1">
          <Link
            to={`/${Headers.media_type || "movie"}/details/${Headers.id}/trailer`}
            className="bg-[#6556cd] hover:bg-[#5344be] px-4 py-2 rounded-full text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#6556cd]/30 transition-all flex items-center gap-1.5"
          >
            <i className="ri-play-circle-fill text-lg"></i> Watch Trailer
          </Link>
          <Link
            to={`/${Headers.media_type || "movie"}/details/${Headers.id}`}
            className="bg-zinc-200/90 hover:bg-white text-zinc-900 font-semibold px-4 py-2 rounded-full text-sm sm:text-base transition-all flex items-center gap-1 shadow-sm"
          >
            Detail <i className="ri-arrow-right-s-line"></i>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Header;

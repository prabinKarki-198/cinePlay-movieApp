import React, { useState } from "react";
import TopNav from "./TopNav";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";

const Header = ({ values }) => {
  const Headers = values;

  console.log(Headers);
  return Headers ? (
    <div
      className="h-[85vh]   w-full flex flex-col justify-between pb-10 bg-blend-multiply bg-center bg-cover "
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4)),url(https://image.tmdb.org/t/p/original/${
          Headers.backdrop_path || Headers.poster_path || Headers.profile_path
        },
        )`,

        backgroundRepeat: "no-repeat",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
      }}
    >
      <TopNav />
      <div className="  px-8 flex flex-col gap-3">
        <h1 className="text-white text-4xl font-bold ">
          {Headers.title ||
            Headers.name ||
            Headers.original_name ||
            Headers.original_title}
        </h1>
        <div className="flex items-center gap-5">
          <p className="text-white">
            <i className="text-[#F0BB40] ri-play-circle-fill"></i>{" "}
            {Headers.media_type.toUpperCase()}
          </p>
          {Headers.release_date || Headers.first_air_date ? (
            <p className="text-white text-sm">
              <i className="mr-2 text-[#F0BB40] ri-calendar-fill"></i>
              {Headers.release_date || Headers.first_air_date}
            </p>
          ) : (
            "No Info"
          )}
        </div>
        <p className="text-white w-[50%]">
          {Headers.overview.slice(0, 200) + "..."}
        </p>
        <div className="flex gap-3">
          <Link to={`/${Headers.media_type}/details/${Headers.id}/trailer`} className="bg-[#6556cd] px-3 py-2 rounded-full text-white font-medium">
            {" "}
            <i className="ri-play-circle-fill"></i> Watch Trailer
          </Link>
          <Link to={`${Headers.media_type}/details/${Headers.id}`} className="bg-zinc-200 font-semibold px-3 py-2 rounded-full text-zinc-600 hover:text-white hover:bg-zinc-500 ">
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

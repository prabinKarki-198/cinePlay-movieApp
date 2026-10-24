import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../../loader/NotFound";
import Loader from "../../loader/Loader";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideos = useSelector((state) => state[category]?.info?.videos);

  return ytvideos ? (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-[#6556cd] text-3xl font-bold p-2 z-[110] cursor-pointer transition-colors"
        aria-label="Close trailer"
      >
        <i className="ri-close-line"></i>
      </button>

      {ytvideos.key ? (
        <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
          <ReactPlayer
            className="react-Player"
            controls={true}
            playing={true}
            height={"100%"}
            width={"100%"}
            url={`https://www.youtube.com/watch?v=${ytvideos.key}`}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  ) : (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-[#6556cd] text-3xl font-bold p-2 z-[110] cursor-pointer transition-colors"
        aria-label="Close"
      >
        <i className="ri-close-line"></i>
      </button>
      <NotFound />
    </div>
  );
};

export default Trailer;

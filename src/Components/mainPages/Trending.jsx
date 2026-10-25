import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDowns from "../templates/DropDowns";
import SideBar from "../templates/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/Axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader";
import ScrollUpButton from "../templates/ScrollUp";

const Trending = () => {
  document.title = "Trending - CinePlay";
  const [categorys, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${categorys}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((previous) => [...previous, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const refreshTrending = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setTrending([]);
      setpage(1);
      getTrending();
    }
  };

  useEffect(() => {
    refreshTrending();
  }, [categorys, duration]);

  return trending.length > 0 ? (
    <div className="min-h-screen w-full pb-10 flex flex-col bg-[#1f1e24]">
      {/* Mobile Topbar */}
      <SideBar onlyMobile={true} />

      {/* Top Header Section */}
      <div className="w-full flex flex-col gap-3 px-3 sm:px-6 py-4">
        {/* Title row with Back button */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Go back"
            >
              <i className="ri-arrow-left-line text-2xl"></i>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Trending
            </h1>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
          <div className="w-full md:flex-1">
            <TopNav />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="w-1/2 sm:w-32 md:w-36">
              <DropDowns
                title={categorys}
                category={(e) => setCategory(e.target.value)}
                options={["all", "tv", "movie"]}
              />
            </div>
            <div className="w-1/2 sm:w-32 md:w-36">
              <DropDowns
                title={duration}
                category={(e) => setDuration(e.target.value)}
                options={["day", "week"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid with Infinite Scroll */}
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getTrending}
        endMessage={
          <p className="text-center text-zinc-500 py-6 text-sm">
            You have reached the end of the list.
          </p>
        }
        dataLength={trending.length}
      >
        <Cards data={trending} title={categorys} />
      </InfiniteScroll>

      <ScrollUpButton />
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;

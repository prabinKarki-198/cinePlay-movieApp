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

const Popular = () => {
  document.title = "Popular - CinePlay";
  const [categorys, setCategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getpopular = async () => {
    try {
      const { data } = await axios.get(`/${categorys}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((previous) => [...previous, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const refreshpopular = () => {
    if (popular.length === 0) {
      getpopular();
    } else {
      setpopular([]);
      setpage(1);
      setHasMore(true);
      getpopular();
    }
  };

  useEffect(() => {
    refreshpopular();
  }, [categorys]);

  return popular.length > 0 ? (
    <div className="min-h-screen w-full pb-10 flex flex-col bg-[#1f1e24]">
      {/* Mobile Sidebar Overlay */}
      <SideBar
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onlyMobile={true}
      />

      {/* Top Header Section */}
      <div className="w-full flex flex-col gap-3 px-3 sm:px-6 py-4">
        {/* Title row with Back button and Mobile menu toggle */}
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
              Popular
            </h1>
          </div>

          <div className="flex items-center gap-2 min-[993px]:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white text-lg p-2 bg-zinc-800/80 hover:bg-[#6556cd] rounded-xl border border-zinc-700/50 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Open menu"
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
          <div className="w-full md:flex-1">
            <TopNav />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="w-full sm:w-36 md:w-40">
              <DropDowns
                title={categorys}
                category={(e) => setCategory(e.target.value)}
                options={["movie", "tv"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid with Infinite Scroll */}
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getpopular}
        endMessage={
          <p className="text-center text-zinc-500 py-6 text-sm">
            You have reached the end of the list.
          </p>
        }
        dataLength={popular.length}
      >
        <Cards data={popular} title={categorys} />
      </InfiniteScroll>

      <ScrollUpButton />
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;

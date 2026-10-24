import axios from "../../Utils/Axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";
import { useAuth } from "../../Utils/AuthContext";

const TopNav = () => {
  const { user, openAuthModal } = useAuth();
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);
  const searchRef = useRef(null);

  const getSearch = async () => {
    if (!query.trim()) {
      setSearches(null);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearch();
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearches(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative w-full flex justify-between items-center h-[9vh] min-h-[56px] text-zinc-400 pl-11 sm:pl-14 md:pl-20 lg:pl-32 pr-2 sm:pr-4"
    >
      {/* Search Bar Container */}
      <div className="flex items-center flex-1 max-w-2xl bg-zinc-800/40 hover:bg-zinc-800/70 focus-within:bg-zinc-800/90 border border-zinc-700/40 focus-within:border-[#6556cd] rounded-full px-3 py-1.5 transition-all">
        <i className="ri-search-2-line text-lg sm:text-xl text-zinc-400 mr-2 shrink-0"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-400 text-sm sm:text-base font-normal"
          placeholder="Search movies, TV shows, actors..."
        />
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="text-zinc-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors shrink-0"
            aria-label="Clear search"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        )}
      </div>

      {/* Auth Button */}
      <div className="ml-3 sm:ml-4 shrink-0">
        {user ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 bg-zinc-800/80 hover:bg-[#6556cd] text-white px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all border border-zinc-700/60 shadow-sm"
          >
            <i className="ri-user-3-fill text-[#6556cd] group-hover:text-white"></i>
            <span className="hidden sm:inline max-w-[120px] truncate">
              {user?.user_metadata?.full_name || user.email?.split("@")[0]}
            </span>
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            className="flex items-center gap-1.5 bg-[#6556cd] hover:bg-[#5344be] text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <i className="ri-login-box-line"></i>
            <span>Log In</span>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {searches && searches.length > 0 && query.trim().length > 0 && (
        <div className="absolute left-3 right-3 sm:left-14 md:left-20 lg:left-32 sm:right-auto sm:w-[80%] md:w-[65%] lg:w-[50%] top-full mt-2 max-h-[50vh] bg-[#23222a]/95 backdrop-blur-xl border border-zinc-700/60 rounded-2xl shadow-2xl overflow-y-auto z-50 divide-y divide-zinc-700/40">
          {searches.map((item, index) => {
            const title =
              item.name || item.title || item.original_title || item.original_name;
            const date = item.release_date || item.first_air_date;
            const mediaType = item.media_type || (item.title ? "movie" : "tv");

            return (
              <Link
                to={`/${mediaType}/details/${item.id}`}
                key={index}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 p-2.5 sm:p-3 hover:bg-zinc-800/80 text-zinc-200 hover:text-white transition-colors"
              >
                <img
                  className="object-cover w-12 h-14 rounded-lg bg-zinc-800 shrink-0"
                  src={
                    item.poster_path || item.backdrop_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${
                          item.poster_path ||
                          item.backdrop_path ||
                          item.profile_path
                        }`
                      : noimage
                  }
                  alt={title || "result"}
                />
                <div className="flex flex-col overflow-hidden min-w-0">
                  <h3 className="font-semibold text-sm text-zinc-100 truncate">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span className="uppercase text-[10px] px-1.5 py-0.5 bg-zinc-700/60 rounded text-zinc-300 font-medium">
                      {mediaType}
                    </span>
                    {date && <span>{date.split("-")[0]}</span>}
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
      )}
    </div>
  );
};

export default TopNav;

import React, { useEffect, useState } from "react";
import SideBar from "../templates/SideBar";
import TopNav from "../templates/TopNav";
import axios from "../../Utils/Axios";
import Header from "../templates/Header";
import HorizontalCards from "../templates/HorizontalCards";
import DropDowns from "../templates/DropDowns";
import Loader from "../../loader/Loader";
import Footer from "../templates/Footer";
import ScrollUpButton from "../templates/ScrollUp";

const Home = () => {
  document.title = "Home - CinePlay";
  const [headers, setHeaders] = useState(null);
  const [trending, setTrending] = useState(null);
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [category, setCategory] = useState("all");
  const [airringTv, setAirringTv] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [open, setopen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getHeaders = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setHeaders(randomData);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const getPopular = async () => {
    try {
      const [movies, tvShows] = await Promise.all([
        axios.get(`/movie/popular`),
        axios.get(`/tv/popular`),
      ]);
      setPopular([...movies.data.results, ...tvShows.data.results]);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const getTopRated = async () => {
    try {
      const [movies, tvShows, upcomingMovie, airringTv] = await Promise.all([
        axios.get(`/movie/top_rated`),
        axios.get(`/tv/top_rated`),
        axios.get(`/movie/upcoming`),
        axios.get(`/discover/tv`),
      ]);
      setAirringTv(airringTv.data.results);
      setTopRated([...movies.data.results, ...tvShows.data.results]);
      setUpcoming(upcomingMovie.data.results);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  useEffect(() => {
    getTrending();
    getPopular();
    getTopRated();
    !headers && getHeaders();
    const interval = setInterval(() => {
      getHeaders();
    }, 8000);
    return () => clearInterval(interval);
  }, [category]);

  return headers && trending && popular && topRated ? (
    <div className="Home h-screen relative w-full flex overflow-hidden">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-3 left-3 z-40 min-[993px]:hidden text-white text-xl p-2 bg-[#18171d]/90 hover:bg-[#6556cd] rounded-xl backdrop-blur-md shadow-lg border border-zinc-700/50 transition-all cursor-pointer flex items-center justify-center"
        aria-label="Open navigation menu"
      >
        <i className="ri-menu-line"></i>
      </button>

      {/* Sidebar (Desktop rail + Mobile overlay drawer) */}
      <SideBar func={setopen} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div
        id="scrollable-container"
        className="w-full h-full overflow-y-scroll overflow-x-hidden flex-1"
      >
        <Header values={headers} />

        <div className="px-4 py-3 flex w-full justify-between items-center">
          <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg font-semibold pt-3 text-zinc-300">
            Trending
          </h1>
          <div className="lg:w-30 md:w-30 sm:w-25 w-28">
            <DropDowns
              title="Filter"
              options={["tv", "movie", "all"]}
              category={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="px-3">
          <HorizontalCards data={trending} title={category} />

          <div className="px-1 py-3 flex justify-between items-center">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg font-semibold text-zinc-300">
              Popular
            </h1>
          </div>
          <HorizontalCards data={popular} />

          <div className="px-1 py-3 flex justify-between items-center">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg font-semibold text-zinc-300">
              Top Rated
            </h1>
          </div>
          <HorizontalCards data={topRated} />

          <div className="px-1 py-3 flex justify-between items-center">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg font-semibold text-zinc-300">
              Now Running (Movies)
            </h1>
          </div>
          <HorizontalCards data={upcoming} />

          <div className="px-1 py-3 flex justify-between items-center">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg font-semibold text-zinc-300">
              Tv (Today)
            </h1>
          </div>
          <HorizontalCards data={airringTv} />
        </div>

        <div>
          <hr className="text-zinc-700/40 mx-3 border-1 rounded" />
          <Footer />
        </div>
        <ScrollUpButton />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Home;

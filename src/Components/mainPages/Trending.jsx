import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDowns from "../templates/DropDowns";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/Axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader";
import ScrollUpButton from "../templates/ScrollUp";

const Trending = () => {
  document.title = "Trending";
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
      // setHasMore(true);
      getTrending();
    }
  };
  //   console.log(categorys, duration   )
  useEffect(() => {
    refreshTrending();
  }, [categorys, duration]);
  //   console.log(trending)
  return trending.length > 0 ? (
    <div  className="h-screen w-full  pb-10 flex flex-col  ">
      <div className="flex md:flex-row lg:flex-row flex-col sm:flex-col  md:justify-between lg:justify-between sm:justify-start md:items-center lg:items-center sm:items-start items-start lg:px-8 md:px-6 sm:px-4 px-3 py-4">
        <div className="w-[10%] flex items-center justify-around">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full px-1 hover:text-[#6556cd]"
          ></i>
          <h1 className="text-2xl font-semibold text-zinc-400">Trending</h1>
        </div>
        <div className="md:w-[70%] lg:w-[70%] sm:w-[95%] w-[95%]">
          <TopNav />
        </div>
        <div className="flex sm:w-full w-full md:w-[22%] lg:w-[16%] sm:justify-end justify-end  md:justify-around">
        <div className="flex justify-around  md:w-[100%] lg:w-[100%] sm:w-[30%] w-40   gap-2">
          <DropDowns
            title={categorys}
            category={(e) => setCategory(e.target.value)}
            options={["all", "tv", "movie"]}
          />
          <DropDowns
            title={duration}
            category={(e) => setDuration(e.target.value)}
            options={["day", "week"]}
          />
        </div>
        </div>
      </div>
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getTrending}
        endMessage={<h1>The End !!</h1>}
        dataLength={trending.length}
      >
        <Cards data={trending} title={categorys} />
      </InfiniteScroll>
      
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;

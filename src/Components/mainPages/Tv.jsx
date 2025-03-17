import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDowns from "../templates/DropDowns";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/Axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader";

const TV = () => {
  document.title = "TV";
  const [category, setcategory] = useState("airing_today");
  const [Tv, setTv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((previous) => [...previous, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const refreshTv = () => {
    if (Tv.length === 0) {
      getTv();
    } else {
      setTv([]);
      setpage(1);
      // setHasMore(true);
      getTv();
    }
  };
  //   console.log(categorys, category   )
  useEffect(() => {
    refreshTv();
  }, [category]);
  //   console.log(Tv)
  return Tv.length > 0 ? (
    <div className="h-screen w-full  pb-10 flex flex-col  ">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="w-[6%] flex items-center justify-around">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full px-1 hover:text-[#6556cd]"
          ></i>
          <h1 className="text-2xl font-semibold text-zinc-400">Tv</h1>
        </div>
        <div className="w-[82%] pl-20">
          <TopNav />
        </div>
        <div className="flex justify-around w-[12%]">
          <DropDowns
            title={category}
            category={(e) => setcategory(e.target.value)}
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
          />
        </div>
      </div>
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getTv}
        endMessage={<h1>The End !!</h1>}
        dataLength={Tv.length}
      >
        <Cards data={Tv} title={'tv'} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default TV;

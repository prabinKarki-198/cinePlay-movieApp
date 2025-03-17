import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDowns from "../templates/DropDowns";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/Axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader";

const Popular = () => {
  document.title = "Popular";
  const [categorys, setCategory] = useState("movie");

  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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
  //   console.log(categorys, duration   )
  useEffect(() => {
    refreshpopular();
  }, [categorys]);
  return popular.length > 0 ? (
    <div className="h-screen w-full  pb-10 flex flex-col  ">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="w-[10%] flex items-center justify-around">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full px-1 hover:text-[#6556cd]"
          ></i>
          <h1 className="text-2xl font-semibold text-zinc-400"> Popular</h1>
        </div>
        <div className="w-[80%] pl-20">
          <TopNav />
        </div>
        <div className="flex justify-around w-[10%]">
          <DropDowns
            title={categorys}
            category={(e) => setCategory(e.target.value)}
            options={["movie", "tv"]}
          />
        </div>
      </div>
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getpopular}
        endMessage={<h1>The End !!</h1>}
        dataLength={popular.length}
      >
        <Cards data={popular} title={categorys} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;

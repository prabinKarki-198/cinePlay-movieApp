import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDowns from "../templates/DropDowns";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/Axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader";

const Movie = () => {
  document.title = "Movie";
  const [category, setcategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovie((previous) => [...previous, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const refreshMovie = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setMovie([]);
      setpage(1);
      // setHasMore(true);
      getMovie();
    }
  };
  //   console.log(categorys, category   )
  useEffect(() => {
    refreshMovie();
  }, [category]);
  //   console.log(movie)
  return movie.length > 0 ? (
    <div className="h-screen w-full  pb-10 flex flex-col  ">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="w-[10%] flex items-center justify-around">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full px-1 hover:text-[#6556cd]"
          ></i>
          <h1 className="text-2xl font-semibold text-zinc-400">Movie</h1>
        </div>
        <div className="w-[7%] pl-20">
          <TopNav />
        </div>
        <div className="flex justify-around w-[12%]">
          <DropDowns
            title={category}
            category={(e) => setcategory(e.target.value)}
            options={["now_playing", "popular", "top_rated", "upcoming"]}
          />
        </div>
      </div>
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getMovie}
        endMessage={<h1>The End !!</h1>}
        dataLength={movie.length}
      >
        <Cards data={movie} title={'movie'} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movie;

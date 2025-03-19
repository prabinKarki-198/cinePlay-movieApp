import React, { useEffect, useState } from "react";
import TopNav from "../templates/TopNav";
import DropDowns from "../templates/DropDowns";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/Axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../loader/Loader";

const People = () => {
    document.title = "People";
  const [category, setcategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPerson((previous) => [...previous, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const refreshPerson = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setPerson([]);
      setpage(1);
      // setHasMore(true);
      getPerson();
    }
  };
  //   console.log(categorys, category   )
  useEffect(() => {
    refreshPerson();
  }, [category]);
  //   console.log(person)
  return person.length > 0 ? (
    <div className="h-screen w-full  pb-10 flex flex-col  ">
      <div className="flex md:flex-row lg:flex-row flex-col sm:flex-col  justify-between md:items-center lg:items-center sm:items-start items-start lg:px-8 md:px-6 sm:px-4 px-3 py-4">
        <div className="w-[10%] flex items-center justify-around">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full px-1 hover:text-[#6556cd]"
          ></i>
          <h1 className="text-2xl font-semibold text-zinc-400">People</h1>
        </div>
        <div className="md:w-[80%] lg:w-[80%] sm:w-[95%] w-[95%]">
          <TopNav />
        </div>
    
      </div>
      <InfiniteScroll
        loader={<Loader />}
        hasMore={hasMore}
        next={getPerson}
        endMessage={<h1>The End !!</h1>}
        dataLength={person.length}
      >
        <Cards data={person} title={'person'} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default People;

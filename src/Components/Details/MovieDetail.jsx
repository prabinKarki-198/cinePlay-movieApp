import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../Store/actions/movieActions";
import Loader from "../../loader/Loader";
import { retry } from "@reduxjs/toolkit/query";
import noimage from "/noimage.webp";
import HorizontalCards from "../templates/HorizontalCards";


const movieDetail = () => {
   const {pathname}=useLocation()
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
 
  const { info } = useSelector((state) => state.movie);

  // console.log(info);
  useEffect(() => {
    dispatch(asyncLoadMovie(id));
   
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return info ? (
    <div
    style={info.details.backdrop_path ||
      info.details.poster_path ||
      info.details.profile_path ? {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4)),url(https://image.tmdb.org/t/p/original/${
        info.details.backdrop_path ||
        info.details.poster_path ||
        info.details.profile_path 
      } 
      )`,

      // backgroundRepeat: "no-repeat",
      // maskImage:
      //   "linear-gradient(to bottom, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
      // WebkitMaskImage:
      //   "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
    }:{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4)),url(https://plus.unsplash.com/premium_photo-1709384735411-8a46e2410e54?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
    )`}}
      className={`w-full relative min-h-screen bg-[#1f1e24] flex flex-col pt-4 gap-1 text-white bg-cover `}
    >
      <nav className="w-full h-[8vh] flex justify-start items-center ">
        <div className="h-[80%] min-w-[10%] flex gap-2 mx-6 p-2 items-center justify-center text-zinc-200 rounded-md text-xl bg-zinc-100/10">
          <Link to={'/'}> 
            <i
              onClick={() => {
                navigate(-1);
              }}
              className="ri-arrow-left-line  font-bold   hover:text-[#6556cd]"
            ></i>
          </Link>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
          >
            <i className="ri-earth-fill   hover:text-[#6556cd]"></i>
          </a>
          <a target="_blank" href={info.details.homepage}>
            <i className="ri-external-link-fill    hover:text-[#6556cd]"></i>
          </a>
          <a
            target="_blank"
            className="font-medium   hover:text-[#6556cd]"
            href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`}
          >
            imdb
          </a>
        </div>
      </nav>
      <div className="h-fit lg:px-6 py-1 flex justify-between lg:items-start md:items-center sm:items-center items-center sm:flex-col flex-col md:flex-col lg:flex-row md:gap-4 sm:gap-4 gap-4 lg:gap-0">
        <div className="lg:w-[16%] lg:h-[70%] md:h-[25rem] w-[50%] sm:h-[20rem] ">
          <img
            className={`${
              !info.details.profile_path ? "object-cover" : "object-cover"
            } ${!info.details.profile_path ? "" : "object-top-1"} ${
              !info.details.profile_path ? "w-[98%]" : "w-[100%]"
            }  w-[98%]  h-[100%] rounded-md hover:scale-105 `}
            src={
              info.details.poster_path ||
              info.details.backdrop_path ||
              info.details.profile_path
                ? `https://image.tmdb.org/t/p/w500/${
                    info.details.poster_path ||
                    info.details.backdrop_path ||
                    info.details.profile_path
                  }`
                : noimage
            }
            alt={info.details.title}
          />

        </div>
        <div className="bg-zinc-600/40 h-full  p-4.5  lg:w-[60%] md:w-[90%] sm:w-[90%] w-[90%] rounded-md justify-between  flex flex-col    ">
         <div className="w-full h-[35%] flex flex-col gap-1">
         <h1 className="text-white lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold ">
            {info.details.title ||
              info.details.name ||
              info.details.original_name ||
              info.details.original_title}
          </h1>

          <div className="flex items-center gap-5">
            <p className="text-white">
              <i className="text-[#F0BB40] ri-play-circle-fill"></i> {"MOVIE"}
            </p>
            {info.details.release_date || info.details.first_air_date ? (
              <p className="text-white text-sm">
                <i className="mr-2 text-[#F0BB40] ri-calendar-fill"></i>
                {info.details.release_date || info.details.first_air_date}
              </p>
            ) : (
              "No Info"
            )}
          </div>
          <p className="text-white lg:text-lg md:text-md sm:text-sm text-sm w-[100%] ">
            {info.details.overview.length > 450 ? info.details.overview.slice(0, 450) + "...":info.details.overview}
          </p>
         </div>
          <div className="w-full h-[50%] flex flex-col gap-2  justify-center">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg    font-bold">Lead Casts</h1>
            <div className="w-full max-h-[80%] flex  items-center gap-4 overflow-hidden overflow-x-auto ">
            {
                    info.cast.length > 0 ? (info.cast.slice(0,5).map((item,index)=>(
                            <Link to={`/person/details/${item.id}`} key={item.id} className="flex items-center min-w-36 overflow-hidden rounded flex-col justify-between bg-cover ">
                                <img className="w-full lg:h-40 md:h-37 sm:h-35 h-35 hover:scale-105 rounded object-cover lg:object-top md:object-top sm:object-center object-center" src={item.profile_path ? (`https://image.tmdb.org/t/p/w200/${item.profile_path}`):noimage} alt= 'N/A' />
                                <p className="hover:text-zinc-400 font-medium">{(item.name || item.original_name).length > 15 ? (item.name || item.original_name).slice(0,12)+'...':(item.name || item.original_name)}</p>
                                </Link>
                    ))):<div className="text-xl font-semibold">No casts images available right now</div>
            }
          </div>
          </div>
          <div className="h-[10%] flex items-center pt-4">
            <Link  to={`${pathname}/trailer`} className="bg-[#6556cd] hover:border-t-4 lg:text-lg md:text-md sm:text-sm text-sm border-[#1f1e24] px-3 py-2 rounded-md  text-white font-medium">
                        {" "}
                        <i className="ri-play-circle-fill"></i> Watch Trailer
                      </Link>
          </div>
        </div>
        <div className="lg:w-[20%] w-[90%] h-[100%]  bg-zinc-600/40 p-5 hover:scale-102 hover:border-r-5 border-[#6556cd] justify-center flex flex-col gap-2 rounded-md">
            <h1 className=" flex">
                <p className="font-semibold">Title:</p>
                <p className="font-regular pl-2">{info.details.title || info.details.original_title}</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">Tagline:</p>
                <p className="font-regular pl-2">{info.details.tagline}</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">Status:</p>
                <p className="font-regular pl-2">{info.details.status}</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">Aired:</p>
                <p className="font-regular pl-2">{info.details.release_date}</p>
            </h1> 
            <h1 className="flex">
                <p className="font-semibold ">Runtime:</p>
                <p className="font-regular pl-2">{info.details.runtime} min</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold pr-2">Vote Score:</p>
            {info.details.vote_average === 0
                    ? "N/A"
                    : (info.details.vote_average * 10).toFixed()  }
                     {info.details.vote_average === 0
                    ? ""
                    : <sup className="pl-0.5 text-xs">%</sup>  }    
            </h1>
            <hr className="w-[85%] self-center my-2 text-zinc-400/40" />
            <h1 className="flex">
                <p className="font-semibold ">Genres:</p>
                <div className="font-regular flex gap-2 pl-2 flex-wrap ">{ info.details.genres ? info.details.genres.map((item, index) => <p key={index} className=" border-1 border-zinc-400/60 px-2 text-sm py-1 text-center hover:text-zinc-400/60 font-semibold rounded-full">
                    {item.name}
                </p>):''}</div>
            </h1>
            <hr className="w-[85%] self-center my-2 text-zinc-400/40" />
           <div>
               <h1 className="flex flex-col items-center gap-2">
                <p className="font-semibold ">Production Companies:</p>
                <div className="font-regular flex gap-2 flex-wrap   ">{ info.details.production_companies.length >0 ? info.details.production_companies.slice(0,2).map((item, index) => <p key={index} className="  border-1 w-20 h-8  text-black  border-zinc-400/60 px-2 text-sm flex items-center justify-center bg-white font-semibold rounded-xl">
                    {/* {item.name.length >15 ? item.name.slice(0,1):item.name} */}
                    <img className="h-full object-contain"  src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`} alt='N/A' />
                </p>):<h1 className="border-1 border-zinc-400/60 px-2 text-sm py-1 text-center hover:text-zinc-400/60 font-semibold rounded-full">not available</h1>}</div>
            </h1>
           </div>


        </div>
      </div>
       {info.recommendations.length > 0 ?(<div className="bg-[#1f1e24]/60 my-5 rounded-md   mx-5 px-3">
            <h1 className="text-2xl font-semibold text-zinc-400 pt-2">Recommendations</h1>
              <HorizontalCards data={info.recommendations} />
       </div>):''}
       <Outlet />
    </div>
  ) : (
  <div className="relative">
      <Link to={'/'}> 
            <i
              onClick={() => {
                navigate("/");
              }}
              className="ri-arrow-left-line text-2xl absolute font-bold text-zinc-400   hover:text-[#6556cd]"
            ></i>
          </Link>
          <Loader />
  </div>
    
  );
};

export default movieDetail;
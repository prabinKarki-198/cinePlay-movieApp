import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import noimage from "/noimage.webp";
import HorizontalCards from "../templates/HorizontalCards";
import { removeperson } from "../Store/reducers/personSlice";
import { asyncLoadperson } from "../Store/actions/personActions";
import DropDowns from "../templates/DropDowns";
// import Recommendations from "../templates/Recommendations";

const movieDetail = () => {
   const {pathname}=useLocation()
   const [category, setCategory]=useState('movie');
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  // const [height,setHeight]= useState('min-h-screen overflow-none');
  const { info } = useSelector((state) => state.person);

  console.log(info);
  useEffect(() => {
    dispatch(asyncLoadperson  (id));
    // setHeight('min-h-screen overflow-none');
    return () => {
      dispatch(removeperson());
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
      }:{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4)),url(https://plus.unsplash.com/premium_photo-1709384735411-8a46e2410e54?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
      )`}}
      className={`w-full relative min-h-screen  flex flex-col pt-4 gap-1 text-white bg-cover `}
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
      <div className="h-fit lg:px-6 py-1 flex justify-between lg:items-start md:items-center sm:items-center items-center sm:flex-col flex-col md:flex-col lg:flex-row md:gap-4 sm:gap-4 gap-4 lg:gap-0 ">
        <div className="lg:w-[16%] lg:h-[70%] md:h-[25rem] w-[50%] sm:h-[20rem]">
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
        <div className="bg-zinc-600/40 h-full  p-4.5  lg:w-[60%] md:w-[90%] sm:w-[90%] w-[90%] rounded-md justify-between  flex flex-col   ">
         <div className="w-full h-[35%] flex flex-col gap-1">
         <h1 className="text-white lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold ">
            {info.details.title ||
              info.details.name ||
              info.details.original_name ||
              info.details.original_title}
          </h1>

          <div className="flex items-center gap-5">
            <p className="text-white">
              <i className="text-[#F0BB40] ri-star-s-fill"></i> {info.details.gender === 1 ? "Actress": 'Actor'}
            </p>
            
          </div>
          <p className="text-white lg:text-lg md:text-md sm:text-sm text-sm w-[100%] ">
            {info.details.biography.length > 450 ? info.details.biography .slice(0, 450) + "...":info.details.biography  }
          </p>
         </div>
          <div className="w-full h-[55%] flex flex-col gap-2  justify-center">
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg    font-bold">Photos</h1>
            <div className="w-full max-h-[80%] flex  items-center gap-4 overflow-hidden overflow-x-auto pb-3  ">
            {
                    info.images.length > 0 ? (info.images.slice(0,10).map((item,index)=>(
                            <div   key={item.id} className="flex items-center min-w-36 overflow-hidden rounded  flex-col justify-between bg-cover ">
                                <img className="w-full lg:h-40 md:h-37 sm:h-35 h-35 hover:scale-105 rounded object-cover lg:object-top md:object-top sm:object-center object-center" src={item.file_path ? (`https://image.tmdb.org/t/p/w200/${item.file_path}`):noimage} alt= 'N/A' />
                                
                                </div>
                    ))):<div className="text-xl font-semibold">No casts images available right now</div>
            }
          </div>
          </div>
          
        </div>
        <div className="lg:w-[20%] w-[90%] h-[100%]  bg-zinc-600/40 p-5 hover:scale-102 hover:border-r-5 border-[#6556cd] justify-center flex flex-col gap-2 rounded-md">
            <h1 className=" flex">
                <p className="font-semibold">Name:</p>
                <p className="font-regular pl-2">{info.details.name || info.details.original_name}</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">DOB:</p>
                <p className="font-regular pl-2">{info.details.birthday }</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">Gender:</p>
                <p className="font-regular pl-2">{info.details.gender === 1 ? 'Female':'Male'}</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">Known For:</p>
                <p className="font-regular pl-2"> {info.details.known_for_department}</p>
            </h1>
            <h1 className="flex">
                <p className="font-semibold ">BirthPlace:</p>
                <p className="font-regular pl-2">{info.details.place_of_birth}</p>
            </h1> 
           
            <hr className="w-[85%] self-center my-4 text-zinc-400/40" />
        </div>
      </div>
       {info.movieCredits.length ? (<div className="bg-[#1f1e24]/60 my-5  rounded-md  mx-5 px-3">
            <h1 className="text-2xl font-semibold text-zinc-400 pt-2">Movie Credits</h1>
              <HorizontalCards data={info.movieCredits} />
       </div>):''}
       {info.tvCredits.length ? (<div className="bg-[#1f1e24]/60 my-5 rounded-md  mx-5 px-3">
            <h1 className="text-2xl font-semibold text-zinc-400 pt-2">Tv Credits</h1>
              <HorizontalCards data={info.tvCredits} />
       </div>): '' }
       {(info.tvCredits || info.movieCredits).length ? (<div className="bg-[#1f1e24]/60 my-5 rounded-md  mx-5 p-5" >
              <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-zinc-400 pt-2">Acting</h1>
              <div className="sm:w-[20  %] md:w-[15%] lg:w-[10%] w-[50%]">
              <DropDowns title='category' options={['tv','movie']} category={(e) => setCategory(e.target.value)}  />
              </div>
              </div>
           <div className="list-disc text-zinc-400 mx-5 max-h-[50vh] my-5 overflow-x-hidden rounded-md overflow-y-auto shadow-xs shadow-[#6556cd] border-2 border-zinc-700 p-5"> 
           {
                info[category+'Credits'].slice(0,15).map((item,index)=>(
                  <li key={item.id} className="hover:text-white p-5 rounded hover:bg-[#1f1e24]/80 duration-300 cursor-pointer">
                    <Link to={`/${category}/details/${item.id}`}>
                          <span>
                            {item.name || item.original_name || item.original_title} 
                          </span>
                          <span className=" flex"><h1 className="font-semibold pr-2">Role:</h1>{item.character}</span>
                  </Link>
                  </li>
                ))
              }
           </div>
       </div>):""}
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

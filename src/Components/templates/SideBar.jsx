import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ func }) => {
  const [open, setopen] = useState(false);
  const mouseEnter =()=>{
    const data =document.querySelector('.tooltip');
    data.classList.remove('hidden');
    
  }
  const mouseLeave =()=>{
    const data =document.querySelector('.tooltip');
    data.classList.add('hidden');
  }
  
  return (
    <div
      className={`${open ? " lg:w-[20%] md:w-[25%] lg:relative md:relative absolute bg-[#1f1e24]  z-100 p-2 " : " lg:w-18 md:w-18 sm:w-16 w-13 p-0"}  flex flex-col items-center justify-between  h-screen border-r-2 border-zinc-400/20  rounded pt-6`}
    >
     <div className="w-full">
     <div
        className={`flex ${
          open ? "justify-between " : "justify-center"
        } w-[100%] items-center  `}
      >
        {open ? (
          <h1
            className={`lg:text-2xl md:text-xl sm:text-2xl   ${
              open ? "w-[15%] " : "w-0"
            }   font-bold text-white `}
          >
            <i
              className={`  ${
                open ? "text-[#6556cd]" : "text-transparent"
              } ri-movie-ai-fill mr-2`}
            ></i>
            <span
              className={`align-baseline    ${
                open ? "text-white " : "text-none"
              } `}
            >
              CinePlay.
            </span>
          </h1>
        ) : (
          ""
        )}
        <div className="">
          <i
            className=" text-white  hover:text-[#6556cd]  text-2xl ri-menu-line"
            onClick={() => {
              setopen(!open);
              func(!open);
            }}
          ></i>
        </div>
      </div>
      <nav className={`flex flex-col px-2  w-[100%] text-zinc-400 gap-2`}>
        {open ? (
          <h1 className={`text-white  font-semibold   text-xl mt-8  mb-3`}>
            New Feeds
          </h1>
        ) : (
          <h1
            className={`text-zinc-200  font-semibold lg:text-lg sm:text-sm md:text-lg text-xs  self-center mt-8  mb-3`}
          >
            Feeds
          </h1>
        )}
        <Link onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}
          to={"/trending"}
          className={`hover:bg-[#6556cd] relative p-3 rounded-lg ${
            open ? "" : "justify-center"
          }   duration-300  flex w-[100%] hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1" : ""
            } ri-fire-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? '': (<h1  className="tooltip hidden absolute top-[30%] -right-[121%] border-zinc-400/40 border-1   z-100  bg-[#1f1e24] font-semibold p-1 rounded-md text-xs ">Trending</h1>)}
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Trending
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link 
          to={"/popular"}
          className={`hover:bg-[#6556cd] p-3 rounded-lg ${
            open ? "" : "justify-center"
          }  duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-bard-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {/* {open ? '': (<h1  className="tooltip hidden absolute top-[30%] -right-[121%] border-zinc-400/40 border-1   z-100  bg-[#1f1e24] font-semibold p-1 rounded-md text-xs ">Popular</h1>)} */}
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Popular
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link
          to={"/movie"}
          className={`hover:bg-[#6556cd] p-3 rounded-lg ${
            open ? "" : "justify-center"
          } duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-movie-2-ai-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Movie
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link
          to={"/tv"}
          className={`hover:bg-[#6556cd] p-3 rounded-lg ${
            open ? "" : "justify-center"
          }  duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-tv-2-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Tv Shows
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link
          to={"/person"}
          className={`hover:bg-[#6556cd] p-3 rounded-lg ${
            open ? "" : "justify-center"
          }  duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-team-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              People
            </h1>
          ) : (
            ""
          )}
        </Link>
      </nav>
      <hr
        className={`text-zinc-400/20 ${
          open ? "w-[110%]" : "w-[90%]"
        } border-1 mt-4`}
      />
      <nav className="flex w-[100%] flex-col text-zinc-400 gap-2">
        <div className={`flex items-center  ${open ? "justify-start" :'justify-center'} w-[100%] gap-3 `}>
          <span className="flex pt-2.5">
            <i
              className={`ri-file-paper-fill ${
                open ? "" : "mt-4"
              }  text-[#6556cd] text-md`}
            ></i>
          </span>
          {open ? (
            <h1 className="text-white text-sm font-semibold   mt-4 mb-3">
              Website Information
            </h1>
          ) : (
            ""
          )}
        </div>
        <Link to={'/about'}
          className={`hover:bg-[#6556cd] p-3 rounded-lg ${
            open ? "" : "justify-center"
          } mx-2 duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-information-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              About
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link to={'/contact'}
          className={`hover:bg-[#6556cd]   rounded-lg ${
            open ? "py-3 pl-3 " : "justify-center p-3"
          } mx-2 duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-phone-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Contact Us
            </h1>
          ) : (
            ""
          )}
        </Link>
      </nav>
      
     </div>
     <div className="text-zinc-400 text-2xl  py-3 ">
     <i className="ri-account-circle-line"></i>
     </div>
    </div>
  );
};

export default SideBar;

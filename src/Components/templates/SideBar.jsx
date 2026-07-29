import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const SideBar = ({ func, mobileOpen, setMobileOpen }) => {
  const { user, openAuthModal } = useAuth();
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
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <div
        className={`${open ? " lg:w-[20%] md:w-[25%] lg:relative md:relative absolute bg-[#1f1e24] z-100 p-2 " : " lg:w-18 md:w-18 sm:w-15 w-12 p-0"} max-[992px]:hidden min-[993px]:flex flex-col items-center justify-between h-screen border-r-2 border-zinc-400/20 rounded pt-6`}
      >
     <div className="w-full">
     <div
        className={`flex ${
          open ? "justify-between items-center " : "justify-center"
        } w-[100%] items-center  `}
      >
        {open ? (
          <h1
            className={`lg:text-2xl md:text-xl sm:text-xl text-lg      ${
              open ? "w-[15%] " : "w-0"
            }   font-bold text-white `}
          >
            <i
              className={`  ${
                open ? "text-[#6556cd] " : " "
              } ri-movie-ai-fill mr-1`}
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
        <div className="flex">
          <i
            className={`text-white justify-self-end hover:text-[#6556cd]  text-2xl ${open ? 'ri-close-fill':'ri-menu-line'}`}
            onClick={() => {
              setopen(!open);
              func(!open);
            }}
          ></i>
        </div>
      </div>
      <nav className={`flex flex-col px-2  w-[100%] text-zinc-400 ${open ? 'gap-1':'lg:gap-2 sm:gap-2 gap-3 md:gap-2 '} `}>
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
          className={`hover:bg-[#6556cd] relative   rounded-lg ${
            open ? "p-3 " : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
          }   duration-300  flex w-[100%] hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1" : ""
            } ri-fire-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? '': (<h1  className="tooltip hidden absolute top-[20%] left-[110%] border-zinc-400/40 border-1   z-100  bg-[#1f1e24] font-semibold p-1 rounded-md text-xs ">Trending</h1>)}
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Trending
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link 
          to={"/popular"} title="Popular"
          className={`hover:bg-[#6556cd]  rounded-lg ${
            open ? "p-3 " : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
          }  duration-300 flex hover:text-[#FFFDD0]`}
        >
          <i
            className={`${
              open ? "mr-1.5" : ""
            } ri-bard-fill hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]`}
          ></i>
          {open ? (
            <h1 className="hover:text-[#FFFDD0] hover:drop-shadow-[0_0_10px_rgba(255,253,208,0.8)]">
              Popular
            </h1>
          ) : (
            ""
          )}
        </Link>
        <Link
          to={"/movie"} title="Movie"
          className={`hover:bg-[#6556cd]  rounded-lg ${
            open ? "p-3 " : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
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
          to={"/tv"} title="Tv Shows"
          className={`hover:bg-[#6556cd]  rounded-lg ${
            open ? "p-3 " : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
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
          to={"/person"} title="Person"
          className={`hover:bg-[#6556cd]  rounded-lg ${
            open ? "p-3 " : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
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
        className={`text-zinc-400/20 justify-self-center ${
          open ? "w-[90%]" : "w-[90%]"
        } border-1 mt-4`}
      />
      <nav className={` flex w-[100%] flex-col text-zinc-400 ${open ? 'gap-1':'lg:gap-2 sm:gap-2 gap-3 md:gap-1'}` }>
        <div className={`flex items-center  ${open ? "justify-start" :'justify-center'} w-[100%] gap-3 `}>
          <span className="flex pt-2.5">
            <i
              className={`ri-file-paper-fill ${
                open ? "" : "mt-2"
              }  text-[#6556cd] text-md`}
            ></i>
          </span>
          {open ? (
            <h1 className="text-white text-sm font-semibold   mt-4 mb-3">
              Website Info
            </h1>
          ) : (
            ""
          )}
        </div>
        <Link to={'/about'} title="About"
          className={`hover:bg-[#6556cd]  rounded-lg ${
            open ? "p-3 " : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
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
        <Link to={'/contact'} title="Contact"
          className={`hover:bg-[#6556cd]   rounded-lg ${
            open ?"py-3 pl-3" : "justify-center lg:p-3 md:p-3 sm:p-2 p-2"
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
     {user ? (
       <Link to={'/profile'} title="Profile" className="relative text-[#6556cd] text-2xl lg:mb-3 md:mb-2 sm:mb-1 mb-1 hover:scale-110 transition-transform">
         <i className="ri-account-circle-fill"></i>
         <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1f1e24] rounded-full"></span>
       </Link>
     ) : (
       <button onClick={() => openAuthModal('login')} title="Log In / Sign Up" className="text-zinc-400 text-2xl lg:mb-3 md:mb-2 sm:mb-1 mb-1 hover:text-[#6556cd] hover:scale-110 transition-all cursor-pointer">
         <i className="ri-account-circle-line"></i>
       </button>
     )}
    </div>

      {/* Mobile Overlay Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 min-[993px]:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-70 bg-[#1f1e24] border-r-2 border-zinc-400/20 p-6 pt-8 flex flex-col overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-white">
                <i className="text-[#6556cd] ri-movie-ai-fill mr-2"></i>
                <span className="align-baseline text-white">CinePlay.</span>
              </h1>
              <i
                className="ri-close-line text-white hover:text-[#6556cd] text-2xl cursor-pointer"
                onClick={() => setMobileOpen(false)}
              ></i>
            </div>
            <nav className="flex flex-col w-full text-zinc-400 gap-1">
              <h1 className="text-white font-semibold text-xl mt-2 mb-3">New Feeds</h1>
              <Link onClick={() => setMobileOpen(false)} to={"/trending"} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex w-full hover:text-[#FFFDD0]">
                <i className="mr-2 ri-fire-fill"></i>
                <h1>Trending</h1>
              </Link>
              <Link onClick={() => setMobileOpen(false)} to={"/popular"} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex w-full hover:text-[#FFFDD0]">
                <i className="mr-2 ri-bard-fill"></i>
                <h1>Popular</h1>
              </Link>
              <Link onClick={() => setMobileOpen(false)} to={"/movie"} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex w-full hover:text-[#FFFDD0]">
                <i className="mr-2 ri-movie-2-ai-fill"></i>
                <h1>Movie</h1>
              </Link>
              <Link onClick={() => setMobileOpen(false)} to={"/tv"} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex w-full hover:text-[#FFFDD0]">
                <i className="mr-2 ri-tv-2-fill"></i>
                <h1>Tv Shows</h1>
              </Link>
              <Link onClick={() => setMobileOpen(false)} to={"/person"} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex w-full hover:text-[#FFFDD0]">
                <i className="mr-2 ri-team-fill"></i>
                <h1>People</h1>
              </Link>
            </nav>
            <hr className="border-zinc-400/20 border-1 my-4" />
            <nav className="flex w-full flex-col text-zinc-400 gap-1">
              <div className="flex items-center gap-3 py-2">
                <i className="ri-file-paper-fill text-[#6556cd] text-lg"></i>
                <h1 className="text-white text-sm font-semibold">Website Info</h1>
              </div>
              <Link onClick={() => setMobileOpen(false)} to={'/about'} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex hover:text-[#FFFDD0]">
                <i className="mr-2 ri-information-fill"></i>
                <h1>About</h1>
              </Link>
              <Link onClick={() => setMobileOpen(false)} to={'/contact'} className="hover:bg-[#6556cd] p-4 rounded-lg duration-300 flex hover:text-[#FFFDD0]">
                <i className="mr-2 ri-phone-fill"></i>
                <h1>Contact Us</h1>
              </Link>
            </nav>
            <div className="mt-auto pt-4 border-t border-zinc-700/40">
              {user ? (
                <Link onClick={() => setMobileOpen(false)} to={'/profile'} className="flex items-center gap-3 text-[#6556cd] text-xl hover:scale-105 transition-transform">
                  <i className="ri-account-circle-fill text-2xl"></i>
                  <span className="text-sm font-medium text-white">Profile</span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full ml-auto"></span>
                </Link>
              ) : (
                <button onClick={() => { openAuthModal('login'); setMobileOpen(false); }} className="flex items-center gap-3 text-zinc-400 text-xl hover:text-[#6556cd] transition-all cursor-pointer">
                  <i className="ri-account-circle-line text-2xl"></i>
                  <span className="text-sm font-medium">Log In / Sign Up</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;

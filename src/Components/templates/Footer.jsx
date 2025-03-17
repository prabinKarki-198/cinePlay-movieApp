import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full flex justify-between h-[25vh] sm:p-3 p-3 lg:p-5 md:p-5">
      <div className="flex md:w-[20%] sm:w-[20%] gap-2    flex-col">
        <div className="flex  gap-2 sm:text-xl md:text-2xl lg:text-4xl items-center text-xl  text-white">
          <i className="ri-movie-ai-fill  text-[#6556cd]"></i>
          <h1 className="font-bold ">CinePlay.</h1>
        </div>
        <div className=" flex text-xs  md:text-sm lg:text-xl flex-col sm:flex-col md:flex-col lg:flex-row sm:justify-center md:justify-start lg:justify-start   sm:text-xs text-zinc-400/20">
            <h1 className=" font-bold">Email:</h1>
            <h1 className=" font-regular lg:pl-1 ">cinePlay@movie.org</h1>
           </div>
           </div>
           <div className="flex flex-col w-[60%] gap-1 md:self-end self-end lg:self-end sm:self-center ">
            <div className="flex md:gap-5 lg:gap-5 sm:gap-2 gap-2 flex-row  justify-center lg:text-lg text-xs md:text-sm sm:text-xs">
            <h1 className="hover:text-[#6556cd] text-white">Terms of service</h1>
             <h1 className="hover:text-[#6556cd] text-white">Privacy Policy</h1>
             <Link to={'/about'} className="hover:text-[#6556cd] text-white">About us</Link>
             <Link to={'/contact'} className="hover:text-[#6556cd] text-white">Contact</Link>
            </div>
            <div className="text-zinc-400/60 flex flex-col lg:text-lg text-xs md:text-sm sm:text-xs justify-center items-center">
                <h1 className="text-center">CinePlay does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
                </h1>
                <h1>© CinePlay. All rights reserved.</h1>
            </div>
           </div>
        <div className="text-3xl w-[10%]  justify-end flex ">
           <div className="flex gap-2 flex-col text-white ">
           <Link target="_blank" to={"https://www.facebook.com/profile.php?id=100015271812671"}>
            {" "}
            <i className="ri-facebook-circle-fill  hover:text-[#6556cd]"></i>
          </Link>
          <Link target="_blank"  to={"https://www.linkedin.com"}>
            <i className="ri-linkedin-box-fill hover:text-[#6556cd]"></i>
          </Link>
          <Link target="_blank" to={"https://www.telegram.org"}>
            {" "}
            <i className="ri-telegram-fill hover:text-[#6556cd]"></i>
          </Link>
           </div>
        </div>
      
      
    </div>
  );
};

export default Footer;

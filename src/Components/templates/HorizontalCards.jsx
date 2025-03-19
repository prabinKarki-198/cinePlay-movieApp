import React, { useRef, useState } from "react";
import noimage from "/noimage.webp";
import DropDowns from "./DropDowns";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag-to-scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed (increase for faster scrolling)
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch support for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  // console.log(data)  
  return (
    <div ref={scrollContainerRef}
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    style={{ cursor: "grab" }} className="flex w-[100%] overflow-y-hidden overflow-x-scroll gap-5 h-[44vh] pl-0.5  mb-5 pr-1 ">
      {" "}
      {data.map((item, index) => (
        <Link to={`/${item.media_type || (item.title ? 'movie':'tv')}/details/${item.id}`} 
          key={index}
          className=" lg:min-w-55 md:min-w-50 sm:min-w-48 min-w-48 h-[40vh] flex flex-col gap-3 mt-2 pt-0.5 rounded-md shadow-xs mb-1 shadow-[#6556cd] "
        >
          <div className=" w-full h-[65%] rounded-md flex justify-center overflow-hidden hover:overflow-hidden">
            {" "}
            <img
              className="object-cover w-[98%] bg-no-repeat  h-[100%] rounded-md hover:scale-105"
              src={item.backdrop_path || item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/w500/${
                item.backdrop_path || item.poster_path || item.profile_path}`:noimage}
              alt={noimage}
            />
            {/* { h1>{item.media_type.toUpperCase()}</h1>} */}
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <h2 className="text-white text-lg font-medium hover:text-[#6556cd]">
              {" "}
              {(
                item.title ||
                item.name ||
                item.original_name ||
                item.original_title
              ).length > 20
                ? (
                    item.title ||
                    item.name ||
                    item.original_name ||
                    item.original_title
                  ).slice(0, 18) + "..."
                : item.title ||
                  item.name ||
                  item.original_name ||
                  item.original_title}
            </h2>
            <div className="flex justify-between w-full px-2 items-end text-white font-semibold">
              <h3>
                <i className=" text-[#F0BB40] mr-1 ri-calendar-fill"></i>{" "}
                {item.release_date || item.first_air_date || item.air_date}
              </h3>
              {item.vote_average ? (
                <h1 className="text-sm font-medium flex items-end ">
                  <i className="text-[#F0BB40] ri-star-s-fill mr-1 text-lg relative top-1"></i>
                  {item.vote_average.toFixed(1)}
                </h1>
              ) : (
                "N/A"
              )}
            </div>
            {/* <p className='text-gray-500'>{item.overview.slice(0, 100)}...</p> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;

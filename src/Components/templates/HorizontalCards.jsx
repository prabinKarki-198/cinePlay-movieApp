import React, { useRef, useState } from "react";
import noimage from "/noimage.webp";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag-to-scroll for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: "grab" }}
      className="flex w-full overflow-y-hidden overflow-x-auto gap-3 sm:gap-4 py-2 pb-4 scroll-smooth"
    >
      {data &&
        data.map((item, index) => {
          const title =
            item.title || item.name || item.original_name || item.original_title;
          const media = item.media_type || (item.title ? "movie" : "tv");

          return (
            <Link
              to={`/${media}/details/${item.id}`}
              key={index}
              className="min-w-[145px] sm:min-w-[175px] md:min-w-[200px] max-w-[200px] flex flex-col group shrink-0"
            >
              <div className="w-full aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-800 shadow-md group-hover:shadow-lg group-hover:shadow-[#6556cd]/20 transition-all duration-300">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={
                    item.backdrop_path || item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${
                          item.backdrop_path ||
                          item.poster_path ||
                          item.profile_path
                        }`
                      : noimage
                  }
                  alt={title || "card"}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col items-start justify-center mt-2 px-1">
                <h3 className="text-zinc-200 text-xs sm:text-sm font-medium group-hover:text-[#6556cd] transition-colors line-clamp-1 w-full">
                  {title}
                </h3>
                <span className="text-[11px] text-zinc-400 capitalize mt-0.5">
                  {media} {item.vote_average ? `• ★ ${item.vote_average.toFixed(1)}` : ""}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default HorizontalCards;

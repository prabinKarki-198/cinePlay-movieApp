import React from 'react'
import { Link } from 'react-router-dom';
import noimage from '/noimage.webp';

const Recommendations = ({data}) => {
    return (
        <div className="flex w-[100%] relative justify-start overflow-y-hidden overflow-x-auto gap-5 h-[44vh] pl-0.5 mb-5 pr-1 ">
          {" "}
          {data.map((item, index) => (
            <Link  
              key={index}
              className="lg:min-w-55 md:min-w-50 sm:min-w-45 min-w-45 h-[40vh] flex flex-col gap-3 mt-2 pt-0.5 rounded-md shadow-xs mb-1 shadow-[#6556cd] "
            >
              <div className=" w-full h-[65%] rounded-md flex justify-center overflow-hidden hover:overflow-hidden">
                {" "}
                <img
                  className="object-cover w-[98%] bg-no-repeat  h-[100%] rounded-md hover:scale-105"
                  src={item.backdrop_path || item.poster_path || item.profile_path ? (`https://image.tmdb.org/t/p/w500/${
                    item.backdrop_path || item.poster_path || item.profile_path
                  }`):noimage}
                  // alt={'N/A'}
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
                      {item.vote_average}
                    </h1>
                  ) : (
                    "N/A"
                  )}
                </div>
                
                {/* <p className='text-gray-500'>{item.overview.slice(0, 100)}...</p> */}
              </div>
              <div className='absolute mt-1  bg-[#6556cd] mx-1 px-2 rounded-md'>
              <i className="ri-box-3-fill pr-1"></i>
                  {item.episode_count }
                </div>
            </Link>
          ))}
        </div>
      );
}

export default Recommendations
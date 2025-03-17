import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../../loader/NotFound'

const Trailer = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const category = pathname.includes('movie')?'movie':'tv';
    const ytvideos = useSelector((state)=>state[category].info.videos)
    console.log(ytvideos)
  return ytvideos ? (
    <div className='absolute top-0  z-[100]    items-center  h-full  w-full bg-[#1e1f24]/100'>
       <div className='relative h-full w-full pt-10 flex justify-top   flex-col items-center'>
       <Link className='w-[89%] flex fixed  justify-end pr-6'> 
            <i
              onClick={() => {
                navigate(-1);
              }}
              className="ri-close-line  text-2xl font-bold   hover:text-[#6556cd]"
            ></i>
            </Link>
        <div className='fixed pt-6 '>
        <ReactPlayer className='react-Player' height={600} width={1200} url={`https://www.youtube.com/watch?v=${ytvideos.key}`} />
        </div>
       </div>
    </div>
  ): <div className='absolute top-0 flex justify-top z-[100] flex-col   items-center   h-full  w-full bg-[#1e1f24]/90 '>
    <NotFound />       
    
  </div>
}

export default Trailer
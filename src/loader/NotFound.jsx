import React from 'react'
import loader from '/notfound.jpg'

const Loader = () => {
  return (
    <div className='w-full relative h-full flex items-top pt-10  justify-center bg-white'>
        <img className=' fixed h-[60vh] w-[60vh] object-cover ' src={loader} alt="" />
    </div>
  )
}

export default Loader;
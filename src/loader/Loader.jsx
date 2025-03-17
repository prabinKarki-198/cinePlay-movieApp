import React from 'react'
import loader from '/285.gif'

const Loader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#1f1e24]'>
        <img className=' h-[10vh] w-[10vh] object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loader;
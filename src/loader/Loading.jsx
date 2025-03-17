import React from 'react'
import loader from '/1LF7.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-black'>
        <img className=' h-[50vh] w-[50vh] object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading
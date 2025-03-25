import React from 'react'
import profile from '/profile.jpg'

const Profile = () => {
  return (
    <div className='w-full h-screen flex justify-center gap-4 pt-6 '>
        <div className='w-[20%] h-[45vh] overflow-clip hover:scale-102 grayscale-100 hover:grayscale-0   bg-zinc-400/10 rounded-lg'>
           <img className='object-cover ' src={profile} alt="" />
        </div>
        <div className='w-[55%] h-[80vh] bg-zinc-400/10 rounded-lg flex justify-center text-white'>
           Will be soon
        </div>
        <div className='w-[20%] h-[45vh] bg-zinc-400/10 rounded-lg flex justify-center text-white'>
            Will be soon
        </div>
    </div>
  )
}

export default Profile
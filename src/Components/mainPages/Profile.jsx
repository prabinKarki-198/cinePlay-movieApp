import React from 'react'
import profile from '/profile.jpg'

const Profile = () => {
  return (
    <div className='w-full min-h-screen bg-[#1f1e24] flex lg:flex-row md:flex-col sm:flex-col flex-col sm:items-center lg:items-start md:items-center items-center justify-center gap-4 py-6 '>
        <div className='lg:w-[20%] md:w-[60%] sm:w-[70%] w-[80%]  h-[50vh] overflow-clip hover:scale-102 grayscale-100 hover:grayscale-0   bg-zinc-400/10 rounded-lg'>
           <img className='object-cover w-[100%] h-[100%] ' src={profile} alt="" />
        </div>
        <div className='lg:w-[55%] w-[95%]  h-[80vh] bg-zinc-400/10 rounded-lg flex justify-center text-white'>
           Will be soon
        </div>
        <div className='lg:w-[20%] h-[45vh] w-[95%] bg-zinc-400/10 rounded-lg flex justify-center text-white'>
            Will be soon
        </div>
    </div>
  )
}

export default Profile
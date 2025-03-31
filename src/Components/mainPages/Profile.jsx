import React from 'react'
import profile from '/profile.jpg'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate =useNavigate();
  const arrayPhoto=[{image:'https://i.pinimg.com/736x/5a/10/71/5a1071cd925971fdbd17c6da87a1edd7.jpg'},{image:'https://i.pinimg.com/736x/75/be/fd/75befd8d2567c5ef7cb657d585bd1b1a.jpg'},{image:'https://i.pinimg.com/736x/4a/d9/05/4ad9058d5eac2c3cbba9745c0d85fb8a.jpg'},{image:'https://i.pinimg.com/736x/00/ce/95/00ce95f89c4f15811cac9b67bb6f5760.jpg'}]
  return (
    <div className='w-full min-h-screen bg-[#1f1e24] relative flex lg:flex-row md:flex-col sm:flex-col flex-col sm:items-center lg:items-start md:items-center items-center justify-center gap-4 py-10 '>
       <div className="w-[90%] absolute top-1 left-2  ">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full p-1 hover:text-[#6556cd]"
          ></i>
        </div>
        <div className='lg:w-[20%] md:w-[40%] sm:w-[50%] w-[60%]  h-[50vh] overflow-clip hover:scale-102 bg-zinc-400/10 rounded-lg'>
           <img className='object-cover w-[100%] h-[100%] ' src={profile} alt="" />
        </div>
        <div className='lg:w-[55%] w-[95%]  min-h-[80vh] bg-zinc-400/10 rounded-lg flex gap-4 justify-top p-4 text-white flex-col'>
           <div>
           <h1 className='md:text-4xl lg:text-4xl sm:text-3xl text-2xl font-bold '>Rorona Zoro <i class="text-green-400 ri-sword-fill"></i></h1>
           <h2 className='md:text-md lg:text-md sm:text-sm text-sm  font-semibold text-zinc-400'>Vice Captain of StrawHat Pirate</h2>
           </div>

           <div className='flex flex-col '>
            <h1 className='font-semibold lg:text-xl md:text-xl sm:text-lg text-lg  '>Bio</h1>
           <p className=' sm:text-sm md:text-[16px] text-xs '>Roronoa Zoro, the stoic and green-haired swordsman of the Straw Hat Pirates, is the first to join Monkey D. Luffy’s crew in Eiichiro Oda’s One Piece. Once a feared bounty hunter known as the 'Pirate Hunter,' Zoro now sails the Grand Line with an unwavering ambition: to surpass Dracule Mihawk and claim the title of the world’s greatest swordsman. Wielding his unique Santoryu (Three Sword Style)—with a blade in each hand and one gripped in his teeth—he’s a powerhouse in battle, blending raw strength with unshakable resolve. Marked by a scar across his chest from Mihawk and another over his left eye, Zoro’s rugged appearance mirrors his no-nonsense attitude. Despite his poor sense of direction, which often leads to comedic detours, his loyalty to his crew and captain is unbreakable. With a current bounty of 1,111,000,000 berries, Zoro stands as a testament to perseverance, discipline, and the pursuit of a dream forged in steel.</p>
           </div>
           <div className='h-[27vh] flex flex-col gap-2'>
            <h1 className='font-semibold text-xl'>Photos</h1>
           <div className='flex h-[90%] gap-4 overflow-hidden overflow-x-auto pb-3'>
           {arrayPhoto.map((image,index)=>{
              return <img key={index} className=' object-cover rounded-md w-30 ' src={image.image} alt="" />
            })}
           </div>
           </div>

        </div>
        <div className='lg:w-[20%] min-h-[45vh] w-[95%] bg-zinc-400/10 rounded-lg flex flex-col p-4 gap-2.5 text-white'>
            <h1 className='font-semibold flex'>
              Name: 
              <h2 className='font-normal pl-2'>Rorona Zoro</h2>
            </h1>
            <h1 className='font-semibold flex'>
            Alias: 
              <h2 className='font-normal pl-2'>Pirate Hunter Zoro</h2>
            </h1>
            <h1 className='font-semibold flex'>
            Affiliation:
              <h2 className='font-normal pl-2'>Straw Hat Pirates</h2>
            </h1>
            <h1 className='font-semibold flex'>
            Role:
              <h2 className='font-normal pl-2'>Swordsman / Combatant</h2>
            </h1>
            <h1 className='font-semibold flex'>
            Bounty:
              <h2 className='font-normal pl-2'>1,111,000,000 berries</h2>
            </h1>
            <h1 className='font-semibold flex'>
            Origin:
              <h2 className='font-normal pl-2'>East Blue, Shimotsuki Village</h2>
            </h1>
            <h1 className='font-semibold flex'>
            Dream:
              <h2 className='font-normal pl-2'>To become the world’s greatest swordsman by defeating Dracule Mihawk</h2>
            </h1>


        </div>
    </div>
  )
}

export default Profile
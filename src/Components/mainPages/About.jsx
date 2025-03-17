import React from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollUpButton from '../templates/ScrollUp';

const About = () => {
  const navigate = useNavigate();
  return (
    <div  className="min-h-screen relative bg-[#1f1e24] py-16 px-4 sm:px-6 lg:px-8">
      <div>
      <div className="w-[8%] absolute top-4 flex items-center justify-around">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line text-2xl font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full px-1 hover:text-[#6556cd]"
          ></i>
          <h1 className="text-2xl font-semibold text-zinc-400">About</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <i className="ri-movie-ai-fill text-5xl text-[#6556cd]"></i>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              About CinePlay
            </h1>
          </div>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Your premier streaming destination for movies and TV shows. Experience entertainment like never before with our cutting-edge platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          <div className="relative group">
            <div className="relative w-full h-96 bg-gradient-to-br from-[#6556cd]/10 to-purple-900/10 rounded-lg p-8 overflow-hidden">
            
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                
                <rect x="50" y="80" width="300" height="180" rx="8" fill="#1f1e24" className="transform transition-all duration-700 group-hover:scale-105"/>
                <rect x="60" y="90" width="280" height="160" rx="4" fill="#6556cd" fillOpacity="0.2"/>
                
           
                <path d="M200 40 L200 80" stroke="#6556cd" strokeWidth="2" strokeDasharray="4 4"/>
                <circle cx="200" cy="40" r="15" fill="#6556cd" className="animate-pulse"/>
                
           
                <circle cx="100" cy="300" r="8" fill="#6556cd" className="animate-bounce"/>
                <circle cx="300" cy="300" r="8" fill="#F0BB40" className="animate-bounce" style={{ animationDelay: '0.2s' }}/>
                <circle cx="200" cy="320" r="8" fill="#6556cd" className="animate-bounce" style={{ animationDelay: '0.4s' }}/>
                
              
                <circle cx="50" cy="350" r="20" stroke="#6556cd" strokeWidth="2" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '8s' }}/>
                <circle cx="350" cy="350" r="20" stroke="#F0BB40" strokeWidth="2" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '8s' }}/>
              </svg>
              
             
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6556cd]/20 to-[#F0BB40]/20 rounded-lg blur-xl group-hover:opacity-75 transition-opacity duration-500 -z-10"></div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1f1e24] p-6 rounded-lg backdrop-blur-sm border border-[#6556cd]/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#6556cd] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-zinc-400">Extensive library of movies and TV shows with regular updates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#6556cd] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-zinc-400">High-quality streaming with adaptive video quality</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#6556cd] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-zinc-400">AI-powered personalized recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-[#6556cd] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-zinc-400">Seamless multi-device streaming experience</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#6556cd]/10 to-[#F0BB40]/10 rounded-lg p-8 border border-[#6556cd]/20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Join Our Community</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1f1e24]/80 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 border border-[#6556cd]/20">
                <div className="text-[#6556cd] mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Discussion Forums</h4>
                <p className="text-zinc-400">Join our vibrant community to discuss your favorite shows, share theories, and discover new content recommendations.</p>
              </div>
              
              <div className="bg-[#1f1e24]/80 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 border border-[#6556cd]/20">
                <div className="text-[#F0BB40] mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Watch Parties</h4>
                <p className="text-zinc-400">Create or join virtual watch parties to enjoy movies and shows together with friends and family in real-time.</p>
              </div>
              
              <div className="bg-[#1f1e24]/80 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 border border-[#6556cd]/20">
                <div className="text-[#6556cd] mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Reviews & Ratings</h4>
                <p className="text-zinc-400">Rate content, write reviews, and help other users discover great entertainment through our community ratings system.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center bg-[#1f1e24] p-8 rounded-lg backdrop-blur-sm border border-[#6556cd]/40">
          <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            At CinePlay, we're revolutionizing the way you experience entertainment. Our platform combines cutting-edge technology with a passion for great content, creating a streaming service that puts you first. We're committed to providing a seamless, engaging, and personalized viewing experience that brings people together through the power of entertainment.
          </p>
          {/* <ScrollUpButton /> */}
        </div>
      </div>
      
    </div>
  )
}

export default About;
import React from 'react'
import profile from '/profile.jpg'
import noimage from '/noimage.webp'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Utils/AuthContext'
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut, openAuthModal, libraryItems, removeFromLibrary } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.info('Logged out successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Logout failed');
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Movie Enthusiast';

  return (
    <div className="w-full min-h-screen bg-[#1f1e24] relative flex flex-col items-center justify-start p-6 pt-16 text-white">
      {/* Back Arrow */}
      <div className="w-[95%] max-w-5xl flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-[#6556cd] hover:bg-zinc-800/50 px-3 py-1.5 rounded-full transition-all cursor-pointer"
        >
          <i className="ri-arrow-left-line text-xl"></i>
          <span className="text-sm font-semibold">Back</span>
        </button>

        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <i className="ri-logout-box-r-line"></i>
            <span>Log Out</span>
          </button>
        )}
      </div>

      {user ? (
        /* Authenticated User View */
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* Top Row: Avatar + Account Info */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar & Key Card */}
            <div className="md:w-1/3 bg-zinc-800/40 border border-zinc-700/40 rounded-2xl p-6 flex flex-col items-center text-center backdrop-blur-sm shadow-xl">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#6556cd]/50 shadow-lg mb-4 bg-zinc-700 flex items-center justify-center">
                <img
                  src={user?.user_metadata?.avatar_url || profile}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {displayName}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{user.email}</p>
              <span className="mt-3 px-3 py-1 bg-[#6556cd]/20 text-[#6556cd] border border-[#6556cd]/30 rounded-full text-xs font-semibold">
                Authenticated User
              </span>
            </div>

            {/* User Details */}
            <div className="md:w-2/3 bg-zinc-800/40 border border-zinc-700/40 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white border-b border-zinc-700/60 pb-3 mb-4 flex items-center gap-2">
                  <i className="ri-user-settings-line text-[#6556cd]"></i>
                  <span>Account Information</span>
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-medium">User ID</span>
                    <span className="font-mono text-zinc-300 text-xs sm:text-sm break-all">{user.id}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-medium">Email Address</span>
                    <span className="text-zinc-200 font-medium">{user.email}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-medium">Account Status</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <i className="ri-checkbox-circle-fill"></i> Verified / Active
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                    <span className="text-zinc-400 font-medium">Joined On</span>
                    <span className="text-zinc-300">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Library / Watchlist Section */}
          <div className="bg-zinc-800/40 border border-zinc-700/40 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-xl font-bold text-white border-b border-zinc-700/60 pb-3 mb-5 flex items-center gap-2">
              <i className="ri-bookmark-fill text-[#6556cd]"></i>
              <span>My Library</span>
              <span className="ml-auto text-sm font-normal text-zinc-400">
                {libraryItems.length} {libraryItems.length === 1 ? 'item' : 'items'}
              </span>
            </h3>

            {libraryItems.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {libraryItems.map((item) => (
                  <div key={item.id} className="relative group w-36 sm:w-40 flex flex-col gap-2">
                    <Link to={`/${item.media_type || 'movie'}/details/${item.id}`}>
                      <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden border border-zinc-700/40 shadow-md">
                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
                              : noimage
                          }
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromLibrary(item.id)}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
                      title="Remove from Library"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>

                    <div className="flex flex-col">
                      <Link
                        to={`/${item.media_type || 'movie'}/details/${item.id}`}
                        className="text-sm font-medium text-white hover:text-[#6556cd] truncate transition-colors"
                      >
                        {item.title}
                      </Link>
                      <span className="text-xs text-zinc-500 capitalize">{item.media_type || 'movie'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-zinc-700/40 border border-zinc-600/40 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-bookmark-line text-2xl text-zinc-500"></i>
                </div>
                <h4 className="text-lg font-semibold text-zinc-400">Your Library is Empty</h4>
                <p className="text-sm text-zinc-500 mt-1 max-w-xs">
                  Browse movies and TV shows, then click the bookmark icon to save them here.
                </p>
                <Link
                  to="/"
                  className="mt-4 px-5 py-2 bg-[#6556cd] hover:bg-[#5344be] text-white text-sm font-semibold rounded-xl transition-all"
                >
                  Browse Movies
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Guest View - Prompt to Log In */
        <div className="w-full max-w-xl bg-zinc-800/40 border border-zinc-700/40 rounded-2xl p-8 text-center backdrop-blur-sm shadow-xl flex flex-col items-center">
          <div className="w-20 h-20 bg-[#6556cd]/20 border border-[#6556cd]/40 rounded-full flex items-center justify-center text-[#6556cd] text-3xl mb-4">
            <i className="ri-user-received-2-line"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to CinePlay</h2>
          <p className="text-sm text-zinc-400 mb-6 max-w-md">
            Log in or create an account to save your favorite movies, build your library, and customize your personal profile.
          </p>

          <div className="flex gap-4 w-full sm:w-auto">
            <button
              onClick={() => openAuthModal('login')}
              className="flex-1 sm:flex-initial px-6 py-3 bg-[#6556cd] hover:bg-[#5344be] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-[#6556cd]/30 text-sm cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="flex-1 sm:flex-initial px-6 py-3 bg-zinc-700/60 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all border border-zinc-600/50 text-sm cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
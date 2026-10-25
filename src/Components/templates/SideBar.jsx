import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const SideBar = ({ func, onlyMobile = false }) => {
  const { user, openAuthModal } = useAuth();
  const [open, setopen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { to: "/", label: "Home", icon: "ri-home-4-fill" },
    { to: "/trending", label: "Trending", icon: "ri-fire-fill" },
    { to: "/popular", label: "Popular", icon: "ri-bard-fill" },
    { to: "/movie", label: "Movie", icon: "ri-movie-2-ai-fill" },
    { to: "/tv", label: "Tv Shows", icon: "ri-tv-2-fill" },
    { to: "/person", label: "People", icon: "ri-team-fill" },
  ];

  const infoItems = [
    { to: "/about", label: "About", icon: "ri-information-fill" },
    { to: "/contact", label: "Contact Us", icon: "ri-phone-fill" },
  ];

  return (
    <>
      {/* Mobile Topbar Navigation - visible only on mobile / tablet screens (<1024px) */}
      <header className="lg:hidden w-full bg-[#18171d]/95 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-40 shadow-lg shrink-0">
        {/* Brand & User Action Row */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6556cd] to-[#8070eb] flex items-center justify-center shadow-md shadow-[#6556cd]/25 group-hover:scale-105 transition-transform">
              <i className="ri-movie-ai-fill text-lg text-white"></i>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              CinePlay<span className="text-[#6556cd]">.</span>
            </span>
          </Link>

          {/* User Auth / Profile */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to="/profile"
                className={`flex items-center gap-2 py-1 px-2.5 rounded-full border transition-all ${
                  isActive("/profile")
                    ? "bg-[#6556cd] border-[#6556cd] text-white shadow-md shadow-[#6556cd]/20"
                    : "bg-zinc-800/80 border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <i className="ri-account-circle-fill text-lg text-[#6556cd]"></i>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-[#18171d]"></span>
                </div>
                <span className="text-xs font-semibold max-w-[90px] truncate text-white">
                  {user?.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="flex items-center gap-1.5 bg-[#6556cd] hover:bg-[#5344be] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md shadow-[#6556cd]/25 transition-all cursor-pointer"
              >
                <i className="ri-login-box-line"></i>
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Scrollable Navigation Pills */}
        <nav className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap border-t border-zinc-800/50">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                  active
                    ? "bg-[#6556cd] text-[#FFFDD0] font-semibold shadow-md shadow-[#6556cd]/30 scale-[1.02]"
                    : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700/30"
                }`}
              >
                <i
                  className={`${item.icon} text-xs ${
                    active ? "text-[#FFFDD0]" : "text-[#6556cd]"
                  }`}
                ></i>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="w-[1px] h-4 bg-zinc-700/50 mx-1 shrink-0" />

          {infoItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                  active
                    ? "bg-[#6556cd] text-[#FFFDD0] font-semibold shadow-md shadow-[#6556cd]/30 scale-[1.02]"
                    : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700/30"
                }`}
              >
                <i
                  className={`${item.icon} text-xs ${
                    active ? "text-[#FFFDD0]" : "text-[#6556cd]"
                  }`}
                ></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Desktop Sidebar - hidden on mobile, omitted if onlyMobile is true */}
      {!onlyMobile && (
        <aside
          className={`${
            open
              ? "lg:w-[20%] lg:relative absolute bg-[#1f1e24] z-100 p-3"
              : "lg:w-18 p-1"
          } hidden lg:flex flex-col items-center justify-between h-screen border-r-2 border-zinc-400/20 rounded pt-6 transition-all duration-300`}
        >
          <div className="w-full flex flex-col items-center">
            {/* Logo & Toggle */}
            <div
              className={`flex ${
                open ? "justify-between items-center px-2" : "justify-center"
              } w-full items-center mb-6`}
            >
              {open ? (
                <Link to="/" className="flex items-center gap-1.5 group">
                  <i className="text-[#6556cd] ri-movie-ai-fill text-2xl group-hover:scale-110 transition-transform"></i>
                  <span className="text-xl font-bold text-white tracking-tight">
                    CinePlay<span className="text-[#6556cd]">.</span>
                  </span>
                </Link>
              ) : null}
              <button
                onClick={() => {
                  setopen(!open);
                  func?.(!open);
                }}
                className="text-white hover:text-[#6556cd] text-2xl p-1 rounded-md transition-colors cursor-pointer"
                title={open ? "Collapse sidebar" : "Expand sidebar"}
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
              >
                <i className={open ? "ri-close-fill" : "ri-menu-line"}></i>
              </button>
            </div>

            {/* Section: Feeds */}
            <nav className="flex flex-col w-full text-zinc-400 gap-1.5">
              {open ? (
                <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-bold px-3 mb-1">
                  New Feeds
                </h2>
              ) : (
                <span className="text-[10px] uppercase font-bold text-zinc-400 text-center mb-1">
                  Feeds
                </span>
              )}

              {navItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    className={`group relative rounded-xl transition-all duration-200 flex items-center ${
                      open ? "p-3 gap-3" : "justify-center p-2.5"
                    } ${
                      active
                        ? "bg-[#6556cd] text-[#FFFDD0] shadow-md shadow-[#6556cd]/25 font-semibold"
                        : "hover:bg-[#6556cd]/20 hover:text-[#FFFDD0] text-zinc-400"
                    }`}
                  >
                    <i
                      className={`${item.icon} text-lg ${
                        active ? "text-[#FFFDD0]" : "group-hover:text-[#FFFDD0]"
                      }`}
                    ></i>

                    {open ? (
                      <span className="text-sm font-medium">{item.label}</span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity absolute left-[115%] z-50 bg-[#25242c] border border-zinc-700/60 text-white text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <hr className="w-[90%] border-zinc-400/20 my-4" />

            {/* Section: Website Info */}
            <nav className="flex flex-col w-full text-zinc-400 gap-1.5">
              {open ? (
                <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-bold px-3 mb-1">
                  Website Info
                </h2>
              ) : null}

              {infoItems.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    title={item.label}
                    className={`group relative rounded-xl transition-all duration-200 flex items-center ${
                      open ? "p-3 gap-3" : "justify-center p-2.5"
                    } ${
                      active
                        ? "bg-[#6556cd] text-[#FFFDD0] shadow-md shadow-[#6556cd]/25 font-semibold"
                        : "hover:bg-[#6556cd]/20 hover:text-[#FFFDD0] text-zinc-400"
                    }`}
                  >
                    <i
                      className={`${item.icon} text-lg ${
                        active ? "text-[#FFFDD0]" : "group-hover:text-[#FFFDD0]"
                      }`}
                    ></i>

                    {open ? (
                      <span className="text-sm font-medium">{item.label}</span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity absolute left-[115%] z-50 bg-[#25242c] border border-zinc-700/60 text-white text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Profile / Auth at bottom */}
          <div className="w-full flex justify-center pb-4">
            {user ? (
              <Link
                to="/profile"
                title="Profile"
                className={`relative text-2xl transition-transform hover:scale-110 ${
                  isActive("/profile") ? "text-[#6556cd]" : "text-zinc-400 hover:text-[#6556cd]"
                }`}
              >
                <i className="ri-account-circle-fill"></i>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1f1e24] rounded-full"></span>
              </Link>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                title="Log In / Sign Up"
                className="text-zinc-400 text-2xl hover:text-[#6556cd] hover:scale-110 transition-all cursor-pointer"
              >
                <i className="ri-account-circle-line"></i>
              </button>
            )}
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;

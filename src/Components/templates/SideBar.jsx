import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const SideBar = ({ func, mobileOpen, setMobileOpen, onlyMobile = false }) => {
  const { user, openAuthModal } = useAuth();
  const [open, setopen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileOpen && setMobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, setMobileOpen]);

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
      {/* Desktop Sidebar - hidden on mobile, omitted if onlyMobile is true */}
      {!onlyMobile && (
        <aside
          className={`${
            open
              ? "lg:w-[20%] md:w-[25%] lg:relative md:relative absolute bg-[#1f1e24] z-100 p-3"
              : "lg:w-18 md:w-18 sm:w-15 w-12 p-1"
          } max-[992px]:hidden min-[993px]:flex flex-col items-center justify-between h-screen border-r-2 border-zinc-400/20 rounded pt-6 transition-all duration-300`}
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

      {/* Mobile Overlay Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 min-[993px]:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileOpen?.(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed left-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-[#18171d] border-r border-zinc-800 p-5 flex flex-col justify-between overflow-y-auto animate-slide-in shadow-2xl">
            <div>
              {/* Header: Logo + Close */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <Link
                  to="/"
                  onClick={() => setMobileOpen?.(false)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6556cd] to-[#8070eb] flex items-center justify-center shadow-lg shadow-[#6556cd]/30">
                    <i className="ri-movie-ai-fill text-xl text-white"></i>
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight group-hover:text-[#6556cd] transition-colors">
                    CinePlay<span className="text-[#6556cd]">.</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen?.(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Navigation 1: Feeds */}
              <div className="mt-5">
                <p className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Feeds
                </p>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        onClick={() => setMobileOpen?.(false)}
                        to={item.to}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                          active
                            ? "bg-[#6556cd] text-[#FFFDD0] font-semibold shadow-md shadow-[#6556cd]/25"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                        }`}
                      >
                        <i className={`${item.icon} text-lg ${active ? "text-[#FFFDD0]" : "text-[#6556cd]"}`}></i>
                        <span className="text-sm font-medium">{item.label}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFFDD0]"></span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Navigation 2: Website Info */}
              <div className="mt-5 pt-4 border-t border-zinc-800">
                <p className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Website Info
                </p>
                <nav className="flex flex-col gap-1">
                  {infoItems.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        onClick={() => setMobileOpen?.(false)}
                        to={item.to}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                          active
                            ? "bg-[#6556cd] text-[#FFFDD0] font-semibold shadow-md shadow-[#6556cd]/25"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                        }`}
                      >
                        <i className={`${item.icon} text-lg ${active ? "text-[#FFFDD0]" : "text-[#6556cd]"}`}></i>
                        <span className="text-sm font-medium">{item.label}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFFDD0]"></span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom: Profile & Authentication */}
            <div className="mt-6 pt-4 border-t border-zinc-800">
              {user ? (
                <Link
                  onClick={() => setMobileOpen?.(false)}
                  to="/profile"
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isActive("/profile")
                      ? "bg-[#6556cd] text-[#FFFDD0]"
                      : "bg-zinc-800/40 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/40"
                  }`}
                >
                  <div className="relative">
                    <i className="ri-account-circle-fill text-2xl text-[#6556cd]"></i>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#18171d] rounded-full"></span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold truncate text-white">
                      {user?.user_metadata?.full_name || user.email?.split("@")[0]}
                    </span>
                    <span className="text-xs text-zinc-400 truncate">{user.email}</span>
                  </div>
                  <i className="ri-arrow-right-s-line ml-auto text-zinc-400 text-lg"></i>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal("login");
                    setMobileOpen?.(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#6556cd] hover:bg-[#5344be] text-white rounded-xl text-sm font-semibold shadow-lg shadow-[#6556cd]/25 transition-all cursor-pointer"
                >
                  <i className="ri-login-box-line text-lg"></i>
                  <span>Log In / Sign Up</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;

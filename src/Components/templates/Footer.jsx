import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-between gap-6 min-h-[22vh] h-auto p-4 sm:p-6 lg:p-8 mt-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link to="/" className="flex gap-2 text-2xl sm:text-3xl items-center text-white group">
            <i className="ri-movie-ai-fill text-[#6556cd] group-hover:scale-110 transition-transform"></i>
            <span className="font-bold tracking-tight">
              CinePlay<span className="text-[#6556cd]">.</span>
            </span>
          </Link>
          <div className="flex text-xs sm:text-sm text-zinc-400 mt-1">
            <span className="font-medium text-zinc-500 mr-1.5">Email:</span>
            <a
              href="mailto:cinePlay@movie.org"
              className="text-zinc-400 hover:text-[#6556cd] transition-colors"
            >
              cinePlay@movie.org
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3 text-2xl text-zinc-400">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com"
            className="hover:text-[#6556cd] transition-colors p-1"
            aria-label="Facebook"
          >
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com"
            className="hover:text-[#6556cd] transition-colors p-1"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-box-fill"></i>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.telegram.org"
            className="hover:text-[#6556cd] transition-colors p-1"
            aria-label="Telegram"
          >
            <i className="ri-telegram-fill"></i>
          </a>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3 border-t border-zinc-800/80 pt-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs sm:text-sm text-zinc-400">
          <span className="hover:text-white cursor-pointer transition-colors">
            Terms of Service
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Privacy Policy
          </span>
          <Link to="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="text-zinc-400 flex flex-col text-[11px] sm:text-xs justify-center items-center text-center gap-1">
          <p className="max-w-xl">
            CinePlay does not store any media files on its servers. All content is linked from 3rd party providers.
          </p>
          <p>© {new Date().getFullYear()} CinePlay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

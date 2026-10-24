import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import noimage from "/noimage.webp";
import HorizontalCards from "../templates/HorizontalCards";
import { asyncLoadTv, removetv } from "../Store/actions/tvActions";
import Recommendations from "../templates/Recommendations";
import { useAuth } from "../../Utils/AuthContext";

const TVDetail = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToLibrary, removeFromLibrary, isInLibrary } = useAuth();

  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  return info ? (
    <div
      style={
        info.details.backdrop_path ||
        info.details.poster_path ||
        info.details.profile_path
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/original/${
                info.details.backdrop_path ||
                info.details.poster_path ||
                info.details.profile_path
              })`,
            }
          : {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6), rgba(0, 0, 0, 0.8)),url(https://plus.unsplash.com/premium_photo-1709384735411-8a46e2410e54?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            }
      }
      className="w-full relative min-h-screen bg-[#1f1e24] flex flex-col pt-4 pb-12 gap-2 text-white bg-cover bg-center"
    >
      {/* Top Navbar */}
      <nav className="w-full h-[8vh] min-h-[50px] flex justify-start items-center px-4 sm:px-6">
        <div className="flex gap-3 px-3 py-1.5 items-center justify-center text-zinc-200 rounded-xl text-xl bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="text-zinc-300 hover:text-[#6556cd] transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Go back"
          >
            <i className="ri-arrow-left-line font-bold"></i>
          </button>
          {info.externalIds.wikidata_id && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
              title="Wikidata"
            >
              <i className="ri-earth-fill hover:text-[#6556cd] transition-colors"></i>
            </a>
          )}
          {info.details.homepage && (
            <a
              target="_blank"
              rel="noreferrer"
              href={info.details.homepage}
              title="Official Homepage"
            >
              <i className="ri-external-link-fill hover:text-[#6556cd] transition-colors"></i>
            </a>
          )}
          {info.externalIds.imdb_id && (
            <a
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase font-bold px-1.5 py-0.5 rounded bg-amber-400 text-black hover:bg-amber-300 transition-colors"
              href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`}
            >
              imdb
            </a>
          )}
        </div>
      </nav>

      {/* Main Details Section */}
      <div className="h-fit px-3 sm:px-6 py-2 flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-between">
        {/* Poster */}
        <div className="w-[60%] sm:w-[45%] md:w-[35%] lg:w-[20%] shrink-0">
          <img
            className="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl border border-zinc-700/40 hover:scale-102 transition-transform duration-300"
            src={
              info.details.poster_path ||
              info.details.backdrop_path ||
              info.details.profile_path
                ? `https://image.tmdb.org/t/p/w500/${
                    info.details.poster_path ||
                    info.details.backdrop_path ||
                    info.details.profile_path
                  }`
                : noimage
            }
            alt={info.details.title || info.details.name}
          />
        </div>

        {/* Center: Info + Cast + Actions */}
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 p-5 sm:p-6 w-full lg:w-[55%] rounded-2xl flex flex-col gap-4 shadow-xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-white lg:text-3xl md:text-2xl text-xl font-bold tracking-tight">
              {info.details.title ||
                info.details.name ||
                info.details.original_name ||
                info.details.original_title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-[#F0BB40] font-semibold flex items-center gap-1">
                <i className="ri-play-circle-fill"></i> TV SHOW
              </span>
              {info.details.first_air_date ? (
                <span className="text-zinc-300 flex items-center gap-1">
                  <i className="text-[#F0BB40] ri-calendar-fill"></i>
                  {info.details.first_air_date}
                </span>
              ) : null}
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-1">
              {info.details.overview}
            </p>
          </div>

          {/* Cast */}
          <div className="flex flex-col gap-2 mt-2">
            <h2 className="text-lg font-bold text-white">Lead Cast</h2>
            <div className="w-full flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {info.cast && info.cast.length > 0 ? (
                info.cast.slice(0, 6).map((item) => (
                  <Link
                    to={`/person/details/${item.id}`}
                    key={item.id}
                    className="flex flex-col items-center min-w-[90px] max-w-[90px] group shrink-0"
                  >
                    <img
                      className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700 group-hover:border-[#6556cd] transition-colors"
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w200/${item.profile_path}`
                          : noimage
                      }
                      alt={item.name}
                    />
                    <p className="text-xs text-zinc-300 text-center truncate w-full mt-1 group-hover:text-[#6556cd]">
                      {item.name}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-zinc-400">No cast info available</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3 flex-wrap">
            <Link
              to={`${pathname}/trailer`}
              className="bg-[#6556cd] hover:bg-[#5344be] text-sm sm:text-base px-4 py-2.5 rounded-xl text-white font-semibold shadow-lg shadow-[#6556cd]/25 transition-all flex items-center gap-2"
            >
              <i className="ri-play-circle-fill text-lg"></i> Watch Trailer
            </Link>

            {isInLibrary(info.details.id) ? (
              <button
                onClick={() => removeFromLibrary(info.details.id)}
                className="bg-emerald-600/30 border border-emerald-500/50 hover:bg-red-500/30 hover:border-red-500/50 text-emerald-300 hover:text-red-400 text-sm sm:text-base px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-checkbox-circle-fill text-emerald-400"></i> Saved in Library
              </button>
            ) : (
              <button
                onClick={() => addToLibrary(info.details, "tv")}
                className="bg-zinc-800 border border-zinc-600/50 hover:bg-[#6556cd] hover:border-[#6556cd] text-white text-sm sm:text-base px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-bookmark-line text-[#6556cd] group-hover:text-white"></i> Add to Library
              </button>
            )}
          </div>
        </div>

        {/* Right: Metadata Card */}
        <div className="w-full lg:w-[22%] bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 p-5 rounded-2xl flex flex-col gap-2.5 text-sm shadow-xl">
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">Title:</span>
            <span className="text-zinc-200 text-right truncate max-w-[140px]">
              {info.details.name || info.details.original_name}
            </span>
          </div>
          {info.details.type ? (
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-400">Type:</span>
              <span className="text-zinc-200">{info.details.type}</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">Status:</span>
            <span className="text-zinc-200">{info.details.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">First Aired:</span>
            <span className="text-zinc-200">{info.details.first_air_date}</span>
          </div>
          {info.details.episode_run_time && info.details.episode_run_time.length > 0 ? (
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-400">Episode:</span>
              <span className="text-zinc-200">{info.details.episode_run_time[0]} min</span>
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-400">Score:</span>
            <span className="text-amber-400 font-bold">
              ★ {info.details.vote_average ? (info.details.vote_average * 10).toFixed() + "%" : "N/A"}
            </span>
          </div>

          <hr className="border-zinc-700/50 my-1" />

          {info.details.genres && info.details.genres.length > 0 && (
            <div>
              <span className="font-semibold text-zinc-400 block mb-1.5">Genres:</span>
              <div className="flex flex-wrap gap-1.5">
                {info.details.genres.map((g, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/40"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {info.details.production_companies && info.details.production_companies.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold text-zinc-400 block mb-1.5">Production:</span>
              <div className="flex flex-wrap gap-2">
                {info.details.production_companies.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className="h-8 px-2 bg-white rounded-lg flex items-center justify-center p-1"
                  >
                    {item.logo_path ? (
                      <img
                        className="h-full object-contain"
                        src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`}
                        alt={item.name}
                      />
                    ) : (
                      <span className="text-zinc-800 text-xs font-semibold">
                        {item.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {(info.recommendations?.length > 0 || info.similar?.length > 0) && (
        <div className="bg-[#1f1e24]/70 my-5 rounded-2xl mx-3 sm:mx-6 p-4 border border-zinc-700/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-2">
            Recommendations
          </h2>
          <HorizontalCards
            data={
              info.recommendations?.length > 0
                ? info.recommendations
                : info.similar
            }
          />
        </div>
      )}

      {/* Seasons */}
      {info.details.seasons && info.details.seasons.length > 0 && (
        <div className="bg-[#1f1e24]/70 my-5 rounded-2xl mx-3 sm:mx-6 p-4 border border-zinc-700/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-2">
            Seasons
          </h2>
          <Recommendations data={info.details.seasons} />
        </div>
      )}

      <Outlet />
    </div>
  ) : (
    <div className="min-h-screen bg-[#1f1e24] flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default TVDetail;

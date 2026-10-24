import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import noimage from "/noimage.webp";
import HorizontalCards from "../templates/HorizontalCards";
import { removeperson } from "../Store/reducers/personSlice";
import { asyncLoadperson } from "../Store/actions/personActions";
import DropDowns from "../templates/DropDowns";

const PersonDetail = () => {
  const [category, setCategory] = useState("tv");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => {
      dispatch(removeperson());
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
              href={`https://www.imdb.com/name/${info.externalIds.imdb_id}`}
            >
              imdb
            </a>
          )}
        </div>
      </nav>

      {/* Main Details Section */}
      <div className="h-fit px-3 sm:px-6 py-2 flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-between">
        {/* Poster / Avatar */}
        <div className="w-[60%] sm:w-[45%] md:w-[35%] lg:w-[20%] shrink-0">
          <img
            className="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl border border-zinc-700/40 hover:scale-102 transition-transform duration-300"
            src={
              info.details.profile_path
                ? `https://image.tmdb.org/t/p/w500/${info.details.profile_path}`
                : noimage
            }
            alt={info.details.name}
          />
        </div>

        {/* Center: Info + Photos */}
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 p-5 sm:p-6 w-full lg:w-[55%] rounded-2xl flex flex-col gap-4 shadow-xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-white lg:text-3xl md:text-2xl text-xl font-bold tracking-tight">
              {info.details.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-[#F0BB40] font-semibold flex items-center gap-1">
                <i className="ri-star-s-fill"></i>{" "}
                {info.details.gender === 1 ? "Actress" : "Actor"}
              </span>
              {info.details.birthday ? (
                <span className="text-zinc-300 flex items-center gap-1">
                  <i className="text-[#F0BB40] ri-calendar-fill"></i>
                  Born: {info.details.birthday}
                </span>
              ) : null}
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-1">
              {info.details.biography || "No biography available."}
            </p>
          </div>

          {/* Photos */}
          {info.images && info.images.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="text-lg font-bold text-white">Photos</h2>
              <div className="w-full flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {info.images.slice(0, 10).map((item, index) => (
                  <div
                    key={index}
                    className="w-24 h-32 rounded-xl overflow-hidden shrink-0 bg-zinc-800 border border-zinc-700/40"
                  >
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      src={`https://image.tmdb.org/t/p/w200/${item.file_path}`}
                      alt="Gallery"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Personal Info Card */}
        <div className="w-full lg:w-[22%] bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 p-5 rounded-2xl flex flex-col gap-2.5 text-sm shadow-xl">
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">Name:</span>
            <span className="text-zinc-200 text-right truncate max-w-[140px]">
              {info.details.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">Known For:</span>
            <span className="text-zinc-200">{info.details.known_for_department}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">Gender:</span>
            <span className="text-zinc-200">
              {info.details.gender === 1 ? "Female" : "Male"}
            </span>
          </div>
          {info.details.birthday && (
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-400">Birthday:</span>
              <span className="text-zinc-200">{info.details.birthday}</span>
            </div>
          )}
          {info.details.place_of_birth && (
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-400">Place of Birth:</span>
              <span className="text-zinc-200 text-right truncate max-w-[140px]">
                {info.details.place_of_birth}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Movie Credits */}
      {info.movieCredits && info.movieCredits.length > 0 && (
        <div className="bg-[#1f1e24]/70 my-5 rounded-2xl mx-3 sm:mx-6 p-4 border border-zinc-700/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-2">
            Movie Credits
          </h2>
          <HorizontalCards data={info.movieCredits} />
        </div>
      )}

      {/* TV Credits */}
      {info.tvCredits && info.tvCredits.length > 0 && (
        <div className="bg-[#1f1e24]/70 my-5 rounded-2xl mx-3 sm:mx-6 p-4 border border-zinc-700/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-2">
            TV Credits
          </h2>
          <HorizontalCards data={info.tvCredits} />
        </div>
      )}

      {/* Acting History */}
      {(info.tvCredits || info.movieCredits) && (
        <div className="bg-[#1f1e24]/70 my-5 rounded-2xl mx-3 sm:mx-6 p-4 sm:p-5 border border-zinc-700/30">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300">
              Acting
            </h2>
            <div className="w-36">
              <DropDowns
                title="category"
                options={["tv", "movie"]}
                category={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="text-zinc-400 max-h-[50vh] overflow-y-auto divide-y divide-zinc-800 rounded-xl border border-zinc-800 p-2 sm:p-3 bg-zinc-900/50">
            {info[category + "Credits"] &&
              info[category + "Credits"].slice(0, 15).map((item) => (
                <div
                  key={item.id}
                  className="hover:text-white p-3 rounded-lg hover:bg-zinc-800/60 duration-200 transition-colors"
                >
                  <Link
                    to={`/${category}/details/${item.id}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <span className="font-semibold text-zinc-200 text-sm sm:text-base">
                      {item.name || item.original_name || item.original_title}
                    </span>
                    {item.character && (
                      <span className="text-xs sm:text-sm text-zinc-400">
                        as {item.character}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
          </div>
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

export default PersonDetail;

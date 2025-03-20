import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/mainPages/Home";
import Trending from "../Components/mainPages/Trending";
import Popular from "../Components/mainPages/Popular";
import Movie from "../Components/mainPages/Movie";
import TV from "../Components/mainPages/Tv";
import People from "../Components/mainPages/People";
import About from "../Components/mainPages/About";
import { Contact } from "../Components/mainPages/Contact";
import MovieDetail from '../Components/Details/MovieDetail';
import PersonDetail from '../Components/Details/PersonDetail';
import TVDetail from '../Components/Details/TvDetail';
import Trailer from "../Components/templates/Trailer";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        {/* <Route path='/i' element={<Loader />} /> */}
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/movie/details/:id" element={<MovieDetail />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<TV />}></Route>
        <Route path="/tv/details/:id" element={<TVDetail />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer />} /></Route>
        <Route path="/person" element={<People />}></Route>
        <Route path="/person/details/:id" element={<PersonDetail />} />
        {/* <Route path='/sidebar' element={<SideBarMobile />} /> */}
      </Routes>
    </div>
  );
};

export default Routing;

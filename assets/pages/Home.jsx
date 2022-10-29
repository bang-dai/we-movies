import React from "react";
import GenresMovies from "../components/GenresMovies";
import Header from "../components/Header";
import PopularMovie from "../components/PopularMovie";

const Home = () => {
    return (
        <div className="container">
            <Header />
            <PopularMovie />
            <GenresMovies />
        </div>
    )
}

export default Home
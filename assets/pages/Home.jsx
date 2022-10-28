import React from "react";
import Header from "../components/Header";
import PopularMovie from "../components/PopularMovie";

const Home = () => {
    return (
        <div className="container">
            <Header />
            <PopularMovie />
        </div>
    )
}

export default Home
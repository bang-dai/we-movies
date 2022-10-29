import React, { useEffect, useState } from "react";
import axios from "axios";
import GenresMovies from "../components/GenresMovies";
import Header from "../components/Header";
import PopularMovie from "../components/PopularMovie";
import Modal from "../components/Modal";

const Home = () => {
    const [movie, setMovie] = useState({})
    const [trailer, setTrailer] = useState({})

    const showMovie = (id) => {
        axios.get('/api/info/' + id).then(res => {
            setTrailer({})
            let newMovie = { ...res.data }
            setMovie(newMovie)

            if (newMovie.videos.results.length > 0) {
                newMovie.videos.results.some(element => {
                    if (element.site.toLowerCase() == 'youtube' && element.type.toLowerCase() == 'trailer') {
                        setTrailer({ title: element.name, id: element.key })
                        const modalMovie = document.getElementById('modalMovie')
                        modalMovie.addEventListener('hidden.bs.modal', event => {
                            setTrailer({})
                        })
                        return true
                    }
                });
            }

            const modal = new bootstrap.Modal('#modalMovie')
            modal.show()
        })
    }

    return (
        <div className="container">
            <Header />
            <PopularMovie showMovie={showMovie} />
            <GenresMovies showMovie={showMovie} />
            <Modal movie={movie} trailer={trailer} />
        </div>
    )
}

export default Home
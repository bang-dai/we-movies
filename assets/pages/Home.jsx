import React, { useEffect, useState } from "react";
import axios from "axios";
import GenresMovies from "../components/GenresMovies";
import Header from "../components/Header";
import PopularMovie from "../components/PopularMovie";
import YouTube from 'react-youtube';

const Home = () => {
    const [movie, setMovie] = useState({})
    const [trailer, setTrailer] = useState({})


    const showMovie = (id) => {
        axios.get('/api/info/' + id).then(res => {
            setTrailer({})
            let current = { ...res.data }
            if (current.videos.results.length > 0) {
                current.videos.results.some(element => {
                    if (element.site.toLowerCase() == 'youtube' && element.type.toLowerCase() == 'trailer') {
                        setTrailer({ title: element.name, id: element.key })
                        const modal = new bootstrap.Modal('#modalMovie')
                        modal.show()
                        return true
                    }
                });
            }
            setMovie(current)
        })
    }

    return (
        <div className="container">
            <Header />
            <PopularMovie showMovie={showMovie} />
            <GenresMovies showMovie={showMovie} />

            <div className="modal fade" id="modalMovie" tabIndex="-1" aria-labelledby="modalMovieLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {trailer.id && trailer.title &&
                                <div>
                                    <YouTube videoId={trailer.id} />
                                    <h3>{trailer.title}</h3>
                                </div>
                            }

                            Film: {movie.title} (Score: {movie.vote_average}/10 pour {movie.vote_count} utilisateurs)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
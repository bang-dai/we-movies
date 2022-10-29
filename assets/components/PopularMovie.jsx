import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularMovie = (props) => {
    const { showMovie } = props
    const [movie, setMovie] = useState({})

    useEffect(() => {
        axios.get('/api/popular').then(res => {
            setMovie(res.data)
        })
    }, [])

    return (
        <div className="position-relative">
            <div className="row backdrop overflow-hidden">
                <div className="col-12"><img src={movie.backdrop_path}></img></div>
            </div>
            <div className="position-absolute top-50 start-50">
                <i className="bi bi-play-circle" onClick={() => showMovie(movie.id)}></i>
            </div>

            <div className="position-absolute bottom-0 start-0 col-12">
                <div className="row">
                    <div className="col-1"><img src={movie.poster_path} className="poster"></img></div>
                    <div className="col-11 text-light">
                        <p className="fs-1">{movie.title}</p>
                        {movie.videos?.results[0] &&
                            <p className="fs-5">{movie.videos.results[0].name}</p>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PopularMovie
import React, { useEffect, useState } from "react";
import axios from "axios";

const GenresMovies = (props) => {
    const { showMovie } = props
    const [genres, setGenres] = useState([])
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get('/api/genres').then(res => {
            const newGenres = [...res.data]
            newGenres.map(genre => {
                genre.checked = false
                return genre
            })
            setGenres(newGenres)
        })

        axios.get('/api/by-genres').then(res => {
            setMovies(res.data)
        })
    }, [])


    const handleChange = (id) => {
        const newGenres = [...genres]
        const index = newGenres.findIndex(genre => genre.id == id)
        newGenres[index].checked = !newGenres[index].checked
        setGenres(newGenres)
        updateMovies();
    }

    const updateMovies = () => {
        const newGenres = [...genres]
        let genreIds = ''
        newGenres.forEach(genre => {
            if (genre.checked) {
                genreIds += genre.id + ','
            }
        })
        if (genreIds != '') {
            genreIds = genreIds.slice(0, -1)
        }

        axios.get('/api/by-genres/' + genreIds).then(res => {
            setMovies(res.data)
        })
    }

    return (
        <div className='row'>
            <div className='col-md-2 col-sm-12'>
                <div className="card">
                    <div className="card-body text-bg-light">
                        {genres.map((genre) => (
                            <div className="form-check" key={genre.id}>
                                <input className="form-check-input" type="checkbox" value={genre.name} id={genre.id} onChange={() => handleChange(genre.id)} />
                                <label className="form-check-label" htmlFor={genre.id}>
                                    {genre.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='col-md-10 col-sm-12'>
                <div className="card">
                    <div className="card-body">
                        {movies.map((movie) => (
                            <div className="card mb-3 text-bg-light" key={movie.id}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={movie.poster_path} className="img-fluid rounded-start" alt={movie.title} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.title}</h5>
                                            <p className="card-text">{movie.release_date.substring(0, 4)} - (Score: {movie.vote_average}/10 avec {movie.vote_count} votes)</p>
                                            <p className="card-text"><small className="text-muted">{movie.overview}</small></p>
                                            <button type="button" className="btn btn-primary" onClick={() => showMovie(movie.id)}>Lire les détails</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenresMovies;

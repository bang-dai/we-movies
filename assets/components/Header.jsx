import React, { useState } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const Header = (props) => {
    const { showMovie } = props
    const [movies, setMovies] = useState([])

    const handleOnSearch = (search, results) => {
        if (search != '') {
            axios.get('/api/search/' + search).then(res => {
                setMovies(res.data)
            })
        }
    }

    const handleOnSelect = (item) => {
        if (item.id) {
            showMovie(item.id)
        }
    }

    const formatResult = (item) => {
        return (
            <span style={{ display: 'block', textAlign: 'left' }}>{item.title}</span>
        )
    }

    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href='#' data-bs-toggle="modal" data-bs-target="#aboutModal">A propos de We Movies</a>

                <form className="d-flex" role="search">
                    <div className='autocomplete'>
                        <ReactSearchAutocomplete
                            className="form-control me-2"
                            items={movies}
                            fuseOptions={{ keys: ["title"], minMatchCharLength: 2 }}
                            resultStringKeyName="title"
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div>
                </form>

                <div className="modal fade" id="aboutModal" tabIndex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="aboutModalLabel">A propos</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Ce site demo a été realisé avec les stack suivantes:
                                <ul>
                                    <li>PHP 7.4</li>
                                    <li>Symfony 5.4</li>
                                    <li>React 18</li>
                                    <li>Bootstrap 5.2</li>
                                    <li>API TMDB</li>
                                    <li>Date réalisation: 10/2022</li>
                                    <li>Par: Bang DAI</li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
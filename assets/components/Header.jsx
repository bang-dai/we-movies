import React from 'react';

const Header = () => {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href='#' data-bs-toggle="modal" data-bs-target="#aboutModal">A propos de We Movies</a>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Recherche de film" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
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
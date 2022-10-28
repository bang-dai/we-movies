import React from 'react';

const Header = () => {
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href='#'>A propos de We Movies</a>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Recherche de film" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
                </form>
            </div>
        </nav>
    );
};

export default Header;
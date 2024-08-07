import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';
import LogoHome from "../../img/Logo4.png";
import "../../styles/index.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-black mb-3">
            <Link className="navbar-brand mb-0 h1 logo-container" to="/">
                <img src={LogoHome} className="img-top logo-left" alt="Logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div className="dropdown">
                    <button className="btn btn-warning dropdown-toggle navbar-brand mb-0 h1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites <span className="badge bg-black">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item">No favorites added</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                fav && fav.type && fav.uid && fav.name ? (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        <Link to={`/details/${fav.type}/${fav.uid}`} className="text-decoration-none">{fav.name}</Link>
                                        <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => actions.removeFavorite(fav.uid)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </li>
                                ) : null
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../hook/useUser";

export const Header = () => {
  // --------------------------------------------------------------------------------
  const { cerrarSesion } = useUser();

  // --------------------------------------------------------------------------------
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid container">
        <NavLink className="navbar-brand" to="/home">
          FakeFacebook
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="publicaciones/1">
                Publicaciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="crear-publicacion">
                Crear Publicación
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => cerrarSesion()}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

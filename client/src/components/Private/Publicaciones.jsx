import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { usePublication } from "../../hook/usePublication";

export const Publicaciones = () => {
  // --------------------------------------------------------------------------------
  let { page } = useParams();
  page = parseInt(page);

  // --------------------------------------------------------------------------------
  const { publicaciones, getPublication } = usePublication();

  // --------------------------------------------------------------------------------
  useEffect(() => {
    getPublication(page);
  }, []);

  // --------------------------------------------------------------------------------
  return (
    <div className="pt-5">
      {/* PUBLICACIONES */}
      {publicaciones === null && <h1>Cargando...</h1>}

      {publicaciones !== null && publicaciones.length > 0 && (
        <div>
          {publicaciones.map((publicacion) => {
            return (
              <div className="card" key={publicacion._id}>
                <div className="card-body">
                  <h5 className="card-title">{publicacion.username}</h5>
                  <p className="card-text">{publicacion.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {publicaciones !== null && publicaciones.length === 0 && (
        <Navigate to="/home" />
      )}
      {/* PUBLICACIONES */}

      {/* PAGINATION */}
      <div className="mt-5 text-center">
        <ul className="pagination">
          {page - 1 > 0 && (
            <>
              <li className="page-item">
                <a
                  className="page-link"
                  href={`/home/publicaciones/${page - 1}`}
                >
                  Anterior
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href={`/home/publicaciones/${page - 1}`}
                >
                  {page - 1}
                </a>
              </li>
            </>
          )}
          <li className="page-item">
            <a className="page-link" href={`/home/publicaciones/${page}`}>
              {page}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href={`/home/publicaciones/${page + 1}`}>
              {page + 1}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href={`/home/publicaciones/${page + 1}`}>
              Siguiente
            </a>
          </li>
        </ul>
      </div>
      {/* PAGINATION */}
    </div>
  );
};

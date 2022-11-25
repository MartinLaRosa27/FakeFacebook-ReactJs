import React, { createContext, useState } from "react";
import axios from "axios";
const publicationContext = createContext();

export const PublicationProvider = (props) => {
  // --------------------------------------------------------------------------------
  const [publicaciones, setPublicaciones] = useState(null);

  // --------------------------------------------------------------------------------
  const postPublication = async (publicationForm, userId) => {
    let publicacionCreadaConfirmacion = false;
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/post-publication`, {
        text: publicationForm.text,
        userId,
      })
      .then(async (res) => {
        alert(res.data.mensaje);
        publicacionCreadaConfirmacion = true;
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
    return publicacionCreadaConfirmacion;
  };

  // --------------------------------------------------------------------------------
  const getPublication = async (page) => {
    await axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_URL}/get-publication/${page}`
      )
      .then((res) => {
        setPublicaciones(res.data.publicaciones);
      })
      .catch((e) => {
        setPublicaciones([]);
      });
  };

  // --------------------------------------------------------------------------------
  return (
    <publicationContext.Provider
      value={{
        postPublication,
        getPublication,
        publicaciones,
      }}
    >
      {props.children}
    </publicationContext.Provider>
  );
};

export default publicationContext;

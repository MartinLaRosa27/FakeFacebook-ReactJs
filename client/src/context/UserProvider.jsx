import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
const moment = require("moment");
const userContext = createContext();

export const UserProvider = (props) => {
  // --------------------------------------------------------------------------------
  const [user, setUser] = useState({});

  // --------------------------------------------------------------------------------
  const postUser = async (userForm) => {
    let usuarioCreadoConfirmacion = false;
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/post-user`, userForm)
      .then(async (res) => {
        alert(res.data.mensaje);
        usuarioCreadoConfirmacion = true;
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
    return usuarioCreadoConfirmacion;
  };

  // --------------------------------------------------------------------------------
  const loginUser = async (userForm) => {
    let loginConfirmacion = false;
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/login-user`, userForm)
      .then((res) => {
        alert("Login correcto");
        const { token } = res.data;
        localStorage.setItem("token", token);
        loginConfirmacion = true;
      })
      .catch((e) => {
        alert(e.response.data.mensaje);
      });
    return loginConfirmacion;
  };

  // --------------------------------------------------------------------------------
  const getUserConParametros = async () => {
    let auth,
      id,
      email,
      exp,
      iat,
      act = moment().unix();
    // Se verifica que exista el token en el LS:
    if (localStorage.getItem("token")) {
      try {
        // Se obtienen valores del Token:
        auth = jwt_decode(localStorage.getItem("token"));
        email = auth.email;
        id = auth.id;
        exp = auth.exp;
        iat = auth.iat;
      } catch (e) {
        auth = null;
        setUser(null);
      }
    } else {
      auth = null;
      setUser(null);
    }
    // Comprueba que el usuario exista en la BD:
    if (auth != null) {
      await axios
        .get(
          `http://${process.env.REACT_APP_BACKEND_URL}/get-user/${id}/${email}`
        )
        .then((res) => {
          setUser(auth);
        })
        .catch((e) => {
          setUser(null);
        });
    }
    // Comprueba que el usuario no haya expirado:
    if (act - iat > exp) {
      alert("Sesión Expirada");
      cerrarSesion();
    }
  };

  // --------------------------------------------------------------------------------
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // --------------------------------------------------------------------------------
  useEffect(() => {
    getUserConParametros();
  }, []);

  // --------------------------------------------------------------------------------
  return (
    <userContext.Provider
      value={{
        user,
        loginUser,
        postUser,
        cerrarSesion,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;

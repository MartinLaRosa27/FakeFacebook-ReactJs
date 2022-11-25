import React from "react";
import logo from "../../assets/logo.png";
import { FormLogin } from "./FormLogin";
import { FormSignIn } from "./FormSignIn";

export const Index = () => {
  return (
    <div id="public" className="container">
      {/* LOGO */}
      <div className="text-center pt-5">
        <img src={logo} alt="logo"></img>
      </div>
      {/* LOGO */}

      {/* SIGN IN */}
      <div className="mt-5">
        <h3 className="text-center">Registrarse</h3>
        <FormSignIn />
      </div>
      {/* SIGN IN */}

      <hr />

      {/* LOGIN */}
      <div className="mt-5">
        <h3 className="text-center">Iniciar Sesión</h3>
        <FormLogin />
      </div>
      {/* LOGIN */}
    </div>
  );
};

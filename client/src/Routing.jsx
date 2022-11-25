import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CrearPublicacion } from "./components/Private/CrearPublicacion";
import { Home } from "./components/Private/Home";
import { Private } from "./components/Private/Private";
import { Publicaciones } from "./components/Private/Publicaciones";
import { Public } from "./components/Public/Public";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public />}></Route>
        <Route path="/home" element={<Private />}>
          <Route index element={<Home />}></Route>
          <Route path="publicaciones/:page" element={<Publicaciones />}></Route>
          <Route
            path="crear-publicacion"
            element={<CrearPublicacion />}
          ></Route>
        </Route>
        <Route path="*" element={<h1>Error</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

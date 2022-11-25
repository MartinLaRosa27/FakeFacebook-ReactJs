import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hook/useUser";
import { Header } from "./Header";

export const Private = () => {
  // --------------------------------------------------------------------------------
  const { user } = useUser();

  // --------------------------------------------------------------------------------
  return (
    <>
      <Header />
      <div className="container">
        {user ? <Outlet context={[user]} /> : <Navigate to="/" />}
      </div>
    </>
  );
};

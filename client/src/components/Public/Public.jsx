import React from "react";
import { useUser } from "../../hook/useUser";
import { Index } from "./Index";
import { Navigate } from "react-router-dom";

export const Public = () => {
  // --------------------------------------------------------------------------------
  const { user } = useUser();

  // --------------------------------------------------------------------------------
  return <>{!user ? <Index /> : <Navigate to="/home" />}</>;
};

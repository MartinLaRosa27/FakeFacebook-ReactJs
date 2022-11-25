import { useContext } from "react";
import publicationContext from "../context/PublicationProvider";

export const usePublication = () => {
  return useContext(publicationContext);
};

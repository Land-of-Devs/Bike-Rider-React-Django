import { useContext } from "react";
import LegalContext from "../context/legal";

export const useLegal = () => {
  const { cookiesAccepted } = useContext(LegalContext);

  return {
    cookiesAccepted
  };
};

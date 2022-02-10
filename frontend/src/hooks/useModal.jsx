import { useContext } from "react";
import ModalContext from "../context/modal";

export default function useModal() {
  return useContext(ModalContext);
}
import { useContext } from "react";
import ToastContext from "../context/toast";

export default function useToast() {
  return useContext(ToastContext);
}
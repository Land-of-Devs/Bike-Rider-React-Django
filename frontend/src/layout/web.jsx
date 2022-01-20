import { Outlet } from "react-router-dom";
import WebHeader from "../components/web/header";

const WebLayout = () => {
  return (
    <>
      <WebHeader />
      <Outlet />
    </>
  )
}

export default WebLayout;
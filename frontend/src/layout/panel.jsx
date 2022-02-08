import { Outlet } from "react-router-dom";
import PanelHeader from "../components/panel/header";

const PanelLayout = () => {
  return (
    <>
      <PanelHeader />
      <Outlet />
    </>
  )
}

export default PanelLayout
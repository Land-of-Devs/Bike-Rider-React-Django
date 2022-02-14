import './panel.scss'
import { Outlet } from "react-router-dom";
import PanelHeader from "../components/panel/header";

const PanelLayout = () => {
  return (
    <>
      <PanelHeader />
      <div className="main-view">
        <Outlet />
      </div>
    </>
  )
}

export default PanelLayout

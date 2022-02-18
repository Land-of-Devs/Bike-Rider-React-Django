import './panel.scss'
import { Outlet } from "react-router-dom";
import PanelHeader from "../components/panel/header";

const PanelLayout = () => {
  return (
    <>
      <PanelHeader />
      <main className="main-view">
        <Outlet />
      </main>
    </>
  )
}

export default PanelLayout

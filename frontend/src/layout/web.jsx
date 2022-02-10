import './web.scss'
import { Outlet } from "react-router-dom";
import WebHeader from "../components/web/header";
import WebFooter from "../components/web/footer";

const WebLayout = () => {
  return (
    <>
      <WebHeader />
      <div className="main-view">
        <Outlet />
      </div>
      <WebFooter />
    </>
  )
}

export default WebLayout;

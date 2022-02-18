import './web.scss'
import { Outlet } from "react-router-dom";
import WebHeader from "../components/web/header";
import WebFooter from "../components/web/footer";

const WebLayout = () => {
  return (
    <>
      <WebHeader />
      <main className="main-view">
        <Outlet />
      </main>
      <WebFooter />
    </>
  )
}

export default WebLayout;

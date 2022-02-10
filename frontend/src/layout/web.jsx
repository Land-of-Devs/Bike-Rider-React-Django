import { Outlet } from "react-router-dom";
import WebHeader from "../components/web/header";
import { CustomModal } from "../components/global/modal";
import WebFooter from "../components/web/footer";

const WebLayout = () => {
  return (
    <>
      <CustomModal />
      <WebHeader />
      <Outlet />
      <WebFooter />
    </>
  )
}

export default WebLayout;
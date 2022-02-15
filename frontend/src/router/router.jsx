import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { AppRouter, Restrict } from "../utils/router";
import { UserContextProvider } from "../context/user";
import { StationContextProvider } from "../context/station";
import { StationListContextProvider } from "../context/stationList";
import { ToastContextProvider } from "../context/toast";
import { isStaff } from "../guards/access";
import { isStation } from "../guards/station";
import { ModalContextProvider } from "../context/modal";
import { CircularProgress } from "@mui/material";

const WebLayout = React.lazy(() => import("../layout/web"));
const WebPage = React.lazy(() => import("../pages/web"));
const PanelLayout = React.lazy(() => import("../layout/panel"));
const PanelPage = React.lazy(() => import("../pages/panel"));
const StationConfigPage = React.lazy(() => import("../pages/stationconfig"));
const StationPage = React.lazy(() => import("../pages/station"));

const RouterView = () => {
  return (
    <Suspense fallback={<CircularProgress sx={{margin: 'auto'}}/>}>
      <AppRouter contexts={[
        UserContextProvider,
        ToastContextProvider,
        ModalContextProvider,
      ]}>
        <Route path="/" element={<StationListContextProvider />}>

          <Route path="" element={<WebLayout />}>
            <Route index element={<WebPage />} />
          </Route>

          <Route path="panel" element={
            <Restrict guards={[isStaff]}>
              <PanelLayout />
            </Restrict>
          } >
            <Route index element={<PanelPage />} />
          </Route>
        </Route>


        <Route path="/station" element={<StationContextProvider/>}>
          <Route index element={
            <Restrict guards={[isStation]}>
              <StationPage />
            </Restrict>
          } />

          <Route path="/station/configure" element={
            <StationConfigPage />
          } />
        </Route>
      </AppRouter>
    </Suspense >
  )
}

export default RouterView;

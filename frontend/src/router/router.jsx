import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { AppRouter, Restrict } from "../utils/router";
import { UserContextProvider } from "../context/user";
import { StationContextProvider } from "../context/station";
import { StationListContextProvider } from "../context/stationList";
import { ToastContextProvider } from "../context/toast";
import { isStaff } from "../guards/access";
import { ModalContextProvider } from "../context/modal";
import { CircularProgress } from "@mui/material";

const WebLayout = React.lazy(() => import("../layout/web"));
const WebPage = React.lazy(() => import("../pages/web"));
const PanelLayout = React.lazy(() => import("../layout/panel"));
const PanelPage = React.lazy(() => import("../pages/panel"));
const StationPage = React.lazy(() => import("../pages/station"));

const RouterView = () => {

  return (
    <UserContextProvider>
        <Suspense fallback={<CircularProgress sx={{margin: 'auto'}}/>}>
          <AppRouter contexts={[
            ModalContextProvider,
            ToastContextProvider
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
            <Route path="/station" element={
              <Restrict guards={[() => true]}>
                <StationContextProvider>
                  <StationPage />
                </StationContextProvider>
              </Restrict>
            } />
          </AppRouter>
        </Suspense >
    </UserContextProvider>
  )
}

export default RouterView;
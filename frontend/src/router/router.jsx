import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { AppRouter, Restrict } from "../utils/router";
import { UserContextProvider } from "../context/user";
import { StationContextProvider } from "../context/station";

const WebLayout = React.lazy(() => import("../layout/web"));
const WebPage = React.lazy(() => import("../pages/web"));
const PanelLayout = React.lazy(() => import("../layout/panel"));
const PanelPage = React.lazy(() => import("../pages/panel"));
const StationPage = React.lazy(() => import("../pages/station"));

const RouterView = () => {
  
  return (
    <StationContextProvider>
      <UserContextProvider>
        <Suspense fallback={<div>Loading......</div>}>
          <AppRouter>
            <Route path="/" element={<WebLayout />}>
              <Route index element={<WebPage />} />
            </Route>
            <Route path="/panel" element={<PanelLayout />} >
              <Route index element={<PanelPage />} />
            </Route>
            <Route path="/:station" element={
              <Restrict guards={[() => true]}>
                <StationPage />
              </Restrict>
            } />
          </AppRouter>
        </Suspense>
      </UserContextProvider>
    </StationContextProvider>
  )
}

export default RouterView;
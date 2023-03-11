import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyProfileQuery } from "../gql/graphql";
import AllPinsTable from "../pages/Admin/AllPinsTable";
import Dashboard from "../pages/Admin/Dashboard";

import CreatePin from "../pages/CreatePin/CreatePin";
import PreviewPin from "../pages/CreatePin/PreviewPin";
import UploadImage from "../pages/CreatePin/UploadImage";

import Home from "../pages/Home/Home";
import Map from "../pages/Map/Map";

import {
  ADMIN_ALL_PINS_PATH,
  ADMIN_DASHBOARD,
  CREATE_PIN_PATH,
  HOME_PATH,
  PREVIEW_PIN,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  UPLOAD_IMAGE,
  MAP_PATH,
  ADMIN_CATEGORIES,
} from "../pages/paths";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { Container, Footer, MainContainer } from "./App.styled";
import AdminCategories from "../pages/Admin/AdminCategories";
import ProtectedRoute from "pages/Protected/ProtectedRoute";
import AlreadyLoggedIn from "pages/Protected/AlreadyLoggedIn";
import AdminRoute from "pages/Protected/AdminRoute";
import NavbarPage from "components/Navbar/NavbarPage";
import { divIcon } from "leaflet";

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      firstName
      lastName
      emailAddress
      userStatus
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { pathname } = useLocation();
  const { data, refetch, loading } = useQuery<MyProfileQuery>(MY_PROFILE, {
    onCompleted: (data) => {
      if (data.myProfile) {
        setIsLoggedIn(true);
        setUserStatus(data.myProfile.userStatus);
      }
    },
    onError: () => {
      setIsLoggedIn(false);
    },
  });

  const checkIsAdmin = () => {
    if (userStatus === "ADMIN") {
      setIsAdmin(true);
    }
  };
  useEffect(() => {
    checkIsAdmin();
  });
  console.log(pathname);
  return (
    <>
      <MainContainer>
        {pathname !== "/" && pathname !== "/map" ? (
          <NavbarPage data={data} isLoggedIn={isLoggedIn} onSignOut={refetch} />
        ) : (
          <div></div>
        )}

        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={MAP_PATH} element={<Map />} />
          <Route
            path={SIGN_UP_PATH}
            element={
              <AlreadyLoggedIn isLoggedIn={isLoggedIn}>
                <SignUp />
              </AlreadyLoggedIn>
            }
          />
          <Route
            path={SIGN_IN_PATH}
            element={
              <AlreadyLoggedIn isLoggedIn={isLoggedIn}>
                <SignIn onSuccess={refetch} />
              </AlreadyLoggedIn>
            }
          />
          <Route
            path={CREATE_PIN_PATH}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <CreatePin />
              </ProtectedRoute>
            }
          />
          <Route
            path={ADMIN_ALL_PINS_PATH}
            element={
              <AdminRoute
                isLoggedIn={isLoggedIn}
                loading={loading}
                isAdmin={isAdmin}
              >
                <AllPinsTable />
              </AdminRoute>
            }
          />
          <Route
            path={ADMIN_DASHBOARD}
            element={
              <AdminRoute
                isLoggedIn={isLoggedIn}
                loading={loading}
                isAdmin={isAdmin}
              >
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path={UPLOAD_IMAGE}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <UploadImage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PREVIEW_PIN}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} loading={loading}>
                <PreviewPin />
              </ProtectedRoute>
            }
          />
          <Route
            path={ADMIN_CATEGORIES}
            element={
              <AdminRoute
                isLoggedIn={isLoggedIn}
                loading={loading}
                isAdmin={isAdmin}
              >
                <AdminCategories />
              </AdminRoute>
            }
          />
        </Routes>
      </MainContainer>
      <Footer>
        <Container>
          <p>&copy; 2023 Wild Code School</p>
        </Container>
      </Footer>
      <ToastContainer />
    </>
  );
}

export default App;

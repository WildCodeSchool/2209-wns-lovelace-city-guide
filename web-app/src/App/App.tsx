import { Routes, Route, useLocation } from "react-router-dom";
import AllPinsTable from "../pages/Admin/AllPinsTable";
import Dashboard from "../pages/Admin/Dashboard";

import CreatePin from "../pages/CreatePin/CreatePin";
import PreviewPin from "../pages/CreatePin/PreviewPin";
import UploadImage from "../pages/CreatePin/UploadImage";

import Home from "../pages/Home/Home";
import Map from "../pages/Map/Map";
import BaseFooter from "components/Footer/Footer";
import Profile from "pages/User/Profile";

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
  PROFILE_PATH,
  ADMIN_ALL_USERS_PATH
} from "../pages/paths";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { MainContainer } from "./App.styled";
import AdminCategories from "../pages/Admin/AdminCategories";
import ProtectedRoute from "pages/Protected/ProtectedRoute";
import AlreadyLoggedIn from "pages/Protected/AlreadyLoggedIn";
import AdminRoute from "pages/Protected/AdminRoute";
import NavbarPage from "components/Navbar/NavbarPage";
import AllUsersTable from "pages/Admin/AllUsersTable";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <MainContainer>
        {pathname !== "/" && pathname !== "/map" && <NavbarPage />}

        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={MAP_PATH} element={<Map />} />
          <Route
            path={SIGN_UP_PATH}
            element={
              <AlreadyLoggedIn>
                <SignUp />
              </AlreadyLoggedIn>
            }
          />
          <Route
            path={SIGN_IN_PATH}
            element={
              <AlreadyLoggedIn>
                <SignIn />
              </AlreadyLoggedIn>
            }
          />
          <Route
            path={PROFILE_PATH}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={CREATE_PIN_PATH}
            element={
              <ProtectedRoute>
                <CreatePin />
              </ProtectedRoute>
            }
          />
          <Route
            path={ADMIN_ALL_PINS_PATH}
            element={
              <AdminRoute>
                <AllPinsTable />
              </AdminRoute>
            }
          />
          <Route
            path={ADMIN_ALL_USERS_PATH}
            element={
              <AdminRoute>
                <AllUsersTable />
              </AdminRoute>
            }
          />
          <Route
            path={ADMIN_DASHBOARD}
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path={UPLOAD_IMAGE}
            element={
              <ProtectedRoute>
                <UploadImage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PREVIEW_PIN}
            element={
              <ProtectedRoute>
                <PreviewPin />
              </ProtectedRoute>
            }
          />
          <Route
            path={ADMIN_CATEGORIES}
            element={
              <AdminRoute>
                <AdminCategories />
              </AdminRoute>
            }
          />
        </Routes>
      </MainContainer>
      {pathname !== "/" && pathname !== "/map" && <BaseFooter />}
    </>
  );
}

export default App;

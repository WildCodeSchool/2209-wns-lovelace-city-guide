import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyProfileQuery } from "../gql/graphql";
import AllPinsTable from "../pages/Admin/AllPinsTable";
import Dashboard from "../pages/Admin/Dashboard";

import CreatePin from "../pages/CreatePin/CreatePin";
import PreviewPin from "../pages/CreatePin/PreviewPin";
import UploadImage from "../pages/CreatePin/UploadImage";

import PinMeLogo from "../media/logo.png";
import { FaHome } from "react-icons/fa";

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
import { getErrorMessage } from "../utils";
import {
  Container,
  Footer,
  MainContainer,
  PageTitle,
  PageTitleLink,
} from "./App.styled";
import AdminCategories from "../pages/Admin/AdminCategories";

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
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE);
  return (
    <>
      <MainContainer>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={MAP_PATH} element={<Map />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={SIGN_IN_PATH} element={<SignIn onSuccess={refetch} />} />
          <Route path={CREATE_PIN_PATH} element={<CreatePin />} />
          <Route path={ADMIN_ALL_PINS_PATH} element={<AllPinsTable />} />
          <Route path={ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route path={UPLOAD_IMAGE} element={<UploadImage />} />
          <Route path={PREVIEW_PIN} element={<PreviewPin />} />
          <Route path={ADMIN_CATEGORIES} element={<AdminCategories />} />
        </Routes>
      </MainContainer>
      <Footer>
        <Container>
          <p>&copy; 2022 Pin Me (Staging)</p>
        </Container>
      </Footer>
      <ToastContainer />
    </>
  );
}

export default App;

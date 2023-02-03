import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  MyProfileQuery,
  SignOutMutation,
  SignOutMutationVariables,
} from "../gql/graphql";
import AllPinsTable from "../pages/Admin/AllPinsTable";
import CreatePin from "../pages/CreatePin/CreatePin";
import PreviewPin from "../pages/CreatePin/PreviewPin";
import UploadImage from "../pages/CreatePin/UploadImage";

import Home from "../pages/Home/Home";
import {
  ADMIN_ALL_PINS_PATH,
  CREATE_PIN_PATH,
  HOME_PATH,
  PREVIEW_PIN,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  UPLOAD_IMAGE,
} from "../pages/paths";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { getErrorMessage } from "../utils";
import {
  Container,
  Footer,
  Header,
  MainContainer,
  PageTitle,
  PageTitleLink,
} from "./App.styled";

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

const SIGN_OUT = gql`
  mutation SignOut($currentUserId: String!) {
    signOut(id: $currentUserId) {
      id
    }
  }
`;

function App() {
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE);
  const navigate = useNavigate();
  const currentUserId = data?.myProfile.id as string;
  const [signOut] = useMutation<SignOutMutation, SignOutMutationVariables>(
    SIGN_OUT,
    {
      variables: { currentUserId },
      onCompleted: () => {
        toast.success(`Vous vous êtes déconnecté avec succès.`);
        navigate(HOME_PATH);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    }
  );

  const handleSignOut = async (): Promise<void> => {
    await signOut();
  };

  return (
    <>
      <Header>
        <Container>
          <PageTitle>
            <PageTitleLink to={HOME_PATH}>Wilders Book</PageTitleLink>
          </PageTitle>
          {data?.myProfile ? (
            <>
              <i>{data?.myProfile.emailAddress}</i>
              <button type="submit" onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <nav>
              <Link to={SIGN_UP_PATH}>Inscription</Link>
              {" | "}
              <Link to={SIGN_IN_PATH}>Connexion</Link>
            </nav>
          )}
        </Container>
      </Header>
      <MainContainer>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={SIGN_IN_PATH} element={<SignIn onSuccess={refetch} />} />
          <Route path={CREATE_PIN_PATH} element={<CreatePin />} />
          <Route path={ADMIN_ALL_PINS_PATH} element={<AllPinsTable />} />
          <Route path={UPLOAD_IMAGE} element={<UploadImage />} />
          <Route path={PREVIEW_PIN} element={<PreviewPin />} />
        </Routes>
      </MainContainer>
      <Footer>
        <Container>
          <p>&copy; 2022 Wild Code School</p>
        </Container>
      </Footer>
      <ToastContainer />
    </>
  );
}

export default App;

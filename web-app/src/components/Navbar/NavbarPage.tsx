import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Image,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MyProfileQuery,
  SignOutMutation,
  SignOutMutationVariables,
} from "../../gql/graphql";
import { HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "../../pages/paths";
import { getErrorMessage } from "../../utils";
import PinMeLogo from "../../media/logo.png";
import { BlueButton, BtnBlueRounded, RedButton } from "styles/base-styles";
import { useState } from "react";

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
type PropType = {
  data: MyProfileQuery | undefined;
  isLoggedIn: boolean;
  onSignOut: () => void;
};

const NavbarPage = ({ data, isLoggedIn, onSignOut }: PropType) => {
  const navigate = useNavigate();
  const toast = useToast();

  const currentUserId = data?.myProfile.id as string;
  const [signOut] = useMutation<SignOutMutation, SignOutMutationVariables>(
    SIGN_OUT,
    {
      variables: { currentUserId },
      onCompleted: () => {
        toast({
          title: "Vous vous êtes déconnecté avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(HOME_PATH);
      },
      onError: (error) => {
        toast({
          title: "Error",
          status: "error",
          description: getErrorMessage(error),
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleSignOut = async (): Promise<void> => {
    await signOut();
    onSignOut();
  };

  return (
    <>
      <Container maxW="100%">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <RedButton to={HOME_PATH} icon>
            <FaHome />
          </RedButton>

          <Spacer />
          {data?.myProfile ? (
            <>
              <BtnBlueRounded>
                {data?.myProfile.firstName} {data?.myProfile.lastName}
              </BtnBlueRounded>
              <Button colorScheme="teal" type="submit" onClick={handleSignOut}>
                <FaSignOutAlt />
              </Button>
            </>
          ) : (
            <ButtonGroup gap="2">
              <RedButton to={SIGN_UP_PATH} icon>
                <FaUser />
              </RedButton>
            </ButtonGroup>
          )}
        </Flex>
      </Container>
      <Container maxW="100%" centerContent>
        <Box bg="transparent">
          <Center>
            <Image src={PinMeLogo} alt="logo-app" />
          </Center>
        </Box>
      </Container>
    </>
  );
};

export default NavbarPage;

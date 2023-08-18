import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Image,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SignOutMutation, SignOutMutationVariables } from "../../gql/graphql";
import { HOME_PATH, SIGN_UP_PATH } from "../../pages/paths";
import { getErrorMessage } from "../../utils";
import PinMeLogo from "../../media/logo.png";
import { BtnBlueRounded, RedButton } from "styles/base-styles";
import { useContext } from "react";
import { AppContext } from "context/AppContext";

const SIGN_OUT = gql`
  mutation SignOut($currentUserId: String!) {
    signOut(id: $currentUserId) {
      id
    }
  }
`;

const NavbarPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const appContext = useContext(AppContext);
  const currentUserId = appContext?.userProfile?.myProfile.id as string;
  const [signOut] = useMutation<SignOutMutation, SignOutMutationVariables>(
    SIGN_OUT,
    {
      variables: { currentUserId },
      onCompleted: async () => {
        await onSignOutSuccess();
      },
    }
  );

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        description: getErrorMessage(error),
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSignOutSuccess = async () => {
    try {
      await appContext?.refetch();
      console.log(appContext?.userProfile);
    } finally {
      navigate(HOME_PATH);
      toast({
        title: "Vous vous êtes déconnecté avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container maxW="100%">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <RedButton to={HOME_PATH} icon>
            <FaHome />
          </RedButton>

          <Spacer />
          {appContext?.userProfile?.myProfile ? (
            <>
              <BtnBlueRounded>
                {appContext?.userProfile?.myProfile.firstName}{" "}
                {appContext?.userProfile?.myProfile.lastName}
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

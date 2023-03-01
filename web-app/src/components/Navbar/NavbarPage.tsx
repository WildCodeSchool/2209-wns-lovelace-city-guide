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
  useToast,
} from "@chakra-ui/react";
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  MyProfileQuery,
  SignOutMutation,
  SignOutMutationVariables,
} from "../../gql/graphql";
import { HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "../../pages/paths";
import { getErrorMessage } from "../../utils";
import PinMeLogo from "../../media/logo.png";
import SquareButton from "../SquareBtn/SquareButton";

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

const NavbarPage = () => {
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE);
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
          duration: 9000,
          isClosable: true,
        });
        navigate(HOME_PATH);
      },
      onError: (error) => {
        toast({
          title: "Something went wrong",
          description: getErrorMessage(error),
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const handleSignOut = async (): Promise<void> => {
    await signOut();
  };

  return (
    <>
      <Container maxW="100%">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Link to={HOME_PATH}>
              <SquareButton>
                <FaHome />
              </SquareButton>
            </Link>
          </Box>
          <Spacer />
          {data?.myProfile ? (
            <>
              <i>{data?.myProfile.emailAddress}</i>
              <Button colorScheme="teal" type="submit" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </>
          ) : (
            <ButtonGroup gap="2">
              <Link to={SIGN_UP_PATH}>
                <SquareButton>
                  <FaUser />
                </SquareButton>
              </Link>
              <Link to={SIGN_IN_PATH}>
                <SquareButton>
                  <FaSignOutAlt />
                </SquareButton>
              </Link>
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

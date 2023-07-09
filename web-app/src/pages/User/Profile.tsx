import { Avatar, Box, Button, Center, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Heading, Input, WrapItem, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { AppContext } from "context/AppContext";
import { FaHeart, FaRandom, FaSignOutAlt } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import { SignOutMutation, SignOutMutationVariables } from "gql/graphql";
import { HOME_PATH } from "pages/paths";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "utils";
import { RedButton } from "styles/base-styles";
import { MenuRow } from "pages/Home/Home.styled";

const SIGN_OUT = gql`
  mutation SignOut($currentUserId: String!) {
    signOut(id: $currentUserId) {
      id
    }
  }
`;



const Profile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const appContext = useContext(AppContext);
  const currentUserId = appContext?.userProfile?.myProfile.id as string;
  const [firstName, setFirstName] = useState(appContext?.userProfile?.myProfile.firstName);
  const [lastName, setLastName] = useState(appContext?.userProfile?.myProfile.lastName);
  const [emailAddress, setEmailAddress] = useState(appContext?.userProfile?.myProfile.emailAddress);


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
      <Flex width="full" align="center" justifyContent="center">
        <Box
          bg="#fff"
          p={8}
          width="450px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >

          <Box textAlign="center">
            <Heading>Bonjour {appContext?.userProfile?.myProfile.firstName}</Heading>
          </Box>
          <Box mt={5}>
            <RedButton to={`#`} icon> Mes Pins </RedButton>
            <RedButton to={`#`} icon> Mes Favoris </RedButton>
          </Box>
          <Center>
            <Avatar size='xl' m={6} name={`${appContext?.userProfile?.myProfile.firstName} ${appContext?.userProfile?.myProfile.lastName}`} src='https://bit.ly/broken-link' />
          </Center>
          <Center>
            <Button colorScheme="red" type="submit" onClick={handleSignOut} >
                  Déconnexion &nbsp; <FaSignOutAlt />
            </Button>
          </Center>
          <Box textAlign="center">
            <Heading as='h2'size='md' mt='6'>Mettre les informations à jour</Heading>
          </Box>

          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <Input
              type="text"
              required
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <Input
              type="text"
              required
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Adresse email</FormLabel>
            <Input
              type="email"
              required
              autoComplete="email"
              id="emailAddress"
              name="emailAddress"
              value={emailAddress}
              onChange={(event) => {
                setEmailAddress(event.target.value.toLowerCase());
              }}
            />
          </FormControl>
          <Button colorScheme="teal" mr={3} mt={3}>
              Mettre à jour
          </Button>
        </Box>
      </Flex>
    </>
  )
}

export default Profile
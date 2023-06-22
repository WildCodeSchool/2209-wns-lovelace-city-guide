import { gql, useMutation } from "@apollo/client";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpMutation, SignUpMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { SIGN_IN_PATH } from "../paths";

const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      password: $password
    ) {
      id
      emailAddress
      userStatus
    }
  }
`;

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [signUp, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP);
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async () => {
    try {
      await signUp({
        variables: { firstName, lastName, emailAddress, password },
      });
      toast({
        title:
          "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate(SIGN_IN_PATH);
    } catch (error) {
      toast({
        title: "Erreur",
        status: "error",
        description: getErrorMessage(error),
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
            <Heading>Inscription</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await submit();
              }}
            >
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
              <FormControl>
                <FormLabel>Mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <InputRightElement width="5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button colorScheme="teal" width="full" mt={4} type="submit">
                {loading ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#FF8787"
                    size="xl"
                  />
                ) : (
                  "Valider"
                )}
              </Button>
            </form>
          </Box>
          <Box>
            <Text pr="5px">
              Vous avez déjà un compte?
              <Link to={SIGN_IN_PATH}>
                <span style={{ marginLeft: "5px", color: "#319795" }}>
                  Se connecter
                </span>
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;

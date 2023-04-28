import { gql, useMutation } from "@apollo/client";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Spinner, useToast } from "@chakra-ui/react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { HOME_PATH, SIGN_UP_PATH } from "../paths";
import { AppContext } from "context/AppContext";

const SIGN_IN = gql`
  mutation SignIn($emailAddress: String!, $password: String!) {
    signIn(emailAddress: $emailAddress, password: $password) {
      id
      emailAddress
      firstName
      lastName
    }
  }
`;

const SignIn = () => {
  const appContext = useContext(AppContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [signIn, { loading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN, {
    onCompleted: async () => {
      console.log("singin success");
      await onSignInSuccess();
    },
  });
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
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

  const onSignInSuccess = async () => {
    try {
      await appContext?.refetch();
    } finally {
      navigate(HOME_PATH);
      toast({
        title: "Vous vous êtes connecté avec succès.",
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
            <Heading>Connexion</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await submit();
              }}
            >
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
                    setEmailAddress(event.target.value);
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

              <Button
                colorScheme="teal"
                width="full"
                mt={4}
                type="submit"
                disabled={loading}
              >
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
              Vous n'avez pas de compte?
              <Link to={SIGN_UP_PATH}>
                <span style={{ marginLeft: "5px", color: "#319795" }}>
                  S'inscrire
                </span>
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignIn;

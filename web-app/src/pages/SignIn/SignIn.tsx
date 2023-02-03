import { gql, useMutation } from "@apollo/client";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { HOME_PATH } from "../paths";

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

const SignIn = ({ onSuccess }: { onSuccess: () => {} }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [signIn, { loading }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
      toast.success(`Vous vous êtes connecté avec succès.`);
      onSuccess();
      navigate(HOME_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
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
                {loading ? <Loader /> : "Valider"}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignIn;

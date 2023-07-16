import { useToast, Flex, Box, Spinner } from "@chakra-ui/react";
import { AppContext } from "context/AppContext";
import { HOME_PATH } from "pages/paths";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AlreadyLoggedIn = ({ children }: any) => {
  const toast = useToast();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.isLoggedIn) {
      toast({
        title: "Vous vous êtes déjà connecté.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [appContext?.isLoggedIn, toast]);

  if (appContext?.loading) {
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box
          bg="#fff"
          p={8}
          width="1000px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#FF8787"
            size="xl"
          />
        </Box>
      </Flex>
    );
  }

  if (appContext?.isLoggedIn) {
    return <Navigate to={HOME_PATH} replace />;
  }

  return children;
};

export default AlreadyLoggedIn;

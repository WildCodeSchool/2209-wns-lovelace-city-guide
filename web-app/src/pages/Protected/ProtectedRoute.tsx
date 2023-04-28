import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { AppContext } from "context/AppContext";
import { SIGN_IN_PATH } from "pages/paths";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const toast = useToast();
  const appContext = useContext(AppContext);
  if (appContext?.loading) {
    return (
      <>
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
      </>
    );
  }
  if (!appContext?.isLoggedIn) {
    toast({
      title: "Se connecter pour accéder cette page.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    return <Navigate to={SIGN_IN_PATH} replace />;
  }
  return children;
};

export default ProtectedRoute;

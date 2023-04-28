import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { AppContext } from "context/AppContext";
import { HOME_PATH } from "pages/paths";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: any) => {
  const toast = useToast();
  const appContext = useContext(AppContext);
  const isAdmin = appContext?.isAdmin;
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
  if (isAdmin === false) {
    toast({
      title: "Vous n'avez pas de droit d'accedér cette page",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    return <Navigate to={HOME_PATH} replace />;
  }

  return children;
};

export default AdminRoute;

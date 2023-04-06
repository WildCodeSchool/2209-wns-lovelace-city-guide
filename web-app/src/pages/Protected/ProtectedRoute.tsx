import { Spinner, useToast } from "@chakra-ui/react";
import { SIGN_IN_PATH } from "pages/paths";
import { Navigate } from "react-router-dom";

type PropType = {
  isLoggedIn: boolean | undefined;
  children: any;
  loading: any;
};
const ProtectedRoute = (props: PropType) => {
  const toast = useToast();
  const { isLoggedIn, children, loading } = props;
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#FF8787"
        size="xl"
      />
    );
  }
  if (!isLoggedIn) {
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

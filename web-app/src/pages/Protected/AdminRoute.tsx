import { Spinner, useToast } from "@chakra-ui/react";
import { HOME_PATH } from "pages/paths";
import { Navigate } from "react-router-dom";

type PropType = {
  isLoggedIn: boolean;
  children: any;
  loading: any;
  isAdmin: boolean;
};
const AdminRoute = (props: PropType) => {
  const toast = useToast();
  const { isLoggedIn, children, loading, isAdmin } = props;
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
  if (!isLoggedIn && !isAdmin) {
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

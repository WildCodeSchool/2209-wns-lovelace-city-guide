import { useToast } from "@chakra-ui/react";
import { HOME_PATH } from "pages/paths";
import { Navigate } from "react-router-dom";

type PropType = {
  isLoggedIn: boolean;
  children: any;
};

const AlreadyLoggedIn = (props: PropType) => {
  const toast = useToast();
  const { isLoggedIn, children } = props;
  if (isLoggedIn) {
    toast({
      title: "Vous vous êtes déjà connecté.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    return <Navigate to={HOME_PATH} replace />;
  }
  return children;
};

export default AlreadyLoggedIn;

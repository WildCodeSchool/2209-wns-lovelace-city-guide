import { useToast } from "@chakra-ui/react";
import { AppContext } from "context/AppContext";
import { HOME_PATH } from "pages/paths";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AlreadyLoggedIn = ({ children }: any) => {
  const toast = useToast();
  const appContext = useContext(AppContext);
  if (appContext?.isLoggedIn) {
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

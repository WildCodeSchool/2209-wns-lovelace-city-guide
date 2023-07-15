import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { AppContext } from "context/AppContext";
import { SIGN_IN_PATH } from "pages/paths";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appContext?.isLoggedIn) {
      navigate("/sign-in");
    }
  }, [appContext, navigate]);

  if (appContext?.loading) {
    return <div>Loading...</div>;
  }

  return appContext?.isLoggedIn ? children : null;
};

export default ProtectedRoute;

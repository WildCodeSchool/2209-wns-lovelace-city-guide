import { AppContext } from "context/AppContext";
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

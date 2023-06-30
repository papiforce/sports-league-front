import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "contexts/AuthContext";

const SecurityGuard = ({
  unloggedRedirectionPath = null,
  loggedRedirectionPath = null,
  children,
}) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (unloggedRedirectionPath && !auth.isAuthenticated) {
      return navigate(unloggedRedirectionPath);
    }

    if (loggedRedirectionPath && auth.isAuthenticated) {
      return navigate(loggedRedirectionPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default SecurityGuard;

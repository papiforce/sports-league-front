import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Cookies from "js-cookie";

import Theme from "core/Theme";
import { AuthContext } from "contexts/AuthContext";
import { initUser } from "api/authQueries";

const SecurityGuard = lazy(() => import("pages/Layouts/SecurityGuard"));

const CatalogPage = lazy(() => import("pages/CatalogPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const ItemPage = lazy(() => import("pages/ItemPage"));
const ProfilePage = lazy(() => import("pages/ProfilePage"));
const SettingsPage = lazy(() => import("pages/SettingsPage"));
const RegistrationPage = lazy(() => import("pages/RegistrationPage"));

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: Cookies.get("lsa-token") ? true : false,
    user: null,
  });

  const getCurrentUser = async () => {
    try {
      const data = await initUser();

      if (!data) {
        Cookies.remove("lsa-token");
        setAuth({ isAuthenticated: false, user: null });
      }

      return setAuth({ ...auth, user: data.user });
    } catch (err) {
      console.error(err);

      Cookies.remove("lsa-token");
      setAuth({ isAuthenticated: false, user: null });
    }
  };

  useEffect(() => {
    getCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ThemeProvider theme={Theme}>
        <Suspense>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<CatalogPage />} />
              <Route
                exact
                path="/connexion"
                element={
                  <SecurityGuard loggedRedirectionPath="/">
                    <LoginPage />
                  </SecurityGuard>
                }
              />
              <Route
                exact
                path="/inscription"
                element={
                  <SecurityGuard loggedRedirectionPath="/">
                    <RegistrationPage />
                  </SecurityGuard>
                }
              />
              <Route
                exact
                path="/catalogue/article/:id"
                element={<ItemPage />}
              />
              <Route
                exact
                path="/profil/:userId"
                element={
                  <SecurityGuard unloggedRedirectionPath="/">
                    <ProfilePage />
                  </SecurityGuard>
                }
              />
              <Route
                exact
                path="/parametres"
                element={
                  <SecurityGuard unloggedRedirectionPath="/">
                    <SettingsPage />
                  </SecurityGuard>
                }
              />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;

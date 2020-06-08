import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { UsuarioService } from "./services/UsuarioService";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
  
export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [datosDeUsuario, setDatosDeUsuario] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [rol, setRol] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const rolUsuario = localStorage.getItem('rol');
      setRol(rolUsuario);
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") &&
          window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
        const existeUsuario = await UsuarioService.usuarioExistente(user.email);
        console.log(user);
        console.log('USUARIO');
        console.log(rolUsuario);

        const usuario =  {
          nombre: user.given_name, 
          apellido: user.family_name, 
          email: user.email,
          rol: rolUsuario
        };

        if(existeUsuario) {
            console.log("Si papa");
            const res = await UsuarioService.crearUsuario(usuario);
            console.log('User res');
            console.log(JSON.stringify(res));
        }
        setDatosDeUsuario(usuario);
      }

      setLoading(false);
      console.log("1");
    };
    console.log("2");
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  const loginUser = (rol, ...p) => {
    console.log('LOGIN');
    console.log(rol);
    setRol(rol);
    auth0Client.loginWithRedirect(rol, ...p)
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (rol, ...p) => loginUser(rol, ...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
        datosDeUsuario,
        rol
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
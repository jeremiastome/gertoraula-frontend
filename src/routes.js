import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import Cursos from "./components/cursos/Cursos";
import Alumnos from "./components/alumnos/Alumnos";
import BuscadorDeAlumnos from "./components/alumnos/BuscadorDeAlumnos";
import UserProfileLite from "./views/UserProfileLite";
import CrearAlumnoView from "./views/CrearAlumnoView";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import CrearCursoView from "./views/CrearCursoView";
import Profile from "./components/Profile";
import SignInSide from "./views/SignInSide";


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: (user) => {
      if(Object.keys(user).length === 0) {
        console.log(user);
        return(
          <Redirect to="/auth" />
        )
      }
      else {
        return(
          <Redirect to="/cursos" />
        )
      }
    }
  },
  {
    path: "/auth",
    layout: LoginLayout,
    component: SignInSide
  },
  {
    path: "/cursos",
    layout: DefaultLayout,
    component: (user) => {
      if(Object.keys(user).length === 0) {
        console.log(user);
        return(
          <Redirect to="/auth" />
        )
      }
      else {
        return(
          <Cursos />
        )
      }
    }
  },
  {
    path: "/curso",
    layout: DefaultLayout,
    component: Alumnos
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/nuevoAlumno",
    layout: DefaultLayout,
    component: CrearAlumnoView
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/nuevoCurso",
    layout: DefaultLayout,
    component: CrearCursoView
  },
  {
    path: "/registrarAlumno",
    layout: DefaultLayout,
    component: BuscadorDeAlumnos
  },
  {
    path: "/perfil",
    layout: DefaultLayout,
    component: Profile
  }
];

import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import Cursos from "./components/cursos/Cursos";
import AlumnosRegistrados from "./components/padres/AlumnosRegistrados";
import Alumnos from "./components/alumnos/Alumnos";
import AlumnoList from "./components/alumnos/AlumnoList";
import EditarAlumno from "./components/alumnos/EditarAlumno";
import BuscadorDeAlumnos from "./components/alumnos/BuscadorDeAlumnos";
import UserProfileLite from "./views/UserProfileLite";
import Alumno from "./components/padres/Alumno";
import CrearAlumnoView from "./views/CrearAlumnoView";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import CrearCursoView from "./views/CrearCursoView";
import Profile from "./components/Profile";
import SignInSide from "./views/SignInSide";
import DetalleAlumno from "./components/padres/DetalleAlumno";


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: (user) => {
      if(Object.keys(user).length === 0) {
        return(
          <Redirect to="/auth" />
        )
      }
      else {
        return(
          <Redirect to="/home" />
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
    path: "/home",
    layout: DefaultLayout,
    component: (datosDeUsuario) => {
      if(Object.keys(datosDeUsuario).length === 0) {
        return(
          <Redirect to="/auth" />
        )
      }
      else if(datosDeUsuario.rol == 'docente'){
        return(
          <Cursos />
        )
      }
      else {
        return(
          <AlumnosRegistrados />
        )
      }
    }
  },
  {
    path: "/curso",
    layout: DefaultLayout,
    component: (user) => {
      return(<Alumnos/>)
    }
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: (user) => {
      return(<UserProfileLite/>)
    }
  },
  {
    path: "/nuevoAlumno",
    layout: DefaultLayout,
    component: (user) => {
      return(<CrearAlumnoView/>)
    }
  },
  {
    path: "/error",
    layout: DefaultLayout,
    component: (user) => {
      return(<Errors/>)
    }
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
    component: (user) => {
      return(<CrearCursoView/>)
    }
  },
  {
    path: "/registrarAlumno",
    layout: DefaultLayout,
    component: (user) => {
      return(<BuscadorDeAlumnos/>)
    }
  },
  {
    path: "/perfil",
    layout: DefaultLayout,
    component: (user) => {
      return(<Profile/>)
    }
  },
  {
    path: "/detalleAlumno",
    layout: DefaultLayout,
    component: (user) => {
      return(<EditarAlumno/>)
    }
  },
  {
    path: "/alumnos",
    layout: DefaultLayout,
    component: (datosDeUsuario) => {
      if(datosDeUsuario.rol == 'docente'){ 
        return(<AlumnoList/>)
      }
      return(<Redirect to="/home" />)      
    }
  }
];
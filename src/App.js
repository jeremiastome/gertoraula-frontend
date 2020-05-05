import React,{Component, useState, useEffect}  from 'react';
import logo from './logo.svg';
import './App.css';
import Cursos from './componentes/Cursos';
import Alumnos from './componentes/Alumnos';
import MenuAppBar from './componentes/MenuAppBar';
import { BrowserRouter as Router, Route, Link, useParams, Switch, useLocation, useHistory } from 'react-router-dom';

export default function App() {

  const [cursos, setCursos] = useState([]);

  function obtenerCursos() {
    fetch("http://localhost:8080/cursos")
      .then(res => res.json())
      .then(resultado => {
        setCursos(resultado);
      });
  }

  useEffect(() => {
    obtenerCursos();
  }, []);

  return(
    <Router>
      <MenuAppBar />
        <Route exact path = "/">
          <Cursos listaDeCursos = { cursos } />
        </Route>
        <Route exact path = "/alumnos" component = { Alumnos } />
    </Router>
  )
}
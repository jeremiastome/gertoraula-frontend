import React,{Component}  from 'react';
import logo from './logo.svg';
import './App.css';
import Cursos from './componentes/Cursos';
import Alumnos from './componentes/Alumnos';
import { BrowserRouter as Router, Route, Link, useParams, Switch, useLocation, useHistory } from 'react-router-dom';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cursos : [],
          cursoSeleccionado : {}
      }

      this.seleccionarCurso = this.seleccionarCurso.bind(this);
  }

  seleccionarCurso(curso) { 
      console.log('Seleccionar curso');     
      this.setState({
        cursoSeleccionado : curso
      })
     
  }

  componentDidMount() {
      this.obtenerCursos();
  }

  obtenerCursos() {
    console.log('Obtener cursos');
    
    fetch("http://localhost:8080/cursos")
        .then(res => res.json())
        .then(resultado => {
                this.setState({
                    cursos: resultado
                })
            },
            error => {
                this.setState({
                    error: error
                })
            })
  }

  render() {
    return(
      <Router>
            <Switch>
                <Route exact path="/">
                    <Cursos listaCursos={this.state.cursos} seleccionarCurso={this.seleccionarCurso}/>
               </Route>
               <Route exact path="/alumnos">
                    <Alumnos 
                      key={this.state.cursoSeleccionado.id}
                      id={this.state.cursoSeleccionado.id} 
                      nombre={this.state.cursoSeleccionado.nombre} 
                      alumnos={this.state.cursoSeleccionado.alumnos}/>
               </Route>
            </Switch>
      </Router>      
    );
  }
}


export default App;

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
          cursos : [
             {
                id: 1,
                nombre: '5° A Tarde',
                alumnos: [{
                  nombre: 'Juan',
                  apellido: 'Fernandez'
                },
                {
                  nombre: 'Carlos',
                  apellido: 'Puyol'
                },
                {
                  nombre: 'Cristiano',
                  apellido: 'Ronaldo'
                }
              ]
             },
             {
                id: 2,
                nombre: '5° B Mañana',
                alumnos: [{
                  nombre: 'Juan',
                  apellido: 'Fernandez'
                }]
             },
             {
                id: 3,
                nombre: '5° C Mañana',
                alumnos: [{
                  nombre: 'Juan',
                  apellido: 'Fernandez'
                }]
              }
          ],
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

  render() {
    return(
      <Router>
            <Switch>
                <Route exact path="/">
                    <Cursos listaCursos={this.state.cursos} seleccionarCurso={this.seleccionarCurso}/>
               </Route>
               <Route exact path="/alumnos">
                    <Alumnos 
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

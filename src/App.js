import React,{Component}  from 'react';
import logo from './logo.svg';
import './App.css';
import Cursos from './componentes/Cursos';
import Alumnos from './componentes/Alumnos';
import MenuAppBar from './componentes/MenuAppBar';
import { BrowserRouter as Router, Route, Link, useParams, Switch, useLocation, useHistory } from 'react-router-dom';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          cursos : [],
          id: "",
          asistenciasCurso : [],
          cursoSeleccionado : {}
      }

      this.seleccionarCurso = this.seleccionarCurso.bind(this);
      this.agregarAsistencia = this.agregarAsistencia.bind(this);
      this.guardarAsistencias = this.guardarAsistencias.bind(this);
  }

  seleccionarCurso(curso) { 
      console.log('Seleccionar curso');     
      this.setState({
        cursoSeleccionado : curso
      })
     
  }

  agregarAsistencia(asistencia) { 
      console.log('agregarAsistencia');  
      
      const { asistenciasCurso } = this.state;
      var asistencias = asistenciasCurso;
      var agregar = true; 

      asistencias = asistencias.filter((a) => {
        if(a.alumnoId != asistencia.alumnoId) {
          return true;
        }
        agregar = false;
        return false;
      }) 
      
      console.log('agregar');
      console.log(agregar);
      if(agregar) asistencias.push(asistencia);

      console.log(asistencias);  
      this.setState({
        asistenciasCurso : asistencias
      })   
  }

  guardarAsistencias(id) {
    console.log('guardarAsistencias ' + id); 
    const { asistenciasCurso } = this.state;

    if (!asistenciasCurso || !id) return;

    console.log('asistenciasCurso ' + asistenciasCurso);  

    fetch("http://localhost:8080/cursos/" + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asistenciasCurso)
    })
    .then(res => console.log('res ' + res))
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

  componentDidMount() {
      this.obtenerCursos();
  }

  render() {
    return(
      <div>
      <MenuAppBar/>  
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
                      alumnos={this.state.cursoSeleccionado.alumnos}
                      agregarAsistencia={this.agregarAsistencia}
                      guardarAsistencias={this.guardarAsistencias}/>
               </Route>
            </Switch>
      </Router>   
      </div>   
    );
  }
}


export default App;

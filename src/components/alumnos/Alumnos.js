import React,{useState, useEffect}  from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from "shards-react";
import PageTitle from "../common/PageTitle";
import Alumno from "./Alumno"
import CardPost from "../posts/CardPost";
import { Card, CardHeader, CardBody, ListGroupItem,Alert } from "shards-react";
import { CursoService } from '../../services/CursoService';
import NuevoEvento from '../../components/cursos/NuevoEvento';
import Eventos from '../../components/cursos/Eventos';
import { AlumnoService } from '../../services/AlumnoService';
import { Classes } from '../styles/Classes';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './styles/Alumnos.css'

export default function Alumnos() { 
  const attrs = { md: "6", sm: "6" };
  const history = useHistory();
  const location = useLocation();
  const [block, setBlock] = useState(false);
  const [updateEventos, setUpdateEventos] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const _ = require('lodash');
  useEffect(() => {   
    console.log('ALUMNOS');
    setAlumnos([]);
    validateCurso();   
    setBlock(true);
    if(location.fecha > new Date()) return;
    location.asistenciasAEliminar = [];
    AlumnoService.getAlumnosDeCurso(location.cursoId, fecha.getTime()).then(data => { 
        setBlock(_.isEmpty(data));
        setAlumnos(data); 
      }
    );          
  }, [fecha]);

  function guardarAsistencias() {
      CursoService.guardarAsistencias(location.cursoId, location.asistencias).then(response => {
          CursoService.eliminarAsistencias(location.asistenciasAEliminar);
          setFecha(fecha);
          location.asistencias = [];
          location.asistenciasAEliminar = [];
          NotificationManager.success('Se han guardado las asistencias!', '', 2000);
      });
  }

  const registrarAlumno = () => {
    history.push({
        pathname : '/registrarAlumno',
        cursoId : location.cursoId,
        cursoName : location.cursoName
    });
  };

  const validateCurso = () => {
    if(!location.cursoId) {
      history.push({
          pathname : '/'
      });  
    }
  }
  const nuevoEvento = () => {
    setModalShow(true);
  };  

  const closeModal = (creadoEvento) => {
    if(creadoEvento) {
      NotificationManager.success('Se ha registrado el evento', '', 2000);
      setUpdateEventos(!updateEventos);
    }
    setModalShow(false);
  }

  const guardarFecha = (date) => {
      location.fecha = date;
      setFecha(date);
  };

  return ( 
      <Container fluid className="main-content-container px-4">
        <NotificationContainer/>
        <Row noGutters className="page-header py-4">
          <PageTitle data-testid="title"  title={"Curso " + location.cursoName} className="text-lg-left mb-6" />
        </Row>
        <Row>        
          <Col lg="8" md="6" sm="12" className="col-lg mb-4">
            <Card>
              <CardHeader className="border-bottom">
                <ListGroupItem className="d-flexAsistencias px-3 border-0">
                  <div className="stats-small stats-small--1 alumnosAsistencias">
                    <h4 className="m-0 alumnos"> <i className="material-icons mr-1">group</i> Alumnos</h4>
                    <Button disabled={block} theme="info" size="lg" className="guardarAsistencias" onClick = { guardarAsistencias } >Guardar asistencias</Button>
                  </div>
                </ListGroupItem>
              </CardHeader>
              <br/>
                {alumnos.map((alumno, idx) => (
                  <Col id={alumno.id} data-testid="alumnoId" lg="12" md="6" sm="12" className="col-lg mb-4" key={alumno.id}>
                    <Alumno 
                      id={`small-stats-${alumno.id}`}
                      variation="1"
                      value={alumno.nombre +' '+ alumno.apellido}
                      select={guardarAsistencias}
                      alumno={alumno}
                      refresh={setFecha}
                    />
                  </Col>            
                ))}
            </Card>
          </Col>
          <Col lg="4" md="6" sm="12" className="col-lg mb-4">
               <Card>
                <CardHeader className="border-bottom">
                  <ListGroupItem className="d-flex px-3 border-0">
                    <h4 className="m-0">Asistencias por fecha</h4>                    
                  </ListGroupItem>
                </CardHeader><br/>                
                <CardBody className={Classes.cardBodyClasses}>
                  <div className={Classes.innerWrapperClasses}>
                        <Calendar className="calendar" style={Classes.dataFieldClasses()}
                            onChange={guardarFecha}
                            value={fecha}
                         />
                         <br/>
                    </div>
                </CardBody>
              </Card><br/>
              <Card>
                <CardHeader className="border-bottom">
                  <ListGroupItem className="d-flex px-3 border-0">
                    <h4 className="m-0">Gestionar curso</h4>                    
                  </ListGroupItem>
                </CardHeader><br/>
                <CardBody className={Classes.cardBodyClasses}>
                    <div className={Classes.innerWrapperClasses}>
                        <Button theme="info" size="lg" className="ml-auto" onClick = { registrarAlumno } >Registrar alumno</Button>
                        <br/>
                        <Button theme="info" size="lg" className="lg-auto" onClick = { nuevoEvento } >Nuevo evento</Button>
                        <br/>
                    </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className={Classes.cardBodyClasses}>
                  <NuevoEvento
                    show={modalShow}
                    onHide={closeModal}
                    cursoId={location.cursoId}
                  />
                </CardBody>
              </Card>
          </Col>
        </Row>
        <Row>        
          <Col lg="8" md="6" sm="12" className="col-lg mb-4">
            <CardPost cursoId = {location.cursoId}></CardPost>
          </Col>
          <Col lg="4" md="6" sm="12" className="col-lg mb-4">
            <Eventos update={updateEventos} cursoId = {location.cursoId}></Eventos>
          </Col>
        </Row>
      </Container>
    );
}


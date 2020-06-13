import React,{useState, useEffect}  from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from "shards-react";
import PageTitle from "../common/PageTitle";
import Alumno from "./Alumno"
import classNames from "classnames";
import { Card, CardHeader, CardBody, ListGroupItem,Alert } from "shards-react";
import { CursoService } from '../../services/CursoService';
import { AlumnoService } from '../../services/AlumnoService';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function Cursos() { 
  const attrs = { md: "6", sm: "6" };
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [blocking, setBlocking] = useState(true);

  useEffect(() => {    
    console.log('use effect ' + fecha);
    setAlumnos([]);
    location.asistenciasAEliminar = [];
    AlumnoService.getAlumnos(location.cursoId, fecha.getTime()).then(data => {    
        console.log('alumnos');
        if(data) {
            console.log(JSON.stringify(data));        
            setAlumnos(data)            
          }
          setBlocking(false);
          if(location.fecha > new Date() || !data || data.length == 0) {
            setBlock(true);
          }
          else {
            setBlock(false);
          }
        }
    );
          
  }, [fecha]);

  function guardarAsistencias() {
      setBlocking(true);
      CursoService.guardarAsistencias(location.cursoId, location.asistencias).then(response => {
          CursoService.eliminarAsistencias(location.asistenciasAEliminar);
          setOpen(true);
          setFecha(fecha);
          setBlocking(false);
          location.asistencias = [];
          location.asistenciasAEliminar = [];
          NotificationManager.success('Se has guardado las asistencias!', '', 2000);
      });
  }

  const registrarAlumno = () => {
    history.push({
        pathname : '/registrarAlumno',
        cursoId : location.cursoId,
        cursoName : location.cursoName
    });
  };

  const guardarFecha = (date) => {
      location.fecha = date;
      setFecha(date);
  };

  const cardBodyClasses = classNames(
    "1" === "1" ? "p-0 d-flex" : "px-0 pb-0"
  );

  const valueClasses = classNames(
      "stats-small__value",
      "count",
      "1" === "1" ? "my-3" : "m-0"
  );

  const innerWrapperClasses = classNames(
      "d-flex",
      "1" === "1" ? "flex-column m-auto" : "px-3"
  );

  const dataFieldClasses = () => {
      return { 
        borderRadius: '0.5rem',
        boxShadow: '0 0.46875rem 2.1875rem rgba(90,97,105,.1), 0 0.9375rem 1.40625rem rgba(90,97,105,.1), 0 0.25rem 0.53125rem rgba(90,97,105,.12),0 0.125rem 0.1875rem rgba(90,97,105,.1);'
      }
  }

  function atras() {
      history.push({ pathname : '/' });
  }

  return ( 
      <Container fluid className="main-content-container px-4">
        <NotificationContainer/>

        <Row noGutters className="page-header py-4">
          <PageTitle title={"Curso " + location.cursoName} className="text-lg-left mb-6" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>        
          <Col lg="8" md="6" sm="12" className="col-lg mb-4">
            <Card>
              <CardHeader className="border-bottom">
                <ListGroupItem className="d-flex px-3 border-0">
                  <h4 className="m-0"> <i class="material-icons mr-1">group</i> Alumnos</h4>
                  <Button disabled={block} theme="info" size="lg" className="ml-auto" onClick = { guardarAsistencias } >Guardar asistencias</Button>
                </ListGroupItem>
              </CardHeader>
              <br/>
                {alumnos.map((alumno, idx) => (
                  <Col lg="12" md="6" sm="12" className="col-lg mb-4" key={alumno.id}>
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
                <CardBody className={cardBodyClasses}>
                  <div className={innerWrapperClasses}>
                        <Calendar style={dataFieldClasses()}
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
                <CardBody className={cardBodyClasses}>
                    <div className={innerWrapperClasses}>
                        <Button theme="info" size="lg" className="ml-auto" onClick = { registrarAlumno } >Registrar alumno</Button>
                        <br/>
                    </div>
                </CardBody>
              </Card> 
                         
          </Col>
        </Row>
      </Container>
    );
}


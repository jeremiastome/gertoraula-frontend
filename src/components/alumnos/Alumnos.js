import React,{useState, useEffect}  from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from "shards-react";
import PageTitle from "../common/PageTitle";
import Alumno from "./Alumno"
import { Card, CardHeader } from "shards-react";
import { CursosService } from '../../services/CursoService';
import { AlumnoService } from '../../services/AlumnoService';

export default function Cursos() { 
  const attrs = { md: "6", sm: "6" };
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [blocking, setBlocking] = useState(true);

  useEffect(() => {
    console.log('use effect');
    setAlumnos([]);
    AlumnoService.getAlumnos(location.cursoId, fecha.getTime()).then(data => {    
        console.log('alumnos');
        if(data) {
            console.log(JSON.stringify(data));        
            setAlumnos(data)            
          }
          setBlocking(false)
        }
    );
          
  }, [fecha]);

  function guardarAsistencias() {
      setBlocking(true);
      CursosService.guardarAsistencias(location.cursoId, location.asistencias).then(response => {
          CursosService.eliminarAsistencias(location.asistenciasAEliminar);
          setOpen(true);
          setFecha(fecha);
          setBlocking(false);
      });
  }


  function atras() {
      history.push({ pathname : '/' });
  }

  return ( 
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Curso " className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>        
          <Col lg="8" md="6" sm="12" className="col-lg mb-4">
            <Card>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Alumnos</h6>
                <Button theme="accent">Guardar asistencias</Button>
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
                    />
                  </Col>            
                ))}
            </Card>
          </Col>
          <Col lg="4" md="6" sm="12" className="col-lg mb-4">

          </Col>
        </Row>
      </Container>
    );
}


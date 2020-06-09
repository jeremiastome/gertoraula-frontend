import React,{useState, useEffect}  from "react";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../common/PageTitle";
import AlumnoItem from "./AlumnoItem";
import { AlumnoService } from '../../services/AlumnoService';
import { useAuth0 } from "./../../react-auth0-spa";

export default function AlumnosRegistrados() { 
  const attrs = { md: "6", sm: "6" };
  const [alumnosRegistrados, setAlumnosRegistrados] = useState([]);
  const [update, setUpdate] = useState(null);
  const [blocking, setBlocking] = useState(true);
  const history = useHistory();
  const { datosDeUsuario } = useAuth0();

  useEffect(() => {
    setBlocking(true);
    setAlumnosRegistrados([]);
    AlumnoService.getAlumnosByEmail(datosDeUsuario.email).then(data => { 
        setAlumnosRegistrados(data)
        setBlocking(false);
    });
  }, [update]);

  function seleccionarAlumno(cursoId, cursoName) {
      console.log(cursoId)
     /* history.push({
          pathname : '/curso',
          asistencias : [],
          fecha : new Date(),
          asistenciasAEliminar : [],
          cursoId : cursoId,
          cursoName : cursoName,
      });*/
  }
  return (    

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Alumnos registrados" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {alumnosRegistrados.map((alumno, idx) => (
            <Col lg="3" md="6" sm="12" className="col-lg mb-4" key={alumno.id} {...attrs}>
              <AlumnoItem
                id={`small-stats-${alumno.id}`}
                variation="1"
                value={alumno.nombre+' '+alumno.apellido}
                select={seleccionarAlumno}
                elemid={alumno.id}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
}

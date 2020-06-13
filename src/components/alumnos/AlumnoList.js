import React,{useState, useEffect}  from "react";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../common/PageTitle";
import AlumnoItem from "./../padres/AlumnoItem";
import { AlumnoService } from '../../services/AlumnoService';
import { useAuth0 } from "./../../react-auth0-spa";

export default function AlumnosRegistrados() { 
  const attrs = { md: "6", sm: "6" };
  const [alumnoList, setAlumnoList] = useState([]);
  const [update, setUpdate] = useState(null);
  const history = useHistory();
  const { datosDeUsuario } = useAuth0();

  useEffect(() => {
    setAlumnoList([]);
    AlumnoService.getAlumnos().then(data => { 
        setAlumnoList(data)
    });
  }, [update]);

  function seleccionarAlumno(alumno) {
      history.push({
          pathname : '/detalleAlumno',
          alumno : alumno
      });
  }
  return (    

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Alumnos registrados" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {alumnoList.map((alumno, idx) => (
            <Col lg="3" md="6" sm="12" className="col-lg mb-4" key={alumno.id} {...attrs}>
              <AlumnoItem
                id={`small-stats-${alumno.id}`}
                variation="1"
                value={alumno.nombre+' '+alumno.apellido}
                seleccionarAlumno={seleccionarAlumno}
                alumno={alumno}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
}

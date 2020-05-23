import React,{useState, useEffect}  from "react";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../common/PageTitle";
import SmallStats from "../common/SmallStats";
import { CursoService } from '../../services/CursoService';

export default function Cursos() { 
  const attrs = { md: "6", sm: "6" };
  const [listaDeCursos, setListaDeCursos] = useState([]);
  const [update, setUpdate] = useState(null);
  const [blocking, setBlocking] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setBlocking(true);
    setListaDeCursos([]);
    CursoService.getCursos().then(data => { 
        setListaDeCursos(data)
        setBlocking(false);
    });
  }, [update]);

  function seleccionarCurso(cursoId, cursoName) {
      console.log(cursoId)
      history.push({
          pathname : '/curso',
          asistencias : [],
          fecha : new Date(),
          asistenciasAEliminar : [],
          cursoId : cursoId,
          cursoName : cursoName,
      });
  }
  return (    

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Cursos" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {listaDeCursos.map((curso, idx) => (
            <Col lg="3" md="6" sm="12" className="col-lg mb-4" key={curso.id} {...attrs}>
              <SmallStats
                id={`small-stats-${curso.id}`}
                variation="1"
                value={curso.nombre}
                select={seleccionarCurso}
                elemid={curso.id}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
}

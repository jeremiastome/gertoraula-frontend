import React,{useState, useEffect}  from "react";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from "shards-react";
import PageTitle from "../common/PageTitle";
import Eventos from "../cursos/Eventos";
import CardPost from "../posts/CardPost";
import SmallStats from "../common/SmallStats";
import { useAuth0 } from "./../../react-auth0-spa";

export default function MisCursos(props) { 
  const attrs = { md: "6", sm: "6" };
  const [cursoSeleccionado, setCursoSeleccionado] = useState({});
  const [cursoId, setCursoId] = useState('');
  const [cursoName, setCursoName] = useState('');
  const [verCursos, setVerCursos] = useState(true);
  const history = useHistory();
  const { datosDeUsuario } = useAuth0();

  function seleccionarCurso(cursoId, cursoName) {
        console.log(cursoId);
        console.log(cursoName);
        setCursoId(1);
        setCursoName(cursoName);
        setVerCursos(false);        
  }
  return (    

      <Container fluid className="main-content-container px-4">
        {verCursos && 
        <div>
            <Row noGutters className="page-header py-4">
                <PageTitle title="Mis cursos" className="text-sm-left mb-3" />
            </Row>

            <Row>
            {props.listaDeCursos.map((curso, idx) => (                
                <Col lg="3" md="6" sm="12" className="col-lg mb-4" key={curso.curso_id} {...attrs}>
                {curso.id}
                <SmallStats
                    cursoId={curso.curso_id}
                    variation="1"
                    value={curso.nombre}
                    select={seleccionarCurso}
                    elemid={curso.curso_id}
                />
                </Col>
            ))}
            </Row>
        </div>
        }
        {!verCursos &&  
        <Row>  
            <Row noGutters className="page-header py-4">
                <PageTitle title={cursoName} className="text-sm-left mb-3" />
            </Row>               
            <Col lg="8" md="6" sm="12" className="col-lg mb-4">
                <CardPost cursoId = {cursoId}></CardPost>
            </Col>
            <Col lg="4" md="6" sm="12" className="col-lg mb-4">
                <Eventos cursoId = {cursoId}></Eventos>
            </Col>  
            <Button onClick={setVerCursos(!verCursos)} pill>&larr; Volver a mis cursos</Button>         
        </Row>
        }
       
      </Container>
    );
}

import React,{useState, useEffect}  from "react";
import { Container, Card, Row,Col,CardBody, Badge } from "shards-react";
import PageTitle from "../common/PageTitle";
import { CursoService } from "../../services/CursoService";

export default function Eventos(props) { 

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    CursoService.getEventos(props.cursoId).then(data => { 
        setEventos(data)
    });
  }, [props.update]);

  return (   
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Eventos" className="text-sm-left mb-3" />
        </Row>
        <Row>
          {eventos.map((evento, idx) => (
            <Col lg="12" md="6" sm="12" className="mb-4" key={idx}>
              <Card Card small className="card-post card-post--1">
                <div>
                  <Badge
                    pill
                    className={`card-post__category bg-green`}
                  >
                    Evento
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                      {evento.titulo}
                  </h5>
                  <p className="card-text d-inline-block mb-3">{evento.descripcion}</p>
                  <br/>
                  <Row>
                    <p>Fecha de Inicio: </p>
                    <span >{evento.fechaInicio}</span>
                    <p>Fecha de Fin: </p>
                    <span>{evento.fechaFin}</span>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}
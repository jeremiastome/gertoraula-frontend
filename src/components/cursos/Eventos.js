import React,{useState, useEffect}  from "react";
import { Container, Card, Row,Col,CardBody, Badge } from "shards-react";
import PageTitle from "../common/PageTitle";
import { CursoService } from "../../services/CursoService";

export default function Eventos(props) { 

  const [eventos, setEventos] = useState([]);

  const format = (date) => {
    const current_datetime = new Date(date);
    return current_datetime.getDate() + 
      "/" + (current_datetime.getMonth() + 1) + 
      "/" + current_datetime.getFullYear() + 
      " " + ("0" + current_datetime.getHours()).slice(-2) + 
      ":" + ("0" + current_datetime.getMinutes()).slice(-2); 
  }
  
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
              <Card small className="card-post card-post--1">
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
                    <p>Fecha de Inicio: { format(evento.fechaInicio)}</p>
                    <p>Fecha de Fin: { format(evento.fechaFin)}</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}
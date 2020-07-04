import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CrearAlumno from "../components/crear-alumno/CrearAlumno";

const CrearAlumnoView = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Nuevo alumno" className="text-sm-left" />
    </Row>
    <Row>
      <Col lg="9" md="12">
        <CrearAlumno />
      </Col>
    </Row>
  </Container>
);

export default CrearAlumnoView;

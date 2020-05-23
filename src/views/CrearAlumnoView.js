import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CrearAlumno from "../components/crear-alumno/CrearAlumno";
import SidebarActions from "../components/crear-alumno/SidebarActions";
import SidebarCategories from "../components/crear-alumno/SidebarCategories";

const CrearAlumnoView = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Nuevo alumno" className="text-sm-left" />
    </Row>
    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <CrearAlumno />
      </Col>
    </Row>
  </Container>
);

export default CrearAlumnoView;

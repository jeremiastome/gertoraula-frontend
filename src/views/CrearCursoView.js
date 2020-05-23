/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CrearCurso from "../components/crear-curso/CrearCurso";

const CrearCursoView = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Nuevo curso" className="text-sm-left" />
    </Row>
    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <CrearCurso />
      </Col>
    </Row>
  </Container>
);

export default CrearCursoView;

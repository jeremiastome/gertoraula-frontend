import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "shards-react";
import { useHistory, useLocation } from 'react-router-dom';
import PageTitle from "../../components/common/PageTitle";
import DetalleAlumno from "./DetalleAlumno";

const UserProfileLite = () => {
    const history = useHistory();
    const location = useLocation();
    
    return(
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        <PageTitle title={location.alumno.nombre +' '+ location.alumno.apellido} 
            subtitle="Alumno" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
        <Col lg="8">
            <DetalleAlumno alumno={location.alumno}/>
        </Col>
        </Row>
    </Container>
)};

export default UserProfileLite;

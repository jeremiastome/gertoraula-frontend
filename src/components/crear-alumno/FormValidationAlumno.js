import React, {useState} from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import { AlumnoService } from "./../../services/AlumnoService"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

export default function FormValidationAlumno(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [blocking, setBlocking] = useState(false);

  const onSubmit = data => {
    setBlocking(true);
    AlumnoService.crearAlumno(data).then(response =>  {      
        if(response.status != 200) {
            response.text().then(res => {
              NotificationManager.error(res, 'Error', 3000);
            })          
        }
        else {
          response.json().then(alumno => {
            history.push({
              pathname : '/detalleAlumno',
              alumno : alumno
            }); 
          })          
        }        
        setBlocking(false);
      }
    )
  }

  return(
    <div>
        <Card>
          <BlockUi tag="div" blocking={blocking}>
            <NotificationContainer/>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Datos del alumno</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem>
                <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>
                  <Col Col md="12" className="form-group">
                      <Row>
                        <Col Col md="6" className="form-group">
                          <FormGroup>
                              <label htmlFor="nombre">Nombre</label>
                              <Input className="form-control-alternative" required innerRef={register} 
                              name="nombre" type="text" placeholder="Ingrese nombre del alumno"/>
                          </FormGroup>
                        </Col>
                        <Col Col md="6" className="form-group">
                          <FormGroup>
                              <label htmlFor="apelldio">Apellido</label>
                              <Input className="form-control-alternative" required innerRef={register} 
                              name="apellido" type="text" placeholder="Ingrese apellido del alumno"/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col Col md="6" className="form-group">
                          <FormGroup>
                              <label htmlFor="dniCurso">Número de documento</label>
                              <Input className="form-control-alternative" required innerRef={register} 
                              name="dni" type="number" placeholder="Ingrese numero de documento del alumno"/>
                          </FormGroup>
                        </Col>
                        <Col Col md="6" className="form-group">
                          <FormGroup>
                              <label htmlFor="dniCurso">Email de contacto</label>
                              <Input className="form-control-alternative" required innerRef={register} 
                              name="emailContacto" type="email" placeholder="Ingrese email de contacto"/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col Col md="6" className="form-group">
                          <FormGroup>
                              <label htmlFor="dniCurso">Teléfono de contacto</label>
                              <Input className="form-control-alternative" innerRef={register} 
                              name="telefono" autocomplete="off" type="number" placeholder="Ingrese número de teléfono"/>
                          </FormGroup>
                        </Col>
                        <Col Col md="6" className="form-group">
                          <FormGroup>
                              <label htmlFor="dniCurso">Celular de contacto</label>
                              <Input className="form-control-alternative" innerRef={register} 
                              name="telefonoMovil" autocomplsete="off" type="number" placeholder="Ingrese número de celular"/> 
                          </FormGroup>
                        </Col>
                      </Row>
                  </Col>
                  <br/>
                  <Button type="submit">Crear alumno</Button>
                </Form>
              </ListGroupItem>
          </ListGroup>
          </BlockUi>
      </Card>
    </div>
  )
}
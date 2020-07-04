import React, {useState} from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import { CursoService } from "../../services/CursoService"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useAuth0 } from "./../../react-auth0-spa";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


export default function FormValidationCurso(props) {
  const history = useHistory();
  const [blocking, setBlocking] = useState(false);
  const { register, handleSubmit } = useForm();
  const { datosDeUsuario } = useAuth0();

  const onSubmit = data => {
    setBlocking(true);
    console.log('Submit');
    if(!validarFecha(data.fechaInicio, data.fechaFin)) {
      NotificationManager.error('La fecha de fin debe ser mayor a la fecha de inicio!', '', 2000);
      return;
    }

    console.log(JSON.stringify(data));
    data['emailDocente'] = datosDeUsuario.email;
      CursoService.crearCurso(data).then(response =>  {
          response.json().then(curso =>  {
            history.push({
              pathname : '/curso',
              asistencias : [],
              fecha : new Date(),
              asistenciasAEliminar : [],
              cursoId : curso.curso_id,
              cursoName : curso.nombre,
            });
          })
          setBlocking(false);       
        }
      );
  }

  function validarFecha(fechaInicio, fechaFin) {
    return fechaInicio < fechaFin; 
  }

  return(
    <div>
        <BlockUi tag="div" blocking={blocking}>
          <Card>
            <NotificationContainer/>
            <CardHeader className="border-bottom">
              <h6 className="m-0">Datos del curso</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem>
                  <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>  
                    <Col>
                      <Row>   
                        <Col md="12" className="form-group">                                   
                          <FormGroup>
                              <label htmlFor="feFirstName">Nombre del curso</label>
                              <Input className="form-control-alternative" required innerRef={register} 
                              name="nombre" autoComplete="off" type="text" placeholder="Ingrese nombre del curso"/>
                          </FormGroup>    
                        </Col>                              
                      </Row>
                      <Row>
                        <Col md="6" className="form-group">
                          <FormGroup>
                            <label htmlFor="feFirstName">Fecha de inicio de curso</label>
                            <Input className="form-control-alternative" required innerRef={register} 
                                name="fechaInicio" type="date"/>
                          </FormGroup> 
                        </Col>                      
                        <Col md="6" className="form-group">
                          <FormGroup> 
                            <label htmlFor="feLastName">Fecha de fin de curso</label>
                            <Input className="form-control-alternative" required innerRef={register} 
                                name="fechaFin" type="date"/>
                            </FormGroup>
                        </Col>
                      </Row>
                    </Col> 
                    
                    <Button type="submit">Crear curso</Button>               
                  </Form>   
              </ListGroupItem>
            </ListGroup>
          </Card>
        </BlockUi>
    </div>
  )
}
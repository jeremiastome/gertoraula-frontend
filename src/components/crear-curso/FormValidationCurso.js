import React from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import { CursoService } from "../../services/CursoService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function FormValidationCurso(props) {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log('Submit');
    console.log(JSON.stringify(data));
      CursoService.crearCurso(data).then(response =>  {
          NotificationManager.success('Se registró el curso correctamente!', '', 2000);
        }
      );
  }

  return(
    <div>
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
                            name="nombre" type="text" placeholder="Ingrese nombre del curso"/>
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
    </div>
  )
}
import React from "react";
import { Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {
  FormGroup,
  Form,
  Input,
  Label
} from "reactstrap";
import { ApiCalendar } from "../ApiCalendar/ApiCalendar";
import { CursoService } from "../../services/CursoService";
import { Button, ListGroup, ListGroupItem,Row,Col } from "shards-react";

export default function NuevoEvento(props) {

  const { register, handleSubmit } = useForm();   
  const defaultDate = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setHours(defaultEndDate.getHours() + 1);

  console.log('HOLAAAAAAA');
  console.log(props);
  const evento = data => {
    CursoService.crearEvento(props.cursoId, data).then(emails => {
        if(data.agregarCalendar) {
          ApiCalendar.nuevoEvento(data, emails);
        }
        props.onHide(true); 
      } 
    );           
  }
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form id="myForm" onSubmit = { handleSubmit(evento)}> 
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Crear un nuevo evento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ListGroup flush>
          <ListGroupItem>               
                <Col>
                  <Row>   
                    <Col md="12" className="form-group">                                   
                      <FormGroup>
                          <label htmlFor="feFirstName">Título</label>
                          <Input className="form-control-alternative" required innerRef={register} 
                          name="titulo" type="text"/>
                      </FormGroup>    
                    </Col>                              
                  </Row>
                  <Row>   
                    <Col md="12" className="form-group">                                   
                      <FormGroup>
                          <label htmlFor="feFirstName">Descripcion</label>
                          <Input className="form-control-alternative" innerRef={register} 
                          name="descripcion" type="textarea"/>
                      </FormGroup>    
                    </Col>                              
                  </Row>
                  <Row>
                    <Col md="6" className="form-group">
                      <FormGroup>
                        <label htmlFor="feFirstName">Fecha hora de inicio</label>
                        <Input className="form-control-alternative" defaultValue={defaultDate} required innerRef={register} 
                            name="fechaInicio" type="datetime-local"/>
                      </FormGroup> 
                    </Col>                      
                    <Col md="6" className="form-group">
                      <FormGroup> 
                        <label htmlFor="feLastName">Fecha hora de fin</label>
                        <Input className="form-control-alternative" defaultValue={defaultEndDate} innerRef={register} 
                            name="fechaFin" type="datetime-local"/>
                        </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" innerRef={register} name="agregarCalendar"/>{' '}
                        Agregar a Google Calendar
                      </Label>
                    </FormGroup>
                  </Row>
                </Col>                                  
                
          </ListGroupItem>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit">Guardar</Button>
        <Button onClick={() => props.onHide()}>Cerrar</Button>
      </Modal.Footer>
      </Form> 
    </Modal>
  );
}

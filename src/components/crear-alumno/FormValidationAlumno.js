import React from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import { AlumnoService } from "./../../services/AlumnoService"
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function FormValidationAlumno(props) {

  const { register, handleSubmit } = useForm();


  const onSubmit = data => {
    console.log(JSON.stringify(data));

    AlumnoService.crearAlumno(data).then(response =>  {
        NotificationManager.success('Se creó el alumno correctamente', '', 2000);
      }
    );
  }

  return(
    <div>
        <Card>
          <NotificationContainer/>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Datos del alumno</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem>
              <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>
                <Col Col md="12" className="form-group">
                    <FormGroup>
                        <label htmlFor="nombre">Nombre</label>
                        <Input className="form-control-alternative" required innerRef={register} 
                        name="nombre" type="text" placeholder="Ingrese nombre del alumno"/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="apelldio">Apellido</label>
                        <Input className="form-control-alternative" required innerRef={register} 
                        name="apellido" type="text" placeholder="Ingrese apellido del alumno"/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dniCurso">Número de documento</label>
                        <Input className="form-control-alternative" required innerRef={register} 
                        name="dni" type="number" placeholder="Ingrese numero de documento del alumno"/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dniCurso">Email de contacto</label>
                        <Input className="form-control-alternative" required innerRef={register} 
                        name="emailContacto" type="email" placeholder="Ingrese email de contacto"/>
                    </FormGroup>
                </Col>
                <br/>
                <Button type="submit">Crear alumno</Button>
              </Form>
            </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  )
}
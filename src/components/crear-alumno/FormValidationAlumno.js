import React from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "shards-react";
import { AlumnoService } from "./../../services/AlumnoService"

export default function FormValidationAlumno(props) {

  const { register, handleSubmit } = useForm();


  const onSubmit = data => {
    console.log(JSON.stringify(data));

    AlumnoService.crearAlumno(data);
  }

  return(
    <div>
        <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>
          <FormGroup>
              <Input className="form-control-alternative" required innerRef={register} name="nombre" type="text" placeholder="Ingrese nombre del alumno"/>
          </FormGroup>
          <FormGroup>
              <Input className="form-control-alternative" required innerRef={register} name="apellido" type="text" placeholder="Ingrese apellido del alumno"/>
          </FormGroup>
          <FormGroup>
              <Input className="form-control-alternative" required innerRef={register} name="dni" type="number" placeholder="Ingrese numero de documento del alumno"/>
          </FormGroup>
          <Button type="submit">Crear alumno</Button>
        </Form>
    </div>
  )
}
import React from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "shards-react";
import { CursoService } from "../../services/CursoService"

export default function FormValidationCurso(props) {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(JSON.stringify(data));

    CursoService.crearCurso(data);
  }

  return(
    <div>
        <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>
          <FormGroup>
              <Input className="form-control-alternative" required innerRef={register} name="nombre" type="text" placeholder="Ingrese nombre del curso"/>
          </FormGroup>
          <Button type="submit">Crear curso</Button>
        </Form>
    </div>
  )
}
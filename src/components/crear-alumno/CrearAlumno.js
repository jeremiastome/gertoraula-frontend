import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";
import {
  FormGroup,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import { AlumnoService } from "../../services/AlumnoService";
import FormValidationAlumno  from "../crear-alumno/FormValidationAlumno";

export default function CrearAlumno() {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(JSON.stringify(data));

    AlumnoService.crearAlumno(data);
  }

  return(
    <div>
      <FormValidationAlumno />
    </div>
  )
}

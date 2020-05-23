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
import { CursoService } from "../../services/CursoService";
import FormValidationCurso  from "../crear-curso/FormValidationCurso";

export default function CrearCurso() {

  const { register, handleSubmit } = useForm();

  return(
    <div>
      <FormValidationCurso />
    </div>
  )
}

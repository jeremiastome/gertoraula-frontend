import React, {useState} from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput,Col } from "shards-react";
import {
  FormGroup,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import { AlumnoService } from "../../services/AlumnoService";
import FormValidationAlumno  from "../crear-alumno/FormValidationAlumno";


export default function CrearAlumno() {

  const { register, handleSubmit } = useForm();

  return(
    <div>
        <FormValidationAlumno />        
    </div>
  )
}

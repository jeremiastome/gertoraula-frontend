import React, {useState} from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import FormValidationAlumno  from "../crear-alumno/FormValidationAlumno";


export default function CrearAlumno() {
  return(
    <div>
        <FormValidationAlumno />        
    </div>
  )
}

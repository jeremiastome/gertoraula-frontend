import React,{useState, useEffect} from "react";
import {
    FormGroup,
    Form,
    Input
  } from "reactstrap";

import { useForm } from "react-hook-form";

import { AlumnoService } from '../services/AlumnoService';


export default function CrearAlumnos(props) {

    const { register, handleSubmit } = useForm();

    const { nombre, setNombre } = useState({});

    const onSubmit = data => {
        console.log(JSON.stringify(data));
    
        AlumnoService.crearAlumno(data).then(response => {
            cerrarModal()
        });
    }

    const cerrarModal = () => {
        props.cerrarModal();
    }

    /*<Form id="myForm" onSubmit = { handleSubmit(onSubmit) }>
                <Form.Group controlId="crearAlumno">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required ref = {register} type="text" placeholder="Ingrese nombre del alumno"  name = "nombre"/>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required ref = {register} type="text" placeholder="Ingrese apellido del alumno"  name = "apellido"/>
                    <Form.Label>Nro. Documento</Form.Label>
                    <Form.Control required ref = {register} type="number" placeholder="Ingrese apellido del alumno"  name = "dni"/>
                </Form.Group>


                  innerRef={(a) => console.log(a)}
            </Form>*/
    return(
        <div>
            <Form id="myForm" onSubmit = { handleSubmit(onSubmit) }>
              <FormGroup>
                  <Input className="form-control-alternative" required innerRef={register} name="nombre" type="text" placeholder="Ingrese nombre del alumno"/>
              </FormGroup>
              <FormGroup> 
                  <Input className="form-control-alternative" required innerRef={register} name="apellido" type="text" placeholder="Ingrese apllido"/>
              </FormGroup>
              <FormGroup> 
                  <Input className="form-control-alternative" required innerRef={register} name="dni" type="number" placeholder="Ingrese numero de documento"/>
              </FormGroup>
            </Form>
        </div>
    )
}

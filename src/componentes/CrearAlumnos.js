import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { AlumnoService } from '../services/AlumnoService';


export default function CrearAlumnos() {

    const { register, handleSubmit } = useForm();

    const onSubmit = data => AlumnoService.crearAlumno(data);

    return(
        <div>
            <Form onSubmit = { handleSubmit(onSubmit) }>
                <Form.Group controlId="crearAlumno">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control required ref = {register} type="text" placeholder="Ingrese nombre del alumno"  name = "nombre"/>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control required ref = {register} type="text" placeholder="Ingrese apellido del alumno"  name = "apellido"/>
                    <Form.Label>Nro. Documento</Form.Label>
                    <Form.Control required ref = {register} type="text" placeholder="Ingrese apellido del alumno"  name = "dni"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Crear alumno
                </Button>
            </Form>
        </div>
    )
}

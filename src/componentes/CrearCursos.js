import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { CursosService } from '../services/CursoService';



export default function CrearCursos() {

    const { register, handleSubmit } = useForm();

    const onSubmit = data => CursosService.crearCurso(data).then(response => {
        CursosService.getCursos();
    });


    return(
        <div>
            <Form onSubmit = { handleSubmit(onSubmit) }>
                <Form.Group controlId="crearCurso">
                    <Form.Label>Nombre del curso</Form.Label>
                    <Form.Control ref = {register} type="text" placeholder="Ingrese nombre del curso"  name = "nombre"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Crear curso
                </Button>
            </Form>
        </div>
    )
}
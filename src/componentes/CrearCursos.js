import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { CursosService } from '../services/CursoService';
import { useHistory, useLocation } from 'react-router-dom';


export default function CrearCursos(props) {
    const location = useLocation();

    const { register, handleSubmit } = useForm();

    const onSubmit = data => CursosService.crearCurso(data).then(response => {
        cerrarModal()
        location.cursos = {}
    });

    const cerrarModal = () => {
        props.cerrarModal();
    }


    return(
        <div>
            <Form onSubmit = { handleSubmit(onSubmit) }>
                <Form.Group controlId="crearCurso">
                    <Form.Label>Nombre del curso</Form.Label>
                    <Form.Control required ref = {register} type="text" placeholder="Ingrese nombre del curso"  name = "nombre"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Crear curso
                </Button>
                <Button variant = "primary" onClick = { cerrarModal }>
                    Cerrar
                </Button>
            </Form>
        </div>
    )
}
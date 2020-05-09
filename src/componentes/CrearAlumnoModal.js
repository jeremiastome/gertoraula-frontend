import React,{useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrearAlumnos from './CrearAlumnos';

export default function CrearCursoModal() {

    const [modalAlumno, setModalAlumno] = React.useState(false);

    const abrirModalAlumno = () => setModalAlumno(true);
    const cerrarModalAlumno = () => setModalAlumno(false);

    return(
        <div>
            <Button variant = "primary" onClick = { abrirModalAlumno }>
                Crear alumno
              </Button>              
              <Modal show={modalAlumno} onHide={ cerrarModalAlumno }>
                <Modal.Header closeButton>
                  <Modal.Title>Nuevo alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body><CrearAlumnos /></Modal.Body>
                <Modal.Footer>
                  <Button variant = "secondary" onClick = { cerrarModalAlumno }>
                    Guardar
                  </Button>
                  <Button variant = "primary" onClick = { cerrarModalAlumno }>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>              
        </div>
    )
}
import React,{useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrearCursos from './CrearCursos';

export default function CrearCursoModal(props) {

    const [modalCurso, setModalCurso] = React.useState(false);

    const abrirModalCurso = () => setModalCurso(true);
    const cerrarModalCurso = () => { 
        props.refresh({});
        setModalCurso(false); 
    }

    return(
        <div>
            <Button variant = "primary" onClick = { abrirModalCurso }>
                Crear curso
            </Button>
            <Modal show={modalCurso} onHide={ cerrarModalCurso }>
                <Modal.Header closeButton>
                  <Modal.Title>Nuevo curso</Modal.Title>
                </Modal.Header>
                <Modal.Body><CrearCursos cerrarModal={cerrarModalCurso}/></Modal.Body>
              </Modal>
        </div>
    )
}
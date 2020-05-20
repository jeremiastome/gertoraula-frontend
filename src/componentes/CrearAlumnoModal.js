import React,{useState, useEffect} from "react";
//import Modal from 'react-bootstrap/Modal'
//import Button from 'react-bootstrap/Button';

import { Button, Modal } from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import CrearAlumnos from './CrearAlumnos';

export default function CrearCursoModal() {

    const [modalAlumno, setModalAlumno] = React.useState(false);

    //const abrirModalAlumno = () => setModalAlumno(true);
    //const cerrarModalAlumno = () => setModalAlumno(false);
    const cerrarModalAlumno = () => { 
      setModalAlumno(false); 
  }
    return(
        <div>
            <Button color="primary" type="button" onClick = {  () => setModalAlumno(true) }>
                Crear alumno
              </Button>              
              <Modal
                className="modal-dialog-centered"
                isOpen={modalAlumno}
              >
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                  Crear alumno
                  </h5>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setModalAlumno(false)}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <CrearAlumnos  cerrarModal={cerrarModalAlumno}/>
                </div>
                <div className="modal-footer">
                  <Button color="primary" form="myForm" key="submit" type="submit">
                    Guardar 
                  </Button>
                  <Button                   
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setModalAlumno(false)}
                  >
                    Cerrar
                  </Button>
                  
                </div>
              </Modal>             
        </div>
    )
}
import React from "react";
import {
  Snackbar,
  Button,
  responsiveFontSizes,
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Alumno from './Alumno';
import { useLocation } from 'react-router-dom';
import { CursosService } from '../services/CursoService';

export default function Alumnos() {

    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    function guardarAsistencias() {        
        CursosService.guardarAsistencias(location.cursoId, location.asistencias).then(response => {
            CursosService.eliminarAsistencias(location.asistenciasAEliminar);
            setOpen(true);            
        });      
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
            setOpen(false);
    };

    return(
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Se guardaron las asistencias!
                </Alert>
            </Snackbar>
            <h1>
                Asistencias alumnos
            </h1>
            { location.alumnos.map(data => {
                return(
                    <Alumno key = { data.id } alumno = { data } />
                );
            })};
            <div>
                <Button variant = "contained" color = "primary" onClick = {() => { guardarAsistencias(location.cursoId) }}> Guardar </Button>
            </div>
        </div>
    )
}
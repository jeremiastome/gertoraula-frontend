import React from "react";
import { useEffect } from "react";
import {
  withStyles,
  Card,
  Snackbar,
  Button,
  CardContent,
  Typography
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from "prop-types";
import Styles from "../style/Styles";
import Alumno from './Alumno';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link, useParams, Switch, useLocation } from 'react-router-dom';

export default function Alumnos() {

    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    function guardarAsistencias(id) {
        console.log('guardarAsistencias ' + id);
        if (!location.asistencias || !id) return;
        console.log(location.asistencias);

        fetch("http://localhost:8080/cursos/" + id, {
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(location.asistencias)
        })
        .then(res => console.log('res ' + res))
        setOpen(true);
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
import React, {useState} from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/Styles";
import { useHistory, useLocation } from "react-router-dom";

export default function Alumno(props) {

    const location = useLocation();
    var asistencias = location.asistencias;
    const [presente, setPresente] = useState(false);

    function agregarAsistencia() {
        console.log(asistencias);
        setPresente(!presente);
        if (!asistencias.some(e => e.alumnoId === props.alumno.id)) {
            var asistencia = {
                fechaDeAsistencia : "2020-08-10T15:50:05",
                alumnoId: props.alumno.id
            }
            asistencias.push(asistencia);
        } else {
            var index = asistencias.indexOf(props.alumno.id);
            asistencias.splice(index, 1);
        }
        console.log(asistencias);
    }

    const estilos = {
        background : presente ? '#80cbc4' : ''
    }

    return(
        <Card style = { estilos } elevation = { 1 } onClick = { agregarAsistencia }>
            <CardContent>
                <Typography variant = "h5">
                    { props.alumno.nombre } { props.alumno.apellido }
                </Typography>
            </CardContent>
        </Card>
    )
}
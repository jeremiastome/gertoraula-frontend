import React, {useState} from "react";
import {
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

export default function Alumno(props) {

    const location = useLocation();
    var asistencias = location.asistencias;
    const [asistencia, setAsistencia] = useState(props.alumno.asistencia);

    function agregarAsistencia() {
        console.log(asistencias);
        if (!asistencia) {
            var asistenciaNueva = {
                fechaDeAsistencia : "2020-08-10T15:50:05",
                alumnoId: props.alumno.id
            }
            setAsistencia(asistenciaNueva);
            if (!props.alumno.asistencia) {
                asistencias.push(asistenciaNueva);
            }
        } else {
            var index = asistencias.indexOf(props.alumno.id);
            asistencias.splice(index, 1);
            setAsistencia(null);
        }
        console.log(asistencias);
    }

    const estilos = () => {
        console.log(asistencia);
        return { background : asistencia ? '#80cbc4' : ''}
    }

    return(
        <Card style = { estilos() } elevation = { 1 } onClick = { agregarAsistencia }>
            <CardContent>
                <Typography variant = "h5">
                    { props.alumno.nombre } { props.alumno.apellido }
                </Typography>
            </CardContent>
        </Card>
    )
}
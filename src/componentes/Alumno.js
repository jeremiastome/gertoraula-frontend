import React, {useState} from "react";
import {
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

export default function Alumno(props) {

    const location = useLocation();
    const [asistencia, setAsistencia] = useState(props.alumno.asistencia);

    function agregarAsistencia() {
        if (!asistencia) {
            var asistenciaNueva = {
                fechaDeAsistencia : location.fecha,
                alumnoId: props.alumno.id,
                curso_id: location.cursoId
            }
            setAsistencia(asistenciaNueva);
            if (!props.alumno.asistencia) {
                location.asistencias.push(asistenciaNueva);
            }
            var index = location.asistenciasAEliminar.indexOf(props.alumno.id);

            location.asistenciasAEliminar = location.asistenciasAEliminar.filter(function( asist ) {
                return asist.alumnoId !== props.alumno.id;
            });

        } else {
            //var index = asistencias.indexOf(props.alumno.id);
            location.asistencias = location.asistencias.filter(function( asist ) {
                console.log('filter');
                return asist.alumnoId !== props.alumno.id;
            });
            console.log(location.asistencias.length);
            //asistencias.splice(index, 1);
            setAsistencia(null);

            if(props.alumno.asistencia) {
                location.asistenciasAEliminar.push(props.alumno.asistencia);
            }
        }
        console.log('a eliminar');
        console.log(location.asistenciasAEliminar.length);
    }

    const estilos = () => {
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
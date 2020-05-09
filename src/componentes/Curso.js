import React from "react";
import {
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';


export default function Curso(props) {

    const history = useHistory();

    function seleccionarCurso() {
        history.push({
            pathname : '/curso',
            asistencias : [],
            fecha : new Date(),
            asistenciasAEliminar : [],
            cursoId : props.curso.id
        });
    }

    return(
        <div>
            <Card elevation = { 1 }
                onClick = { seleccionarCurso }>
                <CardContent>
                    <Typography variant = "h5">
                        { props.curso.nombre }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
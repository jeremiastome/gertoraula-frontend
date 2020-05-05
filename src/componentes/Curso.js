import React , {useState} from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/Styles";
import Alumnos from './Alumnos';
import { BrowserRouter as Router, Route, Link, useParams, Switch, useLocation, useHistory } from 'react-router-dom';

export default function Curso(props) {

    const history = useHistory();

    function seleccionarCurso() {
        history.push({
            pathname : '/alumnos',
            alumnos : props.curso.alumnos,
            asistencias : props.curso.asistencias,
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
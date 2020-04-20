import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/Styles";
import { useHistory } from "react-router-dom";

const Curso = props => {

    const history = useHistory();
    const {
        classes,
        curso,
        seleccionarCurso
    } = props
      
    const selecCurso = () => {
        seleccionarCurso(curso);
        history.push('/alumnos');
    };
    return(
        <Card className={classes.card} elevation={1} 
            onClick={selecCurso}>
            <CardContent>          
                <Typography variant="h5" className={classes.name}>
                    {curso.nombre}
                </Typography>
            </CardContent>
        </Card>
    )
}

Curso.propTypes = {
    classes: PropTypes.object.isRequired,
    curso: PropTypes.object.isRequired
};

export default withStyles(Styles)(Curso);
  
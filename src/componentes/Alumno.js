import React, {useState} from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/Styles";
import { useHistory } from "react-router-dom";

const Alumno = props => {

    const [presente, serPresente] = useState(false)
    const history = useHistory();
    const {
        classes,
        Id,
        alumno,
        agregarAsistencia
    } = props
    
    
    const agregar = () => { 
        console.log(alumno);
        serPresente(!presente);
        var asistencia = {
            fechaDeAsistencia : "2020-08-10T15:50:05",
            alumnoId: alumno.id
        }            
        agregarAsistencia(asistencia);        
    };

    const estilos = {
        background : presente ? '#80cbc4' : ''
    }

    return(
        <Card style={estilos} className={classes.card} elevation={1} onClick={agregar}>
            <CardContent>          
                <Typography variant="h5" className={classes.name}>
                    {alumno.nombre} {alumno.apellido}
                </Typography>
            </CardContent>
        </Card>
    )
}

Alumno.propTypes = {
    classes: PropTypes.object.isRequired,
    alumno: PropTypes.object.isRequired
};

export default withStyles(Styles)(Alumno);
  
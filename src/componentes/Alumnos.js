import React from "react";
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
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Alumnos = props => {
    
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
            marginTop: theme.spacing(2),
            },
        },
    }));

        
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const {
        id,
        nombre,
        alumnos,
        agregarAsistencia,
        guardarAsistencias
    } = props  
      
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const guardar = () => {
        setOpen(true);
        console.log(guardarAsistencias(id));
    };

    const atras = () => {
        history.goBack();
    };

    return(
        <div style={{alignContent: "center"}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Se guardaron las asistencias!
                </Alert>
            </Snackbar>

            <h1 style={{textAlign: "center"}}> Asistencias alumnos</h1>
                {alumnos.map(data => {
                return(
                    <div>
                        <Alumno key={data.id} id={id} alumno={data} 
                            agregarAsistencia={agregarAsistencia}></Alumno>                    
                    </div>
                );
                    
                })}
                <div style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary" onClick={guardar}>Guardar</Button>

                    <Button variant="contained" onClick={atras} >Atras</Button>
                </div>
        </div>
    )
}

Alumnos.propTypes = {
    id: PropTypes.number,
    nombre: PropTypes.string.isRequired,
    alumnos: PropTypes.array.isRequired,
    guardarAsistencias: PropTypes.func.isRequired,
};

export default withStyles(Styles)(Alumnos);
  
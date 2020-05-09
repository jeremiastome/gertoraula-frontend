import 'date-fns';
import React, {useState, useEffect} from "react";
import {
  Snackbar,
  Button,
  Card
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MuiAlert from '@material-ui/lab/Alert';
import Alumno from './Alumno';
import { useLocation } from 'react-router-dom';
import { CursosService } from '../services/CursoService';
import { useHistory } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const useStyles = makeStyles({
    root: {
      minWidth: 500,
      maxWidth: 500
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  
function Alumnos() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [fecha, setFecha] = useState(new Date());
    const [alumnos, setAlumnos] = useState([]);
    const [blocking, setBlocking] = useState(true);
    
    
    useEffect(() => {
        console.log('use effect');
        setAlumnos([]);
        CursosService.getAlumnos(location.cursoId, fecha.getTime()).then(data => {            
                setAlumnos(data)
                setBlocking(false)
            }
        );
            
    }, [fecha]);

    function guardarAsistencias() {
        setBlocking(true);
        CursosService.guardarAsistencias(location.cursoId, location.asistencias).then(response => {
            CursosService.eliminarAsistencias(location.asistenciasAEliminar);
            setOpen(true);
            setFecha(fecha);
            setBlocking(false);
        });
    }
    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleDateChange = (date) => {
        setBlocking(true);
        location.fecha = date;
        setFecha(date);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };    

    return(
        <BlockUi tag="div" blocking={blocking}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>            
                <Card className={classes.root}>          
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Se guardaron las asistencias!
                        </Alert>
                    </Snackbar>
                    <div style={{ margin: 20,  textAlignLast: "center" }}>
                        <h1>
                            Asistencias alumnos
                        </h1>                
                    </div>
                    <Grid container justify="flex-end">
                        <div style={{ marginTop: 10 }}>
                            <h2 >Fecha: </h2> 
                        </div>
                        <div style={{ marginBottom: 10, paddingLeft: 5 }}>                        
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label=""
                                    value={fecha}
                                    format="dd/MM/yyyy"
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                            </MuiPickersUtilsProvider>
                        </div>
                    </Grid>
                    <div>
                        { alumnos.map(data => {
                            return(
                                <Alumno key = { data.id } alumno = { data } />
                            );
                        })}
                    </div>
                    <div style={{ paddingTop: 20, float: "right" }}>
                        <Button variant = "contained" color = "primary" onClick = {() => { guardarAsistencias(location.cursoId) }}> Guardar </Button>
                        <Button variant = "contained" onClick = {() => { history.goBack() }}  style={{ marginLeft: 5}}> Atras </Button>
                    </div>
                
                </Card>
            </div>
        </BlockUi>
    )
}

export default Alumnos;
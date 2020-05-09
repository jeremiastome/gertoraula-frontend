import React,{useState, useEffect} from "react";
import Curso from './Curso';
import CrearCursoModal from './CrearCursoModal';
import { CursosService } from '../services/CursoService';
import { makeStyles } from '@material-ui/core/styles';
import BlockUi from 'react-block-ui';

import {
    Snackbar,
    Button,
    Card
  } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 600,
        maxWidth: 600
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

export default function Cursos() {
    const classes = useStyles();
    const [listaDeCursos, setListaDeCursos] = useState([]);
    const [update, setUpdate] = useState(null);
    const [blocking, setBlocking] = useState(true);

    useEffect(() => {
        setBlocking(true);
        setListaDeCursos([]);
        CursosService.getCursos().then(data => { 
            setListaDeCursos(data)
            setBlocking(false);
        });
    }, [update]);

    return(
        <BlockUi tag="div" blocking={blocking}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>            
            <Card className={classes.root}>   
                <h1>
                    Cursos
                </h1>
                <CrearCursoModal refresh={setUpdate} />
                { listaDeCursos.map(data => {
                    return(
                        <Curso key = { data.id } curso = { data } />
                    );
                })}
            </Card>
            </div>
        </BlockUi>
    )
}
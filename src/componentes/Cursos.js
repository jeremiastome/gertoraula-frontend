import React,{useState, useEffect} from "react";
import Curso from './Curso';
import { CursosService } from '../services/CursoService';

export default function Cursos() {

    const [listaDeCursos, setListaDeCursos] = useState([]);

    useEffect(() => {
        CursosService.getCursos().then(data => setListaDeCursos(data));
    }, []);

    return(
        <div>
            <h1>
                Cursos
            </h1>
            { listaDeCursos.map(data => {
                return(
                    <Curso key = { data.id } curso = { data } />
                );
            })};
        </div>
    )
}
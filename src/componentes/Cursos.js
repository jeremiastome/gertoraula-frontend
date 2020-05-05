import React from "react";
import PropTypes from "prop-types";
import Curso from './Curso';

export default function Cursos(props) {

    return(
        <div>
            <h1>
                Cursos
            </h1>
            { props.listaDeCursos.map(data => {
                return(
                    <Curso key = { data.id } curso = { data } />
                );
            })};
        </div>
    )
}
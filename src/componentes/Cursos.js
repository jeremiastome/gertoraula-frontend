import React from "react";
import PropTypes from "prop-types";
import Curso from './Curso';

const Cursos = props => {
    const {listaCursos, seleccionarCurso} = props;
    return(
        <div>
            <h1 style={{textAlign: "center"}}> Cursos</h1>
            {listaCursos.map(data => {
                return (
                    <Curso key={data.id} curso={data} seleccionarCurso={seleccionarCurso}
                />
                );
            })}
        </div>
    )
}

Cursos.propTypes = {
    listaCursos: PropTypes.array.isRequired
};
export default Cursos;
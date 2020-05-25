import React, {useState} from "react";
import classNames from "classnames";
import { Card, CardBody } from "shards-react";
import { useLocation } from "react-router-dom";

export default function Alumno(props) {

    const [hover, setHover] = useState(false);
    const [linkStyle, setLinkStyle] = useState({color: '#000'});
    const location = useLocation();
    const [asistencia, setAsistencia] = useState(props.alumno.asistencia);

    const showPointer =() => {
        setHover({color: '#ed1212', cursor: 'pointer'});
    } 

    const hidePointer =() => {
        setHover({color: '#000'});
    } 

    function agregarAsistencia() {
        if (!asistencia) {
            var asistenciaNueva = {
                fechaDeAsistencia : location.fecha,
                alumnoId: props.alumno.id,
                curso_id: location.cursoId
            }
            setAsistencia(asistenciaNueva);
            if (!props.alumno.asistencia) {
                location.asistencias.push(asistenciaNueva);
            }
            var index = location.asistenciasAEliminar.indexOf(props.alumno.id);
            console.log('asistencias');
            console.log(location.asistencias.length);
            console.log(location.asistencias);
            location.asistenciasAEliminar = location.asistenciasAEliminar.filter(function( asist ) {
                return asist.alumnoId !== props.alumno.id;
            });

        } else {
            //var index = asistencias.indexOf(props.alumno.id);
            location.asistencias = location.asistencias.filter(function( asist ) {
                console.log('filter');
                return asist.alumnoId !== props.alumno.id;
            });
            console.log(location.asistencias.length);
            //asistencias.splice(index, 1);
            setAsistencia(null);

            if(props.alumno.asistencia) {
                location.asistenciasAEliminar.push(props.alumno.asistencia);
            }
            console.log('asis ' + props.alumno.asistencia);
        }
        console.log('a eliminar');
        console.log(location.asistenciasAEliminar.length);
        console.log(location.asistenciasAEliminar);
    }

    const estilos = () => {
        return { background : asistencia ? '#80cbc4' : ''}
    }

    const cardClasses = classNames(
      "stats-small",
      props.variation && `stats-small--${props.variation}`
    );

    const cardBodyClasses = classNames(
        props.variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
    );

    const valueClasses = classNames(
        "stats-small__value",
        "count",
        props.variation === "1" ? "my-3" : "m-0"
    );

    const innerWrapperClasses = classNames(
        "d-flex",
        props.variation === "1" ? "flex-column m-auto" : "px-3"
    );

        const dataFieldClasses = classNames(
        "stats-small__data",
        props.variation === "1" && "text-center"
    );

    return (      
      <div style={{linkStyle}} onMouseEnter={showPointer} onMouseLeave={hidePointer} >
        <Card style = { estilos() } onClick = { agregarAsistencia } small className={cardClasses}>

          <CardBody className={cardBodyClasses}>
            <div className={innerWrapperClasses}>
                <div className={dataFieldClasses}>
                    <h6 className={valueClasses}>{props.value}</h6>
                </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

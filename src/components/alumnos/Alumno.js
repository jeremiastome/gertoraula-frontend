import React, {useState, useEffect} from "react";
import classNames from "classnames";
import { Card, 
    CardBody, Col, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink} from "shards-react";
import { useLocation } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AlumnoService } from '../../services/AlumnoService';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default function Alumno(props) {
    const {refresh } = props;
    const [hover, setHover] = useState(false);
    const [asistio, setAsistio] = useState('done');
    const [removeVisible, setRemoveVisible] = useState(true);
    const [block, setBlock] = useState(false);
    const [linkStyle, setLinkStyle] = useState({color: '#000'});
    const location = useLocation();
    const [asistencia, setAsistencia] = useState(props.alumno.asistencia);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if(location.fecha > new Date()) {
            setBlock(true);
            setAsistio('block');
        }
        else if(props.alumno.asistencia) {
            setAsistio('clear');
        }
        else {
            setAsistio('done');
        }
              
      }, []);

    const showPointer =() => {
        setHover({color: '#ed1212', cursor: 'pointer'});
    } 

    const hidePointer =() => {
        setHover({color: '#000'});
    } 

    function removerAlumno() {
        console.log('removerAlumno');
        
        AlumnoService.removerAlumno(location.cursoId, props.alumno.id).then(data => {
                NotificationManager.success('Se ha removido el alumno de la clase', '', 2000);
                setAnchorEl(null);
                refresh(new Date());
            }
        );
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    function agregarAsistencia() {
        if(block) return;
        if(asistio == 'done') {
            setAsistio('clear');
        }
        else {
            setAsistio('done');
        }
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
        return { background : asistencia || block ? '' : '#80cbc4'}
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
        <NotificationContainer/>
        <Card style = { estilos() } small className={cardClasses}>

          <CardBody className={cardBodyClasses}> 
            <Col className={cardBodyClasses} lg="1" onClick = { agregarAsistencia }>
                <div className={innerWrapperClasses}>
                    <div className={dataFieldClasses}>
                        <h6 className={valueClasses}><i class="material-icons mr-1">{asistio}</i></h6>
                    </div>
                </div>
            </Col>          
            <Col className={cardBodyClasses} lg="10" onClick = { agregarAsistencia }>
                <div className={innerWrapperClasses}>
                    <div className={dataFieldClasses}>
                        <h6 className={valueClasses}>{props.value}</h6>
                    </div>
                </div>
            </Col>
            <Col className={cardBodyClasses} lg="1">
                <div className={innerWrapperClasses}>
                    <div className={dataFieldClasses}>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem key="Remover alumno" onClick={removerAlumno}>
                                Remover alumno
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Col>
          </CardBody>
        </Card>
      </div>
    );
  }

import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { AlumnoService } from '../../services/AlumnoService';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import PageTitle from "../common/PageTitle";
import Icons from "@material-ui/icons";
import { Container, Row, Card, CardHeader } from "shards-react";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { CursoService } from '../../services/CursoService';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function BuscadorDeAlumnos() {
    const history = useHistory();
    const location = useLocation();

    const columnas = [ 
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Nro Documento', field: 'dni', type: 'numeric' }
    ];   

    const [state, setState] = useState({
        columns: columnas,
        data: [],
    });

    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        AlumnoService.getAllAlumnos(location.cursoId).then(res => {            
            setState({
                columns: columnas,
                data: res,
            })
        }
        );        
    }, []);

    function atras() {
        history.push({
            pathname : '/curso',
            asistencias : [],
            fecha : new Date(),
            asistenciasAEliminar : [],
            cursoId : location.cursoId,
            cursoName : location.cursoName

        });
    }

    function agregarAlumnos(data) {
        setAlumnos(data);
    }

    function registrar() {
        CursoService.agregarAlumnos(location.cursoId, alumnos).then(
            (res) => {
                atras()
            }
        )
    }

    return (
        <Container fluid className="main-content-container px-4">
            <NotificationContainer/>

            <Row noGutters className="page-header py-4">
            <PageTitle title={"Registrar alumnos al curso: " + location.cursoName} className="text-lg-left mb-6" />
            </Row>

            <Card>
                <br/>
                <MaterialTable
                    icons={tableIcons}
                    title=""
                    columns={state.columns}
                    data={state.data}
                    options={{
                        selection: true
                    }}
                    onSelectionChange={agregarAlumnos}
                />
                <br/>
                <div>
                <Button size="sm" theme="info" className="mb-2 mr-1" onClick = {registrar} > Registrar </Button>
                <Button size="sm" theme="secondary" className="mb-2 mr-1" onClick = {atras} > Atras </Button>
                </div>
            </Card> 
        </Container>
    );
}
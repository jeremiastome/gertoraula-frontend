import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { AlumnoService } from '../services/AlumnoService';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Icons from "@material-ui/icons";

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
import { CursosService } from '../services/CursoService';

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
            cursoId : location.cursoId
        });
    }

    function agregarAlumnos(data) {
        setAlumnos(data);
    }

    function registrar() {
        CursosService.agregarAlumnos(location.cursoId, alumnos).then(
            (res) => {
                atras()
            }
        )
    }

    return (
        <div>
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
            <Button variant = "contained" onClick = {registrar}  style={{ marginLeft: 5}}> Registrar </Button>
            <Button variant = "contained" onClick = {atras}  style={{ marginLeft: 5}}> Atras </Button>
        </div>
    );
}
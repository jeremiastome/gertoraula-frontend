import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrearCursos from './CrearCursos';
import CrearAlumnos from './CrearAlumnos';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function MenuAppBar() {

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalCurso, setModalCurso] = React.useState(false);
  const [modalAlumno, setModalAlumno] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const abrirModalCurso = () => setModalCurso(true);
  const cerrarModalCurso = () => setModalCurso(false);
  const abrirModalAlumno = () => setModalAlumno(true);
  const cerrarModalAlumno = () => setModalAlumno(false);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Alumnos
          </Typography>
          {auth && (
            <div>
              <Button variant = "primary" onClick = { abrirModalAlumno }>
                Crear alumno
              </Button>
              <Button variant = "primary" onClick = { abrirModalCurso }>
                Crear curso
              </Button>
              <Modal show={modalAlumno} onHide={ cerrarModalAlumno }>
                <Modal.Header closeButton>
                  <Modal.Title>Nuevo alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body><CrearAlumnos /></Modal.Body>
                <Modal.Footer>
                  <Button variant = "secondary" onClick = { cerrarModalAlumno }>
                    Guardar
                  </Button>
                  <Button variant = "primary" onClick = { cerrarModalAlumno }>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={modalCurso} onHide={ cerrarModalCurso }>
                <Modal.Header closeButton>
                  <Modal.Title>Nuevo curso</Modal.Title>
                </Modal.Header>
                <Modal.Body><CrearCursos /></Modal.Body>
                <Modal.Footer>
                  <Button variant = "secondary" onClick = { cerrarModalCurso }>
                    Guardar
                  </Button>
                  <Button variant = "primary" onClick = { cerrarModalCurso }>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Salir</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

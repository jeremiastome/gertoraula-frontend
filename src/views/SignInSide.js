import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Container, Row, Col, Button, Navbar, Card } from "shards-react";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SidebarMainNavbar from "./../components/layout/MainSidebar/SidebarMainNavbar"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "../react-auth0-spa";
import classNames from "classnames";
import TabContext from '@material-ui/lab/TabContext';
import { Tab } from '@material-ui/core';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import PageTitle from "../components/common/PageTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  background : { color : 'Red'},
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [value, setValue] = React.useState(null);
  const [color1, setColor1] = React.useState(null);
  const [color2, setColor2] = React.useState(null);

  useEffect(() => {
    const rolUsuario = localStorage.getItem('rol');
    if(rolUsuario == 'alumno') {
      setValue(rolUsuario);
      localStorage.setItem('rol', rolUsuario);
      setColor1('#ff9494');
      setColor2('#421010');
    }
    else {
      localStorage.setItem('rol', 'docente');
      setValue('docente');
      setColor1('#11cdef');
      setColor2('#00357b');
    }    
  }, []);

  const classesNav = classNames(
    "main-navbar",
    "bg-white"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('rol', newValue);
    if(newValue == 'docente') {
      setColor1('#11cdef');
      setColor2('#00357b');
    }
    else {
      setColor1('#ff9494');
      setColor2('#421010');
    }    
  };


  
  return (
    <div style={{background: `linear-gradient(87deg, ${color1}, ${color2} 100%)`, height:"100vh"}}>
      <Row style={{backgroundColor: 'white'}}>
        <Col
          tag="aside"
          className={classes}
          lg={{ size: 2 }}
          md={{ size: 10 }}
        >
          <SidebarMainNavbar  />
        </Col>
        <Col>
          <div className={classes}>
            <TabContext value={value}>
              <TabList onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Alumnos" value="alumno" />
                  <Tab label="Docentes" value="docente" />
              </TabList>
            </TabContext>
          </div> 
        </Col> 
      </Row>
      <Row >
        <Col lg="4">    
        </Col>   
        <Col lg="4"> 
          <div style={{padding: '50px', textAlign: '-webkit-center'}}>
            <h2 style={{color: 'white'}}>Bienvenido!</h2> 
            <h3 style={{color: 'white'}}>Ingresar como {value}</h3> 
          </div>
        </Col> 
      </Row>  
      <Row >
        <Col lg="4">    
        </Col>     
        <Col lg="4">     
          <Card small className="card-post mb-4">
            <div className={classes.paper}>
              <br/>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Gestión de alumnos
              </Typography>
              <br/>
              <Button
                  size="lg"
                  theme="light"
                  color="white"
                  onClick={() => loginWithRedirect(value, {})}
                >
                <span style={{paddingRight:"5px"}} className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("./../images/icons/google.svg")}
                  />
                </span>
                <span>Google</span>
              </Button>
              <br/>
              
            </div>
          </Card>
          </Col>
        </Row>
    </div>
  );
}
import React, {useState, useEffect} from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import PageTitle from "../../components/common/PageTitle";
import { useLocation, useHistory } from 'react-router-dom';
import { Container, Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import { AlumnoService } from "./../../services/AlumnoService"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useAuth0 } from "./../../react-auth0-spa";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

export default function EditarAlumno() { 
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const { datosDeUsuario } = useAuth0();
  const location = useLocation();
  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: location.alumno 
  });

  useEffect(() => {
      if(!location.alumno) {
        history.push({
            pathname : '/error'
        });  
      }
      reset(location.alumno);  
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
    reset(location.alumno); 
  }

  const onSubmit = data => {
    console.log(JSON.stringify(data));
    setBlocking(true);
    data["id"] = location.alumno.id;
    AlumnoService.actualizarAlumno(data, location.alumno.emailContacto, location.alumno.dni).then(response =>  {        
      if(response.status != 200) {
        response.text().then(res => {
          NotificationManager.error(res, 'Error', 3000);
          setBlocking(false);
        }) 
      }
      else {
        response.text().then(alumno => {
          NotificationManager.success('Se guardó el alumno correctamente', '', 2000);
          location.alumno = JSON.parse(alumno);
          reset(location.alumno); 
          setEdit(!edit);
          setBlocking(false);
        })
      } 
      setBlocking(false);      
    });
  }

  return(
    <Container fluid className="main-content-container px-4 pb-4">
        <BlockUi tag="div" blocking={blocking}>
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Detalle de alumno" className="text-sm-left" />
          </Row>
          <Row>
            {/* Editor */}
            <Col lg="9" md="12">
              <Card>
                <NotificationContainer/>
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Datos del alumno</h6>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem>
                    <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>
                      <Col Col md="12" className="form-group">
                          <Row>
                            <Col Col md="6" className="form-group">
                              <FormGroup>
                                  <label htmlFor="nombre">Nombre</label>
                                  { !edit && location.alumno && ( <h6>{location.alumno.nombre}</h6> )}
                                  { edit && (<Input className="form-control-alternative" required innerRef={register} 
                                  name="nombre" type="text" placeholder="Ingrese nombre del alumno"/>)}
                              </FormGroup>
                            </Col>  
                            <Col Col md="6" className="form-group">
                              <FormGroup>
                                  <label htmlFor="apelldio">Apellido</label>
                                  { !edit && location.alumno && ( <h6>{location.alumno.apellido}</h6> )}
                                  { edit && (<Input className="form-control-alternative" required innerRef={register} 
                                  name="apellido" type="text" placeholder="Ingrese apellido del alumno"/>)}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col Col md="6" className="form-group">
                              <FormGroup>
                                  <label htmlFor="dniCurso">Número de documento</label>
                                  { !edit && location.alumno && ( <h6>{location.alumno.dni}</h6> )}
                                  { edit && (<Input className="form-control-alternative" required innerRef={register} 
                                  name="dni" type="number" placeholder="Ingrese número de documento del alumno"/>)}
                              </FormGroup>
                            </Col>
                            <Col Col md="6" className="form-group">
                              <FormGroup>
                                  <label htmlFor="dniCurso">Email de contacto</label>
                                  { !edit && location.alumno && ( <h6>{location.alumno.emailContacto}</h6> )}
                                  { edit && (<Input className="form-control-alternative" required innerRef={register} 
                                  name="emailContacto" type="email" placeholder="Ingrese email de contacto"/> )}
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col Col md="6" className="form-group">
                              <FormGroup>
                                  <label htmlFor="dniCurso">Teléfono de contacto</label>
                                  { !edit && location.alumno && ( <h6>{location.alumno.telefono}</h6> )}
                                  { edit && (<Input className="form-control-alternative" innerRef={register} 
                                  name="telefono" autocomplete="off" type="number" placeholder="Ingrese número de teléfono"/>)}
                              </FormGroup>
                            </Col>
                            <Col Col md="6" className="form-group">
                              <FormGroup>
                                  <label htmlFor="dniCurso">Celular de contacto</label>
                                  { !edit && location.alumno && ( <h6>{location.alumno.telefonoMovil}</h6> )}
                                  { edit && (<Input className="form-control-alternative" innerRef={register} 
                                  name="telefonoMovil" autocomplsete="off" type="number" placeholder="Ingrese número de celular"/> )}
                              </FormGroup>
                            </Col>
                          </Row>
                      </Col>
                      { datosDeUsuario.rol == "docente" && !edit && (<Button onClick={toggleEdit} className="mb-2 mr-1">Editar alumno</Button>)} 
                      { edit && (<Button type="submit" className="mb-2 mr-1">Guardar</Button>)} 
                      { edit && (<Button theme="light" onClick={toggleEdit} className="mb-2 mr-1">Cancelar</Button>)} 
                    </Form>
                  </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </BlockUi>
    </Container>
  )
}
import React from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useAuth0 } from "../../react-auth0-spa";
import { PostService } from '../../services/PostService';


export default function Post(props) {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(JSON.stringify(data));

    PostService.crearPost(data, props.cursoId).then(response =>  {
        NotificationManager.success('Se creó la comunicación correctamente', '', 2000);
        props.refresh({});
      }
    );
  }


  return(
    <div>
      <ListGroup flush>
        <ListGroupItem>
          <h4 className="m-0">Nueva comunicación</h4>
          <br></br>
          <Form id="myForm" onSubmit = { handleSubmit(onSubmit)}>
            <Col md="12" className="form-group">
                <FormGroup>
                    <label htmlFor="titulo">Titulo</label>
                    <Input className="form-control-alternative" required innerRef={register} 
                    name="titulo" type="text" placeholder="Ingrese titulo"/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="comunicacion">Comunicación</label>
                    <Input className="form-control-alternative" required innerRef={register} 
                    name="cuerpo" type="text" placeholder="Ingrese comunicación"/>
                </FormGroup>
            </Col>
            <br/>
            <Button type="submit">Publicar</Button>
          </Form>
        </ListGroupItem>
      </ListGroup>
    </div>
  )
}
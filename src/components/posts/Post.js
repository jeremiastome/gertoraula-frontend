import React, {useState} from "react";
import {
  FormGroup,
  Form,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Button, Card, CardHeader, ListGroup, ListGroupItem,Row,Col } from "shards-react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import BlockUi from 'react-block-ui';
import { PostService } from '../../services/PostService';


export default function Post(props) {
  
  const { register, handleSubmit, reset } = useForm();
  const [blocking, setBlocking] = useState(false);

  const onSubmit = data => {
    setBlocking(true);
    PostService.crearPost(data, props.cursoId).then(response =>  {
        NotificationManager.success('Se creó la comunicación correctamente', '', 2000);
        setBlocking(false);
        reset({});
        props.refresh({});
      }
    );
  }


  return(
    <div>
      <BlockUi tag="div" blocking={blocking}>
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
                      name="cuerpo" type="textarea" placeholder="Ingrese comunicación"/>
                  </FormGroup>
              </Col>
              <br/>
              <Button type="submit">Publicar</Button>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </BlockUi>
    </div>
  )
}
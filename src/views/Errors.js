import React from "react";
import { Container, Button } from "shards-react";
import { useHistory } from 'react-router-dom';

const Errors = () => {
  const history = useHistory();

  const atras = () => {
    history.push({
        pathname : '/home'
    }); 
  }

  return (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>500</h2>
        <h3>Algo salió mal!</h3><br/>
        <Button onClick={atras} pill>&larr; Ir al inicio</Button>
      </div>
    </div>
  </Container>
)};

export default Errors;

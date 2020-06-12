import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

const DetalleAlumno = ({ alumno }) => (
  <Card small className="mb-4">
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
                <h4><i class="material-icons mr-1">person</i> Datos del alumno</h4>
                <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">Nombre</label>
                        <h5>{ alumno.nombre }</h5>
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Apellido</label>
                        <h5>{ alumno.apellido }</h5>
                    </Col>
                </Row>
                <hr></hr>
                <Row form>
                  <h4><i class="material-icons mr-1">contact_mail</i> Datos de contacto</h4>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <h5>{ alumno.email }</h5>
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="fePassword">Telefono</label>
                    <h5>{ alumno.tefono }</h5>
                  </Col>
                </Row>             
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

DetalleAlumno.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

DetalleAlumno.defaultProps = {
  title: "Account Details"
};

export default DetalleAlumno;

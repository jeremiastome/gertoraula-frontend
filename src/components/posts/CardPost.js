/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
} from "shards-react";
import { PostService } from '../../services/PostService';
import {useState, useEffect}  from "react";
import Post from "../posts/Post";



import PageTitle from "../common/PageTitle";

export default function CardPost(props) {

    const [state, setState] = useState([]);
    const [refresh, setRefresh] = useState({});

    useEffect(() => {
        PostService.getPosts(props.cursoId).then(res => {
            setState(res);
        }
        );
    }, [refresh]);

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <div>
            <Post refresh = {setRefresh} cursoId = {props.cursoId}></Post>
        </div>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Comunicaciones" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {state.map((post, idx) => (
            <Col lg="12" md="6" sm="12" className="mb-4" key={idx}>
              <Card Card small className="card-post card-post--1">
                <div>
                  <Badge
                    pill
                    className={`card-post__category bg-blue`}
                  >
                    Comunicación
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.titulo}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.cuerpo}</p>
                  <br/>
                  <span className="text-muted">{post.fecha}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}
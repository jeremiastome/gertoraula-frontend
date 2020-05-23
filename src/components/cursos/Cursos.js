import React,{useState, useEffect}  from "react";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from "shards-react";
import PageTitle from "../common/PageTitle";
import SmallStats from "../common/SmallStats";
import { CursosService } from '../../services/CursoService';

export default function Cursos() { 
  const attrs = { md: "6", sm: "6" };
  const [listaDeCursos, setListaDeCursos] = useState([]);
  const [update, setUpdate] = useState(null);
  const [blocking, setBlocking] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setBlocking(true);
    setListaDeCursos([]);
    CursosService.getCursos().then(data => { 
        setListaDeCursos(data)
        setBlocking(false);
    });
  }, [update]);

  function seleccionarCurso(cursoId) {
      console.log(cursoId)
      history.push({
          pathname : '/curso',
          asistencias : [],
          fecha : new Date(),
          asistenciasAEliminar : [],
          cursoId : cursoId,
      });
  }
  return (    

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Cursos" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {listaDeCursos.map((curso, idx) => (
            <Col lg="3" md="6" sm="12" className="col-lg mb-4" key={curso.id} {...attrs}>
              <SmallStats
                id={`small-stats-${curso.id}`}
                variation="1"
                /*chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}*/
                value={curso.nombre}
                select={seleccionarCurso}
                elemid={curso.id}
                /*percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}*/
              />
            </Col>
          ))}
        </Row>

        {/*<Row>
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

          <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col>

          <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col>

          <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col>
        </Row>*/}
      </Container>
    );
}

/*

BlogOverview.propTypes = {
  
   * The small stats dataset.
   
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {
  smallStats: [
    /*{
      label: "Posts",
      value: "2,390",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Pages",
      value: "182",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Comments",
      value: "8,147",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "New Customers",
      value: "29",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "Subscribers",
      value: "17,281",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    }
  ]
};*/

//export default BlogOverview;

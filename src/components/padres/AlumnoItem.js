import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";
import { Classes } from '../styles/Classes';
import { Card, CardBody } from "shards-react";

class AlumnoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.canvasRef = React.createRef();
  }

  toggleHover =() => {
    this.setState({hover: !this.state.hover})
  }

  render() {
    const { variation, label, value, percentage, increase, seleccionarAlumno , alumno} = this.props;

    var linkStyle;
    if (this.state.hover) {
      linkStyle = {color: '#ed1212',cursor: 'pointer'}
    } else {
      linkStyle = {color: '#000'}
    }

    return (
      
      <div style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
        <Card onClick = { () => { seleccionarAlumno(alumno) } } small className={Classes.cardClasses}>

          <CardBody className={Classes.cardBodyClasses}>
            <div className={Classes.innerWrapperClasses}>
              <div className={Classes.dataFieldClasses}>
                <span className={Classes.labelClasses}>{label}</span>
                <h6 className={Classes.valueClasses}>{value}</h6>
              </div>
            </div>
            <canvas
              height={Classes.canvasHeight}
              ref={this.canvasRef}
              className={`stats-small-${shortid()}`}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

AlumnoItem.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether is a value increase, or not.
   */
  increase: PropTypes.bool,
  /**
   * The Chart.js configuration object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options object.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.array.isRequired,
  /**
   * The chart labels.
   */
  chartLabels: PropTypes.array
};

AlumnoItem.defaultProps = {
  increase: true,
  percentage: null,
  value: null,
  label: "",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
  chartData: [],
  chartLabels: []
};

export default AlumnoItem;

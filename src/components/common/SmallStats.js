import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Classes } from '../styles/Classes';
import shortid from "shortid";
import { Card, CardBody } from "shards-react";

class SmallStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.canvasRef = React.createRef();
  }

  toggleHover =() => {
    this.setState({hover: !this.state.hover})
  };

  render() {
    const { cursoId, label, value, percentage, increase, select, elemid } = this.props;

    var linkStyle;
    if (this.state.hover) {
      linkStyle = {color: '#ed1212',cursor: 'pointer'}
    } else {
      linkStyle = {color: '#000'}
    }    

    return (
      
      <div style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
        <Card onClick = { () => { select(cursoId, value) } } small className={Classes.cardClasses}>

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

export default SmallStats;

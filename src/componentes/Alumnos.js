import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/Styles";

const Alumnos = props => {
    const {
        classes,
        id,
        nombre,
        alumnos
    } = props
    
    return(
        <div>
            {alumnos.map(data => {
            return(
                <Card className={classes.card} elevation={1}>
                    <CardContent>          
                        <Typography variant="h5" className={classes.name}>
                            {data.nombre} {data.apellido}
                        </Typography>
                    </CardContent>
                </Card>
            )})}
        </div>
    )
}

Alumnos.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number,
    nombre: PropTypes.string.isRequired,
    alumnos: PropTypes.array.isRequired
};

export default withStyles(Styles)(Alumnos);
  
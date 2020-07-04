import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import './style/base_style.styl'
import './style/date_picker.styl'
import 'react-notifications/lib/notifications.css';
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

export default function App() {

  const { loading } = useAuth0();
  const { datosDeUsuario } = useAuth0();


  if (loading) {
    return <div>Loading...</div>;
  }
  return(
    <Router basename={process.env.REACT_APP_BASENAME || ""} history={history}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...datosDeUsuario} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </div>
    </Router>
  )
}

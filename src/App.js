import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { useAuth0 } from "./react-auth0-spa";
import Profile from "./components/Profile";
import history from "./utils/history";

export default function App() {

  const { loading } = useAuth0();
  const { user } = useAuth0();


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
                    <route.component {...user} />
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

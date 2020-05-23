import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

// <Notifications />
export default (props) => (
  <Nav navbar className="border-left flex-row">   
    <UserActions logout = {props.logout} user = {props.user}/>
  </Nav>
);

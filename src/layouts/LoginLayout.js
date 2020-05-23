import React from "react";
import PropTypes from "prop-types";
import { Container } from "shards-react";

const LoginLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    {children}
  </Container>
);

LoginLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

LoginLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default LoginLayout;

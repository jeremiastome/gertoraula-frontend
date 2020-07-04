import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from './react-auth0-spa';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Auth0Provider />, div);
  ReactDOM.unmountComponentAtNode(div);
});

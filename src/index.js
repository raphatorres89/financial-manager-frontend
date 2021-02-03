import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Manager from './components/Manager';

ReactDOM.render(
  <Container>
    <Manager />
  </Container>,
  document.getElementById('root')
);

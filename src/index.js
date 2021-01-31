import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {Container} from 'semantic-ui-react';
import Tabs from './components/Tabs';

ReactDOM.render(
    <Container>
        <Tabs/>
    </Container>,
    document.getElementById('root')
);

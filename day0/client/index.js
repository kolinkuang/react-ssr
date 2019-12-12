import React from 'react';
import ReactDom from 'react-dom';
import App from '../src/App';

// hydrate to client entry
ReactDom.hydrate(App, document.getElementById('root'));
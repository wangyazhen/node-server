import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './client/app';
import createStore from './store';

const store = createStore(window.__PRELOADED_DATA || {});


const app = document.getElementById('root');
ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>, app);

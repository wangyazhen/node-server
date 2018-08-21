import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from './client/app';

const app = document.getElementById('root');
ReactDOM.hydrate(<Router>
  <App/>
</Router>, app);

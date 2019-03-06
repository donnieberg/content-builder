import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { IconSettings } from '@salesforce/design-system-react';

ReactDOM.render(
  <IconSettings iconPath="icons">
    <App />
  </IconSettings>,
  document.getElementById('root')
);


import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
// import rootReducer from './redux/reducers';
import { IconSettings } from '@salesforce/design-system-react';

render(
  <Provider store={store}>
    <IconSettings iconPath="icons">
      <App />
    </IconSettings>
  </Provider>,
  document.getElementById('root')
)

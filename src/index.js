import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import { IconSettings } from '@salesforce/design-system-react';

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <IconSettings iconPath="icons">
      <App />
    </IconSettings>
  </Provider>,
  document.getElementById('root')
)

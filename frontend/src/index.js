import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';

const store = createStore(() => [], {}, applyMiddleware())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'))

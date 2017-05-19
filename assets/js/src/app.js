import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import data from './data/data';
import reducers from './reducers';
import App from './components/App.jsx';
import './../../scss/app.scss';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

/**
 * Calls a function when the DOM is ready
 * @param {Function} callback - The function to call
 * @returns {undefined} undefined
 */
function domReady(callback) {
  const doc = document;
  const attach = 'addEventListener';

  if (doc[attach]) {
    doc[attach]('DOMContentLoaded', callback);
  } else {
    window.attachEvent('onload', callback);
  }
}


/**
 * Loads the app
 * @param {Function} callback - The function to call
 * @returns {undefined} undefined
 */
domReady(() => {
  const appContainer = document.getElementsByClassName('app-container')[0];

  ReactDOM.render(
    <Provider
      store={store}
    >
      <App
        data={data}
        largeBreakpoint={768}
      />
    </Provider>,
    appContainer
  );
});

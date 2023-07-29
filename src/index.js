import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store';
import mitt from 'mitt';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './hooks/useWebReact';

window.dapp = { event: mitt() };

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './globalStyle';
import { StoreProvider } from './store';

ReactDOM.render(
  <StoreProvider>
    <GlobalStyle />
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

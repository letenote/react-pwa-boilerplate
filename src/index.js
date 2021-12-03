import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './store';
import serviceWorkerRegistrationV6 from './workbox/v6/serviceWorkerRegistrationV6';
import serviceWorkerRegistrationV5 from './workbox/v5/serviceWorkerRegistrationV5';

const workboxRegistration = ( v ) => v === 5 ? serviceWorkerRegistrationV5() : serviceWorkerRegistrationV6()
ReactDOM.render(
  <React.Suspense fallback={<div>Loading..</div>}>
    <App store={store}/>
  </React.Suspense>,
  document.getElementById('root')
);
workboxRegistration(5)
// serviceWorkerRegistration();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
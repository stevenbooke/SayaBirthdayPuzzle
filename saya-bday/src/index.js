import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// The index.html file has a div with id 'root'
// We create the root and render the React App component
// the App component has my custom components in it (VantaBackground)

const root = ReactDOM.createRoot(document.getElementById('root'));
// React.StrictMode renders two canvases
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// DOES NOT RENDER TWO CANVASES
// root.render(
//   <App />
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

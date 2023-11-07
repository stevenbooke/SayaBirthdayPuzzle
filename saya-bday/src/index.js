import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// The index.html file has a div with id 'root'
// We create the root and render the React App component
// the App component has my custom components in it (VantaBackground)

// Hierarchy
// html
//   body
//     div root
//       div app
//         div vanta
//         div heading
//         div puzzle/game
//           div grid
//             div tile
          
//           div riddle/ans box

//           div cipher/circle

// App
//   Vanta
//   Heading
//   GameSpace
//     Grid
//       Tile

//     Riddle
//     Input/Answer Choices

//     Cipher

// Sliding Puzzle
// State: Correct position of images
// Index of original image array will be the Tile Components key
// Check if a random puzzle is solvable: https://www.cs.princeton.edu/courses/archive/spring21/cos226/assignments/8puzzle/specification.php

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

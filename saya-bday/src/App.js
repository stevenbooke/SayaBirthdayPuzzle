import logo from './logo.svg';
import './App.css';
import Vanta from './components/Vanta';
import Grid from './components/Grid';
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import ParticlesComponent from './components/Particles';

function App() {
  const images = [
    require('./assets/square_0_0.jpg'),
    require('./assets/square_0_1.jpg'),
    require('./assets/square_0_2.jpg'),
    require('./assets/square_0_3.jpg'),
    require('./assets/square_1_0.jpg'),
    require('./assets/square_1_1.jpg'),
    require('./assets/square_1_2.jpg'),
    require('./assets/square_1_3.jpg'),
    require('./assets/square_2_0.jpg'),
    require('./assets/square_2_1.jpg'),
    require('./assets/square_2_2.jpg'),
    require('./assets/square_2_3.jpg'),
    // row 3, col 3 image will be the blank tile
    require('./assets/square_3_0.jpg'),
    require('./assets/square_3_1.jpg'),
    require('./assets/square_3_2.jpg'),
    require('./assets/square_3_3.jpg'),
  ];

  // I need to keep the original indices of the images array,
  // they are used for checking solvability and if puzzle has been solved
  // Tile key should be the original image index
  // State is a list of list list like [[originalIndex, image], ..., [originalIndex, image]]
  // need function for computing r, c
  // make sure when I use flat method I keep originalIndex, image pairs
  const move = (originalIndex, shuffledIndex) => {
    let grid = buildGrid();
    let m = grid.length;
    let n = grid[0].length;
    let r = computeRow(shuffledIndex, m);
    let c = computeCol(shuffledIndex, m, n);
    let neighbors = getNeighbors(r, c, grid);
    let moveTile = findMoveTile(neighbors);
    console.log('r:', r, 'c:', c);
    console.log('moveTile:', moveTile);
    if (moveTile.length === 1) {
        let moveTileRow = moveTile[0][0];
        let moveTileCol = moveTile[0][1];
        console.log('moveTileRow:', moveTileRow, 'moveTileCol:', moveTileCol);
        let tmp = grid[r][c];
        console.log('grid[r][c] before:', grid[r][c], 'grid[moveTileRow][moveTileCol] before:', grid[moveTileRow][moveTileCol]);
        grid[r][c] = grid[moveTileRow][moveTileCol];
        grid[moveTileRow][moveTileCol] = tmp;
        console.log('grid[r][c] after:', grid[r][c], 'grid[moveTileRow][moveTileCol] after:', grid[moveTileRow][moveTileCol]);
        let flatGrid = flattenGrid(grid);
        // The set function only updates the state variable for the next render. 
        // If you read the state variable after calling the set function, 
        // you will still get the old value that was on the screen before your call.
        setShuffledIndexImagePairs(flatGrid);
        if (isComplete(flatGrid)) {
            console.log('isComplete:', isComplete(flatGrid))
            setCompleted(true);
        }
        console.log('completed:', completed)
    }
}

const flattenGrid = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    let flatGrid = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            flatGrid.push(grid[i][j]);
        }
    }
    return flatGrid;
}

const findMoveTile = (neighbors) => {
    return neighbors.filter(neighbor => neighbor[2] === 12);
}

const getNeighbors = (r, c, grid) => {
    let m = grid.length;
    let n = grid[0].length;
    const delta = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    let neighbors = [];
    for (let [dr, dc] of delta) {
        if (inBounds(r+dr, c+dc, m, n)) {
            neighbors.push([r+dr, c+dc, ...grid[r+dr][c+dc]]);
        }
    }
    return neighbors;
}

const inBounds = (r, c, m, n) => {
    return 0 <= r && r < m && 0 <= c && c < n;
}

// grid is 4x4x2
const buildGrid = () => {
    let grid = [];
    let row = [];
    for (let i = 0; i < shuffledIndexImagePairs.length; i++) {
        if (row.length < 4) {
            row.push(shuffledIndexImagePairs[i]);
        } else {
            grid.push([...row]);
            row = [shuffledIndexImagePairs[i]];
        }
    }
    grid.push(row);
    return grid;
}

const computeRow = (i, m) => {
    return Math.floor(i / m);
}

const computeCol = (i, m, n) => {
    return i % n;
}

const isComplete = (flatGrid) => {
    let flag = true;
    const order = [...Array(16).keys()]
    for (let i = 0; i < flatGrid.length; i++) {
        if (flatGrid[i][0] !== order[i]) {
            flag = false;
            break;
        }
    }
    return flag;
}

const getShuffledFlatGrid = (images) => {
    let flatGrid = argsort(images);
    while (!isSolvable(flatGrid)) {
        flatGrid = argsort(images);
    }
    return flatGrid;
}

const argsort = (images) => {
    const indexImagePairs = images.map((image, i) => [i, image]);
    indexImagePairs.sort(() => Math.random() - 0.5);
    return indexImagePairs;
}

const isSolvable = (indexImagePairs) => {
    const inversionsCount = getInversionsCount(indexImagePairs);
    const blankRowIndex = getBlankSquareRowIndex(indexImagePairs);
    console.log('inversionsCount:', inversionsCount, 'blankRowIndex:', blankRowIndex, 'isSolvable:', (inversionsCount + blankRowIndex) % 2 === 1);
    return (inversionsCount + blankRowIndex) % 2 === 1;
}

// Do not count the blank space in the inversions count
const getInversionsCount = (indexImagePairs) => {
    let inversionsCount = 0;
    for (let i = 0; i < indexImagePairs.length; i++) {
        if (indexImagePairs[i][0] === 12) {
            continue;
        }
        for (let j = i+1; j < indexImagePairs.length; j++) {
            if (indexImagePairs[j][0] === 12) {
                continue;
            }
            if (indexImagePairs[j][0] < indexImagePairs[i][0]) {
                inversionsCount += 1;
            }
        }
    }
    return inversionsCount;
}

const getBlankSquareRowIndex = (indexImagePairs) => {
    let index = -1;
    for (let i = 0; i < indexImagePairs.length; i++) {
        if (indexImagePairs[i][0] === 12) {
            index = i;
            break;
        }
    }
    return Math.floor(index / 4);
}

  const [shuffledIndexImagePairs, setShuffledIndexImagePairs] = useState(getShuffledFlatGrid(images));
  const [completed, setCompleted] = useState(false);

  // useEffect(() => {
  //     setShuffledIndexImagePairs(getShuffledFlatGrid(images));
  // }, [images]);

  return (
    <div className="app">
      <Header />
      {!completed && <Vanta />}
      <Grid shuffledIndexImagePairs={shuffledIndexImagePairs} completed={completed} setShuffledIndexImagePairs={setShuffledIndexImagePairs} setCompleted={setCompleted} move={move}/>
      {completed && <ParticlesComponent id="tsparticles" />}
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

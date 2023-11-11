import './App.css';
import Vanta from './components/Vanta';
import Grid from './components/Grid';
import Header from './components/Header';
import React, { useState } from 'react';
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
        // index 12, (also row 3, col 3 when in grid form) image will be the blank tile
        require('./assets/square_3_0.jpg'),
        require('./assets/square_3_1.jpg'),
        require('./assets/square_3_2.jpg'),
        require('./assets/square_3_3.jpg'),
    ];

    // I need to keep the original indices of the images array,
    // they are used for checking solvability and if puzzle has been solved
    // Tile key should be the original image index
    // State is a list of objects [{correctIndex, imageSrc, isBlankTile}, ..., {correctIndex, imageSrc, isBlankTile}]
    const buildFlatGrid = (images) => {
        return images.map((imageSrc, i) => {
            return {
                imageSrc: imageSrc,
                correctIndex: i,
                isBlankTile: i === 12 ? true : false
            };
        });
    }

    const move = (originalIndex, shuffledIndex) => {
        let grid = buildGrid();
        let m = grid.length;
        let n = grid[0].length;
        let r = computeRow(shuffledIndex, m);
        let c = computeCol(shuffledIndex, m, n);
        let neighbors = getNeighbors(r, c, grid);
        let moveTile = findMoveTile(neighbors);
        if (moveTile.length === 1) {
            let moveTileRow = moveTile[0].r;
            let moveTileCol = moveTile[0].c;
            let tmp = grid[r][c];
            grid[r][c] = grid[moveTileRow][moveTileCol];
            grid[moveTileRow][moveTileCol] = tmp;
            let flatGrid = flattenGrid(grid);
            // The set function only updates the state variable for the next render. 
            // If you read the state variable after calling the set function, 
            // you will still get the old value that was on the screen before your call.
            setShuffledflatGrid(flatGrid);
            if (isComplete(flatGrid)) {
                setCompleted(true);
            }
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
        return neighbors.filter(neighbor => neighbor.tile.isBlankTile);
    }

    const getNeighbors = (r, c, grid) => {
        let m = grid.length;
        let n = grid[0].length;
        const delta = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        let neighbors = [];
        for (let [dr, dc] of delta) {
            if (inBounds(r+dr, c+dc, m, n)) {
                let neighbor = {
                    r: r+dr,
                    c: c+dc,
                    tile: grid[r+dr][c+dc]
                }
                neighbors.push(neighbor);
            }
        }
        return neighbors;
    }

    const inBounds = (r, c, m, n) => {
        return 0 <= r && r < m && 0 <= c && c < n;
    }

    // grid is 4x4
    const buildGrid = () => {
        let grid = [];
        let row = [];
        for (let i = 0; i < shuffledflatGrid.length; i++) {
            if (row.length < 4) {
                row.push(shuffledflatGrid[i]);
            } else {
                grid.push([...row]);
                row = [shuffledflatGrid[i]];
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
            if (flatGrid[i].correctIndex !== order[i]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    const getShuffledFlatGrid = (images) => {
        let flatGrid = buildFlatGrid(images);
        argsort(flatGrid);
        while (!isSolvable(flatGrid)) {
            argsort(flatGrid);
        }
        return flatGrid;
    }

    const argsort = (flatGrid) => {
        flatGrid.sort(() => Math.random() - 0.5);
        return flatGrid;
    }

    const isSolvable = (flatGrid) => {
        const inversionsCount = getInversionsCount(flatGrid);
        const blankRowIndex = getBlankSquareRowIndex(flatGrid);
        return (inversionsCount + blankRowIndex) % 2 === 1;
    }

    // Do not count the blank space in the inversions count
    const getInversionsCount = (flatGrid) => {
        let inversionsCount = 0;
        for (let i = 0; i < flatGrid.length; i++) {
            if (flatGrid[i].isBlankTile) {
                continue;
            }
            for (let j = i+1; j < flatGrid.length; j++) {
                if (flatGrid[j].isBlankTile) {
                    continue;
                }
                if (flatGrid[j].correctIndex < flatGrid[i].correctIndex) {
                    inversionsCount += 1;
                }
            }
        }
        return inversionsCount;
    }

    const getBlankSquareRowIndex = (flatGrid) => {
        let index = -1;
        for (let i = 0; i < flatGrid.length; i++) {
            if (flatGrid[i].isBlankTile) {
                index = i;
                break;
            }
        }
        return Math.floor(index / 4);
    }

    const [shuffledflatGrid, setShuffledflatGrid] = useState(getShuffledFlatGrid(images));
    const [completed, setCompleted] = useState(false);

    return (
        <div className="app">
        <Header />
        {!completed && <Vanta />}
        <Grid shuffledflatGrid={shuffledflatGrid} move={move}/>
        {completed && <ParticlesComponent id="tsparticles" />}
        </div>
    );
}

export default App;

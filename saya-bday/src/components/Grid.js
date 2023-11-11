import React from 'react';
import Tile from './Tile';
import './Grid.css';

// Check if a random puzzle is solvable: https://www.cs.princeton.edu/courses/archive/spring21/cos226/assignments/8puzzle/specification.php
const Grid = ({ shuffledflatGrid, move}) => {
    return (
        <div className="grid">
            {shuffledflatGrid.map((tile, i) => (
                <Tile key={tile.correctIndex} isBlankTile={tile.isBlankTile} imageSrc={tile.imageSrc} move={() => move(tile.correctIndex, i)} />
            ))}
        </div>
    );
};

export default Grid;
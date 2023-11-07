import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import './Grid.css';

// I need to keep the original indices of the images array,
// they are used for checking solvability and if puzzle has been solved
// Tile key should be the original image index
// State is a list of list list like [[originalIndex, image], ..., [originalIndex, image]]
// need function for computing r, c
// make sure when I use flat method I keep originalIndex, image pairs
const Grid = ({ shuffledIndexImagePairs, completed, setShuffledIndexImagePairs, setCompleted, move}) => {
    return (
        <div className="grid">
            {shuffledIndexImagePairs.map((indexImagePair, i) => (
                <Tile key={indexImagePair[0]} id={indexImagePair[0]} imageSource={indexImagePair[1]} move={() => move(indexImagePair[0], i)} />
            ))}
        </div>
    );
};

export default Grid;
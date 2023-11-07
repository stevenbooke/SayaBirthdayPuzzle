import React from 'react';
import './Tile.css';

const Tile = ({ id, imageSource, move }) => {
    return (
        <div className="tile" id={id === 12 ? 'opaque-tile' : ''}>
            <img src={imageSource} alt="Tile" onClick={move}></img>
        </div>
    )
};

export default Tile;
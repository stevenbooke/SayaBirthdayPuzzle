import React from 'react';
import './Tile.css';

const Tile = ({ imageSource }) => {
    return (
        <div className="tile">
            <img src={imageSource} alt="Tile"></img>
        </div>
    )
};

export default Tile;
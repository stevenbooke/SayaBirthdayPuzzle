import React from 'react';
import './Tile.css';

const Tile = ({ isBlankTile, imageSrc, move }) => {
    return (
        <div className="tile" id={isBlankTile ? 'opaque-tile' : null}>
            <img src={imageSrc} alt="Tile" onClick={move}></img>
        </div>
    )
};

export default Tile;
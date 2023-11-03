import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import './Grid.css';

const Grid = ({ images }) => {
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        const shuffled = [...images].sort(() => Math.random() - 0.5);
        setShuffledImages(shuffled);
    }, [images]);

    return (
        <div className="grid">
            {shuffledImages.map((image, index) => (
                <Tile key={index} imageSource={image} />
            ))}
        </div>
    );
};

export default Grid;
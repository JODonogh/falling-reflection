import React from 'react';
import './GameWorld.css';

const Shape = ({ style, type }) => {
    return <div className ={`shape ${type || ''}`} style={style}></div>
};


const GameWorld = () => {
    return (
        <div className="game-world"> 
            <div className="background-plane"></div>
            <Shape
                type="platform"
                style ={{
                    width: '250px',
                    height: '20px',
                    bottom: '100px',
                    left: '150px'
                }}
                />
        </div>
    );
}
export default GameWorld; 
import React from 'react';
import './App.css';

export default function BotonGPU() {
    const handleClick = () => {
    alert("Mensaje");
    };

    return (
    <button onClick={handleClick}>
        GPU
    </button>
    );
}
import React from 'react';
import './App.css';

export default function BotonCPU() {
    const handleClick = () => {
    alert("Mensaje");
    };

    return (
    <button onClick={handleClick}>
        CPU
    </button>
    );
}
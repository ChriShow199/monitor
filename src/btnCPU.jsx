import React from 'react';
import './estilosBotones.css';

export default function BotonCPU({ onClick }) {

  return (
  <div>
    <button onClick={onClick}>
      CPU
    </button>
  </div>
  );
}
import React from 'react';

export default function BotonGraficarMemoria({onClick}) {

  return (
  <header>
    <button onClick={onClick}>
      Graficar Memoria
    </button>
  </header>
  );
}
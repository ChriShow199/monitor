import React from 'react';

export default function BotonGraficar({onClick}) {

  return (
  <header>
    <button onClick={onClick}>
      Graficar
    </button>
  </header>
  );
}
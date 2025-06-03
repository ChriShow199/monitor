import React from 'react';
import "./styles.css";

export default function BotonDisco({ onClick }) {
  return (
    <button onClick={onClick}>
      Disco
    </button>
  );
}
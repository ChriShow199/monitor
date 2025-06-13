import React from 'react';
import "./styles.css";

export default function BotonMemoria({ onClick }) {
  return (
    <button onClick={onClick}>
      Memoria
    </button>
  );
}
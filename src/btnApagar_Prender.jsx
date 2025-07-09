import React from 'react';
import './estilobotonswitch.css';

function BotonSwitch({ isChecked, onToggle }) {
  return (
    <div className="switch-contenedor">
      <span className="switch-label">Insertar:</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default BotonSwitch;

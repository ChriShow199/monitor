import React from 'react';
import './estilobotonswitch.css';

function BotonSwitch({isChecked, onToggle}) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
      />
      <span className="slider"></span>
    </label>
  );
}

export default BotonSwitch;
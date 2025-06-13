import React, { useState } from 'react';

const Dias = () => {
  const [valorSeleccionado, setValorSeleccionado] = useState('');

  const manejarCambio = (evento) => {
    setValorSeleccionado(evento.target.value);
  };

  return (
    <div>
      <label htmlFor="ComBoxDias">Dia:</label>
      <select id="ComboBoxDias" value={valorSeleccionado} onChange={manejarCambio}>
        <option value="">-- Selecciona --</option>
        <option value="opcion1">Lunes</option>
        <option value="opcion2">Martes</option>
        <option value="opcion3">Miercoles</option>
        <option value="opcion1">Jueves</option>
        <option value="opcion2">Viernes</option>
        <option value="opcion3">Sabado</option>
        <option value="opcion1">Domingo</option>
      </select>
    </div>
  );
};

export default Dias;
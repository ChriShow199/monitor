import React, { useState, useEffect } from 'react';

const Horas2 = ({ activo }) => {
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [fechasHoras, setFechasHoras] = useState([]);

  const Cambio = (evento) => {
    setHoraSeleccionada(evento.target.value);
  };

  useEffect(() => {
    if (!activo) return;

    const interval = setInterval(() => {
      const nuevaFechaHora = new Date().toLocaleString();
      setFechasHoras((prevFechasHoras) => [...prevFechasHoras, nuevaFechaHora]);
    }, 1000);

    return () => clearInterval(interval);
  }, [activo]);

  return (
    <div>
      <label htmlFor="ComboBox1">Fin:</label>
      <select id="ComboBox1" value={horaSeleccionada} onChange={Cambio}>
        <option value="">-- Selecciona Fecha y Hora --</option>
        {fechasHoras.map((fechaHora, index) => (
          <option key={index} value={fechaHora}>
            {fechaHora}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Horas2;
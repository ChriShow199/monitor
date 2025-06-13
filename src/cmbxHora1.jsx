import React, { useState, useEffect } from 'react';

const Horas1 = () => {
  const [horaSeleccionada, sethoraSeleccionada] = useState('');
  const [horas, setHoras] = useState([]);

  const Cambio = (evento) => {
    sethoraSeleccionada(evento.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nuevaHora = new Date().toLocaleTimeString();
      setHoras(prevHoras => [...prevHoras, nuevaHora]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <label htmlFor="ComboBox1">Hora 1:</label>
      <select id="ComboBox1" value={horaSeleccionada} onChange={Cambio}>
        <option value="">-- Primer Hora --</option>
        {horas.map((hora, index) => (
          <option key={index} value={hora}>
            {hora}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Horas1;
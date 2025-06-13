import React, { useState, useEffect } from 'react';

const Horas2 = () => {
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
      <label htmlFor="ComboBox2">Hora 2:</label>
      <select id="ComboBox2" value={horaSeleccionada} onChange={Cambio}>
        <option value="">-- Segunda Hora --</option>
        {horas.map((hora, index) => (
          <option key={index} value={hora}>
            {hora}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Horas2;
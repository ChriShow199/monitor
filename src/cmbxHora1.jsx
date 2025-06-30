import React, { useState, useEffect } from 'react';

const Horas1 = ({ activo, onCambio }) => {
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [fechasHoras, setFechasHoras] = useState([]);

  const Cambio = (evento) => {
    const seleccion = evento.target.value;
    setHoraSeleccionada(evento.target.value);
    onCambio(seleccion);
  };

  useEffect(() => {
    if (!activo) return;

    // Función para consultar las fechas en la base de datos
    const fetchFechas = () => {
      fetch('http://localhost:8080/rendimientos/importar_datos.php')
        .then(res => res.json())
        .then(data => {
          // Evitar duplicados
          setFechasHoras(prev => {
            // Crear Set para evitar duplicados
            const fechasSet = new Set(prev);
            data.forEach(f => fechasSet.add(f));
            return Array.from(fechasSet).sort((a, b) => new Date(a) - new Date(b));
          });
        })
        .catch(err => console.error('Error al cargar fechas:', err));
    };

    // Cargar las fechas una vez inmediatamente
    fetchFechas();

    // Luego hacer polling cada 1 segundos
    const interval = setInterval(fetchFechas, 1000);

    return () => clearInterval(interval);
  }, [activo]);

  return (
    <div>
      <label htmlFor="ComboBox1">Inicio:</label>
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

export default Horas1;
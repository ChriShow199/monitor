import React, { forwardRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './styles.css';

const GraficoHistorial = forwardRef(({ datos, tipo }, ref) => {
  const color = tipo === "CPU"
    ? "#FF0000"
    : tipo === "Memoria"
    ? "#92C5FC"
    : tipo === "Disco"
    ? "#00FF00"
    : tipo === "GPU"
    ? "#FFDE21"
    : "#000000";

  return (
    <div ref={ref}>
      <LineChart width={1500} height={590} data={datos} margin={{ top: 15, right: 1, left: 450, bottom: 1 }}>
        <CartesianGrid strokeDasharray="0" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend payload={[{ value: tipo, type: "line", id: "1", color }]} />
        <Line type="monotone" dataKey="Rendimiento" stroke={color} activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
});

export default GraficoHistorial;
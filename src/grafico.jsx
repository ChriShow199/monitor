import React, { useEffect, useState } from 'react';
import "./styles.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Grafico({ cpu, disco }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tiempo = new Date().toLocaleTimeString();
    setData(prevData => {
      const actualizar = [...prevData, { name: tiempo, CPU: cpu, Disco: disco }];
      return actualizar.slice(-5);
    });
  }, [cpu, disco]);

  return (
    <LineChart
      width={1500}
      height={440}
      data={data}
      margin={{ top: 1, right: 1, left: 500, bottom: 1 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="CPU" stroke="#FF0000" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Disco" stroke="#00FF00" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
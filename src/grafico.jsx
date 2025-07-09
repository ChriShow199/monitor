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

export default function Grafico({ cpu, disco, memoria, gpu }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const tiempo = new Date().toLocaleTimeString();

      setData((prevData) => {
        const actualizar = [...prevData, { name: tiempo, CPU: cpu, Disco: disco, Memoria: memoria, GPU: gpu },
        ];
        return actualizar.slice(-5);
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [cpu, disco, memoria, gpu]);

  return (
    <LineChart
      width={1500}
      height={590}
      data={data}
      margin={{ top: 15, right: 1, left: 450, bottom: 1 }}
    >
      <CartesianGrid strokeDasharray="0" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="CPU" stroke="#FF0000" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Disco" stroke="#00FF00" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Memoria" stroke="#92C5FC" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="GPU" stroke="#FFDE21" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
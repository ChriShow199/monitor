import React from 'react'
import "./styles.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    CPU: 2400
  },
  {
    CPU: 1398
  },
  {
    CPU: 9800
  },
  {
    name: "Rendimiento",
    CPU: 3908
  },
  {
    CPU: 4800
  },
  {
    CPU: 3800
  },
  {
    CPU: 4300
  },
];

export default function Grafico() {
  return (
    <LineChart
      width={1500}
      height={440}
      data={data}
      margin={{
        top: 1,
        right: 1,
        left: 500,
        bottom: 1,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="CPU"
        stroke="#FF0000"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
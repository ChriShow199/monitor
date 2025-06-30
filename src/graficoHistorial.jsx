import React from 'react';
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

const GraficoCPU = ({ datos }) => (
  <LineChart width={1500} height={333} data={datos} margin={{ top: 1, right: 1, left: 500, bottom: 1 }}>
    <CartesianGrid stroke="#ccc" strokeDasharray="0" />
    <XAxis dataKey="name" />
    <YAxis domain={[0, 100]} />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="CPU" stroke="#FF0000" />
  </LineChart>
);

export default GraficoCPU;
import React from 'react';
import DataTable from "react-data-table-component";

export default function Table({ cpu, memoria, disco, gpu }) {
  const columns = [
    {
      name: "CPU",
      selector: row => row.rendimiento1
    },
    {
      name: "Memoria",
      selector: row => row.rendimiento2
    },
    {
      name: "GPU",
      selector: row => row.rendimiento3
    },
    {
      name: "Disco",
      selector: row => row.rendimiento4
    },
  ];

  // Si tienes sólo un dato, lo ponemos en una fila
  const data = [
    {
      rendimiento1: `${cpu}%`,
      rendimiento2: `${memoria}%`,
      rendimiento3: `${gpu}%`,
      rendimiento4: `${disco}%`
    }
  ];

  return (
    <div className="table">
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

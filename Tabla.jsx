import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Prueba from "./Component.jsx";
export default function Table() {

    const columns=[
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
    ]

    const data=[
        {
            rendimiento1: "1",
            rendimiento2: "2",
            rendimiento3: "3",
            rendimiento4: "4"
        }
    ]

    return (
      <div className="table">
        <DataTable
            columns={columns}
            data={data}
        />
      </div>
    )
  }
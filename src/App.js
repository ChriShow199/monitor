import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Table from './Tabla';
import BotonCPU from './btnCPU';
import BotonMemoria from './btnMemoria';
import BotonDisco from './btnDisco';
import BotonGPU from './btnGPU';

function App() {
  const [dato, setDato] = useState({ uso_cpu: null, uso_memoria: null, uso_disco: null, uso_gpu: null });

useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8080/rendimientos/test.php")
        .then(response => {
          if (!response.ok) throw new Error("Error");
          return response.json();
        })
        .then(data => {
          setDato({uso_cpu: data.uso_cpu, uso_memoria: data.uso_memoria, uso_disco: data.uso_disco, uso_gpu: data.uso_gpu});
        })
        .catch(err => console.error("Error:", err));
    };

    fetchData(); // Llamada inicial
    const interval = setInterval(fetchData, 1000); // Cada 1 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Administrador de Tareas:</h3>
        <Table cpu={dato.uso_cpu} memoria={dato.uso_memoria} disco={dato.uso_disco} gpu={dato.uso_gpu}/>
        <BotonCPU/>
        <BotonMemoria/>
        <BotonDisco/>
        <BotonGPU/>
      </header>
    </div>
  );
}

export default App;

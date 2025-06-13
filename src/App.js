import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Table from './Tabla';
import BotonCPU from './btnCPU';
import BotonMemoria from './btnMemoria';
import BotonDisco from './btnDisco';
import BotonGPU from './btnGPU';
import Grafico from './grafico';
import Horas1 from './cmbxHora1';
import Horas2 from './cmbxHora2';
import Dias from './cmbxDia';
import BotonGraficar from './graficar';


function App() {
  const [dato, setDato] = useState({ uso_cpu: null, uso_memoria: null, uso_disco: null, uso_gpu: null, });
  const [graficoVisible, setGraficoVisible] = useState(null);
  
useEffect(() => {
    const fetchData = async () => {
    const res = await fetch("http://localhost:8080/rendimientos/envio_datos.php");
    const datos = await res.json();

    setDato({uso_cpu: datos.uso_cpu, uso_memoria: datos.uso_memoria, uso_disco: datos.uso_disco, uso_gpu: datos.uso_gpu});
  };

    fetchData(); 
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
    
    
  }, []);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Administrador de Tareas:</h3>
        <Table cpu={dato.uso_cpu} memoria={dato.uso_memoria} disco={dato.uso_disco} gpu={dato.uso_gpu}/>
        <BotonCPU onClick={() => setGraficoVisible("CPU")} />
        <BotonMemoria onClick={() => setGraficoVisible("Memoria")} />
        <BotonDisco onClick={() => setGraficoVisible("Disco")} />
        <BotonGPU onClick={() => setGraficoVisible("GPU")} />
        <Horas1 />
        <Horas2 />
        <Dias/>
        {graficoVisible === "CPU" && <Grafico cpu={dato.uso_cpu} />}
        {graficoVisible === "Memoria" && <Grafico memoria={dato.uso_memoria} />}
        {graficoVisible === "Disco" && <Grafico disco={dato.uso_disco} />}
        {graficoVisible === "GPU" && <Grafico gpu={dato.uso_gpu} />}
      </header>
    </div>
  );
}

export default App;
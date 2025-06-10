import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Table from './Tabla';
import BotonCPU from './btnCPU';
import BotonMemoria from './btnMemoria';
import BotonDisco from './btnDisco';
import BotonGPU from './btnGPU';
import Grafico from './grafico';


function App() {
  const [dato, setDato] = useState({ uso_cpu: null, uso_memoria: null, uso_disco: null, uso_gpu: null });
  const [GraficoCPU, setGraficoCPU] = useState(false);
  const [GraficoDisco, setGraficoDisco] = useState(false);
  const [GraficoMemoria, setGraficoMemoria] = useState(false);
  const [GraficoGPU, setGraficoGPU] = useState(false);
  
useEffect(() => {
    const fetchData = async () => {
    const [cpuRes, memoriaRes, discoRes, gpuRes] = await Promise.all([
      fetch("http://localhost:8080/rendimientos/insertar_ejecucion.php?servicio=cpu"),
      fetch("http://localhost:8080/rendimientos/insertar_ejecucion.php?servicio=memoria"),
      fetch("http://localhost:8080/rendimientos/insertar_ejecucion.php?servicio=disco"),
      fetch("http://localhost:8080/rendimientos/insertar_ejecucion.php?servicio=gpu"),
    ]);

    const [cpu, memoria, disco, gpu] = await Promise.all([cpuRes.json(), memoriaRes.json(), discoRes.json(), gpuRes.json(),]);

    setDato({uso_cpu: cpu.uso_cpu, uso_memoria: memoria.uso_memoria, uso_disco: disco.uso_disco, uso_gpu: gpu.uso_gpu});
  };

    fetchData(); 
    const interval = setInterval(fetchData, 1000); // Cada 1 segundo

    return () => clearInterval(interval); 
  }, []);
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Administrador de Tareas:</h3>
        <Table cpu={dato.uso_cpu} memoria={dato.uso_memoria} disco={dato.uso_disco} gpu={dato.uso_gpu}/>
        <BotonCPU onClick={() => setGraficoCPU(prev => !prev)} />
        <BotonMemoria onClick={() => setGraficoMemoria(prev => !prev)}/>
        <BotonDisco onClick={() => setGraficoDisco(prev => !prev)}/>
        <BotonGPU onClick={() => setGraficoGPU(prev => !prev)}/>
        {GraficoCPU && <Grafico cpu={dato.uso_cpu} />}
        {GraficoDisco && <Grafico disco={dato.uso_disco} />}
        {GraficoMemoria && <Grafico memoria={dato.uso_memoria} />}
        {GraficoGPU && <Grafico gpu={dato.uso_gpu} />}
      </header>
    </div>
  );
}

export default App;
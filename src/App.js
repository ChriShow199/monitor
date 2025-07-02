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
import BotonGraficarCPU from './btnGraficarCPU';
import BotonGraficarMemoria from './btnGraficarMemoria';
import BotonGraficarDisco from './btnGraficarDisco';
import BotonSwitch from './btnApagar_Prender';
import GraficoHistorial from './graficoHistorial';
import BotonGraficarGPU from './btnGraficarGPU';
import Ventana from './modal';


function App() {
  const [dato, setDato] = useState({ uso_cpu: null, uso_memoria: null, uso_disco: null, uso_gpu: null, });
  const [graficoVisible, setGraficoVisible] = useState(null);
  const [switchEncendido, setSwitchEncendido] = useState(true); // Inicia encendido
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [graficoRendimiento, setGraficoRendimiento] = useState(null); // 'CPU' o 'Memoria'
  const [datosGrafico, setDatosGrafico] = useState([]);


  useEffect(() => {
    let isFetching = false;
    const fetchData = async () => {
      if (isFetching) return; // evita llamada si ya hay una en curso
      isFetching = true;
      try 
      {
        const url = switchEncendido ? "http://localhost:8080/rendimientos/envio_datos.php?insertar=1" : "http://localhost:8080/rendimientos/envio_datos.php";
        const res = await fetch(url);
        const datos = await res.json();
        setDato({uso_cpu: datos.uso_cpu, uso_memoria: datos.uso_memoria, uso_disco: datos.uso_disco, uso_gpu: datos.uso_gpu,});
      } 
      catch (error) 
      {
        console.error("Error al obtener datos:", error);
      } 
      finally 
      {
        isFetching = false;
      }
  };
      fetchData();
      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
}, [switchEncendido]);

  const toggleSwitch = () => setSwitchEncendido(!switchEncendido);


  const graficarCPU = async () => {
    if (!inicio || !fin) return alert("Selecciona un rango de fechas válido");
    try 
    {
      const res = await fetch(`http://localhost:8080/rendimientos/rango.php?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
      const data = await res.json();
      const formateado = data.map(d => ({
        name: d.fecha_hora,
        Rendimiento: d.uso_cpu
      }));
      setDatosGrafico(formateado);
      setGraficoRendimiento("CPU");
    } 

    catch (err) 
    {
      console.error("Error al graficar CPU:", err);
    }
  };

  const graficarMemoria = async () => {
    if (!inicio || !fin) return alert("Selecciona un rango de fechas válido");
    try 
    {
      const res = await fetch(`http://localhost:8080/rendimientos/rango.php?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
      const data = await res.json();
      const formateado = data.map(d => ({
        name: d.fecha_hora,
        Rendimiento: d.uso_memoria
      }));
      setDatosGrafico(formateado);
      setGraficoRendimiento("Memoria");
    } 

    catch (err) 
    {
      console.error("Error al graficar Memoria:", err);
    }
  };

  const graficarDisco = async () => {
    if (!inicio || !fin) return alert("Selecciona un rango de fechas válido");
    try 
    {
      const res = await fetch(`http://localhost:8080/rendimientos/rango.php?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
      const data = await res.json();
      const formateado = data.map(d => ({
        name: d.fecha_hora,
        Rendimiento: d.uso_disco
      }));
      setDatosGrafico(formateado);
      setGraficoRendimiento("Disco");
    } 

    catch (err) 
    {
      console.error("Error al graficar Memoria:", err);
    }
  };

    const graficarGPU = async () => {
    if (!inicio || !fin) return alert("Selecciona un rango de fechas válido");
    try 
    {
      const res = await fetch(`http://localhost:8080/rendimientos/rango.php?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
      const data = await res.json();
      const formateado = data.map(d => ({
        name: d.fecha_hora,
        Rendimiento: d.uso_gpu
      }));
      setDatosGrafico(formateado);
      setGraficoRendimiento("GPU");
    }

    catch (err) 
    {
      console.error("Error al graficar Memoria:", err);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <Ventana/>
        <h3 className='titulo-tabla'>Administrador de Tareas:</h3>
        <Table cpu={dato.uso_cpu} memoria={dato.uso_memoria} disco={dato.uso_disco} gpu={dato.uso_gpu}/>

        <div className="botones-rendimiento">
          <BotonCPU onClick={() => setGraficoVisible("CPU")} />
          <BotonMemoria onClick={() => setGraficoVisible("Memoria")} />
          <BotonDisco onClick={() => setGraficoVisible("Disco")} />
          <BotonGPU onClick={() => setGraficoVisible("GPU")} />
        </div>

        <Horas1 activo={switchEncendido} onCambio={setInicio} />
        <Horas2 activo={switchEncendido} onCambio={setFin} />

        <div className="botones-historial">
        <BotonGraficarCPU onClick={graficarCPU} />
        <BotonGraficarMemoria onClick={graficarMemoria} />
        <BotonGraficarDisco onClick={graficarDisco} />
        <BotonGraficarGPU onClick={graficarGPU} />
        <BotonSwitch isChecked={switchEncendido} onToggle={toggleSwitch} />
        </div>
       
       <div className="graficas-posicion">
        {graficoVisible === "CPU" && <Grafico cpu={dato.uso_cpu} />}
        {graficoVisible === "Memoria" && <Grafico memoria={dato.uso_memoria} />}
        {graficoVisible === "Disco" && <Grafico disco={dato.uso_disco} />}
        {graficoVisible === "GPU" && <Grafico gpu={dato.uso_gpu} />}
        {graficoRendimiento && (<GraficoHistorial datos={datosGrafico} tipo={graficoRendimiento} />)}
        </div>
      </header>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Table from './Tabla';
import BotonCPU from './btnCPU';
import BotonMemoria from './btnMemoria';
import BotonDisco from './btnDisco';
import BotonGPU from './btnGPU';
import BotonPDF from './btnPDF';
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
import BotonUsuario from './btnUsuario';


function App() {
  const [dato, setDato] = useState({ uso_cpu: null, uso_memoria: null, uso_disco: null, uso_gpu: null, });
  const [graficoVisible, setGraficoVisible] = useState("CPU");
  const [switchEncendido, setSwitchEncendido] = useState(true); // Inicia encendido
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [graficoRendimiento, setGraficoRendimiento] = useState(null);
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const graficoRef = useRef(null);

    // Cargar usuario de sessionStorage al montar
  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) 
    {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Guardar usuario en sessionStorage al cambiar
  useEffect(() => {
    if (usuario) 
    {
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
    } 
    else
    {
      sessionStorage.removeItem('usuario');
    }
  }, [usuario]);

  // Limpiar sesión al refrescar o cerrar pestaña
  useEffect(() => {
    const limpiarSesion = () => {
      sessionStorage.removeItem('usuario');
      setUsuario(null);
    };
    window.addEventListener('beforeunload', limpiarSesion);
    return () => {
      window.removeEventListener('beforeunload', limpiarSesion);
    };
  }, []);




  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) 
    {
      setUsuario(JSON.parse(usuarioGuardado));
    }
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


  const mostrarGraficoTiempoReal = (tipo) => {
      setGraficoVisible(tipo);
      setGraficoRendimiento(null); // Ocultar gráfico histórico
    };

  const graficarHistorial = async (tipo) => {
  if (!inicio || !fin) return alert("Selecciona un rango de fechas válido");
  try 
  {
    const res = await fetch(`http://localhost:8080/rendimientos/rango.php?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`);
    const data = await res.json();
    const formateado = data.map(d => ({
      name: d.fecha_hora,
      Rendimiento:
        tipo === "CPU" ? d.uso_cpu :
        tipo === "Memoria" ? d.uso_memoria :
        tipo === "Disco" ? d.uso_disco :
        tipo === "GPU" ? d.uso_gpu : 0
    }));
    setDatosGrafico(formateado);
    setGraficoRendimiento(tipo);
    setGraficoVisible(null); // Ocultar gráfico tiempo real
  } 
  
  catch (err) 
  {
    console.error(`Error al graficar ${tipo}:`, err);
  }
};


  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <div className="App">
                <header className="App-header">
                  <Ventana onLoginSuccess={setUsuario} usuario={usuario} />
                  <h3 className='titulo-tabla'>Administrador de Tareas:</h3>
                  
                  <div className="contenedor-superior">
                    <Table cpu={dato.uso_cpu} memoria={dato.uso_memoria} disco={dato.uso_disco} gpu={dato.uso_gpu}/>
                    <div className="graficas-posicion">
                      <div className='boton-exportar'>
                        <BotonUsuario />
                      </div>
                        {graficoVisible && (
                          <>
                            {graficoVisible === "CPU" && <Grafico cpu={dato.uso_cpu} />}
                            {graficoVisible === "Memoria" && <Grafico memoria={dato.uso_memoria} />}
                            {graficoVisible === "Disco" && <Grafico disco={dato.uso_disco} />}
                            {graficoVisible === "GPU" && <Grafico gpu={dato.uso_gpu} />}
                          </>
                        )}

                        {graficoRendimiento && (
                          <GraficoHistorial ref={graficoRef} datos={datosGrafico} tipo={graficoRendimiento} />
                        )}

                      <div className='superposicion-cmbx'>
                        <Horas1 activo={switchEncendido} onCambio={setInicio} />
                        <Horas2 activo={switchEncendido} onCambio={setFin} />
                        <BotonSwitch isChecked={switchEncendido} onToggle={toggleSwitch} />
                      </div>
                    </div>
                  </div>

                  <div className="botones-rendimiento">
                    <BotonCPU onClick={() => mostrarGraficoTiempoReal("CPU")} />
                    <BotonMemoria onClick={() => mostrarGraficoTiempoReal("Memoria")} />
                    <BotonDisco onClick={() => mostrarGraficoTiempoReal("Disco")} />
                    <BotonGPU onClick={() => mostrarGraficoTiempoReal("GPU")} />
                  </div>

                  <div className="botones-historial">
                    <BotonGraficarCPU onClick={() => graficarHistorial("CPU")} />
                    <BotonGraficarMemoria onClick={() => graficarHistorial("Memoria")} />
                    <BotonGraficarDisco onClick={() => graficarHistorial("Disco")} />
                    <BotonGraficarGPU onClick={() => graficarHistorial("GPU")} />
                  </div>
                </header>
              </div>
            </>
          } 
        />
        
          
        <Route
          path="/rutadered"
          element={
            <>
              <div className="App">
                <header className="App-header">
                    {usuario && (
                      <div className='usuario-rol'>
                        <BotonPDF usuario={usuario} graficoRef={graficoRef} tipo={graficoRendimiento} inicio={inicio} fin={fin}/>
                        <h3 className='titulo-tabla'>Usuario: <strong>{usuario.correo}</strong></h3>
                        <h3 className='titulo-tabla'>Rol: <strong>{usuario.rol}</strong></h3>
                      </div>
                    )}

                    <div className='ocultar-grafico'>
                      {graficoRendimiento && (
                        <GraficoHistorial ref={graficoRef} datos={datosGrafico} tipo={graficoRendimiento} />
                      )}
                    </div>
                </header>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
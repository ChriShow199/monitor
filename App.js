import './App.css';
import { useEffect, useState } from 'react';
import Table from './Tabla';

function App() {
  const [dato, setDato] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/rendimientos/test.php")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then(data => {
        console.log("response", data);
        setDato(data.uso_cpu);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Administrador de Tareas:</h3>
        <Table />
        <br />
        <p>{dato ? dato : "Cargando..."}</p>
      </header>
    </div>
  );
}

export default App;

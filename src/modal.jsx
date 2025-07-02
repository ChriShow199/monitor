import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Ventana() {
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [rolRegistro, setRolRegistro] = useState('');

  //Login
  const [correoLogin, setCorreoLogin] = useState('');
  const [passLogin, setPassLogin] = useState('');

  //Registro
  const [correoRegistro, setCorreoRegistro] = useState('');
  const [passRegistro, setPassRegistro] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const Login = async () => {
    if (!correoLogin || !passLogin) 
    {
      alert("Rellena todos los campos");
      return;
    }

    try 
    {
      const res = await fetch(`http://localhost:8080/rendimientos/usuarios.php?accion=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: correoLogin,
          contrasena: passLogin
        })
      });

      const data = await res.json();
      if (data.status === 'ok') 
      {
        alert("Inicio de sesión exitoso");
        setModalLoginOpen(false);
      } 

      else 
      {
        alert(data.message || "Error al iniciar sesión");
      }
    } 
    
    catch (err) 
    {
      console.error("Error de red:", err);
      alert("No se pudo conectar al servidor");
    }
  };

  const Registro = async () => {
    if (!correoRegistro || !passRegistro || !confirmPass) 
    {
      alert("Rellena todos los campos");
      return;
    }

    if (passRegistro !== confirmPass) 
    {
      alert("Las contraseñas no coinciden");
      return;
    }

    try 
    {
      const res = await fetch(`http://localhost:8080/rendimientos/usuarios.php?accion=registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: correoRegistro,
          contrasena: passRegistro
        })
      });

      const data = await res.json();
      if (data.status === 'ok') 
      {
        alert("Registro exitoso");
        setModalRegistroOpen(false);
        setCorreoRegistro('');
        setPassRegistro('');
        setConfirmPass('');
      } 
      
      else 
      {
        alert(data.message || "Error al registrar");
      }
    } 
    
    catch (err) 
    {
      console.error("Error de red:", err);
      alert("No se pudo conectar al servidor");
    }
  };

  useEffect(() => {setModalLoginOpen(true);}, []);

  return (
    <div>
      {/* Modal Login */}
      <Modal
        isOpen={modalLoginOpen}
        onRequestClose={() => setModalLoginOpen(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '300px', padding: '20px', borderRadius: '10px',
          },

          overlay: {backgroundColor: '#282c34'},
        }}
      >
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={correoLogin}
          onChange={(e) => setCorreoLogin(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passLogin}
          onChange={(e) => setPassLogin(e.target.value)}
          style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
        />
        <button onClick={Login} style={{ marginRight: '10px' }}>
          Entrar
        </button>
        <button onClick={() => {
          setModalLoginOpen(false);
          setModalRegistroOpen(true);
        }}>
          Registrarse
        </button>
      </Modal>


      {/* Modal Registro */}
      <Modal
        isOpen={modalRegistroOpen}
        onRequestClose={() => setModalRegistroOpen(false)}
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '400px', padding: '20px', borderRadius: '10px',
          },

          overlay: {backgroundColor: '#282c34'},
        }}
      >
        <h2>Registro</h2>
        
        <input
          type="email"
          placeholder="Correo"
          value={correoRegistro}
          onChange={(e) => setCorreoRegistro(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={passRegistro}
          onChange={(e) => setPassRegistro(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
        />

        <select
          value={rolRegistro}
          onChange={(e) => setRolRegistro(e.target.value)}
          style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
        >
          <option value="">Selecciona un rol</option>
          <option value="admin">Administrador</option>
          <option value="usuario">Usuario</option>
          <option value="invitado">Invitado</option>
        </select>

        <button onClick={Registro} style={{ marginRight: '10px' }}>Registrarse</button>

        <button onClick={() => {
            setModalRegistroOpen(false);
            setModalLoginOpen(true);
          }}>
            Ya tengo cuenta
        </button>
      </Modal>
    </div>
  );
}

export default Ventana;
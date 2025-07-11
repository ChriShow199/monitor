import React from 'react';
import { useNavigate } from 'react-router-dom';

function BotonAbout() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/rutadered');
  };

  return (
    <button onClick={handleClick}>
      Usuario
    </button>
  );
}

export default BotonAbout;
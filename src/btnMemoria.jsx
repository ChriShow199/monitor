import './App.css';

export default function BotonMemoria() {
    const handleClick = () => {
    alert("Mensaje");
    };

    return (
    <button onClick={handleClick}>
        Memoria
    </button>
    );
}
import './App.css';

export default function BotonDisco() {
    const handleClick = () => {
    alert("Mensaje");
    };

    return (
    <button onClick={handleClick}>
        Disco
    </button>
    );
}
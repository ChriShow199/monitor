import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './estilosBotones.css';

export default function BotonPDF({ usuario, graficoRef, tipo, inicio, fin }) {

  const generarPDF = async () => {
    const doc = new jsPDF();
    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleDateString();
    const hora = fechaActual.toLocaleTimeString();

    doc.setFontSize(16);
    doc.text('Reporte de Sesión', 80, 20);

    doc.setFontSize(12);
    doc.text(`Usuario: ${usuario?.correo || 'Desconocido'}`, 86, 40);
    doc.text(`Rol: ${usuario?.rol || 'Desconocido'}`, 86, 50);
    doc.text(`Fecha: ${fecha}`, 86, 60);
    doc.text(`Hora: ${hora}`, 86, 70);
    doc.text('Fechas Consultadas:', 86, 80);
    doc.text(`Hora de inicio: ${inicio || 'No seleccionada'}`, 88, 85);
    doc.text(`Hora de fin: ${fin || 'No seleccionada'}`, 88, 90);

    if (graficoRef?.current && tipo)
    {
      const canvas = await html2canvas(graficoRef.current);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', -97, 95, 300, 80); // Posición y tamaño
    }

    doc.save('reporte.pdf');
  };

  return (
    <div>
      <button onClick={generarPDF}>
        Exportar Reporte
      </button>
    </div>
  );
}
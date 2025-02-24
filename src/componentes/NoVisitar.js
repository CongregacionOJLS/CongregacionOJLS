import React, { useEffect, useState } from 'react';
import './NoVisitar.css';
import Sidebar from './Sidebar';

function NoVisitar(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [data, setData] = useState([]); // Datos del sheet
  const [loading, setLoading] = useState(true); // Control de carga
  const apiUrl = "https://api.steinhq.com/v1/storages/67bc9727c088333365795ce4"; // URL de SteinHQ
  const sheetName = "No Visitar"; // Nombre de la hoja

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const goToGoogleSheets = () => {
    window.open("https://docs.google.com/spreadsheets/d/1ufxP26vyY0wfTX8MhqPTVYD2GYPSAyPhdJT7uPwGApM/edit?gid=201621672#gid=201621672", "_blank");  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/${sheetName}`);
        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Los datos devueltos no son un array:", result);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p>Error: Los datos no tienen el formato esperado o están vacíos.</p>;
  }

  return (
    <div className="NoVisitar">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <div id="Titulo">
          <hr />
          <h1>No visitar</h1>
          <hr />
        </div>

        {/* Renderizar detalles de cada territorio dinámicamente */}
        {data.map((row, rowIndex) => {
          // El primer valor es el nombre del territorio
          const [territory, ...streets] = Object.values(row);

          // Verificar si el territorio tiene calles
          const hasStreets = streets.some((street) => street && street.trim() !== '');

          return (
            <details key={rowIndex}>
              <summary>{territory || `Territorio ${rowIndex + 1}`}</summary>
              
              {hasStreets ? (
                <ul>
                  {streets
                    .filter((street) => street && street.trim() !== '') // Excluir calles vacías
                    .map((street, index) => (
                      <li key={index}>{street}</li>
                    ))}
                </ul>
              ) : (
                <p>No hay calles asignadas a este territorio.</p>
              )}
            </details>
          );
        })}
        {props.usuario && (
          <>
          <button className="ver-formulario-btn" onClick={goToGoogleSheets}>
            Ver formulario
          </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NoVisitar;

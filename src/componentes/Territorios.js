import './Territorios.css';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';

// Importamos el cliente de Supabase
import { supabase } from '../credenciales';

// Función modular para detectar PDFs
const isPDF = (url) => /.*\.pdf(\?.*)?$/.test(url);

function Territorios(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Consultamos la tabla unificada, ordenado del más antiguo al más nuevo
        const { data: list, error } = await supabase
          .from('Territorios')
          .select('*')
          .order('timeStamp', { ascending: true });

        if (error) {
          throw error;
        }

        setData(list);
        console.log("Mapas de territorios obtenidos:", list);

      } catch (err) {
        console.error("Error al obtener los territorios:", err.message);
      }
    };

    fetchData();
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = function(evento) {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="Territorios">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <hr />
        <h1>Territorios de la Congregación</h1>
        <hr />
        <br />

        {/* Enlaces fijos a Google Maps */}
        <div style={{ marginBottom: '30px', textAlign: 'left', paddingLeft: '20px' }}>
          <ul>
            <li><a href="https://www.google.com/maps/d/u/0/embed?mid=1fJO9OLQRpNcyUnsjj1DQSQDyB42NXXw&ehbc=2E312F" target="_blank" rel="noopener noreferrer">MAPA DEL TERRITORIO GENERAL ↗</a></li>
            <br />
            <li><a href="https://www.google.com/maps/d/u/0/embed?mid=10iyHEaOzldN6Wzbt72fssCHEAZPOajM&ehbc=2E312F" target="_blank" rel="noopener noreferrer">TERRITORIO DE EDIFICIOS ↗</a></li>
          </ul>
        </div>
        <hr />
        <br />

        {/* Renderizado dinámico de todas las imágenes subidas */}
        {data.length === 0 ? (
          <p>Cargando información o no hay mapas disponibles...</p>
        ) : (
          data.map((item, index) => (
            <div key={item.id} style={{ marginBottom: '30px', width: '100%' }}>
              {isPDF(item.url) ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img className='pdfAnun' src="img territorios/pdf-icon.png" alt={`PDF ${index + 1}`} />
                  <h3 id='pdfText'>{item.name}</h3>
                </a>
              ) : (
                <img id="imgTer" src={item.url} alt={`Territorio ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
              )}
              
              {/* Línea separadora entre mapas */}
              {index < data.length - 1 && (
                <>
                  <br /><br />
                  <hr style={{ width: '80%', margin: '0 auto' }} />
                  <br />
                </>
              )}
            </div>
          ))
        )}
        
        <br />
      </div>
    </div>
  );
}

export default Territorios;
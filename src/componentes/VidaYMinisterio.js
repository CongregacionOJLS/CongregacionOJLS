import './VidaYMinisterio.css';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';

// Importamos el cliente de Supabase
import { supabase } from '../credenciales';

// Función modular para detectar PDFs
const isPDF = (url) => /.*\.pdf(\?.*)?$/.test(url);

function VidaYMinisterio(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Consultamos la tabla unificada, ordenado del más antiguo al más nuevo
        const { data: list, error } = await supabase
          .from('VidaYMinisterio')
          .select('*')
          .order('timeStamp', { ascending: true });

        if (error) {
          throw error;
        }

        setData(list);
        console.log("Programa de Vida y Ministerio obtenido:", list);

      } catch (err) {
        console.error("Error al obtener Vida y Ministerio:", err.message);
      }
    };

    fetchData();
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = function(evento) {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="VidaYMinisterio">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <hr />
        <h1>Programa de la reunión vida y ministerio</h1>
        <hr />
        <br />
        
        {/* Renderizado dinámico de todas las partes del programa */}
        {data.length === 0 ? (
          <p>Cargando información o no hay programa disponible...</p>
        ) : (
          data.map((item, index) => (
            <div key={item.id} style={{ marginBottom: '30px', width: '100%' }}>
              {isPDF(item.url) ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img className='pdfAnun' src="img territorios/pdf-icon.png" alt={`PDF ${index + 1}`} />
                  <h3 id='pdfText'>{item.name}</h3>
                </a>
              ) : (
                <img id="imgVida" src={item.url} alt={`Programa parte ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
              )}
              
              {/* Línea separadora entre las diferentes partes del programa */}
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
        <br />
      </div>
    </div>
  );
}

export default VidaYMinisterio;
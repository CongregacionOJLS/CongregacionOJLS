import './SalidasPredicacion.css';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';

// Importamos el cliente de Supabase
import { supabase } from '../credenciales';

// Función modular para detectar PDFs
const isPDF = (url) => /.*\.pdf(\?.*)?$/.test(url);

function SalidasPredicacion(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Consultamos TODO sin límite, ordenado del más nuevo al más antiguo
        const { data: list, error } = await supabase
          .from('Salidas de predicacion')
          .select('*')
          .order('timeStamp', { ascending: true });

        if (error) {
          throw error;
        }

        setData(list);
        console.log("Salidas de predicación obtenidas:", list);

      } catch (err) {
        console.error("Error al obtener datos:", err.message);
      }
    };

    fetchData();
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = function(evento) {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="SalidasPredicacion">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <hr />
        <h1>Salidas de predicación</h1>
        <hr />
        <br />
        
        {/* Renderizado dinámico y modular sin límite de elementos */}
        {data.length === 0 ? (
          <p>Cargando información o no hay contenido disponible...</p>
        ) : (
          data.map((item, index) => (
            <div key={item.id} style={{ marginBottom: '30px', width: '100%' }}>
              {isPDF(item.url) ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img className='pdfAnun' src="img territorios/pdf-icon.png" alt={`PDF ${index + 1}`} />
                  <h3 id='pdfText'>{item.name}</h3>
                </a>
              ) : (
                <img className="imgSal" src={item.url} alt={`Salida ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
              )}
              
              {/* Línea separadora entre elementos (no se dibuja después del último) */}
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

export default SalidasPredicacion;
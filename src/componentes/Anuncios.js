import React, { useState, useEffect } from 'react';
import './Anuncios.css';
import Sidebar from './Sidebar';

// Importamos el cliente de Supabase
import { supabase } from '../credenciales';

const isPDF = (url) => /.*\.pdf(\?.*)?$/.test(url);
const isVideo = (url) => /.*\.(mp4|avi|mov)(\?.*)?$/.test(url);

function Anuncios(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Consultamos la tabla Anuncios, ordenado del más nuevo al más antiguo
        const { data: list, error } = await supabase
          .from('Anuncios')
          .select('*')
          .order('timeStamp', { ascending: false });

        if (error) {
          throw error;
        }

        // Supabase ya devuelve un array listo para usar
        setData(list);
        console.log("Anuncios obtenidos:", list);

      } catch (err) {
        console.error("Error al obtener los anuncios:", err.message);
      }
    };
    
    fetchData();
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="Anuncios">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <hr />
        <h1>Anuncios</h1>
        <hr />
        <div id='PLACEHOLDER'>
          {data.length === 0 ? (
            <p>Cargando información o no hay anuncios disponibles...</p>
          ) : (
            data.map((item, index) => (
              <div key={item.id || index} style={{ marginBottom: '30px', width: '100%' }}>
                {isPDF(item.url) ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img className='pdfAnun' src="img territorios/pdf-icon.png" alt={`Anuncio ${index + 1}`} />
                    <h3 id='pdfText'>{item.name}</h3>
                  </a>
                ) : isVideo(item.url) ? (
                  <video className="imgAnun" controls src={item.url} style={{ maxWidth: '100%' }}></video>
                ) : (
                  <img className="imgAnun" src={item.url} alt={`Anuncio ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
                )}
                
                {/* Línea separadora entre anuncios */}
                {index < data.length - 1 && (
                  <>
                    <br /><br />
                    <hr style={{ width: '80%', margin: '0 auto' }} />
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Anuncios;
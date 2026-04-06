import * as React from 'react';
import { useState, useEffect } from 'react';
import './ModoAdmin.css';
import Sidebar from './Sidebar';
import { supabase } from '../credenciales';

function ModoAdmin(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Estados de datos
  const [tablaSeleccionada, setTablaSeleccionada] = useState("");
  const [modificandoText, setModificandoText] = useState("Selecciona una categoría");
  const [elementosActuales, setElementosActuales] = useState([]);
  
  // Estados de carga y archivos
  const [cargandoLista, setCargandoLista] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [file, setFile] = useState(null);
  
  // Estado para saber si estamos añadiendo nuevo o reemplazando uno existente
  const [modoAccion, setModoAccion] = useState({ tipo: 'añadir', idBaseDatos: null, urlAntigua: null });

  // --- OBTENER DATOS DE LA CATEGORÍA ---
  const cargarElementos = async (tabla) => {
    setCargandoLista(true);
    try {
      const { data, error } = await supabase
        .from(tabla)
        .select('*')
        .order('timeStamp', { ascending: true }); // Orden para visualización en el admin

      if (error) throw error;
      setElementosActuales(data);
    } catch (error) {
      console.error("Error al cargar elementos:", error.message);
    } finally {
      setCargandoLista(false);
    }
  };

  const handleMenuItemClick = (tabla, nombreVisual) => {
    setTablaSeleccionada(tabla);
    setModificandoText(nombreVisual);
    setMenuOpen(false);
    setFile(null); // Limpiamos el input si había algo
    setModoAccion({ tipo: 'añadir', idBaseDatos: null, urlAntigua: null });
    cargarElementos(tabla);
  };

  // --- ELIMINAR ELEMENTO ---
  const handleEliminar = async (id, url) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) return;
    
    setProcesando(true);
    try {
      // 1. Extraer la ruta del archivo del URL público para borrarlo del Storage
      const rutaArchivo = url.split('/multimedia/')[1];
      if (rutaArchivo) {
        await supabase.storage.from('multimedia').remove([rutaArchivo]);
      }

      // 2. Borrar el registro de la base de datos
      await supabase.from(tablaSeleccionada).delete().eq('id', id);
      
      alert("Elemento eliminado con éxito.");
      cargarElementos(tablaSeleccionada); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar:", error.message);
      alert("Hubo un error al eliminar el archivo.");
    } finally {
      setProcesando(false);
    }
  };

  // --- SUBIR O REEMPLAZAR ELEMENTO ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !tablaSeleccionada) return;

    setProcesando(true);

    try {
      const date = new Date();
      const fileExtension = file.name.split('.').pop();
      // Usamos OJLS como carpeta base en el bucket para diferenciar si usan el mismo proyecto
      const fileName = `${tablaSeleccionada.replace(/\s+/g, '')}_${date.getTime()}.${fileExtension}`;
      const filePath = `OJLS/${fileName}`;

      // 1. Subir nuevo archivo al Storage
      const { error: uploadError } = await supabase.storage
        .from('multimedia')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtener la nueva URL
      const { data: publicUrlData } = supabase.storage
        .from('multimedia')
        .getPublicUrl(filePath);
      const rutaImagenNueva = publicUrlData.publicUrl;

      if (modoAccion.tipo === 'añadir') {
        // 3a. AÑADIR NUEVO: Insertar en la base de datos
        await supabase.from(tablaSeleccionada).insert([
          { name: file.name, url: rutaImagenNueva }
        ]);
        alert("Añadido con éxito");

      } else if (modoAccion.tipo === 'reemplazar') {
        // 3b. REEMPLAZAR: Actualizar base de datos y borrar archivo viejo
        
        await supabase.from(tablaSeleccionada)
          .update({ name: file.name, url: rutaImagenNueva })
          .eq('id', modoAccion.idBaseDatos);
        
        // Borrar imagen vieja del Storage para no acumular basura
        const rutaAntigua = modoAccion.urlAntigua.split('/multimedia/')[1];
        if (rutaAntigua) {
          await supabase.storage.from('multimedia').remove([rutaAntigua]);
        }
        
        alert("Reemplazado con éxito");
      }

      // Limpiar estados y recargar
      setFile(null);
      document.getElementById("file").value = "";
      setModoAccion({ tipo: 'añadir', idBaseDatos: null, urlAntigua: null });
      cargarElementos(tablaSeleccionada);

    } catch (error) {
      console.error('Error:', error.message);
      alert("Hubo un error en el proceso.");
    } finally {
      setProcesando(false);
    }
  };

  // --- PREVISUALIZACIÓN ---
  const renderPreview = () => {
    if (!file) return null;
    const isVideo = file.type.startsWith('video/');
    if (isVideo) return <video width="100%" controls src={URL.createObjectURL(file)} />;
    if (file.type === 'application/pdf') return <p>Archivo PDF listo para subir: <br/><span style={{wordBreak: 'break-all'}}>{file.name}</span></p>;
    return <img style={{maxWidth: '100%', maxHeight: '300px', objectFit: 'contain'}} src={URL.createObjectURL(file)} alt="preview" />;
  };

  return (
    <div className="ModoAdmin">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={() => setSidebarVisible(!sidebarVisible)}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`} style={{ boxSizing: 'border-box', width: '100%' }}>
        <div id="Titulo" style={{ width: '100%', boxSizing: 'border-box' }}>
          <br /><br /><hr />
          <h1>Gestor Multimedia OJLS</h1>
          <hr />
          
          {/* MENÚ DE CATEGORÍAS UNIFICADO */}
          <div className="dropdown">
            <button onClick={() => setMenuOpen(!menuOpen)} className="dropbtn">
              {modificandoText} ▼
            </button>
            {menuOpen && (
              <div className="dropdown-content">
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Salidas de predicacion', 'Salidas de predicación'); }}>Salidas de predicación</a>
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Territorios', 'Territorios y Edificios'); }}>Territorios y Edificios</a>
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Anuncios', 'Anuncios'); }}>Anuncios</a>
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('VidaYMinisterio', 'Vida y ministerio'); }}>Vida y ministerio</a>
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Carritos', 'Carritos'); }}>Carritos</a>
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Acomodadores', 'Acomodadores'); }}>Acomodadores</a>
                <a href="#!" onClick={(e) => { e.preventDefault(); handleMenuItemClick('Conferencias', 'Conferencias'); }}>Conferencias</a>
              </div>
            )}
          </div>
          <br /><br />

          {/* LISTA DE ELEMENTOS ACTUALES */}
          {tablaSeleccionada && (
            <div className="lista-elementos" style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '10px', marginBottom: '30px', boxSizing: 'border-box', width: '100%' }}>
              <h3>Contenido actual</h3>
              {cargandoLista ? <p>Cargando...</p> : (
                elementosActuales.length === 0 ? <p>No hay contenido en esta sección.</p> : (
                  elementosActuales.map((item, index) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '10px 0', flexWrap: 'wrap', gap: '10px' }}>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 0%', minWidth: 0 }}>
                        <span style={{ fontWeight: 'bold' }}>#{index + 1}</span>
                        {item.url.includes('.pdf') ? (
                          <img src="img territorios/pdf-icon.png" alt="PDF" width="40" style={{flexShrink: 0}} />
                        ) : (
                          <img src={item.url} alt="thumbnail" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button 
                          onClick={() => {
                            setModoAccion({ tipo: 'reemplazar', idBaseDatos: item.id, urlAntigua: item.url });
                            document.getElementById('file').focus();
                          }}
                          style={{ backgroundColor: '#ffc107', color: '#000', padding: '6px 12px', fontSize: '0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                          Reemplazar
                        </button>
                        <button 
                          onClick={() => handleEliminar(item.id, item.url)}
                          style={{ backgroundColor: '#dc3545', color: '#fff', padding: '6px 12px', fontSize: '0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          )}

          {/* FORMULARIO DE SUBIDA (Sirve para Añadir y Reemplazar) */}
          {tablaSeleccionada && (
            <div style={{ padding: '15px', border: '2px dashed #ccc', borderRadius: '10px', boxSizing: 'border-box', width: '100%', overflow: 'hidden' }}>
              <h3>{modoAccion.tipo === 'añadir' ? 'Añadir Nuevo Elemento' : 'Reemplazando elemento existente...'}</h3>
              {modoAccion.tipo === 'reemplazar' && (
                <button 
                  onClick={() => {
                    setModoAccion({ tipo: 'añadir', idBaseDatos: null, urlAntigua: null });
                    setFile(null);
                    document.getElementById("file").value = "";
                  }} 
                  style={{ backgroundColor: '#6c757d', color: 'white', marginBottom: '15px', fontSize: '0.8rem', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancelar Reemplazo
                </button>
              )}

              <form style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpg,.jpeg,.pdf,.mp4,.avi,.mov"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ maxWidth: '100%' }}
                />
              </form>
              
              <div style={{ margin: "20px 0", display: 'flex', justifyContent: 'center' }}>
                 {renderPreview()}
              </div>
              
              <button 
                disabled={procesando || !file} 
                onClick={handleSubmit}
                style={{ 
                  backgroundColor: modoAccion.tipo === 'añadir' ? '#28a745' : '#ffc107', 
                  color: modoAccion.tipo === 'añadir' ? '#fff' : '#000',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  width: '100%',
                  fontWeight: 'bold',
                  cursor: (procesando || !file) ? 'not-allowed' : 'pointer',
                  opacity: (procesando || !file) ? 0.6 : 1
                }}
              >
                {procesando ? "Procesando..." : (modoAccion.tipo === 'añadir' ? "Subir Nuevo" : "Confirmar Reemplazo")}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ModoAdmin;
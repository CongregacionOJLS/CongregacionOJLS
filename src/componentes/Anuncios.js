import React, { useState, useEffect } from 'react';
import './Anuncios.css';
import Sidebar from './Sidebar';
import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

function Anuncios(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        // Crear una consulta ordenada por timeStamp en orden descendente
        const q = query(collection(db, "Anuncios"), orderBy("timeStamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = function(evento) {
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
          {data.map((item, index) => (
            <div key={index}>
              <img src={item.url} width="600" alt={`Anuncio ${index + 1}`} />
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Anuncios;

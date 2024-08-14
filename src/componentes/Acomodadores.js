import './VidaYMinisterio.css';
import Sidebar from './Sidebar';
import React, { useState } from 'react';
import { addDoc, collection, doc,getDocs, setDoc,getFirestore, serverTimestamp} from 'firebase/firestore';
import appFirebase from '../credenciales';
import { useEffect } from 'react';

export const db = getFirestore(appFirebase);

const isPDF = (url) => /.*\.pdf(\?.*)?$/.test(url);

function Acomodadores(props) {

  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      let list = [];
      try
      {
    const querySnapshot = await getDocs(collection(db,"Acomodadores"));
    querySnapshot.forEach((doc) => {
      list.push({id: doc.id,...doc.data()});
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    setData(list);
  }catch(err)
  {
    console.log(err);
  }
    };
    fetchData();
  },[])

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = function(evento) {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="Acomodadores">
        <Sidebar visible={sidebarVisible} usuario = {props.usuario}/>

        <button className="toggle-btn" onClick={toggleSidebar}><img src="img territorios/menu2.png" alt="Toggle Sidebar" /></button>

        <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
    <hr/>
    <h1>Acomodadores</h1>
    <hr/>
    <br/>
    {isPDF(data[0].url) ? (
      <a href={data[0]? data[0].url : ""} target="_blank" rel="noopener noreferrer">
        <img className='pdfAnun' src="img territorios/pdf-icon.png" alt={'Acom'} /> {/* Asegúrate de tener un ícono de PDF */}
      </a>
      ) : (
      <img className="imgVida" src={data[0]? data[0].url : ""} alt={'Acom'} />
              )}
    <br/>
    <br/>
    </div>
    </div>

  );
  
}

export default Acomodadores;

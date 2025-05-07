import './Territorios.css';
import Sidebar from './Sidebar';
import React, { useState } from 'react';
import { addDoc, collection, doc,getDocs, setDoc,getFirestore, serverTimestamp} from 'firebase/firestore';
import appFirebase from '../credenciales';
import { useEffect } from 'react';

export const db = getFirestore(appFirebase);

function Territorios(props) {

  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      let list = [];
      try
      {
        const querySnapshot = await getDocs(collection(db,"Territorios"));
        const querySnapshot2 = await getDocs(collection(db,"Edificios"));
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id,...doc.data()});
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
    });
      querySnapshot2.forEach((doc) => {
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
    <div className="Territorios">
        <Sidebar visible={sidebarVisible} usuario = {props.usuario}/>

<button className="toggle-btn" onClick={toggleSidebar}><img src="img territorios/menu2.png" alt="Toggle Sidebar" /></button>

<div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
<hr/>
<h1>Territorio de la Congregación </h1>
<hr/>
<img id="imgTer" src={data[0]? data[0].url: ""}/>
<br/>
<li><a href="https://www.google.com/maps/d/u/0/embed?mid=1fJO9OLQRpNcyUnsjj1DQSQDyB42NXXw&ehbc=2E312F" target="_blank">MAPA DEL TERRITORIO ↗</a></li>
<br/>
<h2>Territorio Edificios</h2>
<hr/>
<img id="imgTer" src={data[1]? data[1].url: ""}/>
<hr/>
<br/>
<li><a href="https://www.google.com/maps/d/u/0/embed?mid=10iyHEaOzldN6Wzbt72fssCHEAZPOajM&ehbc=2E312F" target="_blank"> TERRITORIO DE EDIFICIOS ↗</a></li>
<br/>
</div>
</div>
  );
}

export default Territorios;

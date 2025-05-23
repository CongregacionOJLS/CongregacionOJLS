import * as React from 'react';
import { useState, useEffect } from 'react';
import './ModoAdmin.css';
import Sidebar from './Sidebar';
import appFirebase from '../credenciales';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { tab } from '@testing-library/user-event/dist/tab';

const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase);

//variables enviar imagen
var rutaImagen;
var nombreImagen;
var tabla;

var modificando = "...";
var enviando = false;

function ModoAdmin(props) {
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable

  const handleClick = (event) => {
    setMenuOpen(!menuOpen); // Cambia el estado para abrir/cerrar el menú desplegable
  };

  const handleClose = () => {
    setMenuOpen(false); // Cierra el menú cuando se hace clic fuera de él (si es necesario)
  };

  const handleMenuItemClick = (option) => {
    // Aquí puedes manejar la lógica según el item seleccionado
    switch(option)
    {
      case "SalidasDePredicacion":
        tabla = "Salidas de predicacion";
        nombreImagen = "images/SalidasDePredicacion.png";
        modificando = "Salidas De Predicacion";
        break;
      case "Territorios":
        tabla = "Territorios";  
        nombreImagen = "images/Territorios.png";
        modificando = "Territorios";
        break;
      case "Edificios":
        tabla = "Edificios";  
        nombreImagen = "images/Edificios.png";
        modificando = "Edificios";
        break;
      case "Anuncios":
        const date = new Date();
        tabla = "Anuncios";
        nombreImagen = "images/Anuncios" + ": " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + ":" + date.getHours() + ":" + date.getMinutes() + ".png";  
        modificando = "Anuncios";
        break;
      case "VidaYMinisterioArriba":
        tabla = "Vida y ministerio";
        nombreImagen = "images/VidaYMinisterio.png";  
        modificando = "Vida y ministerio arriba";
        break;
        case "VidaYMinisterioAbajo":
          tabla = "Vida y ministerio abajo OJLS";
          nombreImagen = "images/VidaYMinisterioAbajo.png";  
          modificando = "Vida y ministerio abajo";
          break;
      case "Carritos":
        tabla = "Carritos";
        nombreImagen = "images/Carritos.png";  
        modificando = "Carritos";
        break;
      case "AcomodadoresArriba":
        const date2 = new Date();
        tabla = "Acomodadores";
        nombreImagen = "images/Acomodadores" + ": " + date2.getDate() + "-" + (date2.getMonth() + 1) + "-" + date2.getFullYear() + ":" + date2.getHours() + ":" + date2.getMinutes() + ".png";  
        modificando = "Acomodadores arriba";
        break;
        case "AcomodadoresAbajo":
          const date4 = new Date();
          tabla = "Acomodadores abajo OJLS";
          nombreImagen = "images/AcomodadoresAbajo" + ": " + date4.getDate() + "-" + (date4.getMonth() + 1) + "-" + date4.getFullYear() + ":" + date4.getHours() + ":" + date4.getMinutes() + ".png";  
          modificando = "Acomodadores abajo";
          break;
        case "Conferencias":
          const date3 = new Date();
          tabla = "Conferencias";
          nombreImagen = "images/Conferencias" + ": " + date3.getDate() + "-" + (date3.getMonth() + 1) + "-" + date3.getFullYear() + ":" + date3.getHours() + ":" + date3.getMinutes() + ".png";  
          modificando = "Conferencias";
          break;
    }
    console.log(option);
    handleClose(); // Cierra el menú después de seleccionar una opción
  };

  useEffect(() => {
    const uploadFile = () => {
      const fileExtension = file.name.split('.').pop(); // Obtén la extensión del archivo
      let fileName = null;
      if (nombreImagen.includes("Anuncios") || nombreImagen.includes("Acomodadores") || nombreImagen.includes("Conferencias"))
      {
        fileName = `${nombreImagen.replace(".png", `.${fileExtension}`)}`;
      }
      else 
      {
        fileName = nombreImagen;
      }
      nombreImagen = fileName; //PUEDE ROMPER TODO????
      console.log(fileName);
      /*var fileName = nombreImagen.includes("Anuncios")
        ? `${nombreImagen.replace(".png", `.${fileExtension}`)}`
        : nombreImagen; */

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            rutaImagen = downloadURL;
            console.log('File available at', downloadURL);
          });
        }
      );
    };
  
    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(db);
    enviando = true;
    try {
      if (tabla == "Anuncios")
      {
        nombreImagen = nombreImagen.split("/")[1]; // EXPERIMENTAL
        await addDoc(collection(db, tabla,), { // addDoc(collection(db, "cities")
          name: nombreImagen,
          url: rutaImagen, // Asegúrate de tener la URL correcta aquí
          timeStamp: serverTimestamp(),
        });
        console.log('Documento añadido con éxito');
        alert("Documento añadido con éxito");
      }
      else 
      {
        if (tabla.includes("Acomodadores")  || tabla == "Conferencias")
        {
          nombreImagen = nombreImagen.split("/")[1];
          await setDoc(doc(db, tabla, 'imagen'), {
            name: nombreImagen,
            url: rutaImagen, // Asegúrate de tener la URL correcta aquí
            timeStamp: serverTimestamp(),
          });
          console.log('Documento añadido con éxito');
          alert("Documento añadido con éxito");
        }
        else
        {
          await setDoc(doc(db, tabla, 'imagen'), {
            name: tabla,
            url: rutaImagen, // Asegúrate de tener la URL correcta aquí
            timeStamp: serverTimestamp(),
          });
          console.log('Documento añadido con éxito');
          alert("Documento añadido con éxito");
        }
    }
    } catch (error) {
      console.error('Error al añadir el documento: ', error);
    }
    finally {
      enviando = false;
    }
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="ModoAdmin">
      <Sidebar visible={sidebarVisible} usuario={props.usuario} />

      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src="img territorios/menu2.png" alt="Toggle Sidebar" />
      </button>

      <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <div id="Titulo">
          <br />
          <br />
          <hr/>
          <h1>Cambios multimedia</h1>
          <hr/>
          {/* Menú desplegable vertical */}
          <div className="dropdown">
            <button onClick={handleClick} className="dropbtn">Seleccionar</button>
            {menuOpen && (
              <div className="dropdown-content">
                <a href="#" onClick={() => handleMenuItemClick('SalidasDePredicacion')}>Salidas de predicacion</a>
                <a href="#" onClick={() => handleMenuItemClick('Territorios')}>Territorios</a>
                <a href="#" onClick={() => handleMenuItemClick('Edificios')}>Edificios</a>
                <a href="#" onClick={() => handleMenuItemClick('Anuncios')}>Anuncios</a>
                <a href="#" onClick={() => handleMenuItemClick('VidaYMinisterioArriba')}>Vida y ministerio arriba</a>
                <a href="#" onClick={() => handleMenuItemClick('VidaYMinisterioAbajo')}>Vida y ministerio abajo</a>
                <a href="#" onClick={() => handleMenuItemClick('Carritos')}>Carritos</a>
                <a href="#" onClick={() => handleMenuItemClick('AcomodadoresArriba')}>Acomodadores arriba</a>
                <a href="#" onClick={() => handleMenuItemClick('AcomodadoresAbajo')}>Acomodadores abajo</a>
                <a href="#" onClick={() => handleMenuItemClick('Conferencias')}>Conferencias</a>
              </div>
            )}
          </div>
          <br/>
          <span>{modificando}</span> <br/>
          
          <form>
            <input
              type="file"
              id="file"
              accept=".png,.jpg,.jpeg,.pdf,.mp4,.avi,.mov"  // Agrega los tipos de archivo permitidos
              onChange={(e) => setFile(e.target.files[0])}
            />
          </form>
          <img width='600px' id='imgUpl' src={file ? URL.createObjectURL(file) : ''} /> <br/>
          <button disabled={per == null || per<100 || enviando == true} onClick={handleAdd}>Enviar</button>

        </div>
      </div>
    </div>
  );
}

export default ModoAdmin;